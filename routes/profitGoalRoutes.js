const express = require("express");
const router = express.Router();
const profitGoalController = require("../controllers/profitGoalController");
const { authenticateUser } = require("../middleware/authMiddleware");

router.get("/", authenticateUser, profitGoalController.getAllProfitGoals);
router.post("/", authenticateUser, profitGoalController.createProfitGoal);

module.exports = router;
