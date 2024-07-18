import * as React from 'react';

import { cn } from '@/lib/utils';
import { NumericFormat, NumericFormatProps } from 'react-number-format';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

// id, value, defaultValue 필수로
export type NumericInputProps = Required<
  Pick<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'defaultValue'>
> &
  NumericFormatProps &
  React.InputHTMLAttributes<HTMLInputElement> & {
    maxValue: number;
  };

const NumericInput = React.forwardRef<HTMLInputElement, NumericInputProps>(
  ({ suffix = '', maxValue, value, defaultValue, ...props }, ref) => {
    return (
      <div className={'relative w-full'}>
        <NumericFormat
          getInputRef={ref}
          className={'text-right'}
          value={value}
          customInput={Input}
          suffix={suffix}
          defaultValue={defaultValue}
          thousandSeparator={true}
          allowNegative={false}
          isAllowed={(values) => {
            const { floatValue } = values;
            if (floatValue) {
              return 0 < floatValue && floatValue <= maxValue;
            }
            return true;
          }}
          {...props}
        />

        {/*<div className={'absolute end-0 top-10 h-14 w-14 border border-black'}>안녕하세요</div>*/}
      </div>
    );
  },
);
NumericInput.displayName = 'NumericInput';

export { Input, NumericInput };
