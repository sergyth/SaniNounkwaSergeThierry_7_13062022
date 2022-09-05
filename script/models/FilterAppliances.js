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
      return this.all
   }


   filterRecipes(recipes)
   {
      const selection = [...this.selected].map(item => item.normalize().toLowerCase())
      if(selection.length === 0)
      {
         return recipes
      }
      
      return recipes.filter(recipe =>
         {
            let count = 0;
            const selection = [...this.selected].map(item => item.normalize().toLowerCase())
            selection.forEach(item =>
            {
               const appliance = recipe.appliance.normalize().toLowerCase()
               if(appliance === item)
               {
                  count++
               }
            })
            if(count === selection.length)
            {
               return true
            }
            return false
         })
   }
  

}
   

export default FilterAppliances;
