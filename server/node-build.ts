import fs from "node:fs";
import path from "node:path";
import { createServer } from "./index";
import * as express from "express";
import { PAGES, REDIRECTS, canonicalPath, renderHead } from "@shared/seo";

const app = createServer();
const port = process.env.PORT || 3000;

// In production, serve the built SPA files
const __dirname = import.meta.dirname;
const distPath = path.join(__dirname, "../spa");

// Hashed build assets can be cached for a year; everything else revalidates.
app.use(
  "/assets",
  express.static(path.join(distPath, "assets"), {
    immutable: true,
    maxAge: "1y",
  }),
);
app.use(express.static(distPath, { index: false }));

const indexHtml = fs.readFileSync(path.join(distPath, "index.html"), "utf8");
const SEO_BLOCK = /<!--seo-start-->[\s\S]*?<!--seo-end-->/;

// Render the right SEO <head> into the initial HTML for each route, so
// crawlers that don't run JavaScript still see per-page tags. Unknown paths
// get a real 404 status instead of a soft-404.
app.use((req, res) => {
  // Don't serve index.html for API routes
  if (req.path.startsWith("/api/") || req.path.startsWith("/health")) {
    return res.status(404).json({ error: "API endpoint not found" });
  }

  const canonical = canonicalPath(req.path);

  // 301 old React URLs to the URLs that are already indexed.
  const target = REDIRECTS[canonical];
  if (target) {
    const query = req.url.includes("?")
      ? req.url.slice(req.url.indexOf("?"))
      : "";
    return res.redirect(301, target + query);
  }

  const page = PAGES[canonical];
  res.type("html").status(page ? 200 : 404);
  res.setHeader("Cache-Control", "no-cache");
  res.send(
    page
      ? indexHtml.replace(SEO_BLOCK, renderHead(canonical, page))
      : indexHtml.replace(
          SEO_BLOCK,
          '<title>Page Not Found » Taipo</title>\n    <meta name="robots" content="follow, noindex" />',
        ),
  );
});

app.listen(port, () => {
  console.log(`🚀 Fusion Starter server running on port ${port}`);
  console.log(`📱 Frontend: http://localhost:${port}`);
  console.log(`🔧 API: http://localhost:${port}/api`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("🛑 Received SIGTERM, shutting down gracefully");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("🛑 Received SIGINT, shutting down gracefully");
  process.exit(0);
});
