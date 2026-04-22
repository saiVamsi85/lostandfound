const router = require("express").Router();
const { register, login } = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.get("/me", require("../middleware/authMiddleware"), async (req, res) => {
  res.json(req.user);
});

module.exports = router;
