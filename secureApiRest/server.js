// Import dependencie
const express = require("express");
const cors = require("cors");

// Setup the express server
const app = express();
const port = 3000;

if (process.env.NODE_ENV !== 'production') {
  app.use(cors());
}

corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200
}
// Import routes
const authRouter = require("./routes/auth");
const messagesRouter = require("./routes/messages");
const podcastRouter = require("./routes/podcast");
const rssRouter = require("./routes/rss");

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