import express from "express";
import * as journalController from "../controllers/journal-controller.js";

const router = express.Router();
router.route("/:id")
.get(journalController.getJournals);

export default router;