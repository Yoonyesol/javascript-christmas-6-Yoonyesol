const ERRORS = Object.freeze({
  error: "[ERROR]",
  emptyInput: "값이 입력되지 않았습니다. 입력값을 확인해주세요.",
  nonNumeric: "숫자를 입력해주세요.",
  validateDate: "방문 날짜는 1에서 31 사이의 숫자만 입력 가능합니다.",
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

  static validateDate(input) {
    this.checkEmpty(input);
    this.checkNonNumeric(input);
    this.checkValidDate(input);
    return parseInt(input, 10);
  }
}

export default InputValidation;
