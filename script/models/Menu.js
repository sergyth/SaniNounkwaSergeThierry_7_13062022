import RecipeCard from "../views/RecipeCard.js";

class Menu {
   constructor(recipes)
   {
      this.recipes = recipes;
      this.filters = [];
      this.items = new Set();
      this.list = new Set();
      this.filtered = new Set();
      this.needle = '';
   }

   addFilter(filter)
   {
      this.filters.push(filter)
      filter.start()
   }

   display(list) {
      document.getElementById("recipes-wrapper").innerHTML =''
      let htmlCardList = "";
      list.forEach((recipe) => {
         const card = new RecipeCard(recipe);
         htmlCardList += card.render();
      });
      document.getElementById("recipes-wrapper").innerHTML = htmlCardList;
   }

   filter()
   {
      let filtered = this.recipes
      this.filters.forEach(filter => 
      {
         filtered = filter.filterRecipes(filtered)
      })

      this.display(filtered)
      
      this.filters.forEach(filter => 
      { 
         filter.hydrate(filtered)
      
      })    
      this.filters.forEach(filter => 
      { 
         filter.display([...filter.all])
         filter.listenForSelection()
      })    
   }

   
   listenForsearch()
   {
      const searchbar = document.getElementById('searchbar_wrapper');
      const warning = document.createElement('div');
      warning.classList.add('warning');
      warning.innerText = "Merci de taper au moins 3 caractères pour commencer la recherche"
      warning.style.display = 'none'
      searchbar.append(warning); 
      
      document.getElementById('search-input').addEventListener('input', (e) => 
      {
         this.needle = e.target.value.normalize().toLowerCase()
        
         if(this.needle.length < 3)
         {
            warning.style.display = 'block'
            this.display(this.recipes)
            
         } else
         {
            warning.remove();
            const filtered = this.search(this.recipes)
            console.log(filtered.length)
            if(filtered.length === 0){
               const recipeWrapper = document.getElementById('recipes-wrapper');
               const displayWarning = document.createElement('div');
               displayWarning.classList.add('warning');
               displayWarning.textContent = "Aucune recette ne correspond à votre critère… "
               recipeWrapper.appendChild(displayWarning); 
            }

            //console.log(filtered)
            this.display(filtered)
         
            this.filters.forEach(filter => 
            { 
               filter.hydrate(filtered)
               filter.display([...filter.all])
               filter.listenForSelection()
            })   
         
         }
        
      })
   }


   search(recipes)
   {
      return recipes.filter(recipe =>
      {
         if(recipe.name.indexOf(this.needle) > -1){
            return true
         }
         
         if(recipe.description.indexOf(this.needle) > -1){
            return true
         }

         if(recipe.ingredients.forEach(ingredientList => ingredientList.ingredient.indexOf(this.needle) > -1)){
            return true
         }
      })
      
   }

}

export default Menu;
