import { LoaderCircle } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "../web/utils";

function Spinner({ className, ...props }: ComponentProps<"svg">) {
  return <LoaderCircle role="status" aria-label="Carregando" className={cn("size-5 animate-spin motion-off:animate-none", className)} {...props} />;
}

export { Spinner };
