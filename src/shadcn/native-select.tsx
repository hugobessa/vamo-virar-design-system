import { ChevronDownIcon } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "../web/utils";

/** The browser's own select, dressed like SelectTrigger: lighter, and native on phones. */
function NativeSelect({ className, size = "default", ...props }: Omit<ComponentProps<"select">, "size"> & { size?: "sm" | "default" }) {
  return (
    <div className="group/native-select relative w-fit has-[select:disabled]:opacity-50" data-slot="native-select-wrapper">
      <select
        data-slot="native-select"
        data-size={size}
        className={cn(
          "w-full min-w-0 cursor-pointer appearance-none rounded-lg border border-input bg-background pr-10 pl-3 text-[17px] text-foreground outline-none transition-[border-color,box-shadow] duration-[120ms] motion-off:transition-none",
          "focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary aria-invalid:border-destructive aria-invalid:ring-1 aria-invalid:ring-destructive disabled:pointer-events-none disabled:cursor-not-allowed",
          "data-[size=default]:h-12 data-[size=sm]:h-10 data-[size=sm]:text-[15px]",
          className,
        )}
        {...props}
      />
      <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-3 size-5 -translate-y-1/2 text-primary select-none" strokeWidth={3} aria-hidden="true" data-slot="native-select-icon" />
    </div>
  );
}

function NativeSelectOption(props: ComponentProps<"option">) {
  return <option data-slot="native-select-option" {...props} />;
}

function NativeSelectOptGroup({ className, ...props }: ComponentProps<"optgroup">) {
  return <optgroup data-slot="native-select-optgroup" className={cn(className)} {...props} />;
}

export { NativeSelect, NativeSelectOptGroup, NativeSelectOption };
