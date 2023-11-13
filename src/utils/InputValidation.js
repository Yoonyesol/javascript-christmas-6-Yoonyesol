import { menuList } from "../planner/menu.js";

const ERRORS = Object.freeze({
  error: "[ERROR]",
  emptyInput: "값이 입력되지 않았습니다. 입력값을 확인해주세요.",
  nonNumeric: "숫자를 입력해주세요.",
  validateDate: "유효하지 않은 날짜입니다. 다시 입력해 주세요.",
  negativeNumber: "메뉴 주문 개수는 1 이상이어야 합니다.",
  validateOrderFormat: "유효하지 않은 주문입니다. 다시 입력해 주세요.",
  notExistMenu: "은(는) 메뉴판에 존재하지 않는 메뉴입니다.",
  duplicatedMenu: "중복된 메뉴가 입력되었습니다.",
  drinksOnly: "음료만 주문할 수 없습니다.",
  maxMenuCount: "메뉴는 최대 20개까지만 주문 가능합니다.",
});

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
