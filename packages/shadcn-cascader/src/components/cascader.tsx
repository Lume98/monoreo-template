import * as React from 'react';
import {
  Check,
  ChevronsUpDown,
  ChevronRight,
  X,
  ChevronsDownUp,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { generatePanels } from '@/lib/panels';
import { getDisplayText } from '@/lib/get-display-text';
import { getPathLabels } from '@/lib/get-path-labels';
import { getDisplayTags } from '@/lib/get-display-tags';
import { handleMultipleSelect as handleMultipleSelectUtil } from '@/lib/handle-multiple-select';
import { handleRemoveTag as handleRemoveTagUtil } from '@/lib/handle-remove-tag';
import useCascaderState from '@/hooks/use-cascader-state';
import { collectChildValues } from '@/lib/collect-child-values';
import { useIndeterminateMap } from '@/hooks/use-indeterminate';
import { filterPaths } from '@/lib/path';

export interface CascaderOption {
  label: string;
  value: string;
  children?: CascaderOption[];
  disabled?: boolean;
}

export interface CascaderProps {
  options: CascaderOption[];
  value?: string[] | string[][] | string;
  onChange?: (
    value: string[] | string[][] | string,
    selectedOptions: CascaderOption | CascaderOption[]
  ) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  multiple?: boolean;
  showCheckedStrategy?: 'all' | 'parent' | 'child';

  /** 多选模式下最多显示Tag的数量，超过这个数量则折叠Tag，显示省略号+剩余数量	 */
  maxTagCount?: number;
  /** 当折叠 Tag 的时候，自定义显示最大数量的占位内容 */
  maxTagPlaceholder?: (omittedCount: number) => React.ReactNode;

  /** 在选中节点改变时，是否返回由该节点所在的各级菜单的值所组成的数组，若设置 false，则只返回该节点的值 */
  emitPath?: boolean;
  /* 是否严格的遵守父子节点不互相关联	 */
  checkStrictly?: boolean;
  /* 输入框中是否显示选中值的完整路径	 */
  showAllPaths?: boolean;
}

export function Cascader({
  options,
  value,
  onChange,
  placeholder = '请选择...',
  className,
  disabled = false,
  multiple = false,
  checkStrictly = false,
  showCheckedStrategy = 'all',
  maxTagCount,
  maxTagPlaceholder,
  emitPath = true,
  showAllPaths = false,
}: CascaderProps) {
  const [open, setOpen] = React.useState(false);
  const { state, dispatch, findOptionPath } = useCascaderState({
    options,
    multiple,
    emitPath,
    value,
  });

  // 单选时的显示文本
  const displayText = React.useMemo(() => {
    if (multiple) {
      if (state.paths.length === 0) return placeholder;
      return null; // 使用 badges 显示
    } else {
      return getDisplayText(state.path, placeholder, showAllPaths);
    }
  }, [state.path, state.paths, placeholder, multiple]);

  // 生成面板数据
  const panels = React.useMemo(
    () => generatePanels(options, state.hoverPath, state.path, open),
    [options, state.hoverPath, state.path, open]
  );

  const indeterminateMap = useIndeterminateMap({
    options,
    values: state.values,
    multiple,
    checkStrictly,
  });

  // 处理多选
  const handleMultipleSelectClick = (option: CascaderOption, level: number) => {
    if (option.disabled) return;

    const { returnValue, selectedOptions } = handleMultipleSelectUtil({
      option,
      level,
      checkStrictly,
      emitPath,
      state,
      dispatch,
      findOptionPath,
    });

    onChange?.(returnValue, selectedOptions);
  };

  // 处理单选
  const handleSelect = (option: CascaderOption, level: number) => {
    // 构建路径
    const newPath = [...state.hoverPath.slice(0, level), option];

    if (option.disabled) return;

    if (multiple) {
      handleMultipleSelectClick(option, level);
      // 多选模式下如果有子节点，也更新 hover path
      if (option.children && option.children.length > 0) {
        dispatch({ type: 'updateHoverPath', payload: newPath });
      }
      return;
    }
    // 单选模式
    const hasChildren = option.children && option.children.length > 0;
    // checkStrictly=true 时，可以选择任意层级
    // checkStrictly=false 时，只能选择叶子节点
    if (hasChildren && !checkStrictly) {
      // 有子选项且父子关联，只更新 hover path, 目的是展开子选项
      dispatch({ type: 'updateHoverPath', payload: newPath });
    } else {
      // 可以选择：叶子节点 或 checkStrictly=true 时的任意节点
      dispatch({ type: 'updatePath', payload: newPath });
      const values = newPath.map(item => item.value);
      // 根据 emitPath 返回不同格式的值
      const returnValue = emitPath ? values : values[values.length - 1]!;
      onChange?.(returnValue, newPath[newPath.length - 1]!);
      setOpen(false);
      dispatch({ type: 'updateHoverPath', payload: [] });
    }
  };

  // 处理鼠标悬停
  const handleMouseEnter = (option: CascaderOption, level: number) => {
    if (option.disabled) return;
    // 更新 hover path
    const newPath = [...state.hoverPath.slice(0, level), option];
    dispatch({ type: 'updateHoverPath', payload: newPath });
  };

  // 当 popover 打开时，初始化 state.hoverPath
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    const payload = (multiple && newOpen) || !newOpen ? [] : state.path;
    dispatch({
      type: 'updateHoverPath',
      payload: payload,
    });
  };

  // 移除单个选中项（多选模式）
  const handleRemoveTagClick = (
    e: React.MouseEvent,
    pathToRemove: string[]
  ) => {
    e.stopPropagation();
    const result = handleRemoveTagUtil({
      pathToRemove,
      selectedValues: state.values,
      selectedPaths: state.paths,
      checkStrictly,
      emitPath,
      findOptionPath,
    });

    dispatch({ type: 'updateValues', payload: result.newSelectedValues });
    dispatch({ type: 'updatePaths', payload: result.newSelectedPaths });
    onChange?.(result.returnValue, result.selectedOptions);
  };

  // 根据 showCheckedStrategy 过滤要显示的路径
  const filteredPaths = React.useMemo(
    () =>
      filterPaths({
        selectedPaths: state.paths,
        multiple,
        checkStrictly,
        showCheckedStrategy,
        selectedValues: state.values,
        findOptionPath,
        collectChildValues,
      }),
    [
      state.paths,
      multiple,
      checkStrictly,
      showCheckedStrategy,
      state.values,
      findOptionPath,
      collectChildValues,
    ]
  );

  // 获取显示的路径标签
  const pathLabels = React.useMemo(
    () => getPathLabels(filteredPaths, options, showAllPaths),
    [filteredPaths, options]
  );

  // 处理标签显示（考虑 maxTagCount）
  const displayTags = React.useMemo(
    () => getDisplayTags(pathLabels, maxTagCount),
    [pathLabels, maxTagCount]
  );

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn(
            'lucascader:w-[300px] lucascader:justify-between lucascader:border-gray-200',
            multiple && 'lucascader:h-auto lucascader:min-h-10 lucascader:py-2',
            className
          )}
        >
          {multiple ? (
            <div className="lucascader:flex lucascader:flex-wrap lucascader:gap-1 lucascader:flex-1">
              {pathLabels.length === 0 ? (
                <span className="lucascader:text-muted-foreground">{placeholder}</span>
              ) : (
                <>
                  {displayTags.visible.map((item, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="lucascader:gap-1 lucascader:pr-1"
                    >
                      <span className="lucascader:max-w-[200px] lucascader:truncate">
                        {item.label}
                      </span>
                      <div
                        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                          e.stopPropagation();
                          handleRemoveTagClick(e, item.pathValues);
                        }}
                      >
                        <X className="lucascader:h-3 lucascader:w-3 lucascader:cursor-pointer lucascader:hover:lucascader:text-destructive" />
                      </div>
                    </Badge>
                  ))}
                  {displayTags.omittedCount > 0 && (
                    <Badge variant="secondary" className="lucascader:cursor-default">
                      {maxTagPlaceholder
                        ? maxTagPlaceholder(displayTags.omittedCount)
                        : `+${displayTags.omittedCount}`}
                    </Badge>
                  )}
                </>
              )}
            </div>
          ) : (
            <span className="lucascader:truncate">{displayText}</span>
          )}
          {open ? (
            <ChevronsDownUp className="lucascader:ml-2 lucascader:h-4 lucascader:w-4 lucascader:shrink-0 lucascader:opacity-50" />
          ) : (
            <ChevronsUpDown className="lucascader:ml-2 lucascader:h-4 lucascader:w-4 lucascader:shrink-0 lucascader:opacity-50" />
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="lucascader:w-auto lucascader:p-0 lucascader:border-gray-200" align="start">
        {options.length === 0 ? (
          <div className="lucascader:p-4 lucascader:text-center lucascader:min-w-[180px] lucascader:text-sm lucascader:text-muted-foreground">
            暂无数据
          </div>
        ) : (
          <div className="lucascader:flex">
            {panels.map((panel, panelIndex) => (
              <div
                key={panelIndex}
                className="lucascader:border-r lucascader:border-gray-200 lucascader:last:lucascader:border-r-0 lucascader:min-w-[180px] lucascader:shrink-0 lucascader:h-[240px]"
              >
                <ScrollArea className="lucascader:h-full">
                  <div className="lucascader:p-1">
                    {panel.length === 0 ? (
                      <div className="lucascader:p-4 lucascader:text-center lucascader:text-xs lucascader:text-muted-foreground">
                        无选项
                      </div>
                    ) : (
                      panel.map(option => {
                        const isSelected =
                          state.hoverPath[panelIndex]?.value === option.value;
                        const hasChildren =
                          option.children && option.children.length > 0;

                        // 判断是否显示选中状态
                        const isFinalSelected = multiple
                          ? state.values.has(option.value)
                          : checkStrictly
                          ? state.path[panelIndex]?.value === option.value
                          : state.path[panelIndex]?.value === option.value &&
                            panelIndex === state.path.length - 1;

                        // 计算选中状态（用于父子关联模式）
                        const isChecked = state.values.has(option.value);
                        const isIndeterminate =
                          !isChecked &&
                          (indeterminateMap.get(option.value) || false);

                        return (
                          <div
                            key={option.value}
                            onClick={() => handleSelect(option, panelIndex)}
                            onMouseEnter={() =>
                              handleMouseEnter(option, panelIndex)
                            }
                            className={cn(
                              'lucascader:relative lucascader:flex lucascader:cursor-pointer lucascader:select-none lucascader:items-center lucascader:gap-2 lucascader:rounded-sm lucascader:px-2 lucascader:py-1.5 lucascader:text-sm lucascader:outline-none lucascader:transition-colors',
                              isSelected && 'lucascader:bg-accent lucascader:text-accent-foreground',
                              option.disabled &&
                                'lucascader:pointer-events-none lucascader:opacity-50'
                            )}
                          >
                            {multiple && (
                              <Checkbox
                                checked={
                                  isIndeterminate ? 'indeterminate' : isChecked
                                }
                                onCheckedChange={() =>
                                  handleSelect(option, panelIndex)
                                }
                                onClick={e => e.stopPropagation()}
                                className="lucascader:pointer-events-none"
                              />
                            )}
                            <span className="lucascader:flex-1 lucascader:truncate">
                              {option.label}
                            </span>
                            {!multiple &&
                              isFinalSelected &&
                              (checkStrictly || !hasChildren) && (
                                <Check className="lucascader:h-4 lucascader:w-4 lucascader:shrink-0" />
                              )}
                            {hasChildren && (
                              <ChevronRight className="lucascader:h-4 lucascader:w-4 lucascader:shrink-0 lucascader:opacity-50" />
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>
                </ScrollArea>
              </div>
            ))}
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
