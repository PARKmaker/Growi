/**
 * 복리계산기 (기본) - 컨텐츠
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
  INTEREST_RATE,
  INITIAL_AMOUNT,
  initialAmountVariation,
  compoundPeriodVariation,
  compoundRateVariation,
  defaultValues,
} from '@/features/compound-calculator/compound-calculator.const.ts';
import {
  basicFormSchema,
  TBasicField,
} from '@/features/compound-calculator/components/calculation-form-schemas.ts';
import { calculateCompoundInterestBasic } from '@/features/compound-calculator/compound-calculator.utils.ts';
import ValueButtons from '@/features/compound-calculator/components/value-buttons.tsx';
import { useEffect, useRef } from 'react';
import { TCalculateConst } from '@/features/compound-calculator/compound-calculator.types.ts';
import { useAmountDataList } from '@/features/compound-calculator/hooks/useAmountDataList.tsx';
import useLocalStorage from '@/hooks/use-local-storage.tsx';

const { initialAmount, compoundPeriod, interestRate } = defaultValues;

export default function CalculationBasic() {
  const { storedValue, setValue } = useLocalStorage<TBasicField>('defaultValueBasic', {
    [INITIAL_AMOUNT]: null,
    [COMPOUND_PERIOD]: null,
    [INTEREST_RATE]: null,
  });

  const form = useForm<TBasicField>({
    resolver: zodResolver(basicFormSchema),
    // 첫 렌더링시에는 "년", "원", "%" 포함이 안되어있지만
    // 값을 입력하면 생김 주의
    defaultValues: {
      [INITIAL_AMOUNT]: storedValue[INITIAL_AMOUNT] || initialAmount,
      [COMPOUND_PERIOD]: storedValue[COMPOUND_PERIOD] || compoundPeriod,
      [INTEREST_RATE]: storedValue[INTEREST_RATE] || interestRate,
    },
  });

  // 금액 증감 버튼 클릭시 input에 포커스 하기 위한 ref
  const inputRef = useRef<HTMLInputElement[]>([]);

  function handleInputFocus(buttonType: TCalculateConst) {
    if (!inputRef.current || inputRef.current.length < 1) {
      return;
    }

    switch (buttonType) {
      case INITIAL_AMOUNT:
        inputRef.current[0].focus();
        return;
      case COMPOUND_PERIOD:
        inputRef.current[1].focus();
        return;
      case INTEREST_RATE:
        inputRef.current[2].focus();
        return;
    }
  }

  const { setAmountDataList } = useAmountDataList();

  useEffect(() => {
    // 첫 렌더링때 기본값으로 초기화

    const amounts = calculateCompoundInterestBasic(
      storedValue[INITIAL_AMOUNT] || initialAmount,
      storedValue[COMPOUND_PERIOD] || compoundPeriod,
      storedValue[INTEREST_RATE] || interestRate,
    );

    setAmountDataList(amounts);
  }, []);

  function onSubmit(values: TBasicField) {
    setValue(values);

    const initial = values[INITIAL_AMOUNT] as number;
    const period = values[COMPOUND_PERIOD] as number;
    const rate = values[INTEREST_RATE] as number;

    const amounts = calculateCompoundInterestBasic(initial, period, rate);

    setAmountDataList(amounts);
  }

  const scrollRef = useRef<HTMLButtonElement>(null);

  function handleScrollToTable() {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function handleResetValue() {
    form.reset({
      [INITIAL_AMOUNT]: initialAmount,
      [COMPOUND_PERIOD]: compoundPeriod,
      [INTEREST_RATE]: interestRate,
    });
    const amounts = calculateCompoundInterestBasic(initialAmount, compoundPeriod, interestRate);

    setAmountDataList(amounts);
    setValue({
      [INITIAL_AMOUNT]: null,
      [COMPOUND_PERIOD]: null,
      [INTEREST_RATE]: null,
    });
    // console.log(form.getValues());
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
                    hoverCardFooter={'최소 10원, 최대 1억'}
                    suffix={'원'}
                    maxValue={100_000_000}
                    required={true}
                    {...field}
                    ref={(element) => {
                      if (element) {
                        inputRef.current[0] = element;
                      }
                    }}
                  >
                    초기금액 (₩)
                  </NumericFormItem>
                  <ValueButtons
                    maxValue={100_000_000}
                    onFocusClick={() => handleInputFocus(INITIAL_AMOUNT)}
                    suffix={'won'}
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
                    hoverCardFooter={'최소 1년, 최대 50년'}
                    suffix={'년'}
                    maxValue={50}
                    required={true}
                    {...field}
                    ref={(element) => {
                      if (element) {
                        inputRef.current[1] = element;
                      }
                    }}
                  >
                    복리 기간 (년)
                  </NumericFormItem>
                  <ValueButtons
                    suffix={'year'}
                    maxValue={50}
                    onFocusClick={() => handleInputFocus(COMPOUND_PERIOD)}
                    field={field}
                    variation={compoundPeriodVariation}
                  />
                </div>
              )}
            />

            <FormField
              control={form.control}
              name={INTEREST_RATE}
              render={({ field }) => (
                <div className={'space-y-2'}>
                  <NumericFormItem
                    hoverCardContent={'복리 기간동안 년간 수익률입니다.'}
                    hoverCardFooter={'최소 1%, 최대 50%'}
                    suffix={'%'}
                    maxValue={50}
                    required={true}
                    {...field}
                    ref={(element) => {
                      if (element) {
                        inputRef.current[2] = element;
                      }
                    }}
                  >
                    수익률, 이자률 (%)
                  </NumericFormItem>
                  <ValueButtons
                    suffix={'percentage'}
                    maxValue={50}
                    onFocusClick={() => handleInputFocus(INTEREST_RATE)}
                    field={field}
                    variation={compoundRateVariation}
                  />
                </div>
              )}
            />

            <div className="flex gap-4">
              <Button
                type={'button'}
                variant={'outline'}
                size="lg"
                className="w-1/4 text-lg"
                onClick={handleResetValue}
              >
                초기화
              </Button>
              <Button
                type={'submit'}
                size="lg"
                className="w-3/4 text-lg font-semibold"
                ref={scrollRef}
                onClick={handleScrollToTable}
              >
                계산하기
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
