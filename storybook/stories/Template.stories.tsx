import { Button } from "@template/template";
import "@template/template/index.css";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Template/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
  },
};
