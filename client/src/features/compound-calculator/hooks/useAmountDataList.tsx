/**
 * Created by tkdgu:박상현 on 2024-11-19
 */
import { useContext } from 'react';
import { AmountDataListContext } from '@/features/compound-calculator/hooks/compound-calculator-provider.tsx';

export function useAmountDataList() {
  const amountData = useContext(AmountDataListContext);

  if (!amountData) {
    throw new Error('Error!, AuthContextProvider 외부에서 AuthContext를 호출할 수 없습니다.');
  }

  return amountData;
}
