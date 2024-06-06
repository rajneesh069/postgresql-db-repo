import pg from "pg";
const { Client } = pg;

//CREATE CLIENT
const client = new Client({
  host: "localhost",
  port: 5432,
  database: "postgres",
  user: "postgres",
  password: "12345",
});

// CREATE TABLE OPERATION
async function createUsersTable() {
  try {
    await client.connect(); // Handle connection errors
    const users = await client.query(`
      CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          username VARCHAR(50) UNIQUE NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `); // Handle SQL query execution errors

    const address = await client.query(`
      CREATE TABLE IF NOT EXISTS addresses(
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL,
      city VARCHAR(100) NOT NULL,
      country VARCHAR(100) NOT NULL,
      street VARCHAR(255) NOT NULL,
      pincode VARCHAR(20) NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE  
      )
      `);
    console.log(users);
    console.log(address);
  } catch (error) {
    console.error("Error occurred:", error);
  } finally {
    await client.end(); // Close the client connection
  }
}

createUsersTable();

//INSERT DATA OPERATION
async function insertUser(email: string, username: string, password: string) {
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

// insertUser("rajneesh@gmail.com", "rajneesh", "123456");

//READ OPERATION
async function getUser(email: string) {
  try {
    await client.connect();
    const searchQuery = "SELECT * FROM users WHERE email=$1";
    const result = await client.query(searchQuery, [email]);
    if (result.rows.length > 0) {
      console.log("User found:", result.rows[0]);
      return result.rows[0];
    } else {
      console.log("No user with input email was found.");
      return null;
    }
  } catch (error) {
    console.error("Error occured:", error);
  } finally {
    await client.end();
  }
}

// getUser("rajneesh@gmail.com");

// UPDATE OPERATION
async function updateUserPassword(email: string, newPassword: string) {
  try {
    await client.connect();
    const updateQuery = "UPDATE users SET password=$1 WHERE email=$2";
    const values = [newPassword, email];
    const res = await client.query(updateQuery, values);
    console.log("Update result:", res);
  } catch (error) {
    console.error("Error occurred:", error);
  } finally {
    await client.end();
  }
}

// Example usage:
// updateUserPassword("rajneesh@gmail.com", "newpassword123");
