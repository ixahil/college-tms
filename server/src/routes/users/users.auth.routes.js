import { Router } from "express";
import { register, login, logout } from "#controllers/users/index.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);

export { router as usersAuthRouter };
