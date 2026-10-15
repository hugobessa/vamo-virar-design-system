import type { ReactNode } from "react";
import { BrandBox, FlagStripe, Wordmark } from "../web/brand";
import { cn } from "../web/utils";

/** The red brand panel beside the form: the wordmark, a headline and the campaign's stamped boxes. */
function AuthBrandPanel({ headline = "Organize sua comunidade", children }: { headline?: ReactNode; children?: ReactNode }) {
  return (
    <div className="relative flex h-full flex-col justify-between overflow-hidden bg-vv-red p-10 text-vv-white">
      <Wordmark size="lg" />
      <div className="flex flex-col gap-6">
        <p className="max-w-md font-condensed text-[56px] leading-[52px] font-black tracking-[-1px] uppercase">{headline}</p>
        {children ?? (
          <div aria-hidden className="flex flex-wrap gap-4">
            <BrandBox tone="yellow" size="sm">
              Ações
            </BrandBox>
            <BrandBox tone="blue" size="sm">
              Pessoas
            </BrandBox>
            <BrandBox tone="green" size="sm">
              Agenda
            </BrandBox>
          </div>
        )}
      </div>
      <FlagStripe className="absolute inset-x-0 bottom-0" height={8} />
    </div>
  );
}

/**
 * The frame of the sign-in pages. `split` (default) puts the red brand panel
 * beside the form from `wide` up and a red band with the wordmark above it on
 * phones; `centered` sets the form in a card on the light surface.
 */
function AuthLayout({
  children,
  variant = "split",
  headline,
  aside,
  footer,
  className,
}: {
  children: ReactNode;
  variant?: "split" | "centered";
  /** Headline of the brand panel. */
  headline?: ReactNode;
  /** Replaces the brand panel's boxes. */
  aside?: ReactNode;
  /** Small print under the form (terms, help). */
  footer?: ReactNode;
  className?: string;
}) {
  if (variant === "centered") {
    return (
      <div className={cn("flex min-h-svh flex-col items-center justify-center gap-6 bg-muted px-4 py-10 text-foreground", className)}>
        <Wordmark size="md" />
        <div className="w-full max-w-[420px] rounded-3xl border bg-background p-6 medium:p-8">{children}</div>
        {footer ? <div className="max-w-[420px] text-center text-sm text-balance text-muted-foreground">{footer}</div> : null}
      </div>
    );
  }
  return (
    <div className={cn("grid min-h-svh bg-background text-foreground wide:grid-cols-2", className)}>
      <div className="hidden wide:block">
        <AuthBrandPanel headline={headline}>{aside}</AuthBrandPanel>
      </div>
      <div className="flex flex-col">
        <div className="relative bg-vv-red px-4 pt-2 pb-4 wide:hidden">
          <Wordmark size="sm" />
          <FlagStripe className="absolute inset-x-0 bottom-0" height={4} />
        </div>
        <div className="flex flex-1 items-center justify-center px-4 py-10 medium:px-10">
          <div className="flex w-full max-w-[400px] flex-col gap-6">
            {children}
            {footer ? <div className="text-center text-sm text-balance text-muted-foreground">{footer}</div> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export { AuthBrandPanel, AuthLayout };
