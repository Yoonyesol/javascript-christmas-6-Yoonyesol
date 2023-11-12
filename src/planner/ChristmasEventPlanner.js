import OutputView from "../views/OutputView.js";
import { menuList } from "./menu.js";

class ChristmasEventPlanner {
  #date;
  #orderedList;
  #menuList;

  constructor(date, order) {
    this.#date = date;
    this.#orderedList = [];
    this.#menuList = menuList;
    this.#updateOrderedMenu(order);
  }

  #updateOrderedMenu(order) {
    order.forEach((item) => {
      const { price, category } = this.#menuList[item.menu];
      this.#orderedList.push({
        [item.menu]: { price, category, count: item.count },
      });
    });

    this.#printOrderedMenu(this.#orderedList);
  }

  #printOrderedMenu(orderedList) {
    OutputView.printMenu(orderedList);
  }
}

export default ChristmasEventPlanner;
