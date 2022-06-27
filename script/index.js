
import { recipes } from "../../data/recipes.js";
import Menu from '../script/models/Menu.js';
import FilterUstensiles from '../script/models/FilterUstensiles.js';


const menu = new Menu(recipes);
menu.display();

const filterUstensiles = new FilterUstensiles(menu)
filterUstensiles.start();
// filterUstensiles.listenForFilterUstensiles();

