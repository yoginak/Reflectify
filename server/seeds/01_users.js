export async function seed(knex) {
  await knex("users").del();
  await knex("users").insert([
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      password: "$2b$10$3xUQeZwTRg9FZnnK1XvwMO5FnO7Phecm1aHG90wVviqQGv8bzyt62",
    }, // password: alice123
    {
      id: 2,
      name: "Bob Smith",
      email: "bob@example.com",
      password: "$2b$10$JzWy1HtFqvZe5UpgEzUSb.juVjOYAPd58D7/nUNyo7xvbmTz5WZy2",
    }, // password: bob123
    {
      id: 3,
      name: "Charlie Brown",
      email: "charlie@example.com",
      password: "$2b$10$5UqvGR8mChHRv.TzkF/qxuqKDb6wJ5d7rTC8IYq9Hqr5FnTD9fN/i",
    }, // password: charlie123
  ]);
}
