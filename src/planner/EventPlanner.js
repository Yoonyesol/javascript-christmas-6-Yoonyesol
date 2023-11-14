import OutputView from "../views/OutputView.js";
import { menuList, badgeList } from "./eventData.js";
import DateUtils from "../utils/DateUtils.js";
import { EVENT_RULE, RESULT } from "../utils/constants.js";

class EventPlanner {
  #date;
  #isWeekend;
  #orderedList;
  #totalAmount;
  #discount;
  #totalDiscount;
  #selectedBadge;

  constructor(date, order) {
    this.#date = date;
    this.#isWeekend = false;
    this.#orderedList = [];
    this.#totalAmount = 0;
    this.#discount = {
      christmasDiscount: 0,
      weekdayDiscount: 0,
      weekendDiscount: 0,
      specialDiscount: 0,
      gift: 0,
    };
    this.#totalDiscount = 0;
    this.#selectedBadge = RESULT.none;
    this.#updateOrderedMenu(order);
    this.#calculateDayOfWeek();
  }

  #updateOrderedMenu(order) {
    order.forEach((item) => {
      const { price, category } = menuList[item.menu];
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

    if (this.#totalAmount >= EVENT_RULE.minAmountForGift) {
      this.#discount.gift = menuList[EVENT_RULE.giftMenu].price;
    }

    return this.#totalAmount;
  }

  #calculateDayOfWeek() {
    if (EVENT_RULE.weekendDays.includes(DateUtils.getDayOfWeek(this.#date))) {
      this.#isWeekend = true;
    }
  }

  #calculateWeekdayOrWeekendDiscount(category, count) {
    if (this.#isWeekend && category === EVENT_RULE.weekendDiscountCategory) {
      this.#discount.weekendDiscount = EVENT_RULE.weekDiscountAmount * count;
    }

    if (!this.#isWeekend && category === EVENT_RULE.weekdayDiscountCategory) {
      this.#discount.weekdayDiscount = EVENT_RULE.weekDiscountAmount * count;
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

  #calculateSpecialDiscount() {
    if (
      this.#date === EVENT_RULE.specialDiscountDay[0] ||
      DateUtils.getDayOfWeek(this.#date) === EVENT_RULE.specialDiscountDay[1]
    ) {
      this.#discount.specialDiscount = EVENT_RULE.specialDiscountAmount;
    }
  }

  #calculateBadge() {
    for (const { amount, badge } of badgeList) {
      if (this.#totalDiscount >= amount) {
        this.#selectedBadge = badge;
        return;
      }
    }
  }

  printOrderedMenu() {
    OutputView.printMenu(this.#date, this.#orderedList);
  }

  printTotalAmount() {
    const amount = this.#calculateTotalAmount();
    OutputView.printTotalOrderAmount(amount);
  }

  printGift() {
    OutputView.printGiftEvent(this.#discount.gift);
  }

  calculateChristmasDiscount() {
    if (
      this.#date >= EVENT_RULE.christmasDiscountDuration[0] &&
      this.#date <= EVENT_RULE.christmasDiscountDuration[1]
    ) {
      const christmasDiscount =
        EVENT_RULE.christmasDiscountAmount +
        (this.#date - 1) * EVENT_RULE.dailyIncrement;
      this.#discount.christmasDiscount = christmasDiscount;
    }
  }

  printBenefits() {
    if (this.#totalAmount >= EVENT_RULE.minEventAmount) {
      this.#calculateSpecialDiscount();
      const benefitList = this.#calculateBenefits();
      OutputView.printEventBenefits(this.#totalDiscount, benefitList);
      return;
    }
    OutputView.printEventBenefits(0, [0, 0, 0, 0, 0]);
  }

  printTotalBenefitAmount() {
    OutputView.printTotalBenefit(this.#totalDiscount);
  }

  printDiscountedAmount() {
    const discountedAmount =
      this.#totalAmount - (this.#totalDiscount - this.#discount.gift);
    OutputView.printDiscountedAmount(discountedAmount);
  }

  printBadge() {
    this.#calculateBadge();
    OutputView.printObtainedBadge(this.#selectedBadge);
  }
}

export default EventPlanner;
