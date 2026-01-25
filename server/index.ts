import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { registerRoutes } from "./routes";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Register API routes
registerRoutes(app);

// Serve static files in production
const clientPath = path.join(__dirname, "..", "dist");
app.use(express.static(clientPath));

// SPA fallback
app.get("*", (req, res) => {
  if (!req.path.startsWith("/api")) {
    res.sendFile(path.join(clientPath, "index.html"));
  }
});

const port = 5000;
const server = createServer(app);

server.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});
