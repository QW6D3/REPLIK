import express from 'express';
import authMiddleware from '../middleware/auth';

const router = express.Router();

router.get('/', [authMiddleware], async (req, res) => {
    return res.status(200).json({ message: 'Authenticate' });
})
