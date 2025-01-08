import {
  createTour,
  deleteTour,
  updateTour,
  getTours,
  getATour,
} from "#controllers/agents/index.js";
import { authenticate } from "#middlewares/index.js";
import { Router } from "express";

const router = Router();

router.get("/", authenticate("AGENT"), getTours);
router.get("/:id", authenticate("AGENT"), getATour);
router.post("/", authenticate("AGENT"), createTour);
router.post("/:id", authenticate("AGENT"), updateTour);
router.delete("/:id", authenticate("AGENT"), deleteTour);

export { router as agentsTourRouter };
