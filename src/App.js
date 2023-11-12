import { Console } from "@woowacourse/mission-utils";
import InputView from "./InputView.js";

class App {
  async run() {
    const inputDate = await InputView.getUserInput(InputView.readDate);
    Console.print(`입력받은 날짜: ${inputDate}`);
  }
}

export default App;
