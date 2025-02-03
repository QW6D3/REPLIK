const express = require("express");
const { createRss } = require("../rss");

const router = express.Router();

router.get('/', async (req, res) => {
    const rss = await createRss();
    res.set('Content-Type', 'text/xml');
    res.send(rss);
})

module.exports = router;