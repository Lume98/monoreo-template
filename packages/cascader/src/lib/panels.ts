import { CascaderOption } from '@/components/cascader';

/**
 * 生成级联面板数据
 * @param options - 选项数据
 * @param hoverPath - 当前悬停路径
 * @param selectedPath - 当前选中路径
 * @param open - 是否打开
 * @returns 面板数据数组
 */
export const generatePanels = (
  options: CascaderOption[],
  hoverPath: CascaderOption[],
  selectedPath: CascaderOption[],
  open: boolean
): CascaderOption[][] => {
  const result: CascaderOption[][] = [options];
  const pathToUse = open ? hoverPath : selectedPath;

  let currentOptions = options;
  for (const item of pathToUse) {
    // 寻找当前选项的子选项
    const found = currentOptions.find(opt => opt.value === item.value);
    if (found?.children && found.children.length > 0) {
      // 如果当前选项有子选项，则将子选项添加到结果中
      result.push(found.children);
      currentOptions = found.children;
    }
  }

  return result;
};
