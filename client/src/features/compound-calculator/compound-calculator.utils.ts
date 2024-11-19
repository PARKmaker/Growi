import { TReturnCalculateBasic } from '@/features/compound-calculator/compound-calculator.types.ts';

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

function roundUpByThousand(amount: number) {
  // 만 단위 반올림 함수
  return Math.round(amount / 10_000) * 10_000;
}

function convertRateToPercentage(rate: number) {
  // return ((returnRate - 1) * 100).toFixed(2); // 2자리까지

  return Number(((rate - 1) * 100).toFixed(0)); // 정수만
}

export function calculateCompoundInterestBasic(
  initialAmount: number,
  compoundPeriod: number,
  interestRate: number,
): TReturnCalculateBasic[] {
  const years = Array.from({ length: compoundPeriod }, (_, i) => i);
  const amounts = years.map((year) => {
    const yearRate = interestRate / 100;
    const returnRate = Math.pow(1 + yearRate, year + 1); // 수익률
    const convertedReturnRate = convertRateToPercentage(returnRate);

    // F = P(1+r)^n => F: 미래가치, P: 현재 가치, r: 이율, n: 기간
    const futureAmount = roundUpByThousand(initialAmount * returnRate);
    const returnAmount = roundUpByThousand(futureAmount - initialAmount);

    return { futureAmount, returnAmount, convertedReturnRate };
  });

  return amounts;
}

export function calculateCompoundInterestAccumulation(
  initialAmount: number,
  compoundPeriod: number,
  interestRate: number,
  monthlyAmount: number,
) {
  const years = Array.from({ length: compoundPeriod }, (_, i) => i);
  const amounts = years.map((year) => {
    const monthlyRate = interestRate / 100 / 12;
    const months = (year + 1) * 12;
    let futureValue = initialAmount * Math.pow(1 + monthlyRate, months);
    for (let i = 1; i <= months; i++) {
      futureValue += monthlyAmount * Math.pow(1 + monthlyRate, months - i);
    }

    return Math.round(futureValue / 10_000) * 10_000;
  });
  //
  // const tableData = years.map((year, index) => {
  //   const finalAmount = amounts[index];
  //   const profitAmount = finalAmount - (initialAmount + monthlyAmount * 12 * year);
  //   const rateOfReturn = (finalAmount / (initialAmount + monthlyAmount * 12 * year) - 1) * 100;
  //   return { year, finalAmount, profitAmount, rateOfReturn };
  // });
  //
  // setData({
  //   labels: years,
  //   datasets: [
  //     {
  //       label: 'Compound Interest',
  //       data: amounts,
  //       fill: false,
  //       backgroundColor: 'rgba(75,192,192,0.4)',
  //       borderColor: 'rgba(75,192,192,1)',
  //     },
  //   ],
  // });

  // setTableData(tableData);

  return amounts;
}
