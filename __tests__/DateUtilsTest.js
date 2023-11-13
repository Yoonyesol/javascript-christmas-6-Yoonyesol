import DateUtils from "../src/utils/DateUtils";

describe("DateUtils 테스트", () => {
  test("getDayOfWeek(): 23년 12월 '일수'에 따른 요일 반환", () => {
    expect(DateUtils.getDayOfWeek("8")).toBe("금");
    expect(DateUtils.getDayOfWeek("9")).toBe("토");
    expect(DateUtils.getDayOfWeek("10")).toBe("일");
    expect(DateUtils.getDayOfWeek("19")).toBe("화");
    expect(DateUtils.getDayOfWeek("20")).toBe("수");
    expect(DateUtils.getDayOfWeek("21")).toBe("목");
  });
});
