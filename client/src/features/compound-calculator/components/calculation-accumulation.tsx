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
import { calculateCompoundInterestBasic } from '@/features/compound-calculator/compound-calculator.utils.ts';
import ValueButtons from '@/features/compound-calculator/components/value-buttons.tsx';
import { useEffect, useRef } from 'react';
import { TCalculateConst } from '@/features/compound-calculator/compound-calculator.types.ts';
import { useAmountDataList } from '@/features/compound-calculator/hooks/useAmountDataList.tsx';

const { initialAmount, compoundPeriod, interestRate, monthlyAmount } = defaultValues;

//
// export default function CalculationAccumulation() {
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>적립식</CardTitle>
//         <CardDescription>매월 추가 투자금, 적립식 복리 계산기</CardDescription>
//       </CardHeader>
//       <CardContent className={'space-y-2'}>
//         <div className={'space-y-1'}>
//           <LabelWithInfo
//             htmlFor={'initial-amount'}
//             hoverCardContent={'최초 투자시 투자금을 입력해주세요.\n(시작금액)'}
//             hoverCardFooter={'최대 1억'}
//           >
//             초기금액 (₩)
//           </LabelWithInfo>
//           <NumericInput
//             defaultValue={1_000_000}
//             value={1_000_000}
//             id={'initial-amount'}
//             suffix={'₩'}
//             maxValue={100_000_000}
//           />
//         </div>
//         <div className={'space-y-1'}>
//           <LabelWithInfo
//             htmlFor={'accumulated-amount'}
//             hoverCardContent={
//               '매월마다 적립할 금액입니다.\n두 번째 달부터 원금에 더해져 계산됩니다.'
//             }
//             hoverCardFooter={'최대 1000만원'}
//           >
//             매월 적립 금액 (₩)
//           </LabelWithInfo>
//           <NumericInput
//             defaultValue={1_000_000}
//             value={1_000_000}
//             id={'accumulated-amount'}
//             suffix={'₩'}
//             maxValue={10_000_000}
//           />
//         </div>
//         <div className={'space-y-1'}>
//           <LabelWithInfo
//             htmlFor={'compound-interest-count'}
//             hoverCardContent={'복리 효과를 누릴 기간입니다.\n투자 기간이라고 볼 수 있습니다.'}
//             hoverCardFooter={'최대 50년'}
//           >
//             복리 기간 (년)
//           </LabelWithInfo>
//           <NumericInput
//             defaultValue={10}
//             value={10}
//             id={'compound-interest-count'}
//             suffix={'년'}
//             maxValue={50}
//           />
//         </div>
//         <div className={'space-y-1'}>
//           <LabelWithInfo
//             htmlFor={'rate'}
//             hoverCardContent={'복리 기간동안 년간 수익률입니다.'}
//             hoverCardFooter={'최대 100%'}
//           >
//             수익률, 이자률 (%)
//           </LabelWithInfo>
//           <NumericInput defaultValue={5} value={5} id={'rate'} suffix={'%'} maxValue={100} />
//         </div>
//       </CardContent>
//       <CardFooter>
//         <Button variant={'outline'}>계산하기</Button>
//       </CardFooter>
//     </Card>
//   );
// }

export default function CalculationBasis() {
  // Todo: url에 초기비용, 기간, 이자율 저장.

  const form = useForm<TAccumulationField>({
    resolver: zodResolver(accumulationFormSchema),
    // 첫 렌더링시에는 "년", "원", "%" 포함이 안되어있지만
    // 값을 입력하면 생김 주의
    defaultValues: {
      [INITIAL_AMOUNT]: initialAmount,
      [MONTHLY_AMOUNT]: monthlyAmount,
      [COMPOUND_PERIOD]: compoundPeriod,
      [INTEREST_RATE]: interestRate,
    },
  });

  // 금액 증감 버튼 클릭시 input에 포커스 하기 위한 ref

  const initialInputRef = useRef<HTMLInputElement>(null);
  const monthlyAmountInputRef = useRef<HTMLInputElement>(null);
  const periodInputRef = useRef<HTMLInputElement>(null);
  const rateInputRef = useRef<HTMLInputElement>(null);

  function handleInputFocus(buttonType: TCalculateConst) {
    if (
      !initialInputRef.current ||
      !periodInputRef.current ||
      !rateInputRef.current ||
      !monthlyAmountInputRef.current
    ) {
      return;
    }

    switch (buttonType) {
      case INITIAL_AMOUNT:
        initialInputRef.current.focus();
        return;
      case MONTHLY_AMOUNT:
        monthlyAmountInputRef.current.focus();
        return;
      case COMPOUND_PERIOD:
        periodInputRef.current.focus();
        return;
      case INTEREST_RATE:
        rateInputRef.current.focus();
        return;
    }
  }

  const { setAmountDataList } = useAmountDataList();

  useEffect(() => {
    // 첫 렌더링때 기본값으로 초기화
    const amounts = calculateCompoundInterestBasic(initialAmount, compoundPeriod, interestRate);

    setAmountDataList(amounts);
  }, []);

  function onSubmit(values: TAccumulationField) {
    const initial = values['initial-amount'] as number;
    const period = values['compound-period'] as number;
    const rate = values['interest-rate'] as number;

    const amounts = calculateCompoundInterestBasic(initial, period, rate);

    setAmountDataList(amounts);
  }

  const scrollRef = useRef<HTMLButtonElement>(null);

  function handleScrollToTable() {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
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
                    maxValue={100_000_000}
                    onFocusClick={() => handleInputFocus(INITIAL_AMOUNT)}
                    isPercent={false}
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
                    hoverCardFooter={'최대 1000만원'}
                    suffix={'원'}
                    maxValue={10_000_000}
                    required={true}
                    {...field}
                    ref={monthlyAmountInputRef}
                  >
                    매월 적립 금액 (₩)
                  </NumericFormItem>
                  <ValueButtons
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
                    maxValue={100}
                    onFocusClick={() => handleInputFocus(INTEREST_RATE)}
                    field={field}
                    variation={compoundRateVariation}
                  />
                </div>
              )}
            />

            <Button type={'submit'} size="lg" ref={scrollRef} onClick={handleScrollToTable}>
              계산하기
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
