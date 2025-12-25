import cors from "cors";
import express from "express";

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get("/health", (_: unknown, res: any) => {
    res.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      service: "server",
    });
  });

  app.use("/*splat", (req: any, res: any) => {
    res.status(404).json({
      success: false,
      error: "Not Found",
      message: `Route ${req.originalUrl} not found`,
      availableEndpoints: [
        "GET /health",
        ...(process.env.NODE_ENV !== "production"
          ? ["POST /api/echo", "GET /api/echo", "GET /api/dev/info"]
          : []),
      ],
    });
  });

  return app;
}
