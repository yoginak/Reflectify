export function up(knex) {
  return knex.schema.createTable("moods", (table) => {
    table.increments("id");
    table
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.string("mood").notNullable();
    table.timestamp("timestamp").defaultTo(knex.fn.now());
  });
}

export function down(knex) {
  return knex.schema.dropTable("moods");
}
