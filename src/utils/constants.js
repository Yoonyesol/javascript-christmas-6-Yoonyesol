export const EVENT_RULE = Object.freeze({
  minMenuCount: 1,
  maxMenuCount: 20,
  giftMenu: "샴페인",
  giftCount: 1,
  minAmountForGift: 12000,
  weekendDays: ["금", "토"],
  weekendDiscountCategory: "메인 메뉴",
  weekdayDiscountCategory: "디저트",
  weekDiscountAmount: 2023,
  christmasDiscountDuration: [1, 25],
  specialDiscountDay: [25, "일"],
  specialDiscountAmount: 1000,
  christmasDiscountAmount: 1000,
  dailyIncrement: 100,
  minEventAmount: 10000,
});

export const ERRORS = Object.freeze({
  error: "[ERROR]",
  emptyInput: "값이 입력되지 않았습니다. 입력값을 확인해주세요.",
  nonNumeric: "숫자를 입력해주세요.",
  validateDate: "유효하지 않은 날짜입니다. 다시 입력해 주세요.",
  negativeNumber: `메뉴 주문 개수는 ${EVENT_RULE.minMenuCount}개 이상이어야 합니다.`,
  validateOrderFormat: "유효하지 않은 주문입니다. 다시 입력해 주세요.",
  notExistMenu: "은(는) 메뉴판에 존재하지 않는 메뉴입니다.",
  duplicatedMenu: "중복된 메뉴가 입력되었습니다.",
  drinksOnly: "음료만 주문할 수 없습니다.",
  maxMenuCount: `메뉴는 최대 ${EVENT_RULE.maxMenuCount}개까지만 주문 가능합니다.`,
});

export const INPUT_COMMAND = Object.freeze({
  inputDateMessage:
    "안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.\n12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)\n",
  inputOrderMessage:
    "주문하실 메뉴를 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)\n",
});

export const RESULT = Object.freeze({
  startMessage:
    "12월 ${date}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!\n",
  orderMenuTitle: "\n<주문 메뉴>",
  totalOrderAmountTitle: "\n<할인 전 총주문 금액>",
  giftMenuTitle: "\n<증정 메뉴>",
  benefitsTitle: "\n<혜택 내역>",
  totalBenefitAmountTitle: "\n<총혜택 금액>",
  discountedAmountTitle: "\n<할인 후 예상 결제 금액>",
  badgeTitle: "\n<12월 이벤트 배지>",
  none: "없음",
});
