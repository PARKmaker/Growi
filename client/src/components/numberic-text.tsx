import { NumericFormat } from 'react-number-format';

type NumericTextProps = {
  suffix?: string;
  value: string | number;
};

export default function NumericText({ suffix = '', value }: NumericTextProps) {
  return (
    <div className={'relative w-full'}>
      <NumericFormat
        className={'w-full pr-2 text-right text-sm font-semibold'}
        value={value}
        suffix={suffix}
        thousandSeparator={true}
        allowNegative={false}
      />
    </div>
  );
}
NumericText.displayName = 'NumericText';
