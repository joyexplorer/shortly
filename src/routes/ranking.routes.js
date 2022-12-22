import { Router } from "express";
import { getRanking } from "../controllers/ranking.controllers.js";

const router = Router();

router.get("/ranking", getRanking)

export default router
