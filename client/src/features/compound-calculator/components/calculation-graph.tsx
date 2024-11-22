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
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useAmountDataList } from '@/features/compound-calculator/hooks/useAmountDataList.tsx';
import { formatCurrency, formatCurrencyCompact } from '@/lib/format.ts';

const chartConfig = {
  futureAmount: {
    label: '총금액',
    color: 'hsl(var(--chart-2))',
  },
  initialAmount: {
    label: '투자금액',
    color: 'hsl(var(--chart-1))',
  },
  yearAmount: {
    label: '투자금액',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

export default function CalculationGraph() {
  const { amountDataList } = useAmountDataList();
  const lastAmountData = amountDataList[amountDataList.length - 1];
  const isAccumulation = !lastAmountData.isBasic;
  return (
    <Card>
      <CardHeader>
        <CardTitle>결과</CardTitle>
        <CardDescription>n년동안의 복리 수익 결과입니다.</CardDescription>
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
                tickFormatter={(value) => {
                  return `${formatCurrencyCompact(value)}`;
                }}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
              <Area
                dataKey={isAccumulation ? 'yearAmount' : 'initialAmount'}
                type="natural"
                fill="var(--color-initialAmount)"
                fillOpacity={0.4}
                stroke="var(--color-initialAmount)"
                stackId="a"
              />
              <Area
                dataKey={'futureAmount'}
                type="natural"
                fill="var(--color-futureAmount)"
                fillOpacity={0.4}
                stroke="var(--color-futureAmount)"
                stackId="a"
              />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              {lastAmountData.year}년의 총 수익 {formatCurrency(lastAmountData.ratePercentage)}%
              <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
