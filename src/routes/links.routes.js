import { Router } from "express";
import { validateLinks } from "../middlewares/links.middlewares.js";
import { urlShorten, urlList, openUrl } from "../controllers/links.controllers.js";

const router = Router();

router.post("/urls/shorten", validateLinks, urlShorten)
router.get("/urls/:id", urlList)
router.get("/urls/open/:shortUrl", openUrl)

export default router
