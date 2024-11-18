import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { TReturnCalculateBasic } from '@/features/compound-calculator/compound-calculator.types.ts';
import { formatCurrency } from '@/lib/format.ts';

export default function CalculationTable({
  amountDataList,
}: {
  amountDataList: TReturnCalculateBasic[];
}) {
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
        {amountDataList.map((amountData) => (
          <TableRow className="h-[40px]">
            <TableCell className="border-r p-2 text-center">
              {formatCurrency(amountData.futureAmount)}
            </TableCell>
            <TableCell className="p-2 text-center">{amountData.convertedReturnRate}%</TableCell>
            <TableCell className="border-l p-2 text-center">
              {formatCurrency(amountData.returnAmount)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
