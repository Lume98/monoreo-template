import { CascaderOption, CascaderProps } from '@/components/cascader';

/**
 * 根据单个值查找对应的路径
 * @param options - 选项数据
 * @param targetValue - 目标值
 * @returns 路径数组或 null
 */
export const findOptionPath = (
  options: CascaderOption[],
  targetValue: string
): CascaderOption[] | null => {
  function findPath(
    opts: CascaderOption[],
    path: CascaderOption[] = []
  ): CascaderOption[] | null {
    for (const opt of opts) {
      const currentPath = [...path, opt];
      if (opt.value === targetValue) {
        return currentPath;
      }
      if (opt.children) {
        const found = findPath(opt.children, currentPath);
        if (found) return found;
      }
    }
    return null;
  }
  return findPath(options);
};

/**
 * 根据路径值数组查找对应的路径
 * @param opts - 选项数据
 * @param values - 路径值数组
 * @returns 路径数组或 null
 */
export const findPathByValues = (
  opts: CascaderOption[],
  values: string[]
): CascaderOption[] | null => {
  if (values.length === 0) return null;

  for (const opt of opts) {
    if (opt.value === values[0]) {
      if (values.length === 1) {
        return [opt];
      }
      if (opt.children) {
        const childPath = findPathByValues(opt.children, values.slice(1));
        if (childPath) {
          return [opt, ...childPath];
        }
      }
    }
  }
  return null;
};

type FilterPathsProps = Pick<
  CascaderProps,
  'multiple' | 'checkStrictly' | 'showCheckedStrategy'
> & {
  selectedPaths: string[][];
  selectedValues: Set<string>;
  findOptionPath: (value: string) => CascaderOption[] | null;
  collectChildValues: (option: CascaderOption) => string[];
};
export const filterPaths = (props: FilterPathsProps) => {
  const {
    selectedPaths,
    multiple,
    checkStrictly,
    showCheckedStrategy,
    selectedValues,
    findOptionPath,
    collectChildValues,
  } = props;
  // 如果是单选或 checkStrictly 为 true 或 showCheckedStrategy 为 'all'，则返回所有选中项的路径
  if (!multiple || checkStrictly || showCheckedStrategy === 'all') {
    return selectedPaths;
  }
  // 如果 showCheckedStrategy 为 'child'，则返回所有叶子节点，不包含父节点
  if (showCheckedStrategy === 'child') {
    return selectedPaths.filter(path => {
      const lastValue = path[path.length - 1];
      const optionPath = findOptionPath(lastValue);
      if (!optionPath) return false;
      const lastOption = optionPath[optionPath.length - 1];
      return !lastOption.children || lastOption.children.length === 0;
    });
  }
  // 只显示父节点（如果所有子节点都被选中）
  if (showCheckedStrategy === 'parent') {
    const pathsToShow: string[][] = [];
    const processedValues = new Set<string>();

    // 按路径长度从短到长排序，优先处理父节点
    const sortedPaths = [...selectedPaths].sort((a, b) => a.length - b.length);

    for (const path of sortedPaths) {
      const lastValue = path[path.length - 1];
      if (processedValues.has(lastValue)) continue;

      const optionPath = findOptionPath(lastValue);
      if (!optionPath) continue;

      const option = optionPath[optionPath.length - 1];

      if (option.children && option.children.length > 0) {
        // 检查是否所有子节点都被选中
        const allChildValues = collectChildValues(option);
        const allSelected = allChildValues.every(v => selectedValues.has(v));

        if (allSelected) {
          // 所有子节点都被选中，只显示父节点
          pathsToShow.push(path);
          allChildValues.forEach(v => processedValues.add(v));
        } else {
          // 部分子节点被选中，显示被选中的子节点
          if (selectedValues.has(lastValue)) {
            pathsToShow.push(path);
            processedValues.add(lastValue);
          }
        }
      } else {
        // 叶子节点，直接显示
        if (selectedValues.has(lastValue)) {
          pathsToShow.push(path);
          processedValues.add(lastValue);
        }
      }
    }

    return pathsToShow;
  }

  return selectedPaths;
};
