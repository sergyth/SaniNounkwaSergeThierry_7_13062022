
class FilterUstensiles {
  constructor(recipes){
    this.recipes = recipes
    this.ustensiles = []
    console.log(recipes)
  }
  
  hydrate(recipes){
    recipes.forEach(recipe => {
      this.ustensils.push(recipe.ustensils)
      console.log(this.ustensils)
    })
  }
}

export default FilterUstensiles;