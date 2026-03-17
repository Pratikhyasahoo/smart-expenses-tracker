// routes/predictRoutes.js
const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const { predictSpending } = require("../controllers/predictController");

router.get("/", auth, predictSpending);

module.exports = router;