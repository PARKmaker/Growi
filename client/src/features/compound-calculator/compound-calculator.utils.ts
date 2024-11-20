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
  const years = Array.from({ length: compoundPeriod }, (_, i) => i + 1);
  const amounts = years.map((year) => {
    const yearRate = interestRate / 100;
    const returnRate = Math.pow(1 + yearRate, year); // 수익률

    // F = P(1+r)^n => F: 미래가치, P: 현재 가치, r: 이율, n: 기간
    const futureAmount = roundUpByThousand(initialAmount * returnRate);
    const returnAmount = roundUpByThousand(futureAmount - initialAmount);
    const ratePercentage = convertRateToPercentage(returnRate);

    return { year, futureAmount, returnAmount, ratePercentage };
  });

  return amounts;
}

export function calculateCompoundInterestAccumulation(
  initialAmount: number,
  compoundPeriod: number,
  interestRate: number,
  monthlyAmount: number,
) {
  const years = Array.from({ length: compoundPeriod }, (_, i) => i + 1);
  const monthlyRate = interestRate / 12 / 100;
  const monthsPerYear = 12;
  let currentAmount = initialAmount;
  const yearlyAmount = monthlyAmount * monthsPerYear;

  const amounts = years.map((year) => {
    for (let month = 1; month <= monthsPerYear; month++) {
      currentAmount = currentAmount + monthlyAmount;
      currentAmount = currentAmount * (1 + monthlyRate);
    }

    const yearAmount = initialAmount + yearlyAmount * year; // 투자액
    const annualReturnRate = (currentAmount - yearAmount) / yearAmount + 1; // 수익률

    const futureAmount = roundUpByThousand(currentAmount); // 최종 금액
    const returnAmount = roundUpByThousand(currentAmount - yearAmount); // 수익금
    const ratePercentage = convertRateToPercentage(annualReturnRate);

    return {
      year,
      ratePercentage,
      returnAmount,
      futureAmount,
      yearAmount,
    };
  });

  // console.log(amounts);

  return amounts;

  // const amounts = years.map((year) => {
  //   const returnRate = Math.pow(1 + yearRate, year); // 수익률
  //   const yearAmount = year * monthlyAmount * 12 + initialAmount;
  //
  //   // F = P(1+r)^n => F: 미래가치, P: 현재 가치, r: 이율, n: 기간
  //   const futureAmount = roundUpByThousand(yearAmount * returnRate);
  //   const returnAmount = roundUpByThousand(futureAmount - yearAmount);
  //   const ratePercentage = convertRateToPercentage(returnRate);
  //   return { year, futureAmount, yearAmount, returnAmount, ratePercentage };
  // });
  //
  // return amounts;
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
}
