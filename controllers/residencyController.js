import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";

export const createResidency = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    price,
    address,
    country,
    city,
    facilities,
    image,
    userEmail,
  } = req.body.data;

  try {
    const residency = await prisma.residency.create({
      data: {
        title,
        description,
        price,
        country,
        address,
        city,
        facilities,
        image,
        owner: { connect: { userEmail: email}},
      },
    });
    res.send({ message: "Residency created successfully!", residency });
  } catch (error) {
    if (error.code === "P2002") {
      throw new Error("A residency with that address already registered");
    }
    throw new Error(error.message);
  }
});

// Function for getting all the residencies available in our Database
export const getAllResidencies = asyncHandler(async (req, res) => {
  try {
    const residencies = await prisma.residency.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    res.status(200).send(residencies);
  } catch (error) {
    console.error("Error fetching residencies:", error);
    res.status(500).send({ message: "Failed to fetch residencies" });
  }
});

// Function for getting a particular residence available in our Database
export const getResidency = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const residency = await prisma.residency.findUnique({
      where: { id },
    });
    res.send(residency);
  } catch (error) {
    throw new Error(error.message);
  }
});
