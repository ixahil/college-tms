import { getAllTours, getTourById } from "#controllers/tours/index.js";
import { Router } from "express";

const router = Router();

router.get("/", getAllTours);
router.get("/:id", getTourById);

export { router as toursRouter };
