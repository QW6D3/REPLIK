const express = require("express");
const auth = require("../middleware/auth");

const router = express.Router();

router.post('/', [auth], async (req, res) => {
    return res.status(200).json({ message: 'Authenticate' });
})

module.exports = router;