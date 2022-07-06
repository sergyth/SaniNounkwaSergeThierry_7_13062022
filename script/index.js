import { recipes } from "../../data/recipes.js";
import Menu from "../script/models/Menu.js";
import FilterAppliances from "../script/models/FilterUstensiles.js";
import FilterUstensiles from "../script/models/FilterUstensiles.js";

const menu = new Menu(recipes);
menu.display(recipes);
const filterAppliances = new FilterAppliances(menu);
filterAppliances.start();
const filterUstensiles = new FilterUstensiles(menu);
filterUstensiles.start();

