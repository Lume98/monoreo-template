import type { Meta, StoryObj } from "@storybook/react-vite";

import { Cascader, CascaderOption } from "@lume-ui/cascader";
import "@lume-ui/shadcn-cascader/index.css";

const meta = {
  title: "Components/ShadcnCascader",
  component: Cascader,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Cascader>;

export default meta;

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
      {
        label: "温州市",
        value: "wenzhou",
        children: [
          { label: "瓯海区", value: "ouhai" },
          { label: "龙湾区", value: "longwan" },
        ],
      },
      {
        label: "嘉兴市",
        value: "jiaxing",
        children: [
          { label: "南湖区", value: "nanhu" },
          { label: "秀洲区", value: "xiuzhou" },
        ],
      },
      {
        label: "湖州市",
        value: "huzhou",
        children: [
          { label: "吴兴区", value: "wenzu" },
          { label: "南浔区", value: "nanxun" },
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

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    options: basicOptions,
  },
};

export const Multiple: Story = {
  args: {
    options: basicOptions,
    multiple: true,
  },
};
