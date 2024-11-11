// tabs value
const BASIS = '기본';
const ACCMULATION = '적립식';

// 복리계산기 input name
const INITIAL_AMOUNT = 'initial-amount';
const COMPOUND_PERIOD = 'compound-period';
const COMPOUND_RATE = 'compound-rate';

export type TCalculateConst = typeof INITIAL_AMOUNT | typeof COMPOUND_PERIOD | typeof COMPOUND_RATE;

export { BASIS, ACCMULATION, INITIAL_AMOUNT, COMPOUND_RATE, COMPOUND_PERIOD };
