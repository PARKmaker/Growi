/**
 * 복리계산기 (기본) - 컨텐츠
 * @todo: 2024/07/17 폼 연결
 */

import { TabsContent } from '@/components/ui/tabs.tsx';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import { Button } from '@/components/ui/button.tsx';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField } from '@/components/ui/form.tsx';
import NumericFormItem from '@/components/numeric-form-item.tsx';
import { deleteCommaAndLastCharacter } from '@/lib/utils.ts';

const formSchema = z.object({
  // 'initial-amount': z.coerce
  //   .number()
  //   .min(1, { message: '값을 입력해주세요.' })
  //   .gte(10, { message: '10원 이상부터 가능합니다.' }),
  'initial-amount': z.preprocess(
    (value) => {
      const string = deleteCommaAndLastCharacter(String(value));

      return string.length === 0 ? 0 : Number(string);
    },
    z
      .number()
      .min(1, { message: '값을 입력해주세요.' })
      .gte(10, { message: '10원 이상부터 가능합니다.' }),
  ),
  'compound-period': z.preprocess(
    (value) => {
      const string = deleteCommaAndLastCharacter(String(value));

      return string.length === 0 ? 0 : Number(string);
    },
    z
      .number()
      .min(1, { message: '값을 입력해주세요.' })
      .gte(10, { message: '1년 이상부터 가능합니다.' }),
  ),
  'compound-rate': z.preprocess(
    (value) => {
      const string = deleteCommaAndLastCharacter(String(value));

      return string.length === 0 ? 0 : Number(string);
    },
    z
      .number()
      .min(1, { message: '값을 입력해주세요.' })
      .gte(10, { message: '1% 이상부터 가능합니다.' }),
  ),
});

export default function CalculationTabsContentBasis() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      'initial-amount': 1000000,
      'compound-period': 10,
      'compound-rate': 5,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <>
      <TabsContent value={'기본'}>
        <Card>
          <CardHeader>
            <CardTitle>기본(거치식)</CardTitle>
            <CardDescription>최초 투자 후 추가 투자 없이 복리 계산</CardDescription>
          </CardHeader>
          <CardContent className={'space-y-2'}>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                <FormField
                  control={form.control}
                  name="initial-amount"
                  render={({ field }) => (
                    <NumericFormItem
                      hoverCardContent={'최초 투자시 투자금을 입력해주세요.\n(시작금액)'}
                      hoverCardFooter={'최대 1억'}
                      suffix={'원'}
                      defaultValue={1_000_000}
                      maxValue={100_000_000}
                      required={true}
                      {...field}
                    >
                      초기금액 (₩)
                    </NumericFormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="compound-period"
                  render={({ field }) => (
                    <NumericFormItem
                      hoverCardContent={
                        '복리 효과를 누릴 기간입니다.\n투자 기간이라고 볼 수 있습니다.'
                      }
                      hoverCardFooter={'최대 50년'}
                      defaultValue={10}
                      suffix={'년'}
                      maxValue={50}
                      {...field}
                    >
                      복리 기간 (년)
                    </NumericFormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="compound-rate"
                  render={({ field }) => (
                    <NumericFormItem
                      hoverCardContent={'복리 기간동안 년간 수익률입니다.'}
                      hoverCardFooter={'최대 100%'}
                      defaultValue={5}
                      suffix={'%'}
                      maxValue={100}
                      {...field}
                    >
                      수익률, 이자률 (%)
                    </NumericFormItem>
                  )}
                />

                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter>
            <Button variant={'outline'}>계산하기</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </>
  );
}
