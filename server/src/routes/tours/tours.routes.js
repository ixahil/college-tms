import {
  getAllTours,
  getTourById,
  getAllFeaturedTours,
  getAllInternationTours,
  getCitiesNStates,
} from "#controllers/tours/index.js";
import { Router } from "express";

const router = Router();

router.get("/", getAllTours);
router.get("/featured", getAllFeaturedTours);
router.get("/international", getAllInternationTours);
router.get("/cities-states", getCitiesNStates);
router.get("/:id", getTourById);

export { router as toursRouter };
