import classNames, { ArgumentArray } from 'classnames';
import { twMerge } from 'tailwind-merge';

export const mergeClassNames = (...args: ArgumentArray): string => {
  return twMerge(classNames(args));
};
