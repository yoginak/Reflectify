import express from "express";
import * as openApiController from "../controllers/open-api-controller.js";

const router = express.Router();

router.route("/getMoodInsights")
.post(openApiController.getMoodInsights);

router.route("/getTherapistInsights")
.post(openApiController.getTherapistInsights);

export default router;