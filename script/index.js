import { recipes } from "../../data/recipes.js";

export class Menu {
  constructor(recipes) {
    this.recipes = recipes;
  }
  /**
   * je boucle sur la listes des recettes et pour chaque recette je crèe un tableau ingredientsArray dans lequel je mets
   *  la liste des ingredients de la recette en question et enfin je boucle sur le nouveau tableau pour lister les recettes
   * ingredients un pour un afin de pouvoir les afficher
   */
  createRecipesMenu() {
    recipes.forEach((recipe) => {
      let ingredientsArray = [];
      let ingredient = "";
      ingredientsArray = recipe.ingredients;
      for (let i = 0; i < ingredientsArray.length; i++) {
        if (!ingredientsArray[i].unit && ingredientsArray[i].quantity) {
          ingredient += `${ingredientsArray[i].ingredient} : ${ingredientsArray[i].quantity}<br>`;
        } else if (!ingredientsArray[i].unit && !ingredientsArray[i].quantity) {
          ingredient += `${ingredientsArray[i].ingredient}<br>`;
        } else {
          ingredient += `${ingredientsArray[i].ingredient} : ${ingredientsArray[i].quantity} ${ingredientsArray[i].unit}<br>`;
        }
        console.log(ingredient);
      }
      const recipesWrapper = document.getElementById("recipes-wrapper");
      recipesWrapper.innerHTML += createRecipeCard(recipe, ingredient);
    });
  }
}

Menu = new Menu(recipes);
Menu.createRecipesMenu();
export default Menu;

function createRecipeCard(recipe, ingredient) {
  return `
   <div class='recipe-card'>
     <div class='recipe-top'></div>
     <div class='recipe-bottom'>
       <div class='recipe-left'>
         <div class='recipe-name'>${recipe.name}</div>
         <div class='recipe-ingredients'>${ingredient}</div>
       </div>
       <div class='recipe-right'>
         <div class='time'>
            <i class="fa-regular fa-clock clock" ></i> ${recipe.time} min
         </div>
         <div class='description'>${recipe.description}</div>
       </div>  
     </div>
   </div>`;
}
