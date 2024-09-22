import initKnex from "knex";
import configuration from "../knexfile.js";
import moment from "moment-timezone";
const knex = initKnex(configuration);

const getJournals = async (req, res) => {
  const { id } = req.params;
  const { date } = req.query;
  const dateRegex = /^\d{4}-\d{1,2}-\d{1,2}$/;

  if (!date) {
    return res
      .status(400)
      .json({ message: "Date query parameter is required" });
  }  
  if (date && !dateRegex.test(date)) {
    return res.status(400).json({ message: "Invalid date format. Please use YYYY-MM-DD format." });
  }
  try {
    const journalEntry = await knex("journal")
      .where("user_id", id)
      .whereRaw("DATE(timestamp) = ?", [date]);
    res.json(journalEntry);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving journal entry" });
  }
};

const createJournal = async (req, res) => {
  const { user_id, title, content, date } = req.body;
  //Date is not required parameter- added for future implementation of backdated entries
  const timestamp = date
    ? moment.tz(date, "YYYY-MM-DD", "UTC").toDate()
    : new Date();
  try {
    await knex("journal").insert({
      user_id,
      title,
      content,
      timestamp,
    });
    res.status(201).json({ message: "Journal Entry saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error saving journal" });
  }
};

export { getJournals, createJournal };
