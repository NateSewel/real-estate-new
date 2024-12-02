import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";

//Create user
export const createUser = asyncHandler(async (req, res) => {
  let { email } = req.body;

  //   Check if User exists
  const userExists = await prisma.user.findUnique({ where: { email } });

  if (!userExists) {
    const user = await prisma.user.create({ data: req.body });
    res.send({
      message: "User registered successfully!",
      user: user,
    });
  } else res.status(201).json({ message: "User already registered!" });
});

// Function to Booking a visit to residency
export const bookVisit = asyncHandler(async (req, res) => {
  const { email, date } = req.body;

  const { id } = req.params;

  try {
    const alreadyBooked = await prisma.user.findUnique({
      where: { email },
      select: { bookedVisits: true },
    });
    if (alreadyBooked.bookedVisits.some((visit) => visit.id === id)) {
      res
        .status(400)
        .json({ message: "This residency is already booked by you!" });
    } else {
      await prisma.user.update({
        where: { email },
        data: {
          bookedVisits: { push: { id, date } },
        },
      });
      res.send("Your visit has been booked successfully!");
    }
  } catch (error) {
    throw new Error(error.message);
  }
});

// Function to get all Booking of user
export const allBookings = asyncHandler(async (req, res) => {
  const { email } = req.body;

  try {
    const bookings = await prisma.user.findUnique({
      where: { email },
      select: { bookedVisits: true },
    });
    res.status(200).send(bookings);
  } catch (error) {
    throw new Error(error.message);
  }
});

// Function to cancel booking
export const cancelBooking = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { bookedVisits: true },
    });

    const index = user.bookedVisits.findIndex((visit) => visit.id === id);

    if (index === -1) {
      res.status(404).json({ message: "No Booking found!" });
    } else {
      user.bookedVisits.splice(index, 1);
      await prisma.user.update({
        where: { email },
        data: {
          bookedVisits: user.bookedVisits,
        },
      });

      res.send("Booking cancelled successfully!");
    }
  } catch (error) {
    throw new Error(error.message);
  }
});

// Function to add residency in favourite list
export const toFavList = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { rid } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user.favResidenciesID.includes(rid)) {
      const updateUser = await prisma.user.update({
        where: { email },
        data: {
          favResidenciesID: {
            set: user.favResidenciesID.filter((id) => id !== rid),
          },
        },
      });
      res.send({ message: "Removed from favourites", user: updateUser });
    } else {
      const updateUser = await prisma.user.update({
        where: { email },
        data: {
          favResidenciesID: {
            push: rid,
          },
        },
      });
      res.send({ message: "Updated favourites", user: updateUser });
    }
  } catch (error) {
    throw new Error(error.message);
  }
});

//Function to show all favourite list
export const getAllFavourites = asyncHandler(async (req, res) => {
  const { email } = req.body;

  try {
    const favResd = await prisma.user.findUnique({
      where: { email },
      select: { favResidenciesID: true },
    });
    res.status(200).send(favResd);
  } catch (error) {
    throw new Error(error.message);
  }
});
