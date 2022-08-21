import Filter from "../models/Filter.js"

class FilterIngredients extends Filter {
    constructor(menu) {
       super(menu, "ingredients", "ingredient")
     
    }
 
    hydrate(recipes) 
    {
       this.all = new Set()
       recipes.forEach((recipe) => 
       {
         recipe.ingredients.forEach((ingredientList) => 
          {
             this.all.add(ingredientList.ingredient.toLowerCase());
    
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
             const ingredients = recipe.ingredients.map(item => item.ingredient.normalize().toLowerCase())
             if(ingredients.includes(item))
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
 
 export default FilterIngredients;