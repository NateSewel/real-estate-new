import express from "express";
import {
  getAllBookings,
  bookVisit,
  cancelBooking,
  createUser,
  toFav,
  getAllFavourites,
} from "../controllers/userController.js";
import jwtCheck from "../config/auth0Config.js";

const router = express.Router();

// User registration route
router.post("/register", jwtCheck, createUser);
// For Booking a visit to residency
router.post("/bookVisit/:id", bookVisit);
//Get all bookings
router.post("/allBookings", getAllBookings);
//Cancel Booking
router.post("/removeBooking/:id", cancelBooking);
//Cancel favourite list
router.post("/toFav/:rid", toFav);
router.post("/allFav", getAllFavourites);

export { router as userRoute };
