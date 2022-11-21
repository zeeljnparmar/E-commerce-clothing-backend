const { Router } = require("express");
const {
  testController,
  register,
  loginController,
} = require("../controllers/user.controller");
const router = Router();

//Testing routes
router.get("/test", testController);
router.post("/register", register);
router.post("/login", loginController);

module.exports = router;
