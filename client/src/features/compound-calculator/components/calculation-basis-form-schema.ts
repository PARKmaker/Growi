import { z } from 'zod';
import {
  COMPOUND_PERIOD,
  COMPOUND_RATE,
  INITIAL_AMOUNT,
} from '@/features/compound-calculator/compound-calculator.const.ts';
import { getNumber } from '@/features/compound-calculator/compound-calculator.utils.ts';

export const formSchema = z.object({
  [INITIAL_AMOUNT]: z.preprocess(
    (value) => getNumber(String(value)),
    z
      .number()
      .nullable()
      .refine((val) => val !== null, { message: '값을 입력해주세요.' })
      .refine((val) => val !== null && val >= 10, { message: '10원 이상부터 가능합니다.' }),
  ),
  [COMPOUND_PERIOD]: z.preprocess(
    (value) => getNumber(String(value)),
    z
      .number()
      .nullable()
      .refine((val) => val !== null, { message: '값을 입력해주세요.' })
      .refine((val) => val !== null && val >= 1, { message: '1년 이상부터 가능합니다.' }),
  ),
  [COMPOUND_RATE]: z.preprocess(
    (value) => getNumber(String(value)),
    z
      .number()
      .nullable()
      .refine((val) => val !== null, { message: '값을 입력해주세요.' })
      .refine((val) => val !== null && val >= 1, { message: '1% 이상부터 가능합니다.' }),
  ),
});
