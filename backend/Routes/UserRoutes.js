const express = require("express");
const {
  registerUser,
  authUser,
  updateUser,
} = require("../controllers/userControl");
const { protect } = require("../Middlewares/authMiddleware");
const router = express.Router();

router.route("/").post(registerUser);
router.route("/login").post(authUser);
router.route("/update").post(protect, updateUser);

module.exports = router;
