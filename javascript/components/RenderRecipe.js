class RenderRecipe extends HTMLElement {
	constructor() {
		super();

		this.recipeData = JSON.parse(localStorage.getItem("recipe"));
	}

	connectedCallback() {
		this.initElements();
		this.renderGeneralInfo();
		this.renderIngredients();
		this.renderSteps();
	}

	initElements() {
		this.ingredientsList = this.querySelector(".b-ingredients-list");
		console.log(this.ingredientsList);
	}

	renderGeneralInfo() {
		this.recipeData.ingredients.forEach((ingredient) => {
			const ingredientItem = document.createElement("li");
			ingredientItem.classList.add("b-ingredients-list-item");
			ingredientItem.innerText = ingredient;

			this.ingredientsList.appendChild(ingredientItem);
		});
	}

	renderIngredients() {}

	renderSteps() {}
}

customElements.define("js-render-recipe", RenderRecipe);
