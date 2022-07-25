import { recipes } from "../../data/recipes.js";
import Menu from "../script/models/Menu.js";
import FilterAppliances from "../script/models/FilterAppliances.js";
import FilterUstensiles from "../script/models/FilterUstensiles.js";


const menu = new Menu(recipes);
menu.display(recipes);
//const filterAppliances = new FilterAppliances(menu);
const filterUstensiles = new FilterUstensiles(menu);
filterUstensiles.start();
//filterAppliances.start();

