/**
 * Created by tkdgu:박상현 on 2024-11-08
 * 퍼센트(%), 금액($) 등을 증감(+, -) 할 수 있는 두개의 버튼 컴포넌트
 * @constructor
 */

import { getNumber } from '@/features/compound-calculator/compound-calculator.utils.ts';
import { Button } from '@/components/ui/button.tsx';
import { TAmountVariation } from '@/features/compound-calculator/compound-calculator.types.ts';

type TSuffix = 'won' | 'percentage' | 'year';

type ValueButtonsProps = {
  field: any;
  variation: TAmountVariation;
  onFocusClick: () => void;
  maxValue: number;
  suffix: TSuffix;
};

function makeButtonText(value: number, suffix: TSuffix) {
  switch (suffix) {
    case 'won':
      return `${value / 10000}만`;
    case 'percentage':
      return `${value}만`;
    case 'year':
      return `${value}년`;
    default:
      return `${value}`;
  }
}

export default function ValueButtonsInner({
  field,
  variation,
  onFocusClick,
  maxValue,
  suffix,
}: ValueButtonsProps) {
  return (
    // <div className={'flex justify-end gap-6'}>
    <div className={'flex justify-end gap-1 sm:gap-6 lg:justify-between'}>
      {variation.valueList.map((value) => {
        return (
          <div className={'flex w-1/3 gap-1'} key={`variation-${value}`}>
            <Button
              className="hidden h-8 w-full sm:block"
              size={'sm'}
              variant={'secondary'}
              type={'submit'}
              onClick={() => {
                const currentValue = getNumber(String(field.value));

                field.onChange(currentValue - value < 0 ? 0 : currentValue - value);
                onFocusClick();
              }}
            >
              -{makeButtonText(value, suffix)}
            </Button>
            <Button
              className="h-8 w-full"
              size={'sm'}
              variant={'secondary'}
              type={'submit'}
              onClick={() => {
                const currentValue = getNumber(String(field.value));

                field.onChange(currentValue + value > maxValue ? maxValue : currentValue + value);
                onFocusClick();
              }}
            >
              +{makeButtonText(value, suffix)}
            </Button>
          </div>
        );
      })}
    </div>
  );
}
