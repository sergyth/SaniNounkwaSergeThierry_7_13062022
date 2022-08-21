import Filter from "./Filter.js";
class FilterAppliances extends Filter {
   constructor(menu) {
      super(menu, "Appareils", "appliance");
   
   }


   hydrate(recipes) {
      this.all = new Set()
      recipes.forEach((recipe) => {
         this.all.add(recipe.appliance.toLowerCase());
      });
   }


   filterRecipes()
   {
      return this.menu.recipes.filter(recipe =>
         {
            let count = 0;
            this.selected.forEach(item =>
            {
               const appliance = recipe.appliance.normalize().toLowerCase()
               console.log(recipe, appliance)
               if(appliance === item)
               {
                  count++
               }
            })
            if(count === this.selected.size)
            {
               return true
            }
            return false
         })
   }
  

}
   

export default FilterAppliances;
