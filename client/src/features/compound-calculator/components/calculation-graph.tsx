/**
 * Created by tkdgu:박상현 on 2024-11-21
 * Todo: 복리 수익 현황을 그래프로 나타내는 컴포넌트
 *
 * y축은 금액
 * x축은 년도
 * 2개의 그래프로 구분
 * 위쪽영역은 총 금액
 * 아래쪽 영역은 수익금
 * shadcn/ui 그래프 컴포넌트 사용 예정.
 */

'use client';

import { TrendingUp } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useAmountDataList } from '@/features/compound-calculator/hooks/useAmountDataList.tsx';
import { formatCurrency, formatKoreanWon } from '@/lib/format.ts';
import ImageDownloadButton from '@/features/compound-calculator/components/image-download-button.tsx';

const chartConfig = {
  futureAmount: {
    label: '최종 금액',
    color: 'hsl(var(--chart-2))',
  },
  yearAmount: {
    label: '투자 금액',
    color: 'hsl(var(--chart-1))',
  },
  initialAmount: {
    label: '초기 금액',
    color: 'hsl(var(--chart-5))',
  },
} satisfies ChartConfig;

export default function CalculationGraph() {
  const { amountDataList } = useAmountDataList();
  const lastAmountData = amountDataList[amountDataList.length - 1];
  const isAccumulation = !lastAmountData.isBasic;
  return (
    <>
      <Card>
        <div id="download-graph">
          <CardHeader>
            <CardTitle>결과 그래프</CardTitle>
            <CardDescription>{lastAmountData.year}년동안의 복리 수익 결과입니다.</CardDescription>
          </CardHeader>
          <CardContent>
            {amountDataList.length > 0 && (
              <ChartContainer config={chartConfig}>
                <AreaChart
                  accessibilityLayer
                  data={amountDataList}
                  margin={{
                    left: 12,
                    right: 12,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="year"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => {
                      return `${value}년`;
                    }}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => {
                      return `${formatKoreanWon(value)}`;
                    }}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={
                      <ChartTooltipContent
                        separator="z"
                        indicator="dot"
                        labelFormatter={(label) => {
                          return `${label}년`;
                        }}
                      />
                    }
                  />
                  <Area
                    dataKey={'initialAmount'}
                    type="natural"
                    fill="var(--color-initialAmount)"
                    fillOpacity={0.4}
                    stroke="var(--color-initialAmount)"
                    stackId="a"
                  />
                  {isAccumulation && (
                    <Area
                      dataKey={'yearAmount'}
                      type="natural"
                      fill="var(--color-yearAmount)"
                      fillOpacity={0.4}
                      stroke="var(--color-yearAmount)"
                      stackId="a"
                    />
                  )}
                  <Area
                    dataKey={'futureAmount'}
                    type="natural"
                    fill="var(--color-futureAmount)"
                    fillOpacity={0.4}
                    stroke="var(--color-futureAmount)"
                    stackId="a"
                  />
                  <ChartLegend content={<ChartLegendContent />} />
                </AreaChart>
              </ChartContainer>
            )}
          </CardContent>
          <CardFooter>
            <div className="flex w-full items-start gap-2 text-sm">
              <div className="grid gap-2">
                <div className="flex items-center gap-2 font-medium leading-none">
                  최종 금액
                  <span className="text-primary">
                    {formatKoreanWon(lastAmountData.futureAmount)}원
                  </span>
                </div>
                <div className="flex items-center gap-2 font-medium leading-none">
                  {lastAmountData.year}년의 총 수익률
                  <span className="text-primary">
                    {formatCurrency(lastAmountData.ratePercentage)}%
                  </span>
                  <TrendingUp className="h-4 w-4" />
                </div>
              </div>
            </div>
          </CardFooter>
        </div>
        <div className="flex justify-end p-4 pt-0">
          <ImageDownloadButton fileName="그래프" id={'download-graph'} />
        </div>
      </Card>
    </>
  );
}
