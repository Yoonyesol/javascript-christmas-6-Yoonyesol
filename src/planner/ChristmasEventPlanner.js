import OutputView from "../views/OutputView.js";
import { menuList } from "./menu.js";
import DateUtils from "../utils/DateUtils.js";

class ChristmasEventPlanner {
  #date;
  #isWeekend;
  #orderedList;
  #menuList;
  #totalAmount;
  #discount;
  #totalDiscount;

  constructor(date, order) {
    this.#date = date;
    this.#isWeekend = false;
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
    this.#totalDiscount = 0;
    this.#updateOrderedMenu(order);
    this.#calculateDayOfWeek();
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
      const { price, category, count } = Object.values(item)[0];
      this.#totalAmount += price * count;

      this.#calculateWeekdayOrWeekendDiscount(category, count);
    });

    if (this.#totalAmount >= 120000) {
      this.#discount.gift = 25000;
    }

    return this.#totalAmount;
  }

  #calculateChristmasDiscount() {
    if (this.#date >= 1 && this.#date <= 25) {
      const christmasDiscount = 1000 + (this.#date - 1) * 100;
      this.#discount.christmasDiscount = christmasDiscount;
    }
  }

  #calculateDayOfWeek() {
    if (["금", "토"].includes(DateUtils.getDayOfWeek(this.#date))) {
      this.#isWeekend = true;
    }
  }

  #calculateWeekdayOrWeekendDiscount(category, count) {
    if (this.#isWeekend && category === "메인 메뉴") {
      this.#discount.weekendDiscount = 2023 * count;
    }

    if (!this.#isWeekend && category === "디저트") {
      this.#discount.weekdayDiscount = 2023 * count;
    }
  }

  #calculateBenefits() {
    const benefitList = [];

    Object.keys(this.#discount).forEach((key) => {
      const value = this.#discount[key];
      benefitList.push(value);

      this.#totalDiscount += value;
    });

    return benefitList;
  }

  printOrderedMenu() {
    OutputView.printMenu(this.#orderedList);
  }

  printTotalAmount() {
    const amount = this.#calculateTotalAmount();
    OutputView.printTotalOrderAmount(amount);
  }

  printGift() {
    OutputView.printGiftEvent(this.#discount.gift);
  }

  printBenefits() {
    const benefitList = this.#calculateBenefits();
    OutputView.printEventBenefits(this.#totalDiscount, benefitList);
  }

  calculateDiscount() {
    this.#calculateChristmasDiscount();
  }
}

export default ChristmasEventPlanner;
