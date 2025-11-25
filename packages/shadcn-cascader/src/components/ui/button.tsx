import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "lucascader:inline-flex lucascader:items-center lucascader:justify-center lucascader:gap-2 lucascader:whitespace-nowrap lucascader:rounded-md lucascader:text-sm lucascader:font-medium lucascader:transition-all lucascader:disabled:pointer-events-none lucascader:disabled:opacity-50 lucascader:[&_svg]:pointer-events-none lucascader:[&_svg:not([class*=size-])]:size-4 lucascader:shrink-0 lucascader:[&_svg]:shrink-0 lucascader:outline-none lucascader:focus-visible:border-ring lucascader:focus-visible:ring-ring/50 lucascader:focus-visible:ring-[3px] lucascader:aria-invalid:ring-destructive/20 lucascader:dark:aria-invalid:ring-destructive/40 lucascader:aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "lucascader:bg-primary lucascader:text-primary-foreground lucascader:hover:bg-primary/90",
        destructive:
          "lucascader:bg-destructive lucascader:text-white lucascader:hover:bg-destructive/90 lucascader:focus-visible:ring-destructive/20 lucascader:dark:focus-visible:ring-destructive/40 lucascader:dark:bg-destructive/60",
        outline:
          "lucascader:border lucascader:bg-background lucascader:shadow-xs lucascader:hover:bg-accent lucascader:hover:text-accent-foreground lucascader:dark:bg-input/30 lucascader:dark:border-input lucascader:dark:hover:bg-input/50",
        secondary:
          "lucascader:bg-secondary lucascader:text-secondary-foreground lucascader:hover:bg-secondary/80",
        ghost:
          "lucascader:hover:bg-accent lucascader:hover:text-accent-foreground lucascader:dark:hover:bg-accent/50",
        link: "lucascader:text-primary lucascader:underline-offset-4 lucascader:hover:underline",
      },
      size: {
        default: "lucascader:h-9 lucascader:px-4 lucascader:py-2 lucascader:has-[>svg]:px-3",
        sm: "lucascader:h-8 lucascader:rounded-md lucascader:gap-1.5 lucascader:px-3 lucascader:has-[>svg]:px-2.5",
        lg: "lucascader:h-10 lucascader:rounded-md lucascader:px-6 lucascader:has-[>svg]:px-4",
        icon: "lucascader:size-9",
        "icon-sm": "lucascader:size-8",
        "icon-lg": "lucascader:size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
