const path = require("path");

require("dotenv").config();

const {
  DATABASE_URL = "postgres://rlimun:7h12MLMuM4UZHzIHXJVUjR139ba7UF63@dpg-cn1geunqd2ns73dlc510-a.oregon-postgres.render.com/backend_deployment_gzw4?ssl=true",
} = process.env;

module.exports = {
  development: {
    client: "postgresql",
    connection: DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    pool: { min: 0, max: 5 },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
  },

  production: {
    client: "postgresql",
    connection: DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    pool: { min: 0, max: 5 },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
  },

  test: {
    client: "sqlite3",
    connection: {
      filename: ":memory:",
    },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    useNullAsDefault: true,
  },
};
