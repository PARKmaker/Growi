import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function deleteComma(string: string) {
  let newString = string;
  if (string.length > 0) {
    newString = newString.replace(/,/g, '');
  }

  return newString;
}

export function deleteLastCharacter(string: string) {
  let newString = string;
  if (string.length > 0) {
    newString = newString.slice(0, -1);
  }

  return newString;
}

export function deleteCommaAndLastCharacter(string: string) {
  return deleteLastCharacter(deleteComma(string));
}
