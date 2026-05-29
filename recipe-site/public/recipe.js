const recipeName = document.getElementById("recipe-name");
const recipeDescription = document.getElementById("recipe-description");
const recipeMeta = document.getElementById("recipe-meta");
const recipeIngredients = document.getElementById("recipe-ingredients");
const recipeMethod = document.getElementById("recipe-method");

const params = new URLSearchParams(window.location.search);
const recipeId = Number(params.get("id"));

if (!Number.isInteger(recipeId) || recipeId <= 0) {
    renderError("Invalid recipe link.");
} else {
    loadRecipe(recipeId);
}

async function loadRecipe(id) {
    try {
        const response = await fetch(`/api/recipes/${id}`);

        if (!response.ok) {
            const result = await response.json().catch(() => ({}));
            throw new Error(result.error || "Could not load recipe.");
        }

        const recipe = await response.json();

        document.title = `Fresh Table | ${recipe.name}`;
        recipeName.textContent = recipe.name;
        recipeDescription.textContent = recipe.description;
        recipeMeta.textContent = `Recipe #${recipe.id} • Added ${formatDate(recipe.createdAt)}`;
        recipeIngredients.textContent = recipe.ingredients;
        recipeMethod.innerHTML = formatSteps(recipe.howToMake);
    } catch (error) {
        renderError(error.message);
    }
}

function renderError(message) {
    recipeName.textContent = "Recipe not found";
    recipeDescription.textContent = message;
    recipeMeta.textContent = "";
    recipeIngredients.textContent = "";
    recipeMethod.textContent = "";
}

function formatSteps(text) {
    const steps = String(text ?? "")
        .split(/\n+/)
        .map((line) => line.trim())
        .filter(Boolean);

    if (steps.length === 0) {
        return "<p>No method provided.</p>";
    }

    if (steps.length === 1) {
        return `<p>${escapeHtml(steps[0])}</p>`;
    }

    return `<ol class="detail-list">${steps.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}</ol>`;
}

function formatDate(value) {
    if (!value) {
        return "unknown date";
    }

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return "unknown date";
    }

    return new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric"
    }).format(date);
}

function escapeHtml(text) {
    return String(text ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}
