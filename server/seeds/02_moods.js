export async function seed(knex) {
  await knex("moods").del();
  await knex("moods").insert([
    { id: 1, user_id: 1, mood: "good", timestamp: "2024-09-01 08:00:00" },
    { id: 2, user_id: 1, mood: "good", timestamp: "2024-09-01 14:00:00" },
    { id: 3, user_id: 1, mood: "meh", timestamp: "2024-09-01 23:30:00" },
    { id: 4, user_id: 1, mood: "rad", timestamp: "2024-09-02 08:00:00" },
    { id: 5, user_id: 1, mood: "bad", timestamp: "2024-09-02 14:00:00" },
    { id: 6, user_id: 1, mood: "good", timestamp: "2024-09-03 23:30:00" },
    { id: 7, user_id: 1, mood: "rad", timestamp: "2024-09-04 07:30:00" },
    { id: 8, user_id: 1, mood: "good", timestamp: "2024-09-05 03:30:00" },
    { id: 9, user_id: 1, mood: "good", timestamp: "2024-09-05 07:30:00" },
    { id: 10, user_id: 1, mood: "good", timestamp: "2024-09-06 07:30:00" },
    { id: 11, user_id: 1, mood: "loved", timestamp: "2024-09-07 18:00:00" },
    { id: 12, user_id: 1, mood: "rad", timestamp: "2024-09-08 17:30:00" },
    { id: 13, user_id: 1, mood: "bad", timestamp: "2024-09-01 19:45:00" },
    { id: 14, user_id: 1, mood: "good", timestamp: "2024-09-03 20:00:00" },
    { id: 15, user_id: 1, mood: "angry", timestamp: "2024-09-01 21:00:00" },
    { id: 16, user_id: 1, mood: "good", timestamp: "2024-09-02 07:30:00" },
  ]);
}
