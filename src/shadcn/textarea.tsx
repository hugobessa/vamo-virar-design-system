import type { ComponentProps } from "react";
import { inputClasses } from "./input";
import { cn } from "../web/utils";

function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return <textarea data-slot="textarea" className={cn(inputClasses, "field-sizing-content flex min-h-24 py-3", className)} {...props} />;
}

export { Textarea };
