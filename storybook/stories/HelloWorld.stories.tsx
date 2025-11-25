import type { Meta, StoryObj } from "@storybook/react-vite";
import { Cascader, type CascaderOption } from "@lume-ui/cascader";
import { useState } from "react";

const meta = {
  title: "Components/Cascader",
  component: Cascader,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Cascader>;

export default meta;

type Story = StoryObj<typeof meta>;

const basicOptions: CascaderOption[] = [
  {
    label: "浙江省",
    value: "zhejiang",
    children: [
      {
        label: "杭州市",
        value: "hangzhou",
        children: [
          { label: "西湖区", value: "xihu" },
          { label: "余杭区", value: "yuhang" },
        ],
      },
      {
        label: "宁波市",
        value: "ningbo",
        children: [
          { label: "海曙区", value: "haishu" },
          { label: "江北区", value: "jiangbei" },
        ],
      },
    ],
  },
  {
    label: "江苏省",
    value: "jiangsu",
    children: [
      {
        label: "南京市",
        value: "nanjing",
        children: [
          { label: "玄武区", value: "xuanwu" },
          { label: "鼓楼区", value: "gulou" },
        ],
      },
      {
        label: "苏州市",
        value: "suzhou",
        children: [
          { label: "姑苏区", value: "gusu" },
          { label: "工业园区", value: "gongyeyuanqu" },
        ],
      },
    ],
  },
];

export const Basic: Story = {
  args: {
    options: basicOptions,
  },
  render: (args) => {
    console.log(args);
    const { options } = args;
    const [value, setValue] = useState<(string | number)[]>([]);
    return (
      <Cascader
        options={options}
        value={value}
        onChange={setValue}
        placeholder="请选择省市区"
      />
    );
  },
};

export const WithDefaultValue: Story = {
  args: {
    options: basicOptions,
  },
  render: () => {
    const [value, setValue] = useState<(string | number)[]>([
      "zhejiang",
      "hangzhou",
      "xihu",
    ]);
    return (
      <Cascader
        options={basicOptions}
        value={value}
        onChange={setValue}
        placeholder="请选择省市区"
      />
    );
  },
};

export const Disabled: Story = {
  args: {
    options: basicOptions,
  },
  render: () => {
    const [value, setValue] = useState<(string | number)[]>([
      "zhejiang",
      "hangzhou",
    ]);
    return (
      <Cascader
        options={basicOptions}
        value={value}
        onChange={setValue}
        placeholder="请选择省市区"
        disabled
      />
    );
  },
};

export const TwoLevel: Story = {
  render: () => {
    const [value, setValue] = useState<(string | number)[]>([]);
    const twoLevelOptions: CascaderOption[] = [
      {
        label: "前端",
        value: "frontend",
        children: [
          { label: "React", value: "react" },
          { label: "Vue", value: "vue" },
          { label: "Angular", value: "angular" },
        ],
      },
      {
        label: "后端",
        value: "backend",
        children: [
          { label: "Node.js", value: "nodejs" },
          { label: "Java", value: "java" },
          { label: "Python", value: "python" },
        ],
      },
    ];
    return (
      <Cascader
        options={twoLevelOptions}
        value={value}
        onChange={setValue}
        placeholder="请选择技术栈"
      />
    );
  },
} as unknown as Story;
