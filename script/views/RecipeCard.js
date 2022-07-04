class RecipeCard {
   constructor(recipe) {
      this.id = recipe.id;
      this.name = recipe.name;
      this.servings = recipe.servings;
      this.ingredients = recipe.ingredients;
      this.time = recipe.time;
      this.description = recipe.description;
      this.appliance = recipe.appliance;
      this.ustensils = recipe.ustensils;
   }

   buildIngredients() {
      let htmlIngredient = "";
      this.ingredients.forEach((ingredientObj) => {
         if (!ingredientObj.unit && ingredientObj.quantity) {
            htmlIngredient += `${ingredientObj.ingredient} : ${ingredientObj.quantity}<br>`;
         } else if (!ingredientObj.unit && !ingredientObj.quantity) {
            htmlIngredient += `${ingredientObj.ingredient}<br>`;
         } else {
            htmlIngredient += `${ingredientObj.ingredient} : ${ingredientObj.quantity} ${ingredientObj.unit}<br>`;
         }
      });
      return htmlIngredient;
   }

   render() {
      return `
        <div class='recipe-card'>
          <div class='recipe-top'></div>
          <div class='recipe-bottom'>
            <div class='recipe-left'>
              <div class='recipe-name'>${this.name}</div>
              <div class='recipe-ingredients'>${this.buildIngredients()}</div>
            </div>
            <div class='recipe-right'>
              <div class='time'>
                  <i class="fa-regular fa-clock clock" ></i> ${this.time} min
              </div>
              <div class='description'>${this.description}</div>
            </div>  
          </div>
        </div>`;
   }
}
export default RecipeCard;
