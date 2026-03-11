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
1. Open a terminal in this folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start server:
   ```bash
   npm start
   ```
4. Open `http://localhost:3000`

## API
- `GET /api/recipes` - list all recipes
- `GET /api/recipes/:id` - get one recipe by id
- `POST /api/recipes` - create recipe
