import { CascaderOption, CascaderProps } from '@/components/cascader';
import { findOptionPath, findPathByValues } from '@/lib/path';
import { useCallback, useEffect } from 'react';
import { useImmerReducer } from 'use-immer';

export type CascaderState = {
  path: CascaderOption[];
  paths: string[][];
  values: Set<string>;
  hoverPath: CascaderOption[];
};

const initialState: CascaderState = {
  path: [],
  paths: [],
  values: new Set(),
  hoverPath: [],
};

export type CascaderAction =
  | { type: 'updatePaths'; payload: string[][] }
  | { type: 'updateValues'; payload: Set<string> }
  | { type: 'updatePath'; payload: CascaderOption[] }
  | { type: 'updateHoverPath'; payload: CascaderOption[] };

const reducer = (draft: CascaderState, action: CascaderAction) => {
  switch (action.type) {
    case 'updatePaths':
      draft.paths = action.payload;
      break;
    case 'updateValues':
      draft.values = action.payload;
      break;
    case 'updatePath':
      draft.path = action.payload;
      break;
    case 'updateHoverPath':
      draft.hoverPath = action.payload;
      break;
  }
};

const useCascaderState = ({
  options,
  multiple,
  emitPath,
  value,
}: Pick<CascaderProps, 'options' | 'multiple' | 'emitPath' | 'value'>) => {
  const [state, dispatch] = useImmerReducer<CascaderState, CascaderAction>(
    reducer,
    initialState
  );

  // 创建 findOptionPath 的绑定版本
  const findOptionPathByValue = useCallback(
    (targetValue: string) => findOptionPath(options, targetValue),
    [options]
  );

  // 根据 value 初始化状态
  useEffect(() => {
    // 根据模式确定合适的默认值
    const normalizedValue = value ?? (multiple ? [] : emitPath ? [] : '');
    if (multiple) {
      const vals = normalizedValue as string[] | string[][];
      if (emitPath) {
        const paths = (vals as string[][]) || [];
        const values = new Set(paths.map(p => p[p.length - 1]));
        dispatch({ type: 'updatePaths', payload: paths });
        dispatch({ type: 'updateValues', payload: values });
      } else {
        const values = (vals as string[]) || [];
        const paths = values
          .map(v => findOptionPathByValue(v))
          .filter((p): p is CascaderOption[] => p !== null)
          .map(p => p.map(o => o.value));
        dispatch({ type: 'updatePaths', payload: paths });
        dispatch({ type: 'updateValues', payload: new Set(values) });
      }
    } else {
      if (emitPath) {
        const pathValues = (normalizedValue as string[]) || [];
        const path =
          pathValues.length > 0 ? findPathByValues(options, pathValues) : null;
        dispatch({ type: 'updatePath', payload: path || [] });
      } else {
        const value = (normalizedValue as string) || '';
        const path = value ? findOptionPathByValue(value) : null;
        dispatch({ type: 'updatePath', payload: path || [] });
      }
    }
  }, [multiple, emitPath, options, findOptionPathByValue, dispatch]);

  return { state, dispatch, findOptionPath: findOptionPathByValue };
};

export default useCascaderState;
