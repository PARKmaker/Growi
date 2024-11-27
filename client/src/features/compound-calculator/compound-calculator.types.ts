/**
 * Created by tkdgu:박상현 on 2024-11-19
 */
import {
  COMPOUND_PERIOD,
  INITIAL_AMOUNT,
  initialAmountVariation,
  INTEREST_RATE,
  MONTHLY_AMOUNT,
} from '@/features/compound-calculator/compound-calculator.const.ts';

type TAmountVariation = typeof initialAmountVariation;

type TCalculateConst =
  | typeof INITIAL_AMOUNT
  | typeof COMPOUND_PERIOD
  | typeof INTEREST_RATE
  | typeof MONTHLY_AMOUNT;

type TReturnCalculateBasic = {
  year: string;
  futureAmount: number;
  returnAmount: number;
  ratePercentage: number;
  initialAmount: number;
  isBasic: boolean;
};

type TReturnCalculateAccumulation = TReturnCalculateBasic & { yearAmount: number };

export type {
  TReturnCalculateBasic,
  TCalculateConst,
  TAmountVariation,
  TReturnCalculateAccumulation,
};
