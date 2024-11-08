/**
 * Created by tkdgu:박상현 on 2024-11-08
 */
import {
  amountVariationType,
  getNumber,
} from '@/features/compound-calculator/compound-calculator.utils.ts';
import { Button } from '@/components/ui/button.tsx';
import { ControllerRenderProps } from 'react-hook-form';
import { TField } from './calculation-basis-form-schema.ts';

type AmountButtonsProps<T extends keyof TField> = {
  field: ControllerRenderProps<TField, T>;
  variation: amountVariationType;
  isPercent?: boolean;
};

export default function ValueButtons<T extends keyof TField>({
  field,
  variation,
  isPercent = true,
}: AmountButtonsProps<T>) {
  return (
    <div className={'flex justify-end gap-6'}>
      {variation.valueList.map((value) => {
        return (
          <div className={'space-x-2'} key={`variation-${value}`}>
            <Button
              size={'sm'}
              variant={'secondary'}
              type={'button'}
              onClick={() => {
                const currentValue = getNumber(String(field.value));

                field.onChange(currentValue - value < 0 ? 0 : currentValue - value);
              }}
            >
              -{isPercent ? `${value}%` : `${value / 10000}만`}
            </Button>
            <Button
              size={'sm'}
              variant={'secondary'}
              type={'button'}
              onClick={() => {
                const currentValue = getNumber(String(field.value));

                field.onChange(currentValue + value < 0 ? 0 : currentValue + value);
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
