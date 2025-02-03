// Import dependencie
const express = require("express");
const cors = require("cors");

// Setup the express server
const app = express();
const port = 3000;

corsOptions = {
  allowedHeaders: ['Content-Type', 'x-auth-token'],
  exposedHeaders: ['x-auth-token'],
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

// Import routes
const authRouter = require("./routes/auth");
const podcastRouter = require("./routes/podcast");
const rssRouter = require("./routes/rss");
const testRouter = require("./routes/test");

// Setup all the routes
app.use("/api/podcast", podcastRouter);
app.use("/api/auth", authRouter);
app.use("/api/rss", rssRouter);
app.use("/api/test", testRouter);


// Start the server
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

async function closeGracefully() {

}