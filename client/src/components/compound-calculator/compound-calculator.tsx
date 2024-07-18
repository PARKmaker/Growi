import { CalculationResult, CalculationTabs } from '@/components/compound-calculator/index.ts';

export default function CompoundCalculator() {
  return (
    <>
      <CalculationTabs />
      <CalculationResult />
    </>
  );
}
