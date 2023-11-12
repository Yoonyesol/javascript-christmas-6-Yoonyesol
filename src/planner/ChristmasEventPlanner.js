import OutputView from "../views/OutputView.js";

class ChristmasEventPlanner {
  #date;
  #order;

  constructor(date, order) {
    this.#date = date;
    this.#order = order;
    this.#printOrderedMenu(order);
  }

  #printOrderedMenu(order) {
    OutputView.printMenu(order);
  }
}

export default ChristmasEventPlanner;
