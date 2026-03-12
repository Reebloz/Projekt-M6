# Recipe Website Starter

A basic full-stack recipe website starter with:

- Landing page (`HTML` + `CSS`)
- Node.js + Express server
- SQLite database for saving recipes

## Recipe Fields

- `id`
- `name`
- `description`
- `ingredients`
- `howToMake`

## Run

1. Install node.js
2. Open a terminal in this folder.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start server:
   ```bash
   npm start
   ```
5. Open `http://localhost:3000`

## API

- `GET /api/recipes` - list all recipes
- `GET /api/recipes/:id` - get one recipe by id
- `POST /api/recipes` - create recipe
