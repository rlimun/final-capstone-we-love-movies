
exports.up = function(knex) {
    return knex.schema.createTable("reviews", (table) => {
        table.increments("review_id").primary(); // Sets supplier_id as the primary key
        table.string("content");
        table.integer("score");
        table.integer("critic_id")
        table
            .foreign("critic_id")
            .references("critic_id")
            .inTable("critics")
            .onDelete("cascade");
        table
            .foreign("review_id")
            .references("review_id")
            .inTable("review")
            .onDelete("cascade");
        table.timestamps(true, true); // Adds created_at and updated_at columns
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable("reviews");
};
