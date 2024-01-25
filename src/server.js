const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3001;

app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "ltvlhk1504###***",
  database: "noteapp",
});

db.connect((err) => {
  if (err) {
    console.error("MySQL connection error: ", err);
  } else {
    console.log("Connected to MySQL");
  }
});

// Routes
app.get("/api/v1/notes/:id", (req, res) => {
  const noteId = req.params.id;

  db.query("SELECT * FROM notes WHERE id = ?", [noteId], (error, results) => {
    if (error) {
      console.error("MySQL query error: ", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (results.length === 0) {
        res.status(404).json({ error: "Note not found" });
      } else {
        res.status(200).json(results[0]);
      }
    }
  });
});

app.get("/api/v1/notes", (req, res) => {
  db.query("SELECT * FROM notes", (error, results) => {
    if (error) {
      console.error("MySQL query error: ", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.status(200).json(results);
    }
  });
});

app.post("/api/v1/notes", (req, res) => {
  const { title, content } = req.body;

  db.query(
    "INSERT INTO notes (title, content) VALUES (?, ?)",
    [title, content],
    (error, results) => {
      if (error) {
        console.error("MySQL query error: ", error);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        const newNoteId = results.insertId;
        res.status(201).json({ id: newNoteId, title, content });
      }
    }
  );
});

app.patch("/api/v1/notes/:id", (req, res) => {
  const noteId = req.params.id;
  const { title, content } = req.body;

  db.query(
    "UPDATE notes SET title = ?, content = ? WHERE id = ?",
    [title, content, noteId],
    (error) => {
      if (error) {
        console.error("MySQL query error: ", error);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.sendStatus(204);
      }
    }
  );
});

app.delete("/api/v1/notes/:id", (req, res) => {
  const noteId = req.params.id;

  db.query("DELETE FROM notes WHERE id = ?", [noteId], (error) => {
    if (error) {
      console.error("MySQL query error: ", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.sendStatus(204);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
