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
    function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
      // 엔터시 다음 tab으로 포커스
      if (event.key === 'Enter') {
        event.preventDefault();

        const focusableElements = Array.from(
          document.querySelectorAll<HTMLElement>(
            `input, button, select, textarea, [tabindex]:not([tabindex="-1"])`,
          ),
        ).filter(
          (el) =>
            !el.hasAttribute('disabled') && // Exclude disabled elements
            el.offsetParent !== null && // Exclude hidden elements
            el.tabIndex !== -1, // Exclude tabindex="-1" explicitly
        );

        const currentIndex = focusableElements.indexOf(event.currentTarget);
        const nextElement = focusableElements[currentIndex + 1];

        nextElement?.focus(); // Move focus to the next focusable element
      }
    }

    return (
      <FormItem>
        <FormLabelWithInfo hoverCardContent={hoverCardContent} hoverCardFooter={hoverCardFooter}>
          {children}
        </FormLabelWithInfo>
        <div className={'flex gap-2'}>
          <FormControl>
            <NumericInput
              onKeyDown={handleKeyDown}
              defaultValue={defaultValue}
              maxValue={maxValue}
              {...field}
              ref={ref}
            />
          </FormControl>
        </div>

        <FormMessage />
      </FormItem>
    );
  },
);

export default NumericFormItem;
