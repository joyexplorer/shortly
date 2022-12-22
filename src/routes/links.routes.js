import { Router } from "express";
import { validateLinks, validateUrl } from "../middlewares/links.middlewares.js";
import { urlShorten, urlList, openUrl, deleteUrls } from "../controllers/links.controllers.js";

const router = Router();

router.post("/urls/shorten", validateLinks, urlShorten)
router.get("/urls/:id", urlList)
router.get("/urls/open/:shortUrl", openUrl)
router.delete("/urls/:id", validateUrl, deleteUrls)

export default router
