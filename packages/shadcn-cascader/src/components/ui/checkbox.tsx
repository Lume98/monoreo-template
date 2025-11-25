import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "lucascader:peer lucascader:border-input lucascader:dark:bg-input/30 lucascader:data-[state=checked]:bg-primary lucascader:data-[state=checked]:text-primary-foreground lucascader:dark:data-[state=checked]:bg-primary lucascader:data-[state=checked]:border-primary lucascader:focus-visible:border-ring lucascader:focus-visible:ring-ring/50 lucascader:aria-invalid:ring-destructive/20 lucascader:dark:aria-invalid:ring-destructive/40 lucascader:aria-invalid:border-destructive lucascader:size-4 lucascader:shrink-0 lucascader:rounded-[4px] lucascader:border lucascader:shadow-xs lucascader:transition-shadow lucascader:outline-none lucascader:focus-visible:ring-[3px] lucascader:disabled:cursor-not-allowed lucascader:disabled:opacity-50",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="lucascader:grid lucascader:place-content-center lucascader:text-current lucascader:transition-none"
      >
        <CheckIcon className="lucascader:size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
