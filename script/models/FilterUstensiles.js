import Dropdown from '../views/Dropdown.js';

class FilterUstensiles {
    constructor(menu){
        this.menu = menu;
        this.all = new Set();
    }

    buildDropdown()
    {
        let dropdown = new Dropdown('Ustensiles', 'ustensil')
        document.getElementById('filters').innerHTML = dropdown.render()
        document.querySelector(`#filter-ustensil .filter-bottom`).style.display = 'none'; 
    }


    openFilter()
    {
        document.querySelector(`#filter-ustensil .open-filter`).addEventListener('click', (e) => {
          console.log('open')
          //e.stopPropagation()
          document.querySelector(`#filter-ustensil .open-filter`).style.display = 'none'
          document.querySelector(`#filter-ustensil .filter-bottom`).style.display = 'flex'
          
        })
    }

    hydrate()
    {
      let tags = ''
      let tag =''
      this.menu.recipes.forEach(recipe =>
      {
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
    
      this.openFilter();
      //this.hydrate();
    }

}
export default FilterUstensiles;