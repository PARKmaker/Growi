import Container from '@/components/container.tsx';
import CompoundCalculator from '@/features/compound-calculator';

export default function CompoundCalculatorPage() {
  return (
    <Container>
      <section className={'flex flex-col justify-center gap-4 md:flex-row'}>
        <CompoundCalculator />
      </section>
    </Container>
  );
}
