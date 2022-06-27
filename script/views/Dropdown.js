class Dropdown {
    constructor(menu){
        this.menu = menu;
        this.all = new Set();
    }
    
 
    render()
    {
        return
            `<div class="filter">
                <input type="search" name="" class="filter-input " placeholder=''/>
                <div id='tags'></div>
                <button id=""><i class="fa-solid fa-chevron-down"></i></button>
            </div>`;  
    }
}

export default Dropdown;
