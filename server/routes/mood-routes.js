import express from "express";
import * as moodController from "../controllers/mood-controller.js";

const router = express.Router();

router.route("/:id")
.get(moodController.getMoods);

export default router;