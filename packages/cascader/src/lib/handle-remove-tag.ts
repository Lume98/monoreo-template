import { CascaderOption } from '@/components/cascader';
import { collectChildValues } from '@/lib/collect-child-values';

interface HandleRemoveTagParams {
  pathToRemove: string[];
  selectedValues: Set<string>;
  selectedPaths: string[][];
  checkStrictly: boolean;
  emitPath: boolean;
  findOptionPath: (value: string) => CascaderOption[] | null;
}

interface HandleRemoveTagResult {
  newSelectedValues: Set<string>;
  newSelectedPaths: string[][];
  returnValue: string[] | string[][];
  selectedOptions: CascaderOption[];
}

/**
 * 移除单个选中项（多选模式）
 */
export const handleRemoveTag = (
  params: HandleRemoveTagParams
): HandleRemoveTagResult => {
  const {
    pathToRemove,
    selectedValues,
    selectedPaths,
    checkStrictly,
    emitPath,
    findOptionPath,
  } = params;

  const valueToRemove = pathToRemove[pathToRemove.length - 1];
  const newSelectedValues = new Set(selectedValues);
  const newSelectedPaths = selectedPaths.filter(
    p => p[p.length - 1] !== valueToRemove
  );

  if (checkStrictly) {
    newSelectedValues.delete(valueToRemove);
  } else {
    // 父子关联模式，需要移除所有相关的子节点
    const path = findOptionPath(valueToRemove);
    if (path) {
      const option = path[path.length - 1];
      const childValues = collectChildValues(option);
      childValues.forEach(v => newSelectedValues.delete(v));
    }
  }

  // 根据 emitPath 返回不同格式的值
  const returnValue = emitPath
    ? newSelectedPaths
    : newSelectedPaths.map(path => path[path.length - 1]);

  const selectedOptions = Array.from(newSelectedValues)
    .map(v => {
      const path = findOptionPath(v);
      return path ? path[path.length - 1] : null;
    })
    .filter(Boolean) as CascaderOption[];

  return {
    newSelectedValues,
    newSelectedPaths,
    returnValue,
    selectedOptions,
  };
};

