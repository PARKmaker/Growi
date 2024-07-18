import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { CalculationResultItem } from '@/components/compound-calculator/index.ts';

export default function CalculationResult() {
  return (
    <Card className={'h-full md:w-[300px]'}>
      <CardHeader>
        <CardTitle>투자 결과</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={'flex flex-col gap-8'}>
          <CalculationResultItem
            className={'text-primary'}
            title={'최종 금액'}
            amount={1000000}
            suffix={'원'}
          />
          <CalculationResultItem
            className={'text-[#F4CE14]'}
            title={'총 투자 수익'}
            amount={1000000}
            suffix={'원'}
          />
          <CalculationResultItem
            className={'text-[#495E57]'}
            title={'총 투자 금액'}
            amount={1000000}
            suffix={'원'}
          />
          <CalculationResultItem
            className={'text-[#45474B]'}
            title={'수익율'}
            amount={100}
            suffix={'%'}
          />
        </div>
      </CardContent>
    </Card>
  );
}
