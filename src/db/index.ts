import pg from "pg";
const { Client } = pg;

async function createUsersTable() {
  const client = new Client({
    connectionString: "postgresql://postgres:12345@localhost/postgres",
  });

  try {
    await client.connect(); // Handle connection errors
    const result = await client.query(`
      CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          username VARCHAR(50) UNIQUE NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `); // Handle SQL query execution errors
    console.log(result);
  } catch (error) {
    console.error("Error occurred:", error);
  } finally {
    await client.end(); // Close the client connection
  }
}

createUsersTable();

async function insertIntoUsersTable(
  email: string,
  username: string,
  password: string
) {
  const client = new Client({
    host: "localhost",
    port: 5432,
    database: "postgres",
    user: "postgres",
    password: "12345",
  });

  try {
    await client.connect();
    const insertQuery =
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)";
    const values = [username, email, password];
    const res = await client.query(insertQuery, values);
    console.log("result:", res);
  } catch (error) {
    console.error("Error occured:", error);
  } finally {
    await client.end();
  }
}

insertIntoUsersTable("rajneesh@gmail.com", "rajneesh", "123456");
