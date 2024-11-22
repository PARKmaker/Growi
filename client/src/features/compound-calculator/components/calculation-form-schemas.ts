import { z } from 'zod';
import {
  COMPOUND_PERIOD,
  INTEREST_RATE,
  INITIAL_AMOUNT,
  MONTHLY_AMOUNT,
} from '@/features/compound-calculator/compound-calculator.const.ts';
import { getNumber } from '@/features/compound-calculator/compound-calculator.utils.ts';

export type TBasicField = z.infer<typeof basicFormSchema>;
export type TAccumulationField = z.infer<typeof accumulationFormSchema>;

export const basicFormSchema = z.object({
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
  [INTEREST_RATE]: z.preprocess(
    (value) => getNumber(String(value)),
    z
      .number()
      .nullable()
      .refine((val) => val !== null, { message: '값을 입력해주세요.' })
      .refine((val) => val !== null && val >= 1, { message: '1% 이상부터 가능합니다.' }),
  ),
});

export const accumulationFormSchema = z.object({
  [INITIAL_AMOUNT]: z.preprocess(
    (value) => getNumber(String(value)),
    z
      .number()
      .nullable()
      .refine((val) => val !== null, { message: '값을 입력해주세요.' })
      .refine((val) => val !== null && val >= 10, { message: '10원 이상부터 가능합니다.' }),
  ),
  [MONTHLY_AMOUNT]: z.preprocess(
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
  [INTEREST_RATE]: z.preprocess(
    (value) => getNumber(String(value)),
    z
      .number()
      .nullable()
      .refine((val) => val !== null, { message: '값을 입력해주세요.' })
      .refine((val) => val !== null && val >= 1, { message: '1% 이상부터 가능합니다.' }),
  ),
});
