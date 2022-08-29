import RecipeCard from "../views/RecipeCard.js";

class Menu {
   constructor(recipes) {
      this.recipes = recipes;
      this.filters = [];
      this.items = new Set();
      this.list = new Set();
      this.filtered = new Set();
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
         console.log(filter.hydrate(filtered))
         filter.display([...filter.all])
         filter.listenForSelection()
         filter.listenForUnselect() 
      })    
   }

   search(filter)
   {
      let filtered = this.recipes
      this.list.add(filter.hydrate(filtered))
      this.list.forEach(items =>
      {
         items.forEach(item => this.items.add(item))    
      })
      
      const filterHandler = (e) => 
      {
         let needle = e.target.value.normalize().toLowerCase()  
         this.filtered = new Set()
         this.items.forEach(item => 
         {
            if (item.indexOf(needle) > -1)
            {
               this.filtered.add(item)
            
            }
         })
         this.filter()
      }
      const searchInput = document.getElementById('search-input');
      searchInput.addEventListener('input', filterHandler)
   }

}

export default Menu;
