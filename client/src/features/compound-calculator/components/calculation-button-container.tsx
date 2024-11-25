/**
 * Created by tkdgu:박상현 on 2024-11-26
 */
import { Button } from '@/components/ui/button.tsx';
import { useRef } from 'react';

export default function CalculationButtonContainer({ onReset }: { onReset: () => void }) {
  const scrollRef = useRef<HTMLButtonElement>(null);

  function handleScrollToTable() {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <div className="flex gap-4">
      <Button
        type={'submit'}
        size="lg"
        className="w-3/4 text-lg font-semibold"
        ref={scrollRef}
        onClick={handleScrollToTable}
      >
        계산하기
      </Button>
      <Button
        type={'button'}
        variant={'outline'}
        size="lg"
        className="w-1/4 text-lg"
        onClick={onReset}
      >
        초기화
      </Button>
    </div>
  );
}
