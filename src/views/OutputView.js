import { Console } from "@woowacourse/mission-utils";
import { benefitNames } from "../planner/eventData.js";
import { EVENT_RULE, RESULT } from "../utils/constants.js";

const OutputView = {
  printStart(date) {
    Console.print(RESULT.startMessage.replace("${date}", date));
  },

  printMenu(date, input) {
    this.printStart(date);

    Console.print(RESULT.orderMenuTitle);

    input.forEach((item) => {
      const menuName = Object.keys(item)[0];
      const count = item[menuName].count;
      Console.print(`${menuName} ${count}개`);
    });
  },

  printTotalOrderAmount(totalAmount) {
    Console.print(
      `${RESULT.totalOrderAmountTitle}\n${totalAmount.toLocaleString(
        "ko-kr"
      )}원`
    );
  },

  printGiftEvent(input) {
    Console.print(
      `${RESULT.giftMenuTitle}\n${
        input === 0
          ? RESULT.none
          : `${EVENT_RULE.giftMenu} ${EVENT_RULE.giftCount}개`
      }`
    );
  },

  printEventBenefits(totalDiscount, benefits) {
    Console.print(RESULT.benefitsTitle);

    if (totalDiscount === 0) {
      Console.print(RESULT.none);
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
    Console.print(
      `${RESULT.totalBenefitAmountTitle}\n${
        input === 0 ? "" : "-"
      }${input.toLocaleString("ko-kr")}원`
    );
  },

  printDiscountedAmount(input) {
    Console.print(
      `${RESULT.discountedAmountTitle}\n${input.toLocaleString("ko-kr")}원`
    );
  },

  printObtainedBadge(badge) {
    Console.print(`${RESULT.badgeTitle}\n${badge}`);
  },
};

export default OutputView;
