// Import dependencies
import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.js";
import podcastRouter from "./routes/podcast.js";
import rssRouter from "./routes/rss.js";
import coverRouter from "./routes/cover.js";
import testRouter from "./routes/test.js";
import authMiddleware from "./middleware/auth.js";

/**
 * Create and configure an Express server
 * @returns {express.Application} Configured Express app instance
 */
const createServer = () => {
    const app = express();

    app.use(cors({
        origin: "*", // à changer 
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"]  
    }));

    app.use(cors());
    app.use(express.json());

    app.use("/api/auth", authRouter);
    app.use("/api/podcasts", podcastRouter);
    app.use("/api/rss", authMiddleware, rssRouter);
    app.use("/api/cover", authMiddleware, coverRouter);
    app.use("/api/connected", authMiddleware, testRouter);

    return app;
};

// Initialize the Express server
const app = createServer();
const port = 3000;

/**
 * Start the Express server
 * @param {number} port - Port number to listen on
 */
const startServer = (port) => {
    const server = app.listen(port, () => {
        console.log(`Listening on port ${port}...`);
    });

    process.on("SIGINT", () => closeGracefully(server));
    process.on("SIGTERM", () => closeGracefully(server));
};

/**
 * Gracefully shuts down the server
 * @param {import("http").Server} server - Express server instance
 */
async function closeGracefully(server) {
    console.log("\nShutting down server...");
    server.close(() => {
        console.log("Server stopped.");
        process.exit(0);
    });
}

// Start the server
startServer(port);
