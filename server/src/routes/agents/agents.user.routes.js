import { getAgentById } from "#controllers/agents/index.js";
import { authenticate } from "#middlewares/index.js";
import { Router } from "express";

const router = Router();

router.get("/:id", authenticate("AGENT"), getAgentById);

export { router as agentsUserRouter };
