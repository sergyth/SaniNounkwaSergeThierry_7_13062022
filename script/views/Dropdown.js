class Dropdown {
    constructor(title, ref){
        this.title = title;
        this.ref = ref;
    }
    
 
    render()
    {
        return`
            <div class="filter" id='filter-${this.ref}'>
                <button class='open-filter'>
                    ${this.title}
                    <i class="fa-solid fa-chevron-down"></i>
                </button>
                <div class='filter-bottom'>
                    <input type="search" name="" class="filter-input" placeholder='Rechercher un ${this.ref}'/>
                    <button><i class="fa-solid fa-chevron-up"></i></button>
                </div>
            </div>`;  
    }
}

export default Dropdown;
