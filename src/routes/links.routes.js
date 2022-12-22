import { Router } from "express";
import { validateLinks } from "../middlewares/links.middlewares.js";
import { urlShorten } from "../controllers/links.controllers.js";

const router = Router();

router.post("/urls/shorten", validateLinks, urlShorten)

export default router
