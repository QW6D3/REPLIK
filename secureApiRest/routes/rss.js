import express from "express";
import { createRss } from "../rss.js";

const router = express.Router();

router.get('/', async (req, res) => {
    const rss = await createRss();
    res.set('Content-Type', 'text/xml');
    res.send(rss);
});

export default router;