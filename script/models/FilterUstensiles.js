import Dropdown from "../views/Dropdown.js";

class FilterUstensiles {
   constructor(menu) {
      this.menu = menu;
      this.all = new Set();
      this.title = "Ustensiles";
      this.ref = "ustensil";
      this.filtered = []
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
      });
      
   }

   displayDropdownItems(items) {
      document.querySelector(`#filter-${this.ref} .items`).innerHTML = ''
      items = items.sort((a, b) => a.localeCompare(b))
      items.forEach((item) => {
         item = this.dropdown.renderItem(item);
         document.querySelector(`#filter-${this.ref} .items`).innerHTML += item;
      });
   }

   filterRecipesByUstensiles () {
      this.filtered.forEach(item => {
         this.menu.recipes.forEach(recipe => {
            
         })
      })
   }

   /**je filtre mon tableau d'elements et je vérifie que la valeur de mon input est inclu dans
    * des élements de mon tableau. Si c'est le cas je met ces élements dans mon tableau @param filtered
    * je filtre mon nouveau tableau en éliminant les élements qui ne correspondent pas à la valeur de l'input.
    */

   listenForFilterDropdown() {
      const filterInputHandler = (e) => {
         e.preventDefault()
         let input = e.target.value.toLowerCase();
         const items = [...this.all]
         items.filter(item =>{ 
            if(item.includes(input)){
               if(!this.filtered.includes(item)){
                  this.filtered.push(item)
               }
            }
            this.filtered.filter(item => {
               if(!item.includes(input)){
                  this.filtered.splice(item)
               }
            })   
         })
         if (input.length != 0 && this.filtered.length === 0){
            document.querySelector(`#filter-${this.ref} .items`).innerHTML = 'Aucun element trouvé'
            return  
         } 
         this.displayDropdownItems(this.filtered)
      }
         
             
       
      document.querySelector(`#filter-${this.ref} .filter-input`).addEventListener("input", filterInputHandler);
   }

   listenForOpeningDropdown() {
      document.querySelector(`#filter-${this.ref} .open-filter`).addEventListener("click", () => {
         document.querySelector(`#filter-${this.ref} .open-filter`).style.display = "none";
         document.querySelector(`#filter-${this.ref} .filter-bottom`).style.display = "flex";
      });
      this.displayDropdownItems([...this.all])
      
   }

   hydrate() {
      this.menu.recipes.forEach((recipe) => {
         recipe.ustensils.forEach((ustensil) => {
            this.all.add(ustensil.toLowerCase());
     
         });
      });
   }

   start() {
      this.buildDropdown();
      this.hydrate()
      this.closeFilter();
      this.listenForOpeningDropdown();
      this.listenForFilterDropdown()
   
   }
}
export default FilterUstensiles;
