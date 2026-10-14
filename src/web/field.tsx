"use client";

import { Label as LabelPrimitive } from "radix-ui";
import { useContext, useId, type ComponentProps, type ReactNode } from "react";
import { ReadOnly } from "./theme";
import { cn } from "./utils";

const control = [
  "w-full min-w-0 rounded-lg border border-input bg-background px-3 text-[17px] text-foreground placeholder:text-muted-foreground",
  "outline-none transition-[border-color,box-shadow] duration-[120ms] motion-off:transition-none",
  // Blue ring on focus; the error colour wins over it. A 1px ring on the 1px border reads as the 2px border of the native kit, without shifting the text.
  "focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary",
  "aria-invalid:border-destructive aria-invalid:ring-1 aria-invalid:ring-destructive",
  "disabled:cursor-not-allowed disabled:opacity-50 read-only:bg-muted",
];

export function Input({ className, type, ...props }: ComponentProps<"input">) {
  return <input type={type} data-slot="input" className={cn(control, "min-h-12", className)} {...props} />;
}

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return <textarea data-slot="textarea" className={cn(control, "min-h-24 py-3", className)} {...props} />;
}

export function Label({ className, ...props }: ComponentProps<typeof LabelPrimitive.Root>) {
  return <LabelPrimitive.Root data-slot="label" className={cn("text-[15px] font-bold text-foreground", className)} {...props} />;
}

type FieldProps = { label: string; help?: ReactNode; error?: ReactNode; className?: string };

/**
 * A labelled text field with help or error text under it. `multiline` makes
 * it a text area. Inside a read-only community it can't be edited.
 */
export function Field(props: FieldProps & ((ComponentProps<"input"> & { multiline?: false }) | (ComponentProps<"textarea"> & { multiline: true }))) {
  const { label, help, error, className, multiline, id: idProp, ...rest } = props;
  const readOnly = useContext(ReadOnly);
  const auto = useId();
  const id = idProp ?? auto;
  const note = error ?? help;
  const noteId = note ? `${id}-note` : undefined;
  const shared = {
    id,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": noteId,
    ...(readOnly ? { readOnly: true } : null),
  };
  return (
    <div data-slot="field" className={cn("flex flex-col gap-1", className)}>
      <Label htmlFor={id}>{label}</Label>
      {multiline ? <Textarea {...(rest as ComponentProps<"textarea">)} {...shared} /> : <Input {...(rest as ComponentProps<"input">)} {...shared} />}
      {note ? (
        <p id={noteId} className={cn("text-sm", error ? "text-destructive" : "text-muted-foreground")}>
          {note}
        </p>
      ) : null}
    </div>
  );
}
