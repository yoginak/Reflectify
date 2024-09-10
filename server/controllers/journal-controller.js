import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

const getJournals = async (req, res) => {
    const { id } = req.params;
  const { date } = req.query;
  if (!date) {
    return res
      .status(400)
      .json({ message: "Date query parameter is required" });
  }
  try {
    const journalEntry = await knex('journal')
      .where('user_id', id)
      .whereRaw('DATE(timestamp) = ?', [date]) 
      console.log(journalEntry)    

      res.json(journalEntry);
    
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving journal entry' });
  }
}

export {getJournals}