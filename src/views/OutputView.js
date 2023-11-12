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
};

export default OutputView;
