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
};

export default OutputView;
