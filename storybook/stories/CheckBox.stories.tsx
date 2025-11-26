import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox } from "@lume-ui/checkbox";
import { useState } from "react";

type CheckedState = boolean | "indeterminate";

const meta = {
  title: "Checkbox",
  component: Checkbox,
  argTypes: {
    checked: {
      control: {
        type: "inline-radio",
        options: [true, false, "indeterminate"],
        labels: {
          true: "选中",
          false: "未选中",
          indeterminate: "半选",
        },
      },
      description: "复选框的选中状态",
    },
    disabled: {
      control: "boolean",
      description: "是否禁用",
    },
    onCheckedChange: {
      action: "checked-changed",
      description: "状态改变时的回调函数",
    },
  },
  args: {
    checked: false,
    disabled: false,
  },
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "复选框组件，支持选中、未选中和半选三种状态。",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * 默认未选中状态的复选框
 */
export const Unchecked: Story = {
  args: {
    checked: false,
  },
};

/**
 * 选中状态的复选框
 */
export const Checked: Story = {
  args: {
    checked: true,
  },
};

/**
 * 半选状态的复选框，通常用于表示部分选中（如树形结构中的父节点）
 */
export const Indeterminate: Story = {
  args: {
    checked: "indeterminate",
  },
};

/**
 * 禁用状态的复选框
 */
export const Disabled: Story = {
  args: {
    checked: false,
    disabled: true,
  },
};

/**
 * 禁用且选中的复选框
 */
export const DisabledChecked: Story = {
  args: {
    checked: true,
    disabled: true,
  },
};

/**
 * 禁用且半选的复选框
 */
export const DisabledIndeterminate: Story = {
  args: {
    checked: "indeterminate",
    disabled: true,
  },
};

/**
 * 带标签的复选框示例
 */
export const WithLabel: Story = {
  render: (args) => {
    return (
      <div className="flex items-center space-x-2">
        <Checkbox {...args} id="terms" />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
        >
          我同意用户协议和隐私政策
        </label>
      </div>
    );
  },
  args: {
    checked: false,
  },
};

/**
 * 交互式复选框，可以点击切换状态
 */
export const Interactive: Story = {
  render: (args) => {
    const [checked, setChecked] = useState<CheckedState>(args.checked || false);
    return (
      <div className="flex items-center space-x-2">
        <Checkbox
          {...args}
          checked={checked}
          onCheckedChange={(value) => {
            setChecked(value);
            args.onCheckedChange?.(value);
          }}
        />
        <span className="text-sm text-gray-600">
          当前状态:{" "}
          {checked === true
            ? "已选中"
            : checked === false
            ? "未选中"
            : "半选"}
        </span>
      </div>
    );
  },
  args: {
    checked: false,
  },
};

/**
 * 多个复选框组合示例
 */
export const Group: Story = {
  render: () => {
    const [items, setItems] = useState([
      { id: 1, label: "选项一", checked: false },
      { id: 2, label: "选项二", checked: true },
      { id: 3, label: "选项三", checked: false },
    ]);

    const handleChange = (id: number, checked: CheckedState) => {
      setItems(
        items.map((item) =>
          item.id === id ? { ...item, checked: checked === true } : item
        )
      );
    };

    const allChecked = items.every((item) => item.checked);
    const someChecked = items.some((item) => item.checked);
    const indeterminate = someChecked && !allChecked;

    const handleSelectAll = (checked: CheckedState) => {
      const isChecked = checked === true;
      setItems(items.map((item) => ({ ...item, checked: isChecked })));
    };

    return (
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Checkbox
            checked={indeterminate ? "indeterminate" : allChecked}
            onCheckedChange={handleSelectAll}
            id="select-all"
          />
          <label
            htmlFor="select-all"
            className="text-sm font-medium leading-none cursor-pointer"
          >
            全选
          </label>
        </div>
        <div className="ml-6 space-y-2">
          {items.map((item) => (
            <div key={item.id} className="flex items-center space-x-2">
              <Checkbox
                checked={item.checked}
                onCheckedChange={(checked) => handleChange(item.id, checked)}
                id={`item-${item.id}`}
              />
              <label
                htmlFor={`item-${item.id}`}
                className="text-sm font-medium leading-none cursor-pointer"
              >
                {item.label}
              </label>
            </div>
          ))}
        </div>
      </div>
    );
  },
  parameters: {
    layout: "padded",
  },
};
