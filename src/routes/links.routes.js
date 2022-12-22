import { Router } from "express";
import { validateLinks } from "../middlewares/links.middlewares.js";
import { urlShorten, urlList } from "../controllers/links.controllers.js";

const router = Router();

router.post("/urls/shorten", validateLinks, urlShorten)
router.get("/urls/:id", urlList)

export default router
