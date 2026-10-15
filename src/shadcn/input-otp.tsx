"use client";

import { OTPInput, OTPInputContext } from "input-otp";
import { MinusIcon } from "lucide-react";
import { useContext, type ComponentProps } from "react";
import { cn } from "../web/utils";

function InputOTP({ className, containerClassName, ...props }: ComponentProps<typeof OTPInput> & { containerClassName?: string }) {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cn("flex items-center gap-2 has-disabled:opacity-50", containerClassName)}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  );
}

function InputOTPGroup({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="input-otp-group" className={cn("flex items-center", className)} {...props} />;
}

/** One 48px digit box; the active box takes the kit's blue focus ring. */
function InputOTPSlot({ index, className, ...props }: ComponentProps<"div"> & { index: number }) {
  const context = useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = context?.slots[index] ?? {};
  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        "relative flex size-12 items-center justify-center border-y border-r border-input bg-background text-xl font-bold transition-all duration-[120ms] outline-none first:rounded-l-lg first:border-l last:rounded-r-lg motion-off:transition-none",
        "aria-invalid:border-destructive data-[active=true]:z-10 data-[active=true]:border-primary data-[active=true]:ring-1 data-[active=true]:ring-primary",
        className,
      )}
      {...props}
    >
      {char}
      {hasFakeCaret ? (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-5 w-px animate-caret-blink bg-foreground duration-1000 motion-off:animate-none" />
        </div>
      ) : null}
    </div>
  );
}

function InputOTPSeparator(props: ComponentProps<"div">) {
  return (
    <div data-slot="input-otp-separator" role="separator" {...props}>
      <MinusIcon className="text-muted-foreground" />
    </div>
  );
}

export { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot };
