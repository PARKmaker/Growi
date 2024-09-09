/**
 * 복리계산기 (기본) - 컨텐츠
 * @todo: 2024/07/17 폼 연결
 */
import { z } from 'zod';
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
} from '@/features/compound-calculator/compound-calculator.const.ts';
import { formSchema } from '@/features/compound-calculator/components/calculation-basis-form-schema.ts';
import {
  compoundPeriodVariation,
  compoundRateVariation,
  getNumber,
  initialAmountVariation,
} from '@/features/compound-calculator/compound-calculator.utils.ts';

export default function CalculationBasis() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // 첫 렌더링시에는 "년", "원", "%" 포함이 안되어있지만
    // 값을 입력하면 생김 주의
    defaultValues: {
      [INITIAL_AMOUNT]: 1000000,
      [COMPOUND_PERIOD]: 10,
      [COMPOUND_RATE]: 5,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  function test() {
    console.log(form.getValues(INITIAL_AMOUNT));
    console.log(form.getValues(COMPOUND_PERIOD));
    console.log(form.getValues(COMPOUND_RATE));
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
                  >
                    초기금액 (₩)
                  </NumericFormItem>
                  <div className={'flex justify-end gap-6'}>
                    {initialAmountVariation.valueList.map((value) => {
                      return (
                        <div className={'space-x-2'} key={`variation-${value}`}>
                          <Button
                            size={'sm'}
                            variant={'secondary'}
                            type={'button'}
                            onClick={() => {
                              field.onChange((prevValue: string | number) => {
                                const currentValue = getNumber(String(prevValue));

                                return currentValue - value < 0 ? 0 : currentValue - value;
                              });
                            }}
                          >
                            -{value / 10000}만
                          </Button>
                          <Button
                            size={'sm'}
                            variant={'secondary'}
                            type={'button'}
                            onClick={() => {
                              field.onChange((prevValue: string | number) => {
                                const currentValue = getNumber(String(prevValue));

                                return currentValue + value > initialAmountVariation.maxValue
                                  ? initialAmountVariation.maxValue
                                  : currentValue + value;
                              });
                            }}
                          >
                            +{value / 10000}만
                          </Button>
                        </div>
                      );
                    })}
                  </div>
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
                  >
                    복리 기간 (년)
                  </NumericFormItem>
                  <div className={'flex justify-end gap-6'}>
                    {compoundPeriodVariation.valueList.map((value) => {
                      return (
                        <div className={'space-x-2'} key={`variation-${value}`}>
                          <Button
                            size={'sm'}
                            variant={'secondary'}
                            type={'button'}
                            onClick={() =>
                              field.onChange((prevValue: string | number) => {
                                const currentValue = getNumber(String(prevValue));

                                return currentValue - value < 0 ? 0 : currentValue - value;
                              })
                            }
                          >
                            -{value}%
                          </Button>
                          <Button
                            size={'sm'}
                            variant={'secondary'}
                            type={'button'}
                            onClick={() =>
                              field.onChange((prevValue: string | number) => {
                                const currentValue = getNumber(String(prevValue));

                                return currentValue + value > compoundPeriodVariation.maxValue
                                  ? compoundPeriodVariation.maxValue
                                  : currentValue + value;
                              })
                            }
                          >
                            +{value}%
                          </Button>
                        </div>
                      );
                    })}
                  </div>
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
                  >
                    수익률, 이자률 (%)
                  </NumericFormItem>
                  <div className={'flex justify-end gap-6'}>
                    {compoundRateVariation.valueList.map((value) => {
                      return (
                        <div className={'space-x-2'} key={`variation-${value}`}>
                          <Button
                            size={'sm'}
                            variant={'secondary'}
                            type={'button'}
                            onClick={() =>
                              field.onChange((prevValue: string | number) => {
                                const currentValue = getNumber(String(prevValue));

                                return currentValue - value < 0 ? 0 : currentValue - value;
                              })
                            }
                          >
                            -{value}%
                          </Button>
                          <Button
                            size={'sm'}
                            variant={'secondary'}
                            type={'button'}
                            onClick={() =>
                              field.onChange((prevValue: string | number) => {
                                const currentValue = getNumber(String(prevValue));

                                return currentValue + value > compoundRateVariation.maxValue
                                  ? compoundRateVariation.maxValue
                                  : currentValue + value;
                              })
                            }
                          >
                            +{value}%
                          </Button>
                        </div>
                      );
                    })}
                  </div>
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
