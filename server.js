import express from "express";

import { json } from "body-parser";
import { connect, model, Schema } from "mongoose";
import { generate } from "shortid";

const app = express();
app.use(json());
connect("mongodb://localhost/first-card-company", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const Product = model(
  "products",
  new Schema({
    _id: { type: String, default: generate },
    title: String,
    description: String,
    image: String,
    price: Number,
    availableSize: [String],
  })
);
app.get("/api/products", async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});
app.post("/api/products", async (req, res) => {
  const newProduct = new Product(req.body);
  const savedProuct = await newProduct.save();
  res.send(savedProuct);
});
app.delete("/api/products/:id", async (req, res) => {
  const deletedProduct = await Product.findByIdAndDelete(req.params.id);
  res.send(deletedProduct);
});
const port = process.env.PORT || 5000;
app.listen(port, () => console.log("server at http://local:5000"));
