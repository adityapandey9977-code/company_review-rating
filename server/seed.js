import dotenv from "dotenv";
import mongoose from "mongoose";
import Company from "./models/Company.js";
import Review from "./models/Review.js";

dotenv.config();

const companies = [
  {
    name: "Graffersid Web and App Development",
    location: "818, Shekhar Central, Manorama Ganj, AB road, New Palasia, Indore (M.P.)",
    city: "Indore",
    foundedOn: new Date("2016-01-01"),
    logo: ""
  },
  {
    name: "Code Tech Company",
    location: "418, Chetna Apartment, Bhawarkua, Indore (M.P.)",
    city: "Indore",
    foundedOn: new Date("2016-01-01"),
    logo: ""
  },
  {
    name: "Innogent Pvt. Ltd.",
    location: "810, Shekhar Central, Manorama Ganj, AB road, New Palasia, Indore (M.P.)",
    city: "Indore",
    foundedOn: new Date("2015-01-01"),
    logo: ""
  },
  {
    name: "Pixel Web and App Development",
    location: "410, Bansi Trade Center, Indore (M.P.)",
    city: "Indore",
    foundedOn: new Date("2010-01-01"),
    logo: ""
  }
];

const reviews = [
  {
    fullName: "Jorgue Watson",
    subject: "Helpful team",
    reviewText:
      "Graffersid one of the best Company dolor sit amet, consectetur adipiscing elit. Congue netus feugiat elit suspendisse commodo.",
    rating: 5,
    likes: 8
  },
  {
    fullName: "Jenny kole",
    subject: "Good development partner",
    reviewText:
      "Graffersid one of the best Company dolor sit amet, consectetur adipiscing elit suspendisse commodo.",
    rating: 4,
    likes: 4
  },
  {
    fullName: "Ayush Patel",
    subject: "Great app development",
    reviewText: "Graffersid one of the best Company in App Development.",
    rating: 5,
    likes: 2
  }
];

async function seedDatabase() {
  await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/review-and-rate");
  await Company.deleteMany({});
  await Review.deleteMany({});

  const createdCompanies = await Company.insertMany(companies);
  const firstCompany = createdCompanies[0];

  await Review.insertMany(reviews.map((review) => ({ ...review, companyId: firstCompany._id })));
  console.log("Seed data added successfully");
  await mongoose.disconnect();
}

seedDatabase().catch((error) => {
  console.error(error);
  process.exit(1);
});
