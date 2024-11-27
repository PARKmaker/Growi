/**
 * Created by tkdgu:박상현 on 2024-11-19
 */
import { createContext, useState } from 'react';
import {
  TReturnCalculateAccumulation,
  TReturnCalculateBasic,
} from '@/features/compound-calculator/compound-calculator.types.ts';

type TReturnCalculate = TReturnCalculateBasic[] | TReturnCalculateAccumulation[];

type AmountDataListContextValue = {
  amountDataList: TReturnCalculate;
  setAmountDataList: (amountDataList: TReturnCalculate) => void;
};

export const AmountDataListContext = createContext<AmountDataListContextValue | null>(null);

const initialAmountData: TReturnCalculateBasic | TReturnCalculateAccumulation = {
  year: '1',
  futureAmount: 0,
  returnAmount: 0,
  ratePercentage: 0,
  yearAmount: 0,
  initialAmount: 0,
  isBasic: true,
};

export function AmountDataListContextProvider({ children }: React.PropsWithChildren<object>) {
  const [amountDataList, setAmountDataListRaw] = useState<TReturnCalculate>([initialAmountData]);

  function setAmountDataList(amountDataList: TReturnCalculate) {
    setAmountDataListRaw(amountDataList);
  }

  return (
    <AmountDataListContext.Provider value={{ amountDataList, setAmountDataList }}>
      {children}
    </AmountDataListContext.Provider>
  );
}
