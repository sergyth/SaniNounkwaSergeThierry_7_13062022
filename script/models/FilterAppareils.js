import Filter from "../models/Filter.js"
class FilterAppliances extends Filter {
    constructor(menu) {
       super(menu)
       this.title = "Appareils";
       this.ref = "appliance";
    }

    hydrate() {
        this.menu.recipes.forEach((recipe) => {
           recipe.ustensils.forEach((ustensil) => {
              this.all.add(ustensil.toLowerCase());
           });
        });
     }
  
     filterRecipesByUstensiles() {
        this.menu.recipes.forEach((recipe) => {
           recipe.ustensils = [...recipe.ustensils];
           this.filtered.forEach((item) => {
              if (recipe.ustensils.includes(item)) {
                 this.recipeList.add(recipe);
              } else {
                 this.recipeList.delete(recipe);
              }
              this.menu.display(this.recipeList);
           });
        });
     }
  
}
export default FilterAppliances;
    