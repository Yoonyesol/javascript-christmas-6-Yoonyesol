import OutputView from "../views/OutputView.js";
import { menuList } from "./menu.js";

class ChristmasEventPlanner {
  #date;
  #orderedList;
  #menuList;
  #totalAmount;
  #discount;

  constructor(date, order) {
    this.#date = date;
    this.#orderedList = [];
    this.#menuList = menuList;
    this.#totalAmount = 0;
    this.#discount = {
      christmasDiscount: 0,
      weekdayDiscount: 0,
      weekendDiscount: 0,
      specialDiscount: 0,
      gift: 0,
    };
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
    this.#orderedList.forEach((item) => {
      const { price, count } = Object.values(item)[0];
      this.#totalAmount += price * count;
    });

    return this.#totalAmount;
  }

  #calculateChristmasDiscount() {
    if (this.#date >= 1 && this.#date <= 25) {
      const christmasDiscount = 1000 + (this.#date - 1) * 100;
      this.#discount.christmasDiscount = christmasDiscount;
    }
  }

  printOrderedMenu() {
    OutputView.printMenu(this.#orderedList);
  }

  printTotalAmount() {
    const amount = this.#calculateTotalAmount();
    OutputView.printTotalOrderAmount(amount);
  }

  calculateDiscount() {
    this.#calculateChristmasDiscount();
  }
}

export default ChristmasEventPlanner;
