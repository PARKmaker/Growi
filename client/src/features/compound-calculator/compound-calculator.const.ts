// tabs value
const BASIS = '기본';
const ACCUMULATION = '적립식';

// 복리계산기 input name
const INITIAL_AMOUNT = 'initial-amount'; // 초기 금액
const MONTHLY_AMOUNT = 'monthly-amount'; // 월 정립 금액
const COMPOUND_PERIOD = 'compound-period'; // 복리 기간

const INTEREST_RATE = 'interest-rate'; // 이자율

const defaultValues = {
  initialAmount: 1000000,
  compoundPeriod: 10,
  interestRate: 5,
  monthlyAmount: 1000000,
};

const initialAmountVariation = {
  maxValue: 100_000_000,
  valueList: [100_000, 1_000_000, 10_000_000],
};

const monthlyAmountVariation = {
  maxValue: 10_000_000,
  valueList: [10_000, 100_000, 1_000_000],
};

const compoundPeriodVariation = {
  maxValue: 50,
  valueList: [1, 5, 10],
};

const compoundRateVariation = {
  maxValue: 100,
  valueList: [1, 5, 10],
};

export {
  BASIS,
  ACCUMULATION,
  INITIAL_AMOUNT,
  INTEREST_RATE,
  COMPOUND_PERIOD,
  MONTHLY_AMOUNT,
  initialAmountVariation,
  compoundPeriodVariation,
  compoundRateVariation,
  monthlyAmountVariation,
  defaultValues,
};
