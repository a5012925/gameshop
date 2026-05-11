const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());
app.use(express.static("public"));

// MongoDB 連線
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB error:", err));

// 商品模型
const Product = mongoose.model("Product", {
  game: String,
  price: Number,
  account: String,
  password: String,
  status: { type: String, default: "on" }
});

//  取得所有商品（後台 + 前台共用）
app.get("/api/products", async (req, res) => {
  const data = await Product.find();
  res.json(data);
});

//  新增商品（後台）
app.post("/admin/add", async (req, res) => {
  try {
    const newItem = await Product.create(req.body);
    res.json(newItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//  下架商品（後台）
app.post("/admin/off", async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.body.id, { status: "off" });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//  基本安全：避免直接暴露 server
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// 啟動伺服器（Render 必備寫法）
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("server running on port", PORT);
});
