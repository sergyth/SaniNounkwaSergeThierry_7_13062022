//import Menu from "../script/models/Menu.js";
import FilterUstensiles from "../models/FilterUstensiles.js"
import FilterAppliances from "../models/FilterAppliances.js"
import FilterIngredients from "../models/FilterIngredients.js"

class MainFilter{
    constructor(menu)
    {
        this.menu = menu;
        this.recipeNames =new Set()
        this.filtered = new Set()
        // this.name = recipe.name;
        // this.ingredients = recipe.ingredients;
        // this.description = recipe.description;
        // this.appliance = recipe.appliance;
        // this.ustensils = recipe.ustensils;
    }

    listenForsearch()
    {
        const filterHandler = (e) => 
        {
            let needle = e.target.value.normalize().toLowerCase()
            this.menu.recipes.forEach(recipe => this.recipeNames.add(recipe.name.normalize().toLowerCase()))
            console.log(this.recipeNames)
            if(needle.length >2)
            {
                this.recipeNames.forEach(recipe =>
                {
                    if(recipe.indexOf(needle > -1))
                    {
                        this.filtered.add(recipe)
                    }
                })
                console.log(this.filtered)
                this.menu.display([...this.filtered])
            }
            console.log(this.recipeNames)
        }
        const searchInput = document.getElementById('search-input');
        searchInput.addEventListener('input', filterHandler)

    }
}
export default MainFilter;