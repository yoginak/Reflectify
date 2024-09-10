import initKnex from "knex";
import configuration from "../knexfile.js";
import moment from "moment-timezone";
const knex = initKnex(configuration);

// const getMoods = async (req, res) => {
//   const { id } = req.params;
//   const { date } = req.query;
//   if (!date) {
//     return res
//       .status(400)
//       .json({ message: "Date query parameter is required" });
//   }
//   try {
//     const moodEntries = await knex("moods")
//       .where("user_id", id)
//       .whereRaw("DATE(timestamp) = ?", [date]);
//     res.json(moodEntries);
//   } catch (error) {
//     res.status(500).json({ message: "Error retrieving mood entry" });
//   }
// };

const createMoods = async (req, res) => {
  const { user_id, mood, date } = req.body;
  //Date is not required parameter- added for future implementation of backdated entries
  const timestamp = date
    ? moment.tz(date, "YYYY-MM-DD", "UTC").toDate()
    : new Date();
  try {
    await knex("moods").insert({
      user_id,
      mood,
      timestamp,
    });
    res.status(201).json({ message: "Mood Entry saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error saving mood" });
  }
};

const getMoods = async (req, res) => {
  const { id } = req.params;
  const { date } = req.query;
  
  const dateRegex = /^\d{4}-\d{1,2}-\d{1,2}$/;

  if (date && !dateRegex.test(date)) {
    return res.status(400).json({ message: "Invalid date format. Please use YYYY-MM-DD format." });
  }
  try {
    if (date) {
      // Fetch mood entries by specific date
      const moodEntries = await knex("moods")
        .where("user_id", id)
        .whereRaw("DATE(timestamp) = ?", [date]);
      res.json(moodEntries);
    } else {
      // Fetch all mood entries for the user
      const moodEntries = await knex("moods").where("user_id", id);
      res.json(moodEntries);
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving mood entries" });
  }
};

export { getMoods, createMoods};
