
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
   }
   filterRecipes()
   {
      return this.menu.recipes.filter(recipe =>
      {
         let count = 0;
         this.selected.forEach(item =>
         {
            if(recipe.ustensils.includes(item))
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

   closeTag()
   {
      document.querySelectorAll('.closeTag').forEach(tag =>
         tag.addEventListener('click', (e)=>
         {
            const element = tag.dataset.element
            console.log(element)
         })
      )
   }



 
}

export default FilterUstensiles;
