const recipesList = document.getElementById("recipes-list");
const refreshBtn = document.getElementById("refresh-btn");

async function loadRecipes() {
    recipesList.innerHTML = "<p>Loading recipes...</p>";

    try {
        const response = await fetch("/api/recipes");
        const recipes = await response.json();

        if (!Array.isArray(recipes) || recipes.length === 0) {
            recipesList.innerHTML = "<p>No recipes saved yet. Visit Manage Recipes to add your first one.</p>";
            return;
        }

        recipesList.innerHTML = recipes
            .map(
                (recipe) => `
                <article class="recipe-item">
                    <h3>#${recipe.id} - ${escapeHtml(recipe.name)}</h3>
                    <p class="recipe-meta">${escapeHtml(recipe.description)}</p>
                    <p><strong>Ingredients:</strong> ${escapeHtml(recipe.ingredients)}</p>
                    <p><strong>How to make:</strong> ${escapeHtml(recipe.howToMake)}</p>
                </article>
                `
            )
            .join("");
    } catch (error) {
        recipesList.innerHTML = "<p>Could not load recipes right now.</p>";
    }
}

function escapeHtml(text) {
    return String(text ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

refreshBtn.addEventListener("click", loadRecipes);

loadRecipes();
