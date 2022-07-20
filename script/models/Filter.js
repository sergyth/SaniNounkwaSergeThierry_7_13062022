import Dropdown from "../views/Dropdown.js";

class Filter {
   constructor(menu, title, ref) {
      this.menu = menu;
      this.all = new Set();
      this.filtered = new Set();
      this.dropdown = "";
      this.filterHandler = null;
      this.filterNode = null;
   }

   build()
   {
      this.dropdown = new Dropdown(this.title, this.ref);
      document.getElementById("filters").innerHTML += this.dropdown.render();
      this.filterNode = document.querySelector(`#filter-${this.ref}`) 
      this.filterNode.querySelector('.filter-bottom').style.display = "none";
    
   }

   listenForClosing()
   {
      this.filterNode.querySelector('.close-filter').addEventListener("click", () =>
         {
            this.filterNode.querySelector('.open-filter').style.display = "block";
            this.filterNode.querySelector('.filter-bottom').style.display = "none";
            this.filterNode.querySelector('.filter-input').value = ''
         });
         
      this.filterNode.querySelector('.filter-input').removeEventListener("input", this.filterHandler);
   }

   display(items) 
   {
      this.filterNode.querySelector('.items').innerHTML = "";
      items = items.sort((a, b) => a.localeCompare(b));
      items.forEach((item) => 
      {
         item = this.dropdown.renderItem(item);
         this.filterNode.querySelector('.items').innerHTML += item
      });
   }

   listenForFilter() 
   {
      this.filterHandler = async (e) => 
      {
         let needle = e.target.value.toLowerCase();
         this.filtered = new Set()
         this.all.forEach(item => 
         {
            if (item.indexOf(needle) > -1)
            {
               this.filtered.add(item)
            }
         })
         
         // if (this.filtered.size === 0) {
         //    document.getElementById("recipes-wrapper").innerHTML = "Désolé nous ne trouvons pas de recette...";
         //    return;
         // }
   
         await this.display([...this.filtered]);  
         this.listenForSelection () 
      };

      this.filterNode.querySelector('.filter-input').addEventListener("input", this.filterHandler);
   }

   listenForOpening() 
   {
      const button = this.filterNode.querySelector('.open-filter');
      const filterBottom = this.filterNode.querySelector('.filter-bottom');
      //console.log(this.ref)
      button.addEventListener("click", () => 
      {
         //console.log('click', this.ref)
         button.style.display = "none";
         filterBottom.style.display = "flex";
         this.display([...this.all]);
         this.listenForFilter();
         this.listenForSelection();
      });

      this.listenForClosing();
   }


   start() 
   {
      this.build()
      this.hydrate();
      this.listenForOpening();
      this.filtered = this.all
      
   }
}


export default Filter;
