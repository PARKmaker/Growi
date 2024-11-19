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

  return (
    <Table>
      {/*<TableCaption>A list of your recent invoices.</TableCaption>*/}
      <TableHeader>
        <TableRow className="bg-primary-foreground">
          <TableHead className="border-r text-center">총 금액</TableHead>
          <TableHead className="text-center">수익률</TableHead>
          <TableHead className="border-l text-center">수익금</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {amountDataList.map((amountData, index) => (
          <TableRow className="h-[40px]" key={`${index}-key`}>
            <TableCell className="border-r p-2 text-center">
              {formatCurrency(amountData.futureAmount)}원
            </TableCell>
            <TableCell className="p-2 text-center">{amountData.convertedReturnRate}%</TableCell>
            <TableCell className="border-l p-2 text-center">
              {formatCurrency(amountData.returnAmount)}원
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
