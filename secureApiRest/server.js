// Import dependencies
import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.js";
import podcastRouter from "./routes/podcast.js";
import rssRouter from "./routes/rss.js";

// Setup the express server
const app = express();
const port = 3000;

app.use(cors());

const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200
};

// Setup all the routes
app.use("/api/podcast", podcastRouter);
app.use("/api/auth", authRouter);
app.use("/api/rss", rssRouter);

// Start the server
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

async function closeGracefully() {

}