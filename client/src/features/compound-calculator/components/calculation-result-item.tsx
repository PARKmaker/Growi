import { NumericFormat } from 'react-number-format';
import { cn } from '@/lib/utils.ts';

type CalculationResultProps = {
  title: string;
  amount: number;
  suffix: string;
  className?: string;
};

export default function CalculationResultItem({
  title,
  amount,
  suffix,
  className = '',
}: CalculationResultProps) {
  return (
    <div className={'relative flex flex-col'}>
      <span className={'text-sm text-muted-foreground'}>{title}</span>
      <NumericFormat
        value={amount}
        thousandSeparator={true}
        displayType={'text'}
        suffix={suffix}
        className={cn('break-words text-2xl font-semibold', className)}
      />
    </div>
  );
}
