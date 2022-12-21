import { Router } from "express";
import { signIn, signUp } from "../controllers/signup.controllers.js";
import { validateLogin, validateUser } from "../middlewares/signup.middlewares.js";

const router = Router();

router.post("/signup", validateUser, signUp)
router.post("/signin", signIn)
router.post("/signin", validateLogin, signIn)
//router.get("/users/me", userLinks)

export default router