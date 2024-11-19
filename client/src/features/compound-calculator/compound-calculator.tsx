import { CalculationResult, CalculationTable } from '@/features/compound-calculator/components';
import CalculationTaps from './components/calculation-taps.tsx';
import { AmountDataListContextProvider } from '@/features/compound-calculator/hooks/compound-calculator-provider.tsx';

export default function CompoundCalculator() {
  return (
    <AmountDataListContextProvider>
      <section className={'flex flex-col gap-4'}>
        <div className="flex flex-col justify-center gap-4 lg:flex-row">
          <div className="lg:w-[700px]">
            <CalculationTaps />
          </div>
          <div className="lg:w-[350px]">
            <CalculationResult />
          </div>
        </div>
        <div className="mx-auto overflow-hidden rounded-md border lg:w-[1066px]">
          <CalculationTable />
        </div>
      </section>
    </AmountDataListContextProvider>
  );
}
