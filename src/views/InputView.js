import { Console } from "@woowacourse/mission-utils";
import InputValidation from "../utils/InputValidation.js";
import { INPUT_COMMAND } from "../utils/constants.js";

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
      `${INPUT_COMMAND.inputDateMessage}`
    );
    const validatedDate = InputValidation.validateDate(inputDate);
    return validatedDate;
  },

  async readOrder() {
    const inputOrder = await Console.readLineAsync(
      `${INPUT_COMMAND.inputOrderMessage}`
    );
    const validatedOrderItems = InputValidation.validateOrder(inputOrder);
    return validatedOrderItems;
  },
};

export default InputView;
