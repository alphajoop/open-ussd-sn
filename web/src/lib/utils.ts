import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isValidDate(dateString: string): boolean {
  const date = new Date(dateString);
  return !Number.isNaN(date.getTime());
}
