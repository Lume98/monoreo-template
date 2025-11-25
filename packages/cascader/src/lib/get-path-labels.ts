import { CascaderOption } from '@/components/cascader';

/**
 * 获取路径标签
 * @param pathValues - 路径值数组
 * @param options - 选项数据
 * @returns 路径标签对象
 */
export const getPathLabels = (
  pathValues: string[][],
  options: CascaderOption[],
  showAllPaths?: boolean
): Array<{ pathValues: string[]; label: string }> => {
  return pathValues.map(pathValues => {
    const labels: string[] = [];
    let currentOptions = options;
    for (const val of pathValues) {
      const found = currentOptions.find(opt => opt.value === val);
      if (found) {
        labels.push(found.label);
        currentOptions = found.children || [];
      }
    }
    return {
      pathValues,
      label: showAllPaths ? labels.join(' / ') : labels.at(-1)!,
    };
  });
};
