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
       return this.all
     
    }
    
    filterRecipes(recipes)
    {
       return recipes.filter(recipe =>
       {
          let count = 0;
          const selection = [...this.selected].map(item => item.normalize().toLowerCase())
          selection.forEach(item =>
          {
             const ingredients = recipe.ingredients.map(item => item.ingredient.normalize().toLowerCase())
             if(ingredients.includes(item))
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
 
 export default FilterIngredients;