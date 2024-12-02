import express from "express";
import {
  allBookings,
  bookVisit,
  cancelBooking,
  createUser,
  toFavList,
  getAllFavourites,
} from "../controllers/userController.js";
import jwtCheck from "../config/auth0Config.js";

const router = express.Router();

// User registration route
router.post("/register", jwtCheck, createUser);
// For Booking a visit to residency
router.post("/bookVisit/:id", bookVisit);
//Get all bookings
router.post("/allBookings", allBookings);
//Cancel Booking
router.post("/removeBooking/:id", cancelBooking);
//Cancel favourite list
router.post("/toFavList/:rid", toFavList);
router.post("/allFav", jwtCheck, getAllFavourites);

export { router as userRoute };
