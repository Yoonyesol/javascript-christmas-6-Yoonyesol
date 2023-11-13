import { Console } from "@woowacourse/mission-utils";

const OutputView = {
  printMenu(input) {
    Console.print("\n<주문 메뉴>");

    input.forEach((item) => {
      const menuName = Object.keys(item)[0];
      const count = item[menuName].count;
      Console.print(`${menuName} ${count}개`);
    });
  },

  printTotalOrderAmount(totalAmount) {
    Console.print(
      `\n<할인 전 총주문 금액>\n${totalAmount.toLocaleString("ko-kr")}원`
    );
  },

  printGiftEvent(input) {
    Console.print(`\n<증정 메뉴>\n${input === 0 ? "없음" : "샴페인 1개"}`);
  },

  printEventBenefits(totalDiscount, benefits) {
    const benefitNames = [
      "크리스마스 디데이 할인",
      "평일 할인",
      "주말 할인",
      "특별 할인",
      "증정 이벤트",
    ];

    Console.print(`\n<혜택 내역>`);

    if (totalDiscount === 0) {
      Console.print("없음");
      return;
    }

    for (let i = 0; i < benefits.length; i++) {
      if (benefits[i] !== 0) {
        Console.print(
          `${benefitNames[i]}: -${benefits[i].toLocaleString("ko-kr")}원`
        );
      }
    }
  },

  printTotalBenefit(input) {
    Console.print(`\n<총혜택 금액>\n-${input.toLocaleString("ko-kr")}원`);
  },

  printDiscountedAmount(input) {
    Console.print(
      `\n<할인 후 예상 결제 금액>\n-${input.toLocaleString("ko-kr")}원`
    );
  },
};

export default OutputView;
