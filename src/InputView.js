import { Console } from "@woowacourse/mission-utils";
import InputValidation from "./utils/inputValidation.js";

const InputView = {
  async getUserInput(inputFunction) {
    let userInput;
    while (true) {
      try {
        userInput = await inputFunction();
        break;
      } catch (error) {
        Console.print(error.message);
      }
    }
    return userInput;
  },

  async readDate() {
    const inputDate = await Console.readLineAsync(
      `12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)\n`
    );
    const validatedDate = InputValidation.validateDate(inputDate);
    return validatedDate;
  },
};

export default InputView;
