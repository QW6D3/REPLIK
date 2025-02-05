import jwt from "jsonwebtoken";
import express from "express";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/", async (req, res) => {
    const users = [{
        id: 1,
        roles: ["admin", "editor", "viewer"]
    }];

    // Find the user by email
    const user = users.find(u => u.email === req.body.email);
    if (!user) {
        return res.status(404).send({
            ok: false,
            message: "Incorrect email"
        });
    }

    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid) {
        return res.status(401).send({
            ok: false,
            message: "Incorrect password"
        });
    }

    try {
        const token = jwt.sign(
            { id: user.id, roles: user.roles },
            process.env.JWT_PRIVATE_KEY || "jwtPrivateKey",
            { expiresIn: "30m" }
        );
        res.send({
            ok: true,
            token: token
        });
    } catch (error) {
        res.status(500).send({
            ok: false,
            message: "Failed to generate token"
        });
    }
});

export default router;
