
import Filter from "../models/Filter.js"

class FilterUstensiles extends Filter {
   constructor(menu) {
      super(menu, "Ustensiles", "ustensil")
    
   }

   hydrate(recipes) 
   {
      this.all = new Set()
      recipes.forEach((recipe) => 
      {
         recipe.ustensils.forEach((ustensil) => 
         {
            this.all.add(ustensil.toLowerCase());
           
         });

      });
      return this.all
   }

   /**
    * @filterRecipes retourne la liste des recettes filtrées par rapport à  l'élément selectionné
    */

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
         selection.forEach(item =>
         {
            const ustensils = recipe.ustensils.map(item => item.normalize().toLowerCase())
            if(ustensils.includes(item))
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

export default FilterUstensiles;
