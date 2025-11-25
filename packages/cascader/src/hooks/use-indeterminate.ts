import { CascaderOption } from '@/components/cascader';
import React from 'react';
import { collectChildValues } from '../lib/collect-child-values';

interface UseIndeterminateMapProps {
  options: CascaderOption[];
  multiple: boolean;
  checkStrictly: boolean;
  values: Set<string>;
}

export const useIndeterminateMap = (props: UseIndeterminateMapProps) => {
  const { multiple, checkStrictly, values, options } = props;
  return React.useMemo(() => {
    if (!multiple || checkStrictly) return new Map<string, boolean>();

    const map = new Map<string, boolean>();

    function checkIndeterminate(option: CascaderOption): boolean {
      if (!option.children || option.children.length === 0) {
        return false;
      }

      const allChildValues = collectChildValues(option);
      const checkedCount = allChildValues.filter(v => values.has(v)).length;

      const isIndeterminate =
        checkedCount > 0 && checkedCount < allChildValues.length;
      map.set(option.value, isIndeterminate);

      return isIndeterminate;
    }

    function traverse(opts: CascaderOption[]) {
      opts.forEach(opt => {
        checkIndeterminate(opt);
        if (opt.children) {
          traverse(opt.children);
        }
      });
    }
    traverse(options);
    return map;
  }, [options, values, multiple, checkStrictly]);
};
