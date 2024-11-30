import { formDataToJson } from "../utils.js";

class RecipeForm extends HTMLFormElement {
	constructor() {
		super();

		this.previewfileReader = new FileReader();
		this.fileReader = new FileReader();

		this.recipeData = {};
	}

	connectedCallback() {
		this.initElements();
		this.initEvents();
	}

	initElements() {
		this.ingredientsList = this.querySelector(".c-ingredients-list");
		this.addIngredientButton = this.querySelector("#add-ingredient");

		this.stepsList = this.querySelector(".c-steps-list");
		this.addStepButton = this.querySelector("#add-step");

		this.thumbnailInput = this.querySelector("#thumbnail");
		this.thumbnailPreview = this.querySelector("#thumbnail-preview");
	}

	initEvents() {
		this.addIngredientButton.addEventListener("click", () => this.addIngredient());
		this.addStepButton.addEventListener("click", () => this.addStep());
		this.thumbnailInput.addEventListener("change", () => this.renderThumbnailPreview());

		this.addEventListener("submit", (event) => this.renderRecipe(event));
	}

	renderThumbnailPreview() {
		const thumbnail = this.thumbnailInput.files[0];

		if (!thumbnail) return;

		this.previewfileReader.addEventListener("load", (event) => {
			this.thumbnailPreview.src = event.target.result;
		});

		this.previewfileReader.readAsDataURL(thumbnail);
	}

	renderRecipe(event) {
		event.preventDefault();

		const formData = new FormData(this);
		this.recipeData = formDataToJson(formData);

		this.fileReader.addEventListener("load", () => {
			this.recipeData.thumbnail = this.fileReader.result;
			localStorage.setItem("recipe", JSON.stringify(this.recipeData));
		});

		this.fileReader.readAsDataURL(formData.get("thumbnail"));

		window.location.href = "recipe.html";
	}

	addIngredient() {
		const ingredientItem = document.createElement("li");
		ingredientItem.classList.add("c-ingredients-item");
		ingredientItem.innerHTML = `
            <div class="c-input c-input-ingredient">
                <input type="text" name="ingredients[]" placeholder="Ingrediënt">
            </div>

            <button type="button" class="c-button c-button-remove">verwijder</button>
        `;

		this.ingredientsList.appendChild(ingredientItem);
	}

	addStep() {
		const stepItem = document.createElement("li");
		stepItem.classList.add("c-step-item");
		stepItem.innerHTML = `
            <div class="c-input c-input-step">
                <input type="text" name="steps[]" placeholder="Beschrijving">
            </div>

            <button type="button" class="c-button c-button-remove">verwijder</button>
        `;

		this.stepsList.appendChild(stepItem);
	}
}

customElements.define("js-recipe-form", RecipeForm, { extends: "form" });
