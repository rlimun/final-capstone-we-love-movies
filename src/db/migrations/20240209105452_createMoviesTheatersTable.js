exports.up = function(knex) {
    return knex.schema.createTable("movies_theaters", (table) => {
        table.boolean("is_showing");
        table.integer("movie_id");
        table.integer("theater_id");
        table
            .foreign("movie_id")
            .references("movie_id")
            .inTable("movies")
            .onDelete("cascade");
        table
            .foreign("theater_id")
            .references("theater_id")
            .inTable("theaters")
            .onDelete("cascade");
        table.timestamps(true, true); // Adds created_at and updated_at columns
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('movies_theaters');
};