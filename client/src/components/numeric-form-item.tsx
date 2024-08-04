import { FormLabelWithInfo, LabelContentProps } from '@/components/label-with-info.tsx';
import { FormControl, FormItem, FormMessage } from '@/components/ui/form.tsx';
import { NumericInput, NumericInputProps } from '@/components/ui/input.tsx';
import { ControllerRenderProps, FieldValues } from 'react-hook-form';
import * as React from 'react';

type NumericFormItemProps = ControllerRenderProps<FieldValues, string> &
  NumericInputProps &
  LabelContentProps & { children: string };

/**
 * react-hook-form 사용시 suffix(선택), defaultValue, maxValue 속성 필요
 * 나머지는 {...fieid}로 보내주기만 하면 됨
 */
const NumericFormItem = React.forwardRef<HTMLInputElement, NumericFormItemProps>(
  ({ children, hoverCardContent, hoverCardFooter, defaultValue, maxValue, ...field }, ref) => {
    return (
      <FormItem>
        <FormLabelWithInfo hoverCardContent={hoverCardContent} hoverCardFooter={hoverCardFooter}>
          {children}
        </FormLabelWithInfo>
        <FormControl>
          <NumericInput defaultValue={defaultValue} maxValue={maxValue} {...field} ref={ref} />
        </FormControl>
        <FormMessage />
      </FormItem>
    );
  },
);

export default NumericFormItem;
