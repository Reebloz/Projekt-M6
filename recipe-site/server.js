const path = require("path");
const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const PORT = process.env.PORT || 3000;
const dbPath = path.join(__dirname, "recipes.db");
const db = new sqlite3.Database(dbPath);

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Create the recipes table on startup if it does not exist.
db.serialize(() => {
    db.run(
        `CREATE TABLE IF NOT EXISTS recipes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      ingredients TEXT NOT NULL,
      howToMake TEXT NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )`
    );
});

app.get("/api/recipes", (req, res) => {
    db.all(
        "SELECT id, name, description, ingredients, howToMake, createdAt FROM recipes ORDER BY id DESC",
        [],
        (err, rows) => {
            if (err) {
                return res.status(500).json({ error: "Could not fetch recipes." });
            }
            res.json(rows);
        }
    );
});

app.get("/api/recipes/:id", (req, res) => {
    const recipeId = Number(req.params.id);

    db.get(
        "SELECT id, name, description, ingredients, howToMake, createdAt FROM recipes WHERE id = ?",
        [recipeId],
        (err, row) => {
            if (err) {
                return res.status(500).json({ error: "Could not fetch recipe." });
            }
            if (!row) {
                return res.status(404).json({ error: "Recipe not found." });
            }
            res.json(row);
        }
    );
});

app.post("/api/recipes", (req, res) => {
    const { name, description, ingredients, howToMake } = req.body;

    if (!name || !description || !ingredients || !howToMake) {
        return res.status(400).json({
            error: "name, description, ingredients, and howToMake are required."
        });
    }

    db.run(
        "INSERT INTO recipes (name, description, ingredients, howToMake) VALUES (?, ?, ?, ?)",
        [name.trim(), description.trim(), ingredients.trim(), howToMake.trim()],
        function insertCallback(err) {
            if (err) {
                return res.status(500).json({ error: "Could not save recipe." });
            }

            res.status(201).json({
                id: this.lastID,
                name,
                description,
                ingredients,
                howToMake
            });
        }
    );
});

app.delete("/api/recipes/:id", (req, res) => {
    const recipeId = Number(req.params.id);

    if (!Number.isInteger(recipeId) || recipeId <= 0) {
        return res.status(400).json({ error: "Invalid recipe id." });
    }

    db.run("DELETE FROM recipes WHERE id = ?", [recipeId], function deleteCallback(err) {
        if (err) {
            return res.status(500).json({ error: "Could not delete recipe." });
        }

        if (this.changes === 0) {
            return res.status(404).json({ error: "Recipe not found." });
        }

        res.status(204).send();
    });
});

app.listen(PORT, () => {
    console.log(`Recipe site server running on http://localhost:${PORT}`);
});
