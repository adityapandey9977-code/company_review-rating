import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true
  },
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  subject: {
    type: String,
    required: true,
    trim: true
  },
  reviewText: {
    type: String,
    required: true,
    trim: true
  },
  reviewerPhoto: {
    type: String,
    default: ""
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Review", reviewSchema);
