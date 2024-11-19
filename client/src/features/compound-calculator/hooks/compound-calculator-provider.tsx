/**
 * Created by tkdgu:박상현 on 2024-11-19
 */
import { createContext, useState } from 'react';
import { TReturnCalculateBasic } from '@/features/compound-calculator/compound-calculator.types.ts';

type AmountDataListContextValue = {
  amountDataList: TReturnCalculateBasic[];
  setAmountDataList: (amountDataList: TReturnCalculateBasic[]) => void;
};

export const AmountDataListContext = createContext<AmountDataListContextValue | null>(null);

const initialAmountData: TReturnCalculateBasic = {
  futureAmount: 1123124000,
  returnAmount: 0,
  convertedReturnRate: 0,
};

export function AmountDataListContextProvider({ children }: React.PropsWithChildren<object>) {
  const [amountDataList, setAmountDataListRaw] = useState<TReturnCalculateBasic[]>([
    initialAmountData,
  ]);

  function setAmountDataList(amountDataList: TReturnCalculateBasic[]) {
    setAmountDataListRaw(amountDataList);
  }

  return (
    <AmountDataListContext.Provider value={{ amountDataList, setAmountDataList }}>
      {children}
    </AmountDataListContext.Provider>
  );
}
