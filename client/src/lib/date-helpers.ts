/**
 * Created by tkdgu:박상현 on 2024-11-27
 */

export function dateShortISO(date: Date) {
  // "2024-02-20" 형식의 문자열을 반환하는 함수

  const newDate = new Date(date);
  const offset = newDate.getTimezoneOffset() * 60000; //ms단위라 60000곱해줌
  const dateOffset = new Date(newDate.getTime() - offset);

  return dateOffset.toISOString().split('T')[0];
}
