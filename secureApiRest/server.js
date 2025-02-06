// Import dependencies
import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.js";
import podcastRouter from "./routes/podcast.js";
import rssRouter from "./routes/rss.js";
import coverRouter from "./routes/cover.js";
import { editor } from "./middleware/roles.js";
import authMiddleware from "./middleware/auth.js";

// Setup the express server
const app = express();
const port = 3000;

app.use(cors());

app.post("*", [authMiddleware], (req, res, next) => {
  next();
});

// Setup all the routes
app.use("/api/podcasts", podcastRouter);
app.use("/api/auth", authRouter);
app.use("/api/rss", rssRouter);
app.use("/api/cover", coverRouter);
app.use("/api/connected", testRouter);
// Start the server
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

async function closeGracefully() {

}