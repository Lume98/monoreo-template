interface PathLabel {
  pathValues: string[];
  label: string;
}

interface DisplayTagsResult {
  visible: PathLabel[];
  hidden: PathLabel[];
  omittedCount: number;
}

/**
 * 处理标签显示（考虑 maxTagCount）
 * @param pathLabels - 路径标签数组
 * @param maxTagCount - 最大标签数量
 * @returns 显示标签结果
 */
export const getDisplayTags = (
  pathLabels: PathLabel[],
  maxTagCount?: number
): DisplayTagsResult => {
  if (!maxTagCount || pathLabels.length <= maxTagCount) {
    return {
      visible: pathLabels,
      hidden: [],
      omittedCount: 0,
    };
  }
  return {
    visible: pathLabels.slice(0, maxTagCount),
    hidden: pathLabels.slice(maxTagCount),
    omittedCount: pathLabels.length - maxTagCount,
  };
};

