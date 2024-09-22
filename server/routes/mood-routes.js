import express from "express";
import * as moodController from "../controllers/mood-controller.js";

const router = express.Router();

router.route("/:id")
.get(moodController.getMoods);

router.route("/")
.post(moodController.createMoods);

export default router;