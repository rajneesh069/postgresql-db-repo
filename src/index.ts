const { Client } = require("pg");

const client = new Client({
  connectionString: "postgresql://postgres:12345@localhost/postgres",
});

client.connect();

async function createUsersTable() {
  const result = await client.query(`
    CREATE TABLE users1 (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log(result);
}

createUsersTable();
