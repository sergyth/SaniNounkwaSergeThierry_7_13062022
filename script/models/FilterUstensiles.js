import Dropdown from '../views/Dropdown.js';

class FilterUstensiles {
    constructor(menu){
      this.menu = menu;
      this.all = new Set()
    }
    
    buildDropdown()
    {
      let html = ''
      let dropdown = new Dropdown(this.menu)
      html = dropdown.render();

      document.getElementById('filters').innerHTML = html
      
    }

    hydrate()
    {
      let tags = ''
      let tag =''
      this.menu.recipes.forEach(recipe => {
        recipe.ustensils.forEach(ustensil =>
        {
          this.all.add(ustensil)
        })
      }) 
      tags = this.all
      tags.forEach(el =>
        {
          tag = `<span>${el}</span>`
          document.getElementById('tags').innerHTML += tag
        })
    }

   start()
   {
    this.buildDropdown();
   //this.hydrate();
   }

}
export default FilterUstensiles;