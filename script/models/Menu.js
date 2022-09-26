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
      const recipeWrapper = document.getElementById("recipes-wrapper");
      const warning = document.createElement('div');
      warning.classList.add('warning');
      warning.innerText = "Merci de taper au moins 3 caractères pour commencer la recherche"
      warning.style.display = 'none'
      searchbar.appendChild(warning);
      
       
      
      
      document.getElementById('search-input').addEventListener('input', (e) => 
      {
         this.needle = e.target.value.toLowerCase()
         let filtered = this.recipes;
        
         if(this.needle.length === 0)
         {
            warning.style.display = 'none'
  
         }

         else if(this.needle.length < 3)

         {
            
            warning.style.display = 'block'
            this.display(this.recipes)
            return
            
         } else 
         {
            
            warning.style.display = 'none'
            filtered = this.search(this.recipes)
            console.log(filtered.length)
            if(filtered.length === 0)
            {   
   
               recipeWrapper.innerHTML = "Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc"
               return
   
            }
          
            
         }
         this.display(filtered)
         
         this.filters.forEach(filter => 
         { 
            filter.hydrate(filtered)
            filter.display([...filter.all])
            filter.listenForSelection()
         }) 
      
           
      })
   }


   search(recipes)
   {
      return recipes.filter(recipe =>
      {
         if(recipe.name.toLowerCase().indexOf(this.needle) > -1){
            return true
         }
         
         if(recipe.description.toLowerCase().indexOf(this.needle) > -1){
            return true
         }

         if(recipe.ingredients.forEach(ingredientList => ingredientList.ingredient.toLowerCase().indexOf(this.needle) > -1)){
            return true
         }
      })
      
   }

}

export default Menu;
