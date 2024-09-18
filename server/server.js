import express from "express";
import "dotenv/config";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());

import moodRoutes from "./routes/mood-routes.js";
import journalRoutes from "./routes/journal-routes.js";
import authRoutes from "./routes/auth-routes.js";
import openApiRoutes from "./routes/open-api-routes.js"

// all mood routes
app.use("/moods", moodRoutes);

// all journal routes
app.use("/journal", journalRoutes);

// all auth routes
app.use("/auth", authRoutes);

// all openApi routes
app.use("/openApi", openApiRoutes);

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
    console.log(`running at http://localhost:${PORT}`);
  });