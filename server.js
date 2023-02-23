import express from "express";
import * as paypal from "./paypal.js";

const app = express();
app.use(express.static("public"));

app.post("/api/orders", async (req, res) => {
    const order= await paypal.createOrder();
    res.json(order);
});
app.post("/api/orders/:orderID/capture", async (req, res) => {
    const { orderID } = req.params;
    const captureData = await paypal.capturePAyment(orderID);
    res.json(captureData);
});

app.listen(3000);