require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(express.json());



// Connect to Aiven MySQL
const db = mysql.createConnection({
  host: "mysql-7bbc9b5-drishya3507-4d83.c.aivencloud.com",
  port: 16881,
  user: "avnadmin",
  password: process.env.DB_PASSWORD,
  database: "defaultdb",
  ssl: {
  rejectUnauthorized: false
}
  
});

db.connect((err) => {
  if(err) {
    console.error("Connection failed:", err);
    return;
  }
  console.log("MySQL Connected ✅");

  // Create table
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS contacts (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255),
      email VARCHAR(255),
      message TEXT,
      status VARCHAR(50) DEFAULT 'Unread'
    );
  `;

  db.query(createTableSQL, (err) => {
    if(err) {
      console.error("Table creation failed:", err);
    } else {
      console.log("Table created ✅");
    }
    // db.end(); // <-- optional, keep connection open for app
  });
});

app.get("/messages", (req, res) => {
  const sql = "SELECT * FROM contacts";

  db.query(sql, (err, result) => {
    if (err) {
      res.json([]);
    } else {
      res.json(result);
    }
  });
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;

  const sql = "DELETE FROM contacts WHERE id = ?";

  db.query(sql, [id], (err) => {
    if (err) {
      console.log(err);
      res.send("Error deleting ❌");
    } else {
      res.send("Deleted successfully ✅");
    }
  });
});

app.put("/mark-read/:id", (req, res) => {
  const id = req.params.id;

  const sql = "UPDATE contacts SET status = 'Read' WHERE id = ?";

  db.query(sql, [id], (err) => {
    if (err) {
      console.log(err);
      res.send("Error updating ❌");
    } else {
      res.send("Marked as read ✅");
    }
  });
});

app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;
  const sql = "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)";
  db.query(sql, [name, email, message], (err) => {
    if(err) return res.send("Error saving message ❌");
    res.send("Message saved successfully ✅");
  });
});


// 🚀 SERVER START
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running");
});

app.get("/", (req, res) => {
  res.send("Portfulio website backend is running.🚀");
});                                                                                                                 