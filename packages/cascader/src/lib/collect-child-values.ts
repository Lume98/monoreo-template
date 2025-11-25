import { CascaderOption } from '@/components/cascader';

/**
 * 收集所有子节点的值
 * @param option - 当前选项
 * @returns 所有子节点的值
 */
export const collectChildValues = (option: CascaderOption): string[] => {
  const values: string[] = [];
  function collect(opt: CascaderOption) {
    values.push(opt.value);
    if (opt.children) {
      opt.children.forEach(collect);
    }
  }
  collect(option);
  return values;
};
