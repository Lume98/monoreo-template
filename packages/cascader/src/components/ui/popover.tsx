"use client"

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"

function Popover({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />
}

function PopoverTrigger({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />
}

function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "lucascader:bg-popover lucascader:text-popover-foreground lucascader:data-[state=open]:animate-in lucascader:data-[state=closed]:animate-out lucascader:data-[state=closed]:fade-out-0 lucascader:data-[state=open]:fade-in-0 lucascader:data-[state=closed]:zoom-out-95 lucascader:data-[state=open]:zoom-in-95 lucascader:data-[side=bottom]:slide-in-from-top-2 lucascader:data-[side=left]:slide-in-from-right-2 lucascader:data-[side=right]:slide-in-from-left-2 lucascader:data-[side=top]:slide-in-from-bottom-2 lucascader:z-50 lucascader:w-72 lucascader:origin-(--radix-popover-content-transform-origin) lucascader:rounded-md lucascader:border lucascader:p-4 lucascader:shadow-md lucascader:outline-hidden",
          className
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  )
}

function PopoverAnchor({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />
}

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor }
