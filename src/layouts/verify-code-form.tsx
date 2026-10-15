"use client";

import { useState, type ReactNode } from "react";
import { Alert, AlertDescription, AlertTitle } from "../shadcn/alert";
import { Button } from "../shadcn/button";
import { FieldDescription } from "../shadcn/field";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "../shadcn/input-otp";
import { Spinner } from "../shadcn/spinner";
import { cn } from "../web/utils";
import { AuthHeader } from "./auth-forms";

/** The code sent by e-mail or SMS, typed into 6 boxes; submits by itself once full. Needs `input-otp`. */
export function VerifyCodeForm({
  onSubmit,
  onResend,
  destination,
  length = 6,
  error,
  busy,
  className,
}: {
  onSubmit: (v: { code: string }) => void;
  onResend?: () => void;
  /** Where the code went ("ana@exemplo.com"), shown in the description. */
  destination?: ReactNode;
  length?: 4 | 6 | 8;
  error?: ReactNode;
  busy?: boolean;
  className?: string;
}) {
  const [code, setCode] = useState("");
  const half = length / 2;
  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={(e) => {
        e.preventDefault();
        if (code.length === length) onSubmit({ code });
      }}
    >
      <AuthHeader
        title="Confirme o código"
        description={
          destination ? (
            <>
              Mandamos um código para <strong className="text-foreground">{destination}</strong>.
            </>
          ) : (
            "Digite o código que mandamos para você."
          )
        }
      />
      {error ? (
        <Alert variant="destructive">
          <AlertTitle>Código errado</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}
      <InputOTP
        maxLength={length}
        value={code}
        onChange={setCode}
        onComplete={(v: string) => onSubmit({ code: v })}
        disabled={busy}
        containerClassName="justify-center"
        aria-invalid={error ? true : undefined}
        autoFocus
      >
        <InputOTPGroup>
          {Array.from({ length: half }, (_, i) => (
            <InputOTPSlot key={i} index={i} aria-invalid={error ? true : undefined} />
          ))}
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          {Array.from({ length: half }, (_, i) => (
            <InputOTPSlot key={i} index={half + i} aria-invalid={error ? true : undefined} />
          ))}
        </InputOTPGroup>
      </InputOTP>
      <Button type="submit" className="w-full" disabled={busy || code.length < length}>
        {busy ? <Spinner /> : null}
        Confirmar
      </Button>
      {onResend ? (
        <FieldDescription className="text-center text-[15px]">
          Não chegou?{" "}
          <button type="button" onClick={onResend} className="cursor-pointer font-bold text-primary underline-offset-4 hover:underline">
            Mandar outro código
          </button>
        </FieldDescription>
      ) : null}
    </form>
  );
}
