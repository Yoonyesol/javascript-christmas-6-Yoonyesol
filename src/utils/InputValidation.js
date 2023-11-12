const ERRORS = Object.freeze({
  error: "[ERROR]",
  emptyInput: "값이 입력되지 않았습니다. 입력값을 확인해주세요.",
  nonNumeric: "숫자를 입력해주세요.",
  validateDate: "방문 날짜는 1에서 31 사이의 숫자만 입력 가능합니다.",
  negativeNumber: "메뉴 주문 개수는 1 이상이어야 합니다.",
  validateOrderFormat:
    "주문 형식에 맞지 않은 입력입니다. 주문 형식에 맞춰 다시 주문해주세요.",
  notExistMenu: `은(는) 메뉴판에 존재하지 않는 메뉴입니다.`,
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
    if (input < 1 || input > 31) {
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
    const availableMenus = [
      "양송이수프",
      "타파스",
      "시저샐러드",
      "티본스테이크",
      "바비큐립",
      "해산물파스타",
      "크리스마스파스타",
      "초코케이크",
      "아이스크림",
      "제로콜라",
      "레드와인",
      "샴페인",
    ];

    if (!availableMenus.includes(input)) {
      throw new Error(`${ERRORS.error} ${input}${ERRORS.notExistMenu}`);
    }
  }

  static checkDuplicateMenu(orderItems) {
    const menuSet = new Set();
    orderItems.forEach((item) => {
      if (menuSet.has(item.menu)) {
        throw new Error(
          `${ERRORS.error} 중복된 메뉴가 입력되었습니다: ${item.menu}`
        );
      }
      menuSet.add(item.menu);
    });
  }

  static checkNegativeMenuCount(input) {
    if (input < 0) {
      throw new Error(`${ERRORS.error} ${ERRORS.negativeNumber}`);
    }
  }

  static validateDate(input) {
    this.checkEmpty(input);
    this.checkNonNumeric(input);
    this.checkValidDate(input);
    return parseInt(input, 10);
  }

  static validateOrder(input) {
    this.checkEmpty(input);
    this.checkValidOrderFormat(input);

    const orderItems = input.split(",").map((item) => {
      const [menu, count] = item.trim().split("-");

      this.checkMenuExistence(menu);
      this.checkNegativeMenuCount(count);

      return { menu, count: parseInt(count, 10) };
    });

    this.checkDuplicateMenu(orderItems);
    return orderItems;
  }
}

export default InputValidation;