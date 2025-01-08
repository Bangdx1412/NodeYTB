import express from "express";
// framework
const app = express();

// data fake
const data = [
    { id: 1, name: "Product A", price: 100 },
    { id: 2, name: "Product B", price: 200 },
    { id: 3, name: "Product C", price: 300 },
    { id: 4, name: "Product D", price: 400 },
];

app.get("/products", (req, res) => {
    res.json(data);
});
export const viteNodeApp = app;
