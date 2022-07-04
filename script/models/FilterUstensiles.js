import Dropdown from "../views/Dropdown.js";

class FilterUstensiles {
   constructor(menu) {
      this.menu = menu;
      this.all = new Set();
      this.title = "Ustensiles";
      this.ref = "ustensil";
      this.allItems = [];
      this.itemsFiltered = []
      this.itemsString = "";
      this.dropdown = "";
   
   }

   buildDropdown() {
      this.dropdown = new Dropdown(this.title, this.ref);
      document.getElementById("filters").innerHTML = this.dropdown.render();
      document.querySelector(`#filter-${this.ref} .filter-bottom`).style.display = "none";
   }

   closeFilter() {
      document.querySelector(`#filter-${this.ref} .close-filter`).addEventListener("click", () => {
         document.querySelector(`#filter-${this.ref} .open-filter`).style.display = "block";
         document.querySelector(`#filter-${this.ref} .filter-bottom`).style.display = "none";
         //document.querySelector(`#filter-${this.ref} .items`).innerHTML = ''
      });
      
   }

   
   listenFilterInput() {
      const filterInput = (e) => {
         e.preventDefault()
         let input = e.target.value.toLowerCase();
         if (input.length === 0){
            this.hydrate(this.allItems)
         } 
        document.querySelector(`#filter-${this.ref} .items`).innerHTML = ''
         this.allItems.filter(item =>{ 
            if(item.includes(input)){
               if(!this.itemsFiltered.includes(item)){
                  this.itemsFiltered.push(item)
               }
            }
            this.itemsFiltered.filter(item => {
               if(!item.includes(input)){
                  return this.itemsFiltered.indexOf(item)
               }
            })   
         })
         console.log(this.itemsFiltered)
         this.hydrate(this.itemsFiltered)
      }
         
             
       
      document.querySelector(`#filter-${this.ref} .filter-input`).addEventListener("input", filterInput);
   }


   openFilter() {
      document.querySelector(`#filter-${this.ref} .open-filter`).addEventListener("click", () => {
         document.querySelector(`#filter-${this.ref} .open-filter`).style.display = "none";
         document.querySelector(`#filter-${this.ref} .filter-bottom`).style.display = "flex";
      });
      this.hydrate(this.allItems)
      
   }


   hydrate(items) {
      this.menu.recipes.forEach((recipe) => {
         recipe.ustensils.forEach((ustensil) => {
            this.all.add(ustensil.toLowerCase());
         });
      });
      this.all.forEach((item) => this.allItems.push(item));
      this.allItems.sort((a, b) => a.localeCompare(b));   
      items.forEach((item) => {
         item = this.dropdown.renderItem(item);
         return document.querySelector(`#filter-${this.ref} .items`).innerHTML += item;
      });
   }

   start() {
      this.buildDropdown();
      this.closeFilter();
      this.openFilter();
      this.listenFilterInput() 
   
   }
}
export default FilterUstensiles;
