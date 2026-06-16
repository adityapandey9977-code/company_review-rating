import express from "express";
import Company from "../models/Company.js";
import Review from "../models/Review.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// Create a company and save the uploaded logo path.
router.post("/", upload.single("logo"), async (req, res) => {
  try {
    const { name, location, city, foundedOn } = req.body;
    const logo = req.file ? `/uploads/${req.file.filename}` : "";

    const company = await Company.create({ name, location, city, foundedOn, logo });
    res.status(201).json(company);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// List companies with simple search, city filter, and sort support.
router.get("/", async (req, res) => {
  try {
    const { city, search, sort } = req.query;
    const filter = {};

    if (city) filter.city = { $regex: city, $options: "i" };
    if (search) filter.name = { $regex: search, $options: "i" };

    // Remove the sort from DB query — we'll sort manually after attaching ratings
    let companies = await Company.find(filter).lean();

    const companiesWithRatings = await Promise.all(
      companies.map(async (company) => {
        const reviews = await Review.find({ companyId: company._id });
        const reviewCount = reviews.length;
        const averageRating = reviewCount
          ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount
          : 0;
        return {
          ...company,
          reviewCount,
          averageRating: Number(averageRating.toFixed(1))
        };
      })
    );

    // Sort on the correct array (companiesWithRatings, not companies)
    if (sort === "average") {
      companiesWithRatings.sort((a, b) => b.averageRating - a.averageRating);
    } else if (sort === "rating") {
      companiesWithRatings.sort((a, b) => b.reviewCount - a.reviewCount);
    } else if (sort === "location") {
      companiesWithRatings.sort((a, b) => a.location.localeCompare(b.location));
    } else {
      // default: name
      companiesWithRatings.sort((a, b) => a.name.localeCompare(b.name));
    }

    res.json(companiesWithRatings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get one company and calculate average rating in easy-to-read JavaScript.
router.get("/:id", async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    const reviews = await Review.find({ companyId: company._id });
    const reviewCount = reviews.length;
    const averageRating = reviewCount
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviewCount
      : 0;

    res.json({
      ...company.toObject(),
      reviewCount,
      averageRating: Number(averageRating.toFixed(1))
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
