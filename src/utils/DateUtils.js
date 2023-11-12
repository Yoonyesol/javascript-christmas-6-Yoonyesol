class DateUtils {
  static getDayOfWeek(day) {
    const dayOfWeek = new Date(2023, 12 - 1, day).getDay();
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    return days[dayOfWeek];
  }
}

export default DateUtils;
