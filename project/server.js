const express = require("express");
const path = require("path");

const app = express();

// 讓 public 可以被讀取（前端）
app.use(express.static("public"));
app.use(express.json());

// 模擬商品資料（遊戲帳號）
let accounts = [
  { id: 1, name: "Valorant 高段帳號", price: 1200 },
  { id: 2, name: "LOL 菁英帳號", price: 2000 },
  { id: 3, name: "原神高練度帳號", price: 3500 }
];

// 取得商品
app.get("/api/accounts", (req, res) => {
  res.json(accounts);
});

// 模擬下單
app.post("/api/buy", (req, res) => {
  const { id } = req.body;
  const item = accounts.find(a => a.id === id);

  if (!item) return res.status(404).send("找不到商品");

  // 👉 這裡之後可以接綠界
  res.json({
    message: "購買成功（測試版）",
    account: "demo_account_123",
    password: "demo_password_456"
  });
});

// Render 用
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("server running on port", PORT);
});