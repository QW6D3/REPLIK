import express from "express";
import mongo from "../services/mongo.js";
import multer from "multer";

const router = express.Router()

const upload = multer().single('replik-cover');
router.get('/', async (req, res) => {
    return mongo.getCoverFromTitle('replik-cover').pipe(res);
})

router.post('/', (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        try {
            await mongo.uploadPodcastCover(req.file, 'replik-cover');
            res.status(200).json({ message: 'Cover uploaded successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
});

export default router;