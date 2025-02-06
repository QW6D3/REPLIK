import express from 'express';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.get('/', [authMiddleware], async (req, res) => {
    return res.status(200).json({ message: 'Authenticate' });
})

export default router;