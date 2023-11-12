import { Console } from "@woowacourse/mission-utils";

const OutputView = {
  printMenu(input) {
    Console.print("<주문 메뉴>");
    input.forEach((item) => {
      Console.print(`${item.menu} ${item.count}개`);
    });
  },
};

export default OutputView;
