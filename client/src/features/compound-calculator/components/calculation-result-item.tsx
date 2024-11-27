import { NumericFormat } from 'react-number-format';
import { cn } from '@/lib/utils.ts';
import { formatKoreanWon } from '@/lib/format.ts';

type CalculationResultProps = {
  title: string;
  value: number | string;
  suffix: string;
  className?: string;
};

export default function CalculationResultItem({
  title,
  value,
  suffix,
  className = '',
}: CalculationResultProps) {
  return (
    <div className={'relative flex flex-col'}>
      <span className={'text-sm text-muted-foreground'}>{title}</span>
      <div className={cn('break-words text-2xl font-semibold', className)}>
        {typeof value === 'string' ? value : formatKoreanWon(value)}
        {suffix}
      </div>
      <NumericFormat
        value={value}
        thousandSeparator={true}
        displayType={'text'}
        suffix={suffix}
        className={cn('break-words text-gray-400')}
      />
    </div>
  );
}
