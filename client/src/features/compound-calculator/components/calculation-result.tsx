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
            value={futureAmount}
            suffix={'원'}
          />
          <CalculationResultItem
            className={'text-amber-600'}
            title={'수익'}
            value={returnAmount}
            suffix={'원'}
          />

          <CalculationResultItem title={'투자 금액'} value={totalInvestmentAmount} suffix={'원'} />

          <CalculationResultItem
            className={'text-primary'}
            title={'수익률'}
            value={ratePercentage}
            suffix={'%'}
          />
          <CalculationResultItem title={'투자 기간'} value={year} suffix={'년'} />
        </div>
      </CardContent>
    </Card>
  );
}
