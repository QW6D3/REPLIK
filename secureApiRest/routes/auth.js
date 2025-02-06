import jwt from "jsonwebtoken";
import express from "express";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/", async (req, res) => {
    const users = [{
        id: 1,
        username: process.env.AUTH_USER,
        password: process.env.AUTH_PASSWORD,
    }];

    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "Les champs username et password sont obligatoires" });
        }

        const user = users.find(u => u.username === username);
        if (!user) {
            return res.status(404).send({ message: "Username incorrect" });
        }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            return res.status(401).send({ message: "Le mot de passe est incorrect" });
        }

        const token = jwt.sign(
            { id: user.id, roles: user.roles },
            process.env.JWT_PRIVATE_KEY || "jwtPrivateKey",
            { expiresIn: "2h" }
        );
        res.send({ token });
    } catch (error) {
        res.status(500).send({ message: `Server error: ${error}` });
    }
});

export default router;
