import { Console } from "@woowacourse/mission-utils";
import OutputView from "../src/views/OutputView.js";

describe("OutputView 테스트", () => {
  beforeEach(() => {
    jest.spyOn(Console, "print").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("printMenu(): 주문 메뉴 출력", () => {
    const input = [
      { 해산물파스타: { price: 35000, category: "메인", count: 2 } },
      { 레드와인: { price: 60000, category: "음료", count: 1 } },
      { 초코케이크: { price: 15000, category: "디저트", count: 1 } },
    ];

    const expectedOutput = [
      "12월 26일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!",
      "<주문 메뉴>",
      "해산물파스타 2개",
      "레드와인 1개",
      "초코케이크 1개",
    ];

    OutputView.printMenu(input);
    expect(Console.print).toHaveBeenCalledTimes(5);

    expectedOutput.forEach((expected) => {
      expect(Console.print).toHaveBeenCalledWith(
        expect.stringContaining(expected)
      );
    });
  });

  test("printTotalOrderAmount(): 총 주문 금액 출력", () => {
    const totalAmount = 120000;
    const expectedOutput = "<할인 전 총주문 금액>\n120,000원";

    OutputView.printTotalOrderAmount(totalAmount);
    expect(Console.print).toHaveBeenCalledWith(
      expect.stringContaining(expectedOutput)
    );
  });

  test("printGiftEvent(): 증정 메뉴 출력", () => {
    const giftAmount = 25000;
    const expectedOutput = "<증정 메뉴>\n샴페인 1개";

    OutputView.printGiftEvent(giftAmount);
    expect(Console.print).toHaveBeenCalledWith(
      expect.stringContaining(expectedOutput)
    );
  });

  test("printEventBenefits(): 혜택 내역 출력", () => {
    const totalDiscount = 30000;
    const benefits = [10000, 0, 20000, 0, 0];

    const expectedOutput = [
      "<혜택 내역>",
      "크리스마스 디데이 할인: -10,000원",
      "주말 할인: -20,000원",
    ];

    OutputView.printEventBenefits(totalDiscount, benefits);
    expect(Console.print).toHaveBeenCalledTimes(3);

    expectedOutput.forEach((expected) => {
      expect(Console.print).toHaveBeenCalledWith(
        expect.stringContaining(expected)
      );
    });
  });

  test("printTotalBenefit(): 총 혜택 금액 출력", () => {
    const totalBenefit = 30000;
    const expectedOutput = "<총혜택 금액>\n-30,000원";

    OutputView.printTotalBenefit(totalBenefit);
    expect(Console.print).toHaveBeenCalledWith(
      expect.stringContaining(expectedOutput)
    );
  });

  test("printDiscountedAmount(): 할인 후 예상 결제 금액 출력", () => {
    const discountedAmount = 90000;
    const expectedOutput = "<할인 후 예상 결제 금액>\n90,000원";

    OutputView.printDiscountedAmount(discountedAmount);
    expect(Console.print).toHaveBeenCalledWith(
      expect.stringContaining(expectedOutput)
    );
  });

  test("printObtainedBadge(): 이벤트 배지 출력", () => {
    const badge = "산타";
    const expectedOutput = "<12월 이벤트 배지>\n산타";

    OutputView.printObtainedBadge(badge);
    expect(Console.print).toHaveBeenCalledWith(
      expect.stringContaining(expectedOutput)
    );
  });
});
