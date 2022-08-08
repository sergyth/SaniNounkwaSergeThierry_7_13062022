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

  

}
   

export default FilterAppliances;
