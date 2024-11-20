/**
 * Created by tkdgu:박상현 on 2024-11-19
 */
import {
  COMPOUND_PERIOD,
  INITIAL_AMOUNT,
  initialAmountVariation,
  INTEREST_RATE,
} from '@/features/compound-calculator/compound-calculator.const.ts';

type TAmountVariation = typeof initialAmountVariation;

type TCalculateConst = typeof INITIAL_AMOUNT | typeof COMPOUND_PERIOD | typeof INTEREST_RATE;

type TReturnCalculateBasic = {
  year: number;
  futureAmount: number;
  returnAmount: number;
  convertedReturnRate: number;
};

export type { TReturnCalculateBasic, TCalculateConst, TAmountVariation };
