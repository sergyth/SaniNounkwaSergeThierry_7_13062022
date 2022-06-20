import Menu from '../script/models/Menu.js'
import FilterUstensiles from '../script/models/FilterUstensiles.js'


const menu = new Menu();
menu.createRecipesMenu();

const filterUstensiles = new FilterUstensiles()
filterUstensiles.hydrate();
filterUstensiles.listenForFilterUstensiles();

