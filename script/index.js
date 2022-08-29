import { recipes } from "../../data/recipes.js";
import Menu from "../script/models/Menu.js";
import FilterAppliances from "../script/models/FilterAppliances.js";
import FilterUstensiles from "../script/models/FilterUstensiles.js";
import FilterIngredients from "../script/models/FilterIngredients.js";
import MainFilter from "../script/models/MainFilter.js";


const menu = new Menu(recipes);
menu.display(recipes);
const filterAppliances = new FilterAppliances(menu);
const filterIngredients = new FilterIngredients(menu);
const filterUstensiles = new FilterUstensiles(menu);
menu.addFilter(filterIngredients)
menu.addFilter(filterAppliances)
menu.addFilter(filterUstensiles)
// menu.search(filterUstensiles)
// menu.search(filterIngredients)
// menu.search(filterAppliances)
const search = new MainFilter(menu);
search.listenForsearch()


 