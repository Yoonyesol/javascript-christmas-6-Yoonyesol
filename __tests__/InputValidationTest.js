import InputValidation from "../src/utils/InputValidation.js";

describe("InputValidation 테스트", () => {
  test("checkEmpty(): 빈 문자열 처리", () => {
    expect(() => InputValidation.checkEmpty("")).toThrow();
  });

  test("checkNonNumeric(): 숫자가 아닌 입력 처리", () => {
    expect(() => InputValidation.checkNonNumeric("abc")).toThrow();
  });

  test("checkValidDate(): 유효하지 않은 날짜 처리", () => {
    expect(() => InputValidation.checkValidDate("32")).toThrow();
    expect(() => InputValidation.checkValidDate("-1")).toThrow();
  });

  test("checkValidOrderFormat(): 주문 포맷 체크", () => {
    expect(() =>
      InputValidation.checkValidOrderFormat("초코케이크-2,바비큐립-1")
    ).not.toThrow();
    expect(() =>
      InputValidation.checkValidOrderFormat(
        "초코케이크-2,  바비큐립-1,  레드와인-1"
      )
    ).not.toThrow();
    expect(() => InputValidation.checkValidOrderFormat("초코케이크")).toThrow();
    expect(() => InputValidation.checkValidOrderFormat(" ")).toThrow();
    expect(() =>
      InputValidation.checkValidOrderFormat("초코케이크-2,제로콜라,바비큐립-1")
    ).toThrow();
  });

  test("checkMenuExistence(): 존재하지 않는 메뉴 처리", () => {
    expect(() =>
      InputValidation.checkMenuExistence("우테코식당특별메뉴")
    ).toThrow();
  });

  test("checkDuplicateMenu(): 중복된 메뉴 처리.", () => {
    const orderItems = [
      { menu: "바비큐립", count: 2 },
      { menu: "초코케이크", count: 1 },
      { menu: "바비큐립", count: 3 },
    ];

    expect(() => InputValidation.checkDuplicateMenu(orderItems)).toThrow();
  });

  test("checkNegativeMenuCount(): 음수 메뉴 개수 처리", () => {
    expect(() => InputValidation.checkNegativeMenuCount(-1)).toThrow();
  });

  test("validateDate(): 유효한 날짜 반환", () => {
    const validatedDate = InputValidation.validateDate("15");
    expect(validatedDate).toBe(15);
  });

  test("validateOrder(): 유효한 주문 반환", () => {
    const validatedOrder =
      InputValidation.validateOrder("티본스테이크-2,바비큐립-1");
    expect(validatedOrder).toEqual([
      { menu: "티본스테이크", count: 2 },
      { menu: "바비큐립", count: 1 },
    ]);
  });

  test("validateOrder(): 유효하지 않은 주문(음료만 주문)", () => {
    expect(() =>
      InputValidation.validateOrder("레드와인-1, 제로콜라-2")
    ).toThrowError();
  });

  test("validateOrder(): 유효하지 않은 주문(20개 초과 메뉴 주문)", () => {
    expect(() =>
      InputValidation.validateOrder("레드와인-19, 초코케이크-2")
    ).toThrowError();
  });

  test("validateOrder(): 유효한 주문(20개 이하의 메뉴 주문)", () => {
    expect(() =>
      InputValidation.validateOrder("레드와인-19, 초코케이크-1")
    ).not.toThrowError();
  });
});
