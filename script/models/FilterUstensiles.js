import { recipes } from "../../../data/recipes.js";

class FilterUstensiles {
  constructor(){
    this.recipes = recipes;
    this.ustensils = []
  }
  
  hydrate(){
    recipes.forEach(recipe => {
      this.ustensils.push(recipe.ustensils)
    })
    console.log(this.ustensils)
  }
  listenForFilterUstensiles(){
    document.getElementById('chevron-ustensiles').addEventListener('click', this.renderFilterUstensiles )
  }
  renderFilterUstensiles(){
    console.log('click')
  }
}


export default FilterUstensiles;