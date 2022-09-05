import RecipeCard from "../views/RecipeCard.js";

class Menu {
   constructor(recipes)
   {
      this.recipes = recipes;
      this.filters = [];
      this.items = new Set();
      this.list = new Set();
      this.filtered = new Set();
      this.needle = ''
      this.all = [];  
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
         filter.display([...filter.all])
         filter.listenForSelection()
         filter.listenForUnselect() 
      })    
   }

   
   listenForsearch()
   {
      const searchInput = document.getElementById('search-input') 
      searchInput.addEventListener('input', (e) => 
      {
         this.needle = e.target.value.normalize().toLowerCase().trim('')
         if(this.needle.length < 3)
         {
           // searchInput.style.setProperty('--afterVisibility', 'visible');
           return
         }
         const filtered = this.search(this.recipes)
         console.log(filtered)
         //this.display(filtered)
      
         // this.filters.forEach(filter => 
         // { 
         //    filter.hydrate(filtered)
         //    filter.display([...filter.all])
         //    filter.listenForSelection()
         //    filter.listenForUnselect() 
         // })   
      })
   }


   search(recipes)
   {
      recipes.forEach(recipe =>
      {
         if(recipe.name.indexOf(this.needle) > -1){
            console.log( recipe.name)
            this.all.push(recipe)
         }
      })
      return this.all
   }

}

export default Menu;
