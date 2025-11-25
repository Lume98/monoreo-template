import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

import { cn } from "@/lib/utils"

function ScrollArea({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Root>) {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      className={cn("lucascader:relative", className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        className="lucascader:focus-visible:ring-ring/50 lucascader:size-full lucascader:rounded-[inherit] lucascader:transition-[color,box-shadow] lucascader:outline-none lucascader:focus-visible:ring-[3px] lucascader:focus-visible:outline-1"
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
}

function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>) {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      className={cn(
        "lucascader:flex lucascader:touch-none lucascader:p-px lucascader:transition-colors lucascader:select-none",
        orientation === "vertical" &&
          "lucascader:h-full lucascader:w-2.5 lucascader:border-l lucascader:border-l-transparent",
        orientation === "horizontal" &&
          "lucascader:h-2.5 lucascader:flex-col lucascader:border-t lucascader:border-t-transparent",
        className
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        data-slot="scroll-area-thumb"
        className="lucascader:bg-border lucascader:relative lucascader:flex-1 lucascader:rounded-full"
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  )
}

export { ScrollArea, ScrollBar }
