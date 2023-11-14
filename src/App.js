import InputView from "./views/InputView.js";
import EventPlanner from "./planner/EventPlanner.js";

class App {
  async run() {
    const inputDate = await InputView.getUserInput(InputView.readDate);
    const inputOrder = await InputView.getUserInput(InputView.readOrder);

    const eventPlanner = new EventPlanner(inputDate, inputOrder);
    eventPlanner.printOrderedMenu();
    eventPlanner.printTotalAmount();
    eventPlanner.printGift();
    eventPlanner.calculateChristmasDiscount();
    eventPlanner.printBenefits();
    eventPlanner.printTotalBenefitAmount();
    eventPlanner.printDiscountedAmount();
    eventPlanner.printBadge();
  }
}

export default App;
