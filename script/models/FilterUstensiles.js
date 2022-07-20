
import Filter from "../models/Filter.js"

class FilterUstensiles extends Filter {
   constructor(menu, title, ref) {
      super(menu, title, ref)
      this.title = "Ustensiles";
      this.ref = "ustensil";
      this.tagList = new Set();
      this.tag = null;
      this.closeTag = null;
   }

   hydrate() 
   {
      this.menu.recipes.forEach((recipe) => 
      {
         recipe.ustensils.forEach((ustensil) => 
         {
            this.all.add(ustensil.toLowerCase());
         });

      });
   }

   closeTag()
   {
      document.querySelectorAll('.closeTag').addEventListener('click', (e) => {
         console.log(e.target.dataset.element)
      })
   }

   createTag(element)
   {
      this.tag = document.createElement('div');
      this.closeTag = document.createElement('span');
      this.closeTag.classList.add('closeTag');
      this.closeTag.setAttribute('data-element', `${element}`)
      this.tag.classList.add('tag')
      this.closeTag.textContent = 'X';
      this.tag.textContent = element
      this.tag.appendChild(this.closeTag);
      document.getElementById('tags').appendChild(this.tag)
      
   }

   
   listenForSelection ()
   {

      this.filterNode.querySelectorAll('.item').forEach(item => {
         item.addEventListener('click', (e) => {
            if(!this.tagList.has(item))
            {
              this.createTag(e.target.dataset.item)
              this.tagList.add(item)
             // this.closeTag()
            }
            
         })
      })
   }
   

 
}

export default FilterUstensiles;
