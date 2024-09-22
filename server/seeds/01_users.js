export async function seed(knex) {
  await knex("users").del();
  await knex("users").insert([
    {
      id: 1,
      name: "Jane Doe",
      email: "Jane@test.com",
      password: "$$2a$10$aH65oqVk9YCUnqzSVtbqTuTR0u5tVaXs3BmnQvySqOyfNZFonKveO",
    }, // password: Password@123    
  ]);
}
