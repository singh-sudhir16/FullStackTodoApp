const express = require("express");
const jwt = require("jsonwebtoken");
const zod = require("zod");
const { createTodo, updateTodo } = require("./types");
const { todo } = require("./db");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());  // Ensure CORS is enabled

function dataCheck(req, res, next) {
    if (!createTodo.safeParse(req.body).success) {
        return res.status(411).send({ Msg: "Please send correct inputs" });
    }
    next();
}

function updateCheck(req, res, next) {
    if (!updateTodo.safeParse(req.body).success) {
        return res.status(411).send({ Msg: "Please send correct inputs" });
    }
    next();
}

app.post("/todos", dataCheck, async (req, res) => {
    try {
        const newTodo = new todo({
            title: req.body.title,
            description: req.body.description,
            hasCompleted: false
        });
        await newTodo.save();
        res.json({ Msg: "Todo created" });
    } catch (error) {
        res.status(500).json({ Msg: "Server error", error: error.message });
    }
});

app.get("/completed", async (req, res) => {
    try {
        const ans = await todo.find({});
        res.json({ ans });
    } catch (error) {
        res.status(500).json({ Msg: "Server error", error: error.message });
    }
});

app.put("/update", updateCheck, async (req, res) => {
    try {
        await todo.updateOne({ _id: req.body.id }, { hasCompleted: true });
        res.json({ Msg: "Update Completed" });
    } catch (error) {
        res.status(500).json({ Msg: "Server error", error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on ${port}`);
});
