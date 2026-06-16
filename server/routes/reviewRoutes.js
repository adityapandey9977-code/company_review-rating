import express from "express";
import upload from "../middleware/upload.js";
import Review from "../models/Review.js";

const router = express.Router();

// Add a review for a company.
router.post("/", upload.single("reviewerPhoto"), async (req, res) => {
  try {
    const reviewerPhoto = req.file ? `/uploads/${req.file.filename}` : "";
    const review = await Review.create({ ...req.body, reviewerPhoto });
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// List reviews for one company with date or rating sorting.
router.get("/:companyId", async (req, res) => {
  try {
    const sortOption = req.query.sort === "rating" ? { rating: -1 } : { createdAt: -1 };
    const reviews = await Review.find({ companyId: req.params.companyId }).sort(sortOption);
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Like a review by incrementing its count.
router.patch("/:id/like", async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
