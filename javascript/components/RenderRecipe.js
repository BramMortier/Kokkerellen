class RenderRecipe extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.renderGeneralInfo();
		this.renderIngredients();
		this.renderSteps();
	}

	renderGeneralInfo() {}

	renderIngredients() {}

	renderSteps() {}
}

customElements.define("js-render-recipe", RenderRecipe);
