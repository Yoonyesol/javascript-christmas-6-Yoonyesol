import { menuList } from "../planner/eventData.js";
import { ERRORS } from "./constants.js";

class InputValidation {
  static checkEmpty(input) {
    if (input.trim() === "") {
      throw new Error(`${ERRORS.error} ${ERRORS.emptyInput}`);
    }
  }

  static checkNonNumeric(input) {
    if (isNaN(input)) {
      throw new Error(`${ERRORS.error} ${ERRORS.nonNumeric}`);
    }
  }

  static checkValidDate(input) {
    if (isNaN(input) || input < 1 || input > 31) {
      throw new Error(`${ERRORS.error} ${ERRORS.validateDate}`);
    }
  }

  static checkValidOrderFormat(input) {
    const orderFormatRegex =
      /^\s*([가-힣a-zA-Z]+-\d+)(,\s*[가-힣a-zA-Z]+-\d+)*\s*$/;

    if (!orderFormatRegex.test(input)) {
      throw new Error(`${ERRORS.error} ${ERRORS.validateOrderFormat}`);
    }
  }

  static checkMenuExistence(input) {
    if (!Object.keys(menuList).includes(input)) {
      throw new Error(`${ERRORS.error} ${input} ${ERRORS.notExistMenu}`);
    }
  }

  static checkDuplicateMenu(orderItems) {
    const menuSet = new Set();

    orderItems.forEach((item) => {
      if (menuSet.has(item.menu)) {
        throw new Error(`${ERRORS.error} ${ERRORS.duplicatedMenu}.`);
      }
      menuSet.add(item.menu);
    });
  }

  static checkNegativeMenuCount(input) {
    if (input < 0) {
      throw new Error(`${ERRORS.error} ${ERRORS.negativeNumber}`);
    }
  }

  static checkOrderDrinksOnly(input) {
    const containsOnlyDrinks = input.every(
      (item) => menuList[item.menu].category === "음료"
    );
    if (containsOnlyDrinks) {
      throw new Error(`${ERRORS.error} ${ERRORS.drinksOnly}`);
    }
  }

  static checkMaxMenuCount(input) {
    if (input > 20) {
      throw new Error(`${ERRORS.error} ${ERRORS.maxMenuCount}`);
    }
  }

  static validateDate(input) {
    this.checkEmpty(input);
    this.checkValidDate(input);

    return parseInt(input, 10);
  }

  static validateOrder(input) {
    this.checkEmpty(input);
    this.checkValidOrderFormat(input);

    let menuCount = 0;

    const orderItems = input.split(",").map((item) => {
      const [menu, count] = item.trim().split("-");

      this.checkMenuExistence(menu);

      const parsedCount = parseInt(count, 10);
      this.checkNegativeMenuCount(count);

      menuCount += parsedCount;

      return { menu, count: parsedCount };
    });

    this.checkDuplicateMenu(orderItems);
    this.checkOrderDrinksOnly(orderItems);
    this.checkMaxMenuCount(menuCount);

    return orderItems;
  }
}

export default InputValidation;
