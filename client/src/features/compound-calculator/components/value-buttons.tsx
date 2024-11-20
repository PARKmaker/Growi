/**
 * Created by tkdgu:박상현 on 2024-11-08
 * 퍼센트(%), 금액($) 등을 증감(+, -) 할 수 있는 두개의 버튼 컴포넌트
 * @constructor
 */

import { getNumber } from '@/features/compound-calculator/compound-calculator.utils.ts';
import { Button } from '@/components/ui/button.tsx';
import { ControllerRenderProps } from 'react-hook-form';
import { TField } from './calculation-basis-form-schema.ts';
import { TAmountVariation } from '@/features/compound-calculator/compound-calculator.types.ts';

type ValueButtonsProps<T extends keyof TField> = {
  field: ControllerRenderProps<TField, T>;
  variation: TAmountVariation;
  isPercent?: boolean;
  onFocusClick: () => void;
  maxValue: number;
};

export default function ValueButtonsInner<T extends keyof TField>({
  field,
  variation,
  isPercent = true,
  onFocusClick,
  maxValue,
}: ValueButtonsProps<T>) {
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
              -{isPercent ? `${value}%` : `${value / 10000}만`}
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
              +{isPercent ? `${value}%` : `${value / 10000}만`}
            </Button>
          </div>
        );
      })}
    </div>
  );
}
