import { Router } from "express";
import { getLinks, signIn, signUp } from "../controllers/user.controllers.js";
import { validateUser, validateLogin, validateHeader} from "../middlewares/user.middlewares.js";

const router = Router();

router.post("/signup", validateUser, signUp)
router.post("/signin", validateLogin, signIn)
router.get("/users/me", validateHeader,getLinks)

export default router