import express from "express";
import * as openApiController from "../controllers/open-api-controller.js";

const router = express.Router();

router.route("/getMoodInsights")
.post(openApiController.getMoodInsights);

export default router;