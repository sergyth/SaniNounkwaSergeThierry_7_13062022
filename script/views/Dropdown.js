class Dropdown {
   constructor(title, ref) {
      this.title = title;
      this.ref = ref;
      this.item = ''
      
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
                <ul class='items'></ul>
            </div>
         </div>`;
   }

   renderItem(element) {
      return`
         <li class ='item item-${element}'>${element}</li>`;
   }
}

export default Dropdown;
