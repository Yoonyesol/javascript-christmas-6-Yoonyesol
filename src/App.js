import { Console } from "@woowacourse/mission-utils";
import InputView from "./views/InputView.js";

class App {
  async run() {
    const inputDate = await InputView.getUserInput(InputView.readDate);
    Console.print(`입력받은 날짜: ${inputDate}`);

    const inputOrder = await InputView.getUserInput(InputView.readOrder);
    inputOrder.forEach((item) => {
      Console.print(`메뉴: ${item.menu}, 개수: ${item.count}`);
    });
  }
}

export default App;
