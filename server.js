const http = require("http");
const fs = require("fs");
const path = require("path");

const root = path.resolve(process.argv[2] || ".");
const port = Number(process.env.PORT || 4173);
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".mp4": "video/mp4"
};

http
  .createServer((req, res) => {
    const url = decodeURIComponent(req.url.split("?")[0]);
    const safePath = path.normalize(url).replace(/^(\.\.[/\\])+/, "");
    let filePath = path.join(root, safePath === "/" ? "index.html" : safePath);
    if (!filePath.startsWith(root)) {
      res.writeHead(403);
      res.end("Forbidden");
      return;
    }
    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, "index.html");
    }
    fs.stat(filePath, (error, stats) => {
      if (error || !stats.isFile()) {
        res.writeHead(404);
        res.end("Not found");
        return;
      }
      const contentType = types[path.extname(filePath)] || "application/octet-stream";
      const range = req.headers.range;

      if (range) {
        const match = /^bytes=(\d*)-(\d*)$/.exec(range);
        const start = match && match[1] ? Number(match[1]) : 0;
        const end = match && match[2] ? Number(match[2]) : stats.size - 1;
        if (!match || start > end || end >= stats.size) {
          res.writeHead(416, { "Content-Range": `bytes */${stats.size}` });
          res.end();
          return;
        }
        res.writeHead(206, {
          "Accept-Ranges": "bytes",
          "Content-Range": `bytes ${start}-${end}/${stats.size}`,
          "Content-Length": end - start + 1,
          "Content-Type": contentType
        });
        if (req.method === "HEAD") res.end();
        else fs.createReadStream(filePath, { start, end }).pipe(res);
        return;
      }

      res.writeHead(200, {
        "Accept-Ranges": "bytes",
        "Content-Length": stats.size,
        "Content-Type": contentType
      });
      if (req.method === "HEAD") res.end();
      else fs.createReadStream(filePath).pipe(res);
    });
  })
  .listen(port, () => {
    console.log(`ElderMeds site running at http://localhost:${port}`);
  });
