require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

const API_URL = "https://fakestoreapi.com";
const SECRET_KEY = process.env.JWT_SECRET || "centigrade-secret-key";

//  Route: User Login (Fake Store API)
// Fake Store has 20 users (sample: username:'johnd',password:'m38rmF$')
app.post("/api/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const { data } = await axios.post(`${API_URL}/auth/login`, { username, password });

        if (data.token) {
            // Create a new JWT token with user's token inside
            const userToken = jwt.sign({ token: data.token }, SECRET_KEY, { expiresIn: "1h" });
            return res.json({ token: userToken });
        }

        res.status(401).json({ message: "Invalid credentials" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

//  Middleware: Authenticate Request
const authenticateToken = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "Access Denied" });

    try {
        const verified = jwt.verify(token, SECRET_KEY);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ message: "Invalid Token" });
    }
};

//  Route: Fetch Products (Protected)
app.get("/api/products", authenticateToken, async (req, res) => {
    try {
        const fakeStoreToken = req.user.token; // Extract Fake Store token from JWT
        const { data } = await axios.get(`${API_URL}/products`, {
            headers: { Authorization: `Bearer ${fakeStoreToken}` },
        });

        res.json(data);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch products" });
    }
});

// Route: Fetch Products by Category
app.get("/api/products/category/:category", authenticateToken, async (req, res) => {
    try {
        const { category } = req.params;
        const fakeStoreToken = req.user.token;

        const { data } = await axios.get(`${API_URL}/products/category/${category}`, {
            headers: { Authorization: `Bearer ${fakeStoreToken}` },
        });

        res.json(data);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch category products" });
    }
});

//  Route: Fetch Categories (Protected)
app.get("/api/categories", authenticateToken, async (req, res) => {
    try {
        const fakeStoreToken = req.user.token; // Extract Fake Store token from JWT
        const { data } = await axios.get(`${API_URL}/products/categories`, {
            headers: { Authorization: `Bearer ${fakeStoreToken}` },
        });

        res.json(data);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch products" });
    }
});

//  Start Server
app.listen(5001, () => console.log("Server running on port 5001"));