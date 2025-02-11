import {pool }from "../config/config.js";
import bcrypt from "bcryptjs";
// Register a new user
export const registerUser = async (name, position, username, base_salary, email, password, department) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = "INSERT INTO employee (name, position, department, base_salary, email, username, password) VALUES (?, ?, ?, ?, ?, ?, ?)";
        await pool.query(query, [name, position, department, base_salary, email, username, hashedPassword]);
        return { success: true, message: "User registered successfully" };
    } catch (error) {
        return { success: false, error: "Database error" };
    }
};
// Get user by username and department
export const getUserByUsername = async (username, department) => {
    try {
        const [results] = await pool.query("SELECT * FROM employee WHERE username = ? AND department = ?", [username, department]);
        return results.length > 0 ? results[0] : null;
    } catch (error) {
        return null;
    }
};






