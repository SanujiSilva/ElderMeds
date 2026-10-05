import { spawn } from "node:child_process";
import { readFileSync } from "node:fs";

const projectId = process.argv[2];
if (!projectId) {
  console.error("Usage: node push-site-source.mjs <project_id>");
  process.exit(64);
}

const input = JSON.parse(readFileSync(0, "utf8"));
const credential = input.credential;

function runGit(args, { network = false, check = true } = {}) {
  return new Promise((resolve, reject) => {
    const env = { ...process.env, GIT_TERMINAL_PROMPT: "0" };
    const finalArgs = [...args];
    if (network) {
      env.SITES_GIT_AUTHORIZATION = `Authorization: Bearer ${credential.token}`;
      finalArgs.unshift(
        "-c",
        "credential.helper=",
        "-c",
        "http.extraHeader=",
        "-c",
        "http.followRedirects=false",
        `--config-env=http.${credential.remote_url}.extraHeader=SITES_GIT_AUTHORIZATION`,
      );
    }
    const child = spawn("git", finalArgs, { env, stdio: ["ignore", "pipe", "pipe"] });
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (chunk) => { stdout += chunk; });
    child.stderr.on("data", (chunk) => { stderr += chunk; });
    child.once("error", reject);
    child.once("close", (code) => {
      const redacted = stderr.split(credential.token).join("[redacted]");
      if (check && code !== 0) {
        reject(new Error(redacted || `git ${args[0]} failed`));
      } else {
        resolve({ code, stdout, stderr: redacted });
      }
    });
  });
}

function requireMatchingManifest(source) {
  const manifest = JSON.parse(source);
  if (manifest.project_id !== projectId) {
    throw new Error("The source project_id does not match the selected Site.");
  }
}

await runGit(["rev-parse", "--show-toplevel"]);
requireMatchingManifest(readFileSync(".openai/hosting.json", "utf8"));

await runGit(["add", "--all", "--", "."]);
const sourceTree = (await runGit(["write-tree"])).stdout.trim();
requireMatchingManifest((await runGit(["show", `${sourceTree}:.openai/hosting.json`])).stdout);

const diff = await runGit(["diff", "--cached", "--quiet"], { check: false });
if (diff.code === 1) {
  const identity = await runGit(["var", "GIT_AUTHOR_IDENT"], { check: false });
  const fallback = identity.code === 0 ? [] : ["-c", "user.name=Sites", "-c", "user.email=sites@users.noreply.openai.com"];
  await runGit([...fallback, "commit", "-m", "Update Site source"]);
} else if (diff.code !== 0) {
  throw new Error("Unable to inspect staged Site source.");
}

const head = (await runGit(["rev-parse", "--verify", "HEAD^{commit}"])).stdout.trim();
await runGit(["push", credential.remote_url, `${head}:refs/heads/${credential.branch}`], { network: true });
const pushed = (await runGit(["ls-remote", "--heads", credential.remote_url, `refs/heads/${credential.branch}`], { network: true })).stdout.trim().split(/\s+/)[0];
if (pushed !== head) throw new Error("Pushed source did not match the local commit.");

console.log(JSON.stringify({ commit_sha: head }));
