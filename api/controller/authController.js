import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { registerUser, getUserByUsername } from "../model/authDb.js";
import bcrypt from "bcryptjs";
dotenv.config();
// Register User
export const register = async (req, res) => {
    const { name, position, username, base_salary, email, password, department } = req.body;
    const result = await registerUser(name, position, username, base_salary, email, password, department);
    if (!result.success) return res.status(500).json({ error: result.error });
    res.json({ message: result.message });
};
// Login User
export const login = async (req, res) => {
    const { username, password, department } = req.body;
    const user = await getUserByUsername(username, department);
    if (!user) return res.status(401).json({ error: "Invalid credentials" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });
    const token = jwt.sign(
        { employee_id: user.employee_id, username: user.username, department: user.department },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );
    res.json({ message: "Login successful", token });
};
// Middleware for Authentication
export const authenticate = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ error: "Access denied" });
    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid token" });
    }
};






