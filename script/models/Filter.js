import Dropdown from "../views/Dropdown.js";

class Filter {
   constructor(menu, title, ref) {
      this.menu = menu;
      this.all = new Set();
      this.filtered = new Set();
      this.selected = new Set();
      this.dropdown = "";
      this.filterHandler = null;
      this.title = title;
      this.ref = ref;
      this.closeTag = null;
      this.dom = {
         bottom:null,
         list:null,
         open:null,
         close:null,
         input:null
      }
   }

   build()
   {
      this.dropdown = new Dropdown(this.title, this.ref);
      const el = document.createElement('div');
      el.innerHTML = this.dropdown.render()
      document.getElementById("filters").appendChild(el)
      this.dom = {
         bottom : document.querySelector(`#filter-${this.ref} .filter-bottom`) ,
         list : document.querySelector(`#filter-${this.ref} .items`) ,
         open : document.querySelector(`#filter-${this.ref} .open-filter`) ,
         close : document.querySelector(`#filter-${this.ref} .close-filter`) ,
         input : document.querySelector(`#filter-${this.ref} .filter-input`) 
      }
      this.dom.bottom.style.display = "none";
   }

   buildTagContainer()
   {
      const el = document.createElement('div')
      el.innerHTML = `<div id="tags-${this.ref}"><div>`
      document.getElementById('tags').appendChild(el) 
   }
      
   display(items) 
   {
      this.dom.list.innerHTML = "";
      items = items.sort((a, b) => a.localeCompare(b));
      items.forEach((item) => 
      {
         const disabled = this.selected.has(item)
         item = this.dropdown.renderItem(item, disabled);
         this.dom.list.innerHTML += item
      });

   }

   displaySelection()
   {
      document.getElementById(`tags-${this.ref}`).innerHTML= ''
      this.selected.forEach(tag =>
      {
         let button = document.createElement('div');
         let closeTag = document.createElement('button');
         closeTag.classList.add("closeTag", `closeTag-${this.ref}`);
         closeTag.setAttribute('data-element', `${tag}`)
         button.setAttribute('data-element', `${tag}`)
         button.classList.add("tag", `tag-${this.ref}`)
         closeTag.textContent = 'X';
         button.textContent = tag
         button.appendChild(closeTag);
         document.getElementById(`tags-${this.ref}`).appendChild(button)
      })  
   }

   listenForUnselect()
   {
      let buttons = document.querySelectorAll(`.closeTag-${this.ref}`)
      buttons.forEach(button =>
      {
         button.addEventListener('click', () =>
         {
            const tag = button.dataset.element
            this.selected.delete(tag)
            this.displaySelection()
            this.menu.filter()
            this.listenForUnselect()
         })
      })
   }
   
   listenForClosing()
   {
      this.dom.close.addEventListener("click", () =>
      {
         this.dom.open.style.display = "block";
         this.dom.bottom.style.display = "none";
         this.dom.input.value = ''
         this.display([...this.all])
      });
         
      this.dom.input.removeEventListener("input", this.filterHandler);
   }

   listenForFilter() 
   {
      this.filterHandler = (e) => 
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
      
         this.display([...this.filtered]);
         this.listenForSelection();  
      };

      this.dom.input.addEventListener("input", this.filterHandler);
   }

   listenForOpening() 
   {
      this.dom.open.addEventListener("click", () => 
      {
         this.dom.open.style.display = "none";
         this.dom.bottom.style.display = "flex";
         this.display([...this.all])
         this.listenForSelection(); 
      });
   }
   
   listenForSelection ()
   {
      this.dom.list.querySelectorAll('.item ').forEach(button => 
      {
         button.addEventListener('click', () => 
         {
            const tag = button.dataset.item
            this.selected.add(tag)
            this.displaySelection()
            this.menu.filter()
            this.listenForUnselect()
         })
      })
   }
      
   start() 
   {
      this.build()
      this.hydrate(this.menu.recipes);
      this.display([...this.all]);
      this.listenForOpening();
      this.listenForClosing();
      this.listenForFilter();
      this.listenForSelection();
      this.buildTagContainer()
      this.filtered = this.all   
   }
}


export default Filter;
