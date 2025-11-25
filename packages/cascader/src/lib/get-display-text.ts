import { CascaderOption } from '@/components/cascader';

/**
 * 计算单选模式下的显示文本
 * @param path - 选中的路径
 * @param placeholder - 占位符
 * @returns 显示文本
 */
export const getDisplayText = (
  path: CascaderOption[],
  placeholder: string,
  showAllPaths: boolean
): string => {
  if (path.length === 0) return placeholder;
  const labels = path.map(item => item.label);
  return showAllPaths ? labels.join(' / ') : labels.at(-1)!;
};
