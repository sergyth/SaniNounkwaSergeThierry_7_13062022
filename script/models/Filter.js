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
      this.tag = null;
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
      document.getElementById("filters").innerHTML += this.dropdown.render();
      this.dom = {
         bottom:document.querySelector(`#filter-${this.ref} .filter-bottom`) ,
         list:document.querySelector(`#filter-${this.ref} .items`) ,
         open:document.querySelector(`#filter-${this.ref} .open-filter`) ,
         close:document.querySelector(`#filter-${this.ref} .close-filter`) ,
         input:document.querySelector(`#filter-${this.ref} .filter-input`) 
      }
      this.dom.bottom.style.display = "none";
   }

   cancelSelectedElements()
   {
      this.selected.forEach(item =>
      {
         let el = this.dom.list.querySelector(`[data-item="${item}"]`);
         el.remove();
         this.filtered.delete(item)
      })
   }
      
   display(items) 
   {
      this.dom.list.innerHTML = "";
      items = items.sort((a, b) => a.localeCompare(b));
      items.forEach((item) => 
      {
         item = this.dropdown.renderItem(item);
         this.dom.list.innerHTML += item
      });

   }

   displayTag(element)
   {
      this.tag = document.createElement('div');
      this.closeTag = document.createElement('button');
      this.closeTag.classList.add('closeTag');
      this.closeTag.setAttribute('data-element', `${element}`)
      this.tag.setAttribute('data-element', `${element}`)
      this.tag.classList.add('tag')
      this.closeTag.textContent = 'X';
      this.tag.textContent = element
      this.tag.appendChild(this.closeTag);
      document.getElementById('tags').appendChild(this.tag)
      this.listenForTag(element)   
   }

   listenForTag(element)
   {
      let button = document.querySelector(`.closeTag[data-element = "${element}"] `)
      button.addEventListener('click', () =>
      {
         element= button.dataset.element
         this.removeTag(element)
         this.selected.delete(element)
         console.log(this.selected)
         if(this.selected.size===0){
            const filtered = this.filterRecipes()
            this.menu.display(filtered)
            this.hydrate(filtered)
            this.display([...this.all])
            this.listenForSelection()
           
         }
    
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
      
         await this.display([...this.filtered]);
        // this.listenForSelection();  
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
            this.displayTag(tag)
            const filtered = this.filterRecipes()
            this.menu.display(filtered)
            this.hydrate(filtered)
            this.display([...this.all])
            this.cancelSelectedElements()
            this.listenForSelection()
     
         })
      })
   }

   removeTag(element)
   {
      document.querySelector(`.tag[data-element = "${element}"] `).remove()
      this.filtered.add(element)
      console.log(this.filtered)
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
      this.filtered = this.all
      
   }
}


export default Filter;
