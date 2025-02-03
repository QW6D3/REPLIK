// Import dependencies
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

module.exports = (req, res, next) => {
    const token = req.header("x-auth-token");
    if (!token) return res.status(401).send({
        ok: false,
        error: "Access denied. No token provided"
    });

    try {
        const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY || "jwtPrivateKey");
        const newToken = jwt.sign(
            { id: decoded.id },
            process.env.JWT_PRIVATE_KEY || "jwtPrivateKey",
            { expiresIn: '2h' }
        );
        res.setHeader('x-auth-token', newToken);
        next();
    } catch (error) {
        return res.status(401).send({
            ok: false,
            error: "Token expired"
        });
    }

    next();
}