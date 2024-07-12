const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");

// Hiển thị trang login
router.get("/", function (req, res) {
  res.render("login");
});

// Xử lý đăng nhập

router.get("/home", (req, res) => {
  console.log("vao thanh cong");
  res.render("home");
});

module.exports = router;
