const recipeForm = document.getElementById("recipe-form");
const formMessage = document.getElementById("form-message");
const recipesList = document.getElementById("recipes-list");
const refreshBtn = document.getElementById("refresh-btn");

async function loadRecipes() {
    recipesList.innerHTML = "<p>Loading recipes...</p>";

    try {
        const response = await fetch("/api/recipes");
        const recipes = await response.json();

        if (!Array.isArray(recipes) || recipes.length === 0) {
            recipesList.innerHTML = "<p>No recipes saved yet. Add your first one.</p>";
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

recipeForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    formMessage.textContent = "Saving...";

    const formData = new FormData(recipeForm);
    const payload = {
        name: formData.get("name")?.toString().trim(),
        description: formData.get("description")?.toString().trim(),
        ingredients: formData.get("ingredients")?.toString().trim(),
        howToMake: formData.get("howToMake")?.toString().trim()
    };

    try {
        const response = await fetch("/api/recipes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.error || "Could not save recipe.");
        }

        recipeForm.reset();
        formMessage.textContent = `Saved recipe #${result.id}.`;
        await loadRecipes();
    } catch (error) {
        formMessage.textContent = error.message;
    }
});

refreshBtn.addEventListener("click", loadRecipes);

function escapeHtml(text) {
    return text
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

