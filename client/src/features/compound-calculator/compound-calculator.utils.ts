function deleteComma(string: string) {
  // 문자열에서 ",(컴마)"를 제거한 새로운 문자열을 반환하는 함수

  let newString = string;
  if (string.length > 0) {
    newString = newString.replace(/,/g, '');
  }

  return newString;
}

function deleteLastCharacter(string: string) {
  // 문자열에서 마지막 문자를 제거한 새로운 문자열을 반환하는 함수
  // 마지막 문자가 숫자면 그냥 반환
  // ex) 1,000,000원 => 1,000,000

  let newString = string;

  if (string.length > 1 && isNaN(Number(string.slice(-1)))) {
    newString = newString.slice(0, -1);
  }

  return newString;
}

function deleteCommaAndLastCharacter(string: string) {
  return deleteLastCharacter(deleteComma(string));
}

export function getNumber(value: string) {
  // 컴마, 마지막 문자("원") 삭제후 숫자만 반환하는 함수
  // 1,000,000원 => 1000000
  // 0원 또는 0 => 0
  const string = deleteCommaAndLastCharacter(value);
  return string.length === 0 ? 0 : Number(string);
}

export const initialAmountVariation = {
  maxValue: 100_000_000,
  valueList: [100_000, 1_000_000, 10_000_000],
};

export const compoundPeriodVariation = {
  maxValue: 50,
  valueList: [1, 5, 10],
};

export const compoundRateVariation = {
  maxValue: 100,
  valueList: [1, 5, 10],
};

export type amountVariationType = typeof initialAmountVariation;
