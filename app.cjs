// Startup file for cPanel "Setup Node.js App" (Passenger). Passenger loads the
// startup file with CommonJS, but the built server is an ES module, so load it
// with a dynamic import. Run `npm run build` first.
import("./dist/server/node-build.mjs").catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
