/**
 * 복리계산기 (적립식) - 컨텐츠
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
import { NumericInput } from '@/components/ui/input.tsx';
import { Button } from '@/components/ui/button.tsx';
import { LabelWithInfo } from '@/components/label-with-info.tsx';

export default function CalculationTabsContentAccumulation() {
  return (
    <>
      <TabsContent value={'적립식'}>
        <Card>
          <CardHeader>
            <CardTitle>적립식</CardTitle>
            <CardDescription>매월 추가 투자금, 적립식 복리 계산기</CardDescription>
          </CardHeader>
          <CardContent className={'space-y-2'}>
            <div className={'space-y-1'}>
              <LabelWithInfo
                htmlFor={'initial-amount'}
                hoverCardContent={'최초 투자시 투자금을 입력해주세요.\n(시작금액)'}
                hoverCardFooter={'최대 1억'}
              >
                초기금액 (₩)
              </LabelWithInfo>
              <NumericInput
                defaultValue={1_000_000}
                value={1_000_000}
                id={'initial-amount'}
                suffix={'₩'}
                maxValue={100_000_000}
              />
            </div>
            <div className={'space-y-1'}>
              <LabelWithInfo
                htmlFor={'accumulated-amount'}
                hoverCardContent={
                  '매월마다 적립할 금액입니다.\n두 번째 달부터 원금에 더해져 계산됩니다.'
                }
                hoverCardFooter={'최대 1000만원'}
              >
                매월 적립 금액 (₩)
              </LabelWithInfo>
              <NumericInput
                defaultValue={1_000_000}
                value={1_000_000}
                id={'accumulated-amount'}
                suffix={'₩'}
                maxValue={10_000_000}
              />
            </div>
            <div className={'space-y-1'}>
              <LabelWithInfo
                htmlFor={'compound-interest-count'}
                hoverCardContent={'복리 효과를 누릴 기간입니다.\n투자 기간이라고 볼 수 있습니다.'}
                hoverCardFooter={'최대 50년'}
              >
                복리 기간 (년)
              </LabelWithInfo>
              <NumericInput
                defaultValue={10}
                value={10}
                id={'compound-interest-count'}
                suffix={'년'}
                maxValue={50}
              />
            </div>
            <div className={'space-y-1'}>
              <LabelWithInfo
                htmlFor={'rate'}
                hoverCardContent={'복리 기간동안 년간 수익률입니다.'}
                hoverCardFooter={'최대 100%'}
              >
                수익률, 이자률 (%)
              </LabelWithInfo>
              <NumericInput defaultValue={5} value={5} id={'rate'} suffix={'%'} maxValue={100} />
            </div>
          </CardContent>
          <CardFooter>
            <Button variant={'outline'}>계산하기</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </>
  );
}
