export function up(knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id");
    table.string("name").notNullable();
    table.string("email").notNullable().unique();
    table.string("password").notNullable();
  });
}

export function down(knex) {
  return knex.schema.dropTable("users");
}
