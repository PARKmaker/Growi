import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx';
import { ACCUMULATION, BASIS } from '@/features/compound-calculator/compound-calculator.const.ts';
import { useState } from 'react';
import { TReturnCalculateBasic } from '@/features/compound-calculator/compound-calculator.types.ts';
import {
  CalculationAccumulation,
  CalculationBasis,
  CalculationResult,
  CalculationTable,
} from '@/features/compound-calculator/components';

const initialAmountData: TReturnCalculateBasic = {
  futureAmount: 1123124000,
  returnAmount: 0,
  convertedReturnRate: 0,
};

export default function CompoundCalculator() {
  const [amountDataList, setAmountDataList] = useState<TReturnCalculateBasic[]>([
    initialAmountData,
  ]);

  console.log('amountDataList', amountDataList);
  return (
    <section className={'flex flex-col gap-4'}>
      <div className="flex flex-col justify-center gap-4 md:flex-row">
        <Tabs defaultValue={BASIS} className={'md:w-[650px]'}>
          <TabsList className={'grid w-full grid-cols-2'}>
            <TabsTrigger value={BASIS}>기본(거치식)</TabsTrigger>
            <TabsTrigger value={ACCUMULATION}>적립식</TabsTrigger>
          </TabsList>
          <TabsContent value={BASIS}>
            <CalculationBasis />
          </TabsContent>
          <TabsContent value={ACCUMULATION}>
            <CalculationAccumulation />
          </TabsContent>
        </Tabs>
        <CalculationResult />
      </div>
      <div className="rounded-md border">
        <CalculationTable amountDataList={amountDataList} />
      </div>
    </section>
  );
}
