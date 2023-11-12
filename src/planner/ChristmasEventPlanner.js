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
  }

  #calculateTotalAmount() {
    let totalAmount = 0;

    this.#orderedList.forEach((item) => {
      const { price, count } = Object.values(item)[0];
      totalAmount += price * count;
    });

    return totalAmount;
  }

  printOrderedMenu() {
    OutputView.printMenu(this.#orderedList);
  }

  printTotalAmount() {
    const amount = this.#calculateTotalAmount();
    OutputView.printTotalOrderAmount(amount);
  }
}

export default ChristmasEventPlanner;
