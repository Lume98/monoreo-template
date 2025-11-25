import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "lucascader:inline-flex lucascader:items-center lucascader:justify-center lucascader:rounded-full lucascader:border lucascader:px-2 lucascader:py-0.5 lucascader:text-xs lucascader:font-medium lucascader:w-fit lucascader:whitespace-nowrap lucascader:shrink-0 lucascader:[&>svg]:size-3 lucascader:gap-1 lucascader:[&>svg]:pointer-events-none lucascader:focus-visible:border-ring lucascader:focus-visible:ring-ring/50 lucascader:focus-visible:ring-[3px] lucascader:aria-invalid:ring-destructive/20 lucascader:dark:aria-invalid:ring-destructive/40 lucascader:aria-invalid:border-destructive lucascader:transition-[color,box-shadow] lucascader:overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "lucascader:border-transparent lucascader:bg-primary lucascader:text-primary-foreground lucascader:[a&]:hover:bg-primary/90",
        secondary:
          "lucascader:border-transparent lucascader:bg-secondary lucascader:text-secondary-foreground lucascader:[a&]:hover:bg-secondary/90",
        destructive:
          "lucascader:border-transparent lucascader:bg-destructive lucascader:text-white lucascader:[a&]:hover:bg-destructive/90 lucascader:focus-visible:ring-destructive/20 lucascader:dark:focus-visible:ring-destructive/40 lucascader:dark:bg-destructive/60",
        outline:
          "lucascader:text-foreground lucascader:[a&]:hover:bg-accent lucascader:[a&]:hover:text-accent-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
