import InputView from "./views/InputView.js";
import ChristmasEventPlanner from "./planner/ChristmasEventPlanner.js";

class App {
  async run() {
    const inputDate = await InputView.getUserInput(InputView.readDate);
    const inputOrder = await InputView.getUserInput(InputView.readOrder);

    const eventPlanner = new ChristmasEventPlanner(inputDate, inputOrder);
    eventPlanner.printOrderedMenu();
    eventPlanner.printTotalAmount();
    eventPlanner.printGift();
    eventPlanner.calculateDiscount();
    eventPlanner.printBenefits();
  }
}

export default App;
