import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatCurrency } from '@/lib/format.ts';
import { useAmountDataList } from '@/features/compound-calculator/hooks/useAmountDataList.tsx';

export default function CalculationTable() {
  const { amountDataList } = useAmountDataList();
  const lastAmountData = amountDataList[amountDataList.length - 1];
  const isAccumulation = !lastAmountData.isBasic;
  return (
    <Table>
      {/*<TableCaption>A list of your recent invoices.</TableCaption>*/}
      <TableHeader>
        <TableRow>
          <TableHead className="w-[30px] border-r">년</TableHead>
          <TableHead className="min-w-[150px] border-r text-center">총 금액</TableHead>
          <TableHead className="min-w-[150px] border-r text-center">수익금</TableHead>
          {isAccumulation ? (
            <TableHead className="min-w-[150px] border-r text-center">총 투자금</TableHead>
          ) : null}
          <TableHead className="w-[100px] text-center">수익률</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {amountDataList.map((amountData) => (
          <TableRow className="h-[40px]" key={`${amountData.year}-key`}>
            <TableCell className="border-r p-2 text-center">{amountData.year}</TableCell>
            <TableCell className="border-r p-2 text-right text-primary">
              {formatCurrency(amountData.futureAmount)}원
            </TableCell>
            <TableCell className="border-r p-2 text-right text-amber-600">
              +{formatCurrency(amountData.returnAmount)}원
            </TableCell>
            {'yearAmount' in amountData ? (
              <TableCell className="border-r p-2 text-right">
                {formatCurrency(amountData.yearAmount)}원
              </TableCell>
            ) : null}
            <TableCell className="p-2 text-right">
              {formatCurrency(amountData.ratePercentage)}%
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
