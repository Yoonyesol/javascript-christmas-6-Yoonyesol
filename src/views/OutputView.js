import { Console } from "@woowacourse/mission-utils";

const OutputView = {
  printMenu(input) {
    Console.print("<주문 메뉴>");

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
};

export default OutputView;
