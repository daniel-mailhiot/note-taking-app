import express from "express";

const router = express.Router();

// Temp test route
router.get("/", (req, res) => {
  res.send("Notes route is working");
});

export default router;
