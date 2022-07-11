import Filter from "./Filter.js";
class FilterAppliances extends Filter {
   constructor(menu, title, ref) {
      super(menu, title, ref);
      this.title = "Appareils";
      this.ref = "appliance";
   }


   hydrate() {
      this.menu.recipes.forEach((recipe) => {
         this.all.add(recipe.appliance.toLowerCase());
      });
   }

   // filterRecipesByAppliances() {
   //    this.menu.recipes.forEach((recipe) => {
   //       recipe.ustensils = [...recipe.ustensils];
   //       this.filtered.forEach((item) => {
   //          if (recipe.ustensils.includes(item)) {
   //             this.recipeList.add(recipe);
   //          } else {
   //             this.recipeList.delete(recipe);
   //          }
   //          this.menu.display(this.recipeList);
   //       });
   //    });
   // }

}
   

export default FilterAppliances;
