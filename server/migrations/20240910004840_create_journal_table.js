export function up(knex) {
  return knex.schema.createTable("journal", (table) => {
    table.increments("id");
    table
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.string("title").notNullable();
    table.text("content").notNullable();
    table.timestamp("timestamp").defaultTo(knex.fn.now());
  });
}

export function down(knex) {
  return knex.schema.dropTable("journal");
}
