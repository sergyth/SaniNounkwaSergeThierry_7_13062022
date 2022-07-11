
import Filter from "../models/Filter.js"

class FilterUstensiles extends Filter {
   constructor(menu, title, ref) {
      super(menu, title, ref)
      this.title = "Ustensiles";
      this.ref = "ustensil";
   }

   hydrate() 
   {
      this.menu.recipes.forEach((recipe) => 
      {
         recipe.ustensils.forEach((ustensil) => 
         {
            this.all.add(ustensil.toLowerCase());
         });

      });
   }

   // filterRecipesByUstensiles() 
   // {
   //    this.menu.recipes.forEach((recipe) => {
   //       this.filtered.forEach((item) => {
   //        if(recipe.ustensils.includes(item)){
   //             this.recipeList.add(recipe)
   //        } else{
   //          this.recipeList.delete(recipe)
   //       }
   //       });
         
   //    });
   //    console.log('ustensil', this.filtered)
   //    console.log('list', this.recipeList)
   //    this.menu.display(this.recipeList);
         
   // }
   
   listenForItemSelection ()
   {
      this.filtered = [...this.filtered]
      this.filtered.forEach(item => 
         {
            document.querySelector(`#filter-${this.ref} .item-${item}`).addEventListener('click', () =>
            {
               console.log('click')
            } )
         })
   }

 
}

export default FilterUstensiles;
