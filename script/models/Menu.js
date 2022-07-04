import RecipeCard from "../views/RecipeCard.js";

class Menu {
    constructor(recipes) {
        this.recipes = recipes;
    }

    display() {
        let htmlCardList = "";
        this.recipes.forEach((recipe) => {
            const card = new RecipeCard(recipe);
            htmlCardList += card.render();
        });
        document.getElementById("recipes-wrapper").innerHTML = htmlCardList;
    }
}

export default Menu;
