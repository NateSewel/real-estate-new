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

  // Check if userEmail is provided
  if (!userEmail) {
    return res.status(400).send({ message: "User email is required" });
  }

  // Check if the user exists
  const user = await prisma.user.findUnique({
    where: { email: userEmail },
  });

  if (!user) {
    return res
      .status(400)
      .send({ message: "User with the provided email does not exist" });
  }

  try {
    const residency = await prisma.residency.create({
      data: {
        title,
        description,
        price,
        address,
        country,
        city,
        facilities,
        image,
        userEmail,
        owner: { connect: { email: userEmail } },
      },
    });
    res.send({ message: "Residency created successfully!", residency });
  } catch (error) {
    console.error("Error creating residency:", error);
    res
      .status(500)
      .send({ message: "Failed to create residency", error: error.message });
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
