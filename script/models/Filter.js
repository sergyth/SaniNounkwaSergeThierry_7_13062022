import Dropdown from "../views/Dropdown.js";

class Filter {
   constructor(menu, title, ref) {
      this.menu = menu;
      this.all = new Set();
      this.filtered = new Set();
      this.dropdown = "";
      this.recipeList = new Set();
      this.filterHandler = null;
      this.title = title;
      this.ref = ref;
   }

   buildDropdown()
   {
      this.dropdown = new Dropdown(this.title, this.ref);
      document.getElementById("filters").innerHTML += this.dropdown.render();
      document.querySelector(`#filter-${this.ref} .filter-bottom`).style.display = "none";
   }

   listenForClosingFilter()
   {
      document.querySelector(`#filter-${this.ref} .close-filter`).addEventListener("click", () =>
         {
            document.querySelector(`#filter-${this.ref} .open-filter`).style.display = "block";
            document.querySelector(`#filter-${this.ref} .filter-bottom`).style.display = "none";
         });
         
      document.querySelector(`#filter-${this.ref} .filter-input`).removeEventListener("input", this.filterHandler);
   }

   displayDropdownItems(items) 
   {
      document.querySelector(`#filter-${this.ref} .items`).innerHTML = "";
      items = items.sort((a, b) => a.localeCompare(b));
      items.forEach((item) => 
      {
         item = this.dropdown.renderItem(item);
         document.querySelector(`#filter-${this.ref} .items`).innerHTML += item
      });
   }

   listenForFilterDropdown() 
   {
      this.filterHandler = (e) => 
      {
         let input = e.target.value.toLowerCase();
         const items = [...this.all];
         this.filtered = new Set()
         items.forEach(item => 
         {
            if (item.indexOf(input) > -1)
            {
               this.filtered.add(item)
               //console.log('filtre',this.filtered)
               //this.filterRecipesByUstensiles(); 
            }
         })

         if (this.filtered.size === 0) {
            this.recipeList = this.menu.recipes
            console.log(this.recipeList)
            //this.filterRecipesByUstensiles();
            document.getElementById("recipes-wrapper").innerHTML = "Désolé nous ne trouvons pas de recette...";
            return;
         }
         //this.filterRecipesByUstensiles();
         //console.log('end',this.filtered) 
         this.displayDropdownItems([...this.filtered]);
       
         this.listenForItemSelection ()
         
        
      };

      document.querySelector(`#filter-${this.ref} .filter-input`).addEventListener("input", this.filterHandler);
   }

   listenForOpeningDropdown() 
   {
      const dropDownButton =document.querySelector(`#filter-${this.ref} .open-filter`);
      const filterBottom = document.querySelector(`#filter-${this.ref} .filter-bottom`);
      //console.log(this.ref)
      dropDownButton.addEventListener("click", () => 
      {
         //console.log('click', this.ref)
         dropDownButton.style.display = "none";
         filterBottom.style.display = "flex";
         this.displayDropdownItems([...this.all]);
         this.listenForFilterDropdown();
      });

      this.listenForClosingFilter();
     
   }


   start() 
   {
      this.buildDropdown()
      this.hydrate();
      this.listenForOpeningDropdown();
      this.filtered = this.all
      
   }
}


export default Filter;
