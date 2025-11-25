import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@lume-ui/button";
import "@lume-ui/button/index.css"

const meta = {
  title: "Button",
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
    variant: "destructive",
  },
};