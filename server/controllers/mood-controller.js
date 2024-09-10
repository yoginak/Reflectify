import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

const getMoods = async (req, res) => {
  const { id } = req.params;
  const { date } = req.query;
  if (!date) {
    return res
      .status(400)
      .json({ message: "Date query parameter is required" });
  }
  try {
    const moodEntries = await knex("moods")
      .where("user_id", id)
      .whereRaw("DATE(timestamp) = ?", [date]);
    res.json(moodEntries);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving mood entry" });
  }
};

export { getMoods };
