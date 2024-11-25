/**
 * Created by tkdgu:박상현 on 2024-11-19
 */
import { ACCUMULATION, BASIS } from '@/features/compound-calculator/compound-calculator.const.ts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx';
import {
  CalculationAccumulation,
  CalculationBasic,
} from '@/features/compound-calculator/components/index.ts';

export default function CalculationContentTabs() {
  return (
    <Tabs defaultValue={BASIS}>
      <TabsList className={'grid w-full grid-cols-2 bg-gray-200 dark:bg-gray-600'}>
        <TabsTrigger value={BASIS}>기본(거치식)</TabsTrigger>
        <TabsTrigger value={ACCUMULATION}>적립식</TabsTrigger>
      </TabsList>
      <TabsContent value={BASIS}>
        <CalculationBasic />
      </TabsContent>
      <TabsContent value={ACCUMULATION}>
        <CalculationAccumulation />
      </TabsContent>
    </Tabs>
  );
}
