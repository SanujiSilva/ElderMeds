const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const dist = path.join(root, "dist");
const required = ["index.html", "styles.css", "script.js", "src/data/links.js"];

for (const file of required) {
  if (!fs.existsSync(path.join(root, file))) {
    throw new Error(`Missing required file: ${file}`);
  }
}

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });

for (const file of ["index.html", "styles.css", "script.js"]) {
  fs.copyFileSync(path.join(root, file), path.join(dist, file));
}

function copyDir(from, to) {
  if (!fs.existsSync(from)) return;
  fs.mkdirSync(to, { recursive: true });
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const src = path.join(from, entry.name);
    const dest = path.join(to, entry.name);
    if (entry.isDirectory()) copyDir(src, dest);
    else fs.copyFileSync(src, dest);
  }
}

copyDir(path.join(root, "public"), path.join(dist, "public"));
copyDir(path.join(root, "src"), path.join(dist, "src"));

console.log("Build complete: dist/");
