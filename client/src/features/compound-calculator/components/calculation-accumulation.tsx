/**
 * 복리계산기 (적립식) - 컨텐츠
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
  MONTHLY_AMOUNT,
  monthlyAmountVariation,
} from '@/features/compound-calculator/compound-calculator.const.ts';
import {
  accumulationFormSchema,
  TAccumulationField,
} from '@/features/compound-calculator/components/calculation-form-schemas.ts';
import { calculateCompoundInterestAccumulation } from '@/features/compound-calculator/compound-calculator.utils.ts';
import ValueButtons from '@/features/compound-calculator/components/value-buttons.tsx';
import { useEffect, useRef } from 'react';
import { TCalculateConst } from '@/features/compound-calculator/compound-calculator.types.ts';
import { useAmountDataList } from '@/features/compound-calculator/hooks/useAmountDataList.tsx';
import useLocalStorage from '@/hooks/use-local-storage.tsx';

const { initialAmount, compoundPeriod, interestRate, monthlyAmount } = defaultValues;

export default function CalculationAccumulation() {
  const { storedValue, setValue } = useLocalStorage<TAccumulationField>('defaultValueAcc', {
    [INITIAL_AMOUNT]: null,
    [MONTHLY_AMOUNT]: null,
    [COMPOUND_PERIOD]: null,
    [INTEREST_RATE]: null,
  });

  const form = useForm<TAccumulationField>({
    resolver: zodResolver(accumulationFormSchema),
    // 첫 렌더링시에는 "년", "원", "%" 포함이 안되어있지만
    // 값을 입력하면 생김 주의
    defaultValues: {
      [INITIAL_AMOUNT]: storedValue[INITIAL_AMOUNT] || initialAmount,
      [MONTHLY_AMOUNT]: storedValue[MONTHLY_AMOUNT] || monthlyAmount,
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
      case MONTHLY_AMOUNT:
        inputRef.current[1].focus();
        return;
      case COMPOUND_PERIOD:
        inputRef.current[2].focus();
        return;
      case INTEREST_RATE:
        inputRef.current[3].focus();
        return;
    }
  }

  const { setAmountDataList } = useAmountDataList();

  useEffect(() => {
    // 첫 렌더링때 기본값으로 초기화
    const amounts = calculateCompoundInterestAccumulation(
      storedValue[INITIAL_AMOUNT] || initialAmount,
      storedValue[COMPOUND_PERIOD] || compoundPeriod,
      storedValue[INTEREST_RATE] || interestRate,
      storedValue[MONTHLY_AMOUNT] || monthlyAmount,
    );

    setAmountDataList(amounts);
  }, []);

  function onSubmit(values: TAccumulationField) {
    const initial = values[INITIAL_AMOUNT] as number;
    const period = values[COMPOUND_PERIOD] as number;
    const rate = values[INTEREST_RATE] as number;
    const monthlyAmount = values[MONTHLY_AMOUNT] as number;
    const amounts = calculateCompoundInterestAccumulation(initial, period, rate, monthlyAmount);

    setAmountDataList(amounts);
    setValue(values);
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
      [MONTHLY_AMOUNT]: monthlyAmount,
    });

    const amounts = calculateCompoundInterestAccumulation(
      initialAmount,
      compoundPeriod,
      interestRate,
      monthlyAmount,
    );

    setAmountDataList(amounts);
    setValue({
      [INITIAL_AMOUNT]: null,
      [MONTHLY_AMOUNT]: null,
      [COMPOUND_PERIOD]: null,
      [INTEREST_RATE]: null,
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>적립식</CardTitle>
        <CardDescription>매월 추가 투자금, 적립식 복리 계산기</CardDescription>
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
                    // ref={initialInputRef}
                    ref={(element) => {
                      if (element) {
                        inputRef.current[0] = element;
                      }
                    }}
                  >
                    초기금액 (₩)
                  </NumericFormItem>
                  <ValueButtons
                    suffix={'won'}
                    maxValue={100_000_000}
                    onFocusClick={() => handleInputFocus(INITIAL_AMOUNT)}
                    field={field}
                    variation={initialAmountVariation}
                  />
                </div>
              )}
            />

            <FormField
              control={form.control}
              name={MONTHLY_AMOUNT}
              render={({ field }) => (
                <div className={'space-y-2'}>
                  <NumericFormItem
                    hoverCardContent={
                      '매월마다 적립할 금액입니다.\n두 번째 달부터 원금에 더해져 계산됩니다.'
                    }
                    hoverCardFooter={'최소 10원, 최대 1000만원'}
                    suffix={'원'}
                    maxValue={10_000_000}
                    required={true}
                    {...field}
                    ref={(element) => {
                      if (element) {
                        inputRef.current[1] = element;
                      }
                    }}
                  >
                    매월 적립 금액 (₩)
                  </NumericFormItem>
                  <ValueButtons
                    suffix={'won'}
                    maxValue={10_000_000}
                    onFocusClick={() => handleInputFocus(MONTHLY_AMOUNT)}
                    field={field}
                    variation={monthlyAmountVariation}
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
                        inputRef.current[2] = element;
                      }
                    }}
                  >
                    복리 기간 (년)
                  </NumericFormItem>
                  <ValueButtons
                    maxValue={50}
                    onFocusClick={() => handleInputFocus(COMPOUND_PERIOD)}
                    suffix={'year'}
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
                        inputRef.current[3] = element;
                      }
                    }}
                  >
                    수익률, 이자률 (%)
                  </NumericFormItem>
                  <ValueButtons
                    maxValue={50}
                    onFocusClick={() => handleInputFocus(INTEREST_RATE)}
                    suffix={'percentage'}
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
