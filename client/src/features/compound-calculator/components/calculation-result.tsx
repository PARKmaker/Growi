import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import CalculationResultItem from '@/features/compound-calculator/components/calculation-result-item.tsx';
import { useAmountDataList } from '@/features/compound-calculator/hooks/useAmountDataList.tsx';

export default function CalculationResult() {
  const { amountDataList } = useAmountDataList();
  const lastAmountData = amountDataList[amountDataList.length - 1];

  const { futureAmount, returnAmount, ratePercentage, isBasic, initialAmount, year } =
    lastAmountData;

  let totalInvestmentAmount = initialAmount;
  if (!isBasic && 'yearAmount' in lastAmountData) {
    totalInvestmentAmount = initialAmount + lastAmountData.yearAmount;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>투자 결과</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={'flex flex-col gap-8 text-left'}>
          <CalculationResultItem
            className={'text-primary'}
            title={'최종 금액'}
            amount={futureAmount}
            suffix={'원'}
          />
          <CalculationResultItem
            className={'text-amber-600'}
            title={'총 투자 수익'}
            amount={returnAmount}
            suffix={'원'}
          />

          <CalculationResultItem
            title={'총 투자 금액'}
            amount={totalInvestmentAmount}
            suffix={'원'}
          />

          <CalculationResultItem
            className={'text-primary'}
            title={'수익율'}
            amount={ratePercentage}
            suffix={'%'}
          />
          <CalculationResultItem
            className={'text-black'}
            title={'투자 기간'}
            amount={year}
            suffix={'년'}
          />
        </div>
      </CardContent>
    </Card>
  );
}
