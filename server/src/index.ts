#!/usr/bin/env node

import { createApp } from "./app";

async function startServer() {
  console.log("START");
  try {
    const PORT = 3001;
    const HOST = "0.0.0.0";

    const app = createApp();

    const server = app.listen(PORT, HOST, () => {
      console.log(`Server is running`);
    });

    const signals = ["SIGINT", "SIGTERM"];
    signals.forEach((signal) => {
      process.on(signal, () => {
        console.log(`\n${signal} received, shutting down gracefully...`);
        server.close(() => {
          console.log("Server closed");
          process.exit(0);
        });
      });
    });

    server.on("error", (error: any) => {
      console.error("Server error:", error);
      process.exit(1);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
