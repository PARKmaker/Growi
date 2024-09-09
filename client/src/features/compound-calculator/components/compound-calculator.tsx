import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx';
import { ACCMULATION, BASIS } from '@/features/compound-calculator/compound-calculator.const.ts';
import CalculationBasis from '@/features/compound-calculator/components/calculation-basis.tsx';
import CalculationAccumulation from '@/features/compound-calculator/components/calculation-accumulation.tsx';
import CalculationResult from '@/features/compound-calculator/components/calculation-result.tsx';

export default function CompoundCalculator() {
  return (
    <>
      <Tabs defaultValue={BASIS} className={'md:w-[650px]'}>
        <TabsList className={'grid w-full grid-cols-2'}>
          <TabsTrigger value={BASIS}>기본(거치식)</TabsTrigger>
          <TabsTrigger value={ACCMULATION}>적립식</TabsTrigger>
        </TabsList>
        <TabsContent value={BASIS}>
          <CalculationBasis />
        </TabsContent>
        <TabsContent value={ACCMULATION}>
          <CalculationAccumulation />
        </TabsContent>
      </Tabs>
      <CalculationResult />
    </>
  );
}
