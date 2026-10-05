import { spawn } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync, cpSync, lstatSync, readdirSync } from "node:fs";
import path from "node:path";

const [project, archive] = process.argv.slice(2);
if (!project || !archive) {
  console.error("Usage: node package-static-site.mjs <project_dir> <archive>");
  process.exit(64);
}

const root = path.resolve(project);
const sourceDist = path.join(root, "dist");
const sourceManifest = path.join(root, ".openai", "hosting.json");
const stage = path.join(root, ".sites-runtime", "package-stage");
const stagedDist = path.join(stage, "dist");

function assertRegularTree(filename) {
  const stat = lstatSync(filename);
  if (stat.isDirectory()) {
    for (const entry of readdirSync(filename)) assertRegularTree(path.join(filename, entry));
  } else if (!stat.isFile()) {
    throw new Error(`Build output contains a symlink or special file: ${filename}`);
  }
}

function run(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { ...options, stdio: ["ignore", "pipe", "pipe"] });
    let stderr = "";
    child.stderr.on("data", (chunk) => { stderr += chunk; });
    child.once("error", reject);
    child.once("close", (code) => {
      code === 0 ? resolve() : reject(new Error(stderr || `${command} failed`));
    });
  });
}

if (!existsSync(path.join(sourceDist, "index.html"))) throw new Error("Missing dist/index.html");
if (!existsSync(sourceManifest)) throw new Error("Missing .openai/hosting.json");
assertRegularTree(sourceDist);

rmSync(stage, { recursive: true, force: true });
mkdirSync(stagedDist, { recursive: true });
cpSync(sourceDist, stagedDist, { recursive: true });

const manifest = JSON.parse(readFileSync(sourceManifest, "utf8"));
manifest.static = { ...manifest.static, directory: "dist" };
mkdirSync(path.join(stagedDist, ".openai"), { recursive: true });
writeFileSync(path.join(stagedDist, ".openai", "hosting.json"), `${JSON.stringify(manifest, null, 2)}\n`);

mkdirSync(path.dirname(path.resolve(archive)), { recursive: true });
rmSync(path.resolve(archive), { force: true });
await run("tar", ["-C", stage, "-czf", path.resolve(archive), "dist"]);

console.log(path.resolve(archive));
