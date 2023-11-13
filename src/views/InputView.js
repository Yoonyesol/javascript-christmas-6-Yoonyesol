import { Console } from "@woowacourse/mission-utils";
import InputValidation from "../utils/InputValidation.js";

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
      `안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.\n12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)\n`
    );
    const validatedDate = InputValidation.validateDate(inputDate);
    return validatedDate;
  },

  async readOrder() {
    const inputOrder = await Console.readLineAsync(
      `주문하실 메뉴를 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)\n`
    );
    const validatedOrderItems = InputValidation.validateOrder(inputOrder);
    return validatedOrderItems;
  },
};

export default InputView;
