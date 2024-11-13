import app from "./app.js";
import { PORT } from "./config.js";

app.listen(PORT);
console.log("servidor corriendo en puerto", PORT);
process.on("uncaughtException", (err) => {
  console.error("Unhandled error:", err);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled rejection at", promise, "reason:", reason);
});
process.on("SIGTERM", () => {
  console.log("Received SIGTERM, shutting down gracefully...");
  server.close(() => {
    console.log("Process terminated");
  });
});
