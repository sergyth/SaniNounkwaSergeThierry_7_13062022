class Dropdown {
   constructor(title, ref) {
      this.title = title;
      this.ref = ref;
      
      
   }

   render() {
      return`
         <div id='filter-${this.ref}' class="filter" >
            <button class='open-filter'>
                ${this.title}
                <i class="fa-solid fa-chevron-down chevron"></i>
            </button>
            <div class='filter-bottom'>
                <div class='filter-bottom-top'>
                    <input type="search" class="filter-input" placeholder='Rechercher un ${this.ref}' autofocus/>
                    <button class='chevron close-filter'><i class="fa-solid fa-chevron-up"></i></button>
                </div>
                <div class='items'></div>
            </div>
         </div>`;
   }

   renderItem(element, disabled) {
      if(disabled)
      {
         return`
            <button class ='item disabled' data-item ='${element}' disabled>${element}</button>`
      }
      
      return`
         <button class ='item' data-item ='${element}'>${element}</button>`;
   }
}

export default Dropdown;
