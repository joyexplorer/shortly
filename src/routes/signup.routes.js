import { Router } from "express";
import { signUp } from "../controllers/signup.controllers.js";
import { validateUser } from "../middlewares/signup.middlewares.js";

const router = Router();

router.post("/signup", validateUser, signUp)
//router.post("/signin", signIn)
//router.get("/users/me", getUserLinks)

export default router