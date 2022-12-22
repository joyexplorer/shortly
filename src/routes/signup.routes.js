import { Router } from "express";
import { signIn, signUp } from "../controllers/user.controllers.js";
import { validateUser, validateLogin} from "../middlewares/user.middlewares.js";

const router = Router();

router.post("/signup", validateUser, signUp)
router.post("/signin", validateLogin, signIn)
//router.get("/users/me", userLinks)

export default router