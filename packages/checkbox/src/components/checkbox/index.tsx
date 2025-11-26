// import * as React from "react";
// import { Check, Minus } from "lucide-react";
// import { cn } from "@/lib/utils";

// export type CheckedState = boolean | "indeterminate";

// export interface CheckboxProps
//   extends Omit<
//     React.ButtonHTMLAttributes<HTMLButtonElement>,
//     "checked" | "onChange"
//   > {
//   checked?: CheckedState;
//   onCheckedChange?: (checked: boolean) => void;
// }

// const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
//   ({ className, checked, onCheckedChange, disabled, ...props }, ref) => {
//     const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
//       if (disabled) return;

//       // Logic:
//       // If indeterminate -> become checked (true)
//       // If checked (true) -> become unchecked (false)
//       // If unchecked (false) -> become checked (true)
//       const newState = checked === "indeterminate" ? true : !checked;

//       onCheckedChange?.(newState);
//       props.onClick?.(event);
//     };

//     const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
//       if (event.key === "Enter" || event.key === " ") {
//         event.preventDefault();
//         handleClick(event as unknown as React.MouseEvent<HTMLButtonElement>);
//       }
//       props.onKeyDown?.(event);
//     };

//     return (
//       <button
//         type="button"
//         role="checkbox"
//         aria-checked={checked === "indeterminate" ? "mixed" : checked}
//         aria-disabled={disabled}
//         data-state={
//           checked === "indeterminate"
//             ? "indeterminate"
//             : checked
//               ? "checked"
//               : "unchecked"
//         }
//         disabled={disabled}
//         ref={ref}
//         className={cn(
//           "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
//           (checked === true || checked === "indeterminate") &&
//             "bg-primary text-primary-foreground",
//           className
//         )}
//         onClick={handleClick}
//         onKeyDown={handleKeyDown}
//         {...props}
//       >
//         <span className={cn("flex items-center justify-center text-current")}>
//           {checked === true && <Check className="h-3.5 w-3.5 stroke-[3px]" />}
//           {checked === "indeterminate" && (
//             <Minus className="h-3.5 w-3.5 stroke-[3px]" />
//           )}
//         </span>
//       </button>
//     );
//   }
// );

// Checkbox.displayName = "Checkbox";

// export { Checkbox };

"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon, MinusIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export type CheckboxProps = React.ComponentProps<typeof CheckboxPrimitive.Root>;
function Checkbox({ className, ...props }: CheckboxProps) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none"
      >
        {props.checked === true && <CheckIcon className="size-3.5" />}
        {props.checked === "indeterminate" && (
          <MinusIcon className="size-3.5" />
        )}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
