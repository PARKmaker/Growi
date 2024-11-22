import { NumericFormat } from 'react-number-format';
import { cn } from '@/lib/utils.ts';
import { formatCurrencyCompact } from '@/lib/format.ts';

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
      <div className={cn('break-words text-2xl font-semibold', className)}>
        {formatCurrencyCompact(amount).slice(1)}
        {suffix}
      </div>
      <NumericFormat
        value={amount}
        thousandSeparator={true}
        displayType={'text'}
        suffix={suffix}
        className={cn('break-words text-gray-400')}
      />
    </div>
  );
}
