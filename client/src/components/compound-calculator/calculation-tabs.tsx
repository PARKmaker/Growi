import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx';
import {
  CalculationTabsContentAccumulation,
  CalculationTabsContentBasis,
} from '@/components/compound-calculator/index.ts';

export default function CalculationTabs() {
  return (
    <Tabs defaultValue={'기본'} className={'md:w-[650px]'}>
      <TabsList className={'grid w-full grid-cols-2'}>
        <TabsTrigger value={'기본'}>기본(거치식)</TabsTrigger>
        <TabsTrigger value={'적립식'}>적립식</TabsTrigger>
      </TabsList>
      <CalculationTabsContentBasis />
      <CalculationTabsContentAccumulation />
    </Tabs>
  );
}
