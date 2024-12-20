import Container from '@/components/container.tsx';
import {
  CalculationGraph,
  CalculationResult,
  CalculationTable,
  CalculationContentTaps,
} from '@/features/compound-calculator/components';
import { Card } from '@/components/ui/card.tsx';
import { AmountDataListContextProvider } from '@/features/compound-calculator/hooks/compound-calculator-provider.tsx';

export default function CompoundCalculatorPage() {
  return (
    <Container>
      <AmountDataListContextProvider>
        <section className={'flex flex-col gap-4'}>
          <div className="flex flex-col justify-center gap-4 lg:flex-row">
            <div className="lg:w-[700px]">
              <CalculationContentTaps />
            </div>
            <div className="lg:w-[350px]">
              <CalculationResult />
            </div>
          </div>
          <Card className="mx-auto w-full lg:w-[1066px]">
            <CalculationTable />
          </Card>
          <div className="mx-auto w-full lg:w-[1066px]">
            <CalculationGraph />
          </div>
        </section>
      </AmountDataListContextProvider>
    </Container>
  );
}
