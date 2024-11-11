/**
 * 복리계산기 (기본) - 컨텐츠
 * @todo: 2024/07/17 폼 연결
 */

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Form, FormField } from '@/components/ui/form.tsx';
import NumericFormItem from '@/components/numeric-form-item.tsx';

import {
  COMPOUND_PERIOD,
  COMPOUND_RATE,
  INITIAL_AMOUNT,
  TCalculateConst,
} from '@/features/compound-calculator/compound-calculator.const.ts';
import {
  formSchema,
  TField,
} from '@/features/compound-calculator/components/calculation-basis-form-schema.ts';
import {
  compoundPeriodVariation,
  compoundRateVariation,
  initialAmountVariation,
} from '@/features/compound-calculator/compound-calculator.utils.ts';
import ValueButtons from '@/features/compound-calculator/components/value-buttons.tsx';
import { useRef } from 'react';

export default function CalculationBasis() {
  const form = useForm<TField>({
    resolver: zodResolver(formSchema),
    // 첫 렌더링시에는 "년", "원", "%" 포함이 안되어있지만
    // 값을 입력하면 생김 주의
    defaultValues: {
      [INITIAL_AMOUNT]: 1000000,
      [COMPOUND_PERIOD]: 10,
      [COMPOUND_RATE]: 5,
    },
  });

  function onSubmit(values: TField) {
    console.log(values);
  }

  function test() {
    console.log(form.getValues(INITIAL_AMOUNT));
    console.log(form.getValues(COMPOUND_PERIOD));
    console.log(form.getValues(COMPOUND_RATE));
  }

  const initialInputRef = useRef<HTMLInputElement>(null);
  const periodInputRef = useRef<HTMLInputElement>(null);
  const rateInputRef = useRef<HTMLInputElement>(null);

  function handleFocus(buttonType: TCalculateConst) {
    if (!initialInputRef.current || !periodInputRef.current || !rateInputRef.current) {
      return;
    }

    switch (buttonType) {
      case INITIAL_AMOUNT:
        initialInputRef.current.focus();
        return;
      case COMPOUND_PERIOD:
        periodInputRef.current.focus();
        return;
      case COMPOUND_RATE:
        rateInputRef.current.focus();
        return;
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>기본(거치식)</CardTitle>
        <CardDescription>최초 투자 후 추가 투자 없이 복리 계산</CardDescription>
      </CardHeader>
      <CardContent className={'space-y-2'}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
            <FormField
              control={form.control}
              name={INITIAL_AMOUNT}
              render={({ field }) => (
                <div className={'space-y-2'}>
                  <NumericFormItem
                    hoverCardContent={'최초 투자시 투자금을 입력해주세요.\n(시작금액)'}
                    hoverCardFooter={'최대 1억'}
                    suffix={'원'}
                    maxValue={100_000_000}
                    required={true}
                    {...field}
                    ref={initialInputRef}
                  >
                    초기금액 (₩)
                  </NumericFormItem>
                  <ValueButtons
                    onFocusClick={() => handleFocus(INITIAL_AMOUNT)}
                    isPercent={false}
                    field={field}
                    variation={initialAmountVariation}
                  />
                </div>
              )}
            />
            <FormField
              control={form.control}
              name={COMPOUND_PERIOD}
              render={({ field }) => (
                <div className={'space-y-2'}>
                  <NumericFormItem
                    hoverCardContent={
                      '복리 효과를 누릴 기간입니다.\n투자 기간이라고 볼 수 있습니다.'
                    }
                    hoverCardFooter={'최대 50년'}
                    suffix={'년'}
                    maxValue={50}
                    required={true}
                    {...field}
                    ref={periodInputRef}
                  >
                    복리 기간 (년)
                  </NumericFormItem>
                  <ValueButtons
                    onFocusClick={() => handleFocus(COMPOUND_PERIOD)}
                    field={field}
                    variation={compoundPeriodVariation}
                  />
                </div>
              )}
            />
            <FormField
              control={form.control}
              name={COMPOUND_RATE}
              render={({ field }) => (
                <div className={'space-y-2'}>
                  <NumericFormItem
                    hoverCardContent={'복리 기간동안 년간 수익률입니다.'}
                    hoverCardFooter={'최대 100%'}
                    suffix={'%'}
                    maxValue={100}
                    required={true}
                    {...field}
                    ref={rateInputRef}
                  >
                    수익률, 이자률 (%)
                  </NumericFormItem>
                  <ValueButtons
                    onFocusClick={() => handleFocus(COMPOUND_RATE)}
                    field={field}
                    variation={compoundRateVariation}
                  />
                </div>
              )}
            />

            <Button type={'submit'} variant={'outline'} onClick={test}>
              계산하기
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
