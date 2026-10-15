"use client";

import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useEffect, useRef, type ComponentProps } from "react";
import { DayPicker, getDefaultClassNames, type DayButton } from "react-day-picker";
import { ptBR } from "react-day-picker/locale";
import { Button, buttonVariants } from "./button";
import { cn } from "../web/utils";

/**
 * shadcn/ui Calendar (react-day-picker), in Portuguese by default. Days are
 * 40px targets; the selected day is CTA blue, today a lavender chip, and the
 * month caption is set in the display face.
 */
function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  locale = ptBR,
  formatters,
  components,
  ...props
}: ComponentProps<typeof DayPicker> & { buttonVariant?: ComponentProps<typeof Button>["variant"] }) {
  const d = getDefaultClassNames();
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      locale={locale}
      className={cn(
        "group/calendar bg-background p-3 [--cell-size:--spacing(10)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className,
      )}
      captionLayout={captionLayout}
      formatters={{ formatMonthDropdown: (date) => date.toLocaleString(locale?.code ?? "pt-BR", { month: "short" }), ...formatters }}
      classNames={{
        root: cn("w-fit", d.root),
        months: cn("relative flex flex-col gap-4 medium:flex-row", d.months),
        month: cn("flex w-full flex-col gap-4", d.month),
        nav: cn("absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1", d.nav),
        button_previous: cn(buttonVariants({ variant: buttonVariant }), "size-(--cell-size) min-h-0 p-0 select-none aria-disabled:opacity-50", d.button_previous),
        button_next: cn(buttonVariants({ variant: buttonVariant }), "size-(--cell-size) min-h-0 p-0 select-none aria-disabled:opacity-50", d.button_next),
        month_caption: cn("flex h-(--cell-size) w-full items-center justify-center px-(--cell-size)", d.month_caption),
        dropdowns: cn("flex h-(--cell-size) w-full items-center justify-center gap-1.5 text-[15px] font-bold", d.dropdowns),
        dropdown_root: cn("relative rounded-md border border-input has-focus:border-primary has-focus:ring-1 has-focus:ring-primary", d.dropdown_root),
        dropdown: cn("absolute inset-0 bg-popover opacity-0", d.dropdown),
        caption_label: cn(
          "font-display font-black tracking-[-0.2px] uppercase select-none",
          captionLayout === "label" ? "text-base" : "flex h-8 items-center gap-1 rounded-md pr-1 pl-2 text-[15px] [&>svg]:size-3.5 [&>svg]:text-primary",
          d.caption_label,
        ),
        table: "w-full border-collapse",
        weekdays: cn("flex", d.weekdays),
        weekday: cn("flex-1 rounded-md text-xs font-bold text-muted-foreground uppercase select-none", d.weekday),
        week: cn("mt-1 flex w-full", d.week),
        week_number_header: cn("w-(--cell-size) select-none", d.week_number_header),
        week_number: cn("text-xs text-muted-foreground select-none", d.week_number),
        day: cn(
          "group/day relative aspect-square h-full w-full p-0 text-center select-none [&:first-child[data-selected=true]_button]:rounded-l-lg [&:last-child[data-selected=true]_button]:rounded-r-lg",
          d.day,
        ),
        range_start: cn("rounded-l-lg bg-accent", d.range_start),
        range_middle: cn("rounded-none", d.range_middle),
        range_end: cn("rounded-r-lg bg-accent", d.range_end),
        today: cn("rounded-lg bg-accent font-bold text-accent-foreground data-[selected=true]:rounded-none", d.today),
        outside: cn("text-muted-foreground aria-selected:text-muted-foreground", d.outside),
        disabled: cn("text-muted-foreground opacity-50", d.disabled),
        hidden: cn("invisible", d.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => <div data-slot="calendar" ref={rootRef} className={cn(className)} {...props} />,
        Chevron: ({ className, orientation, ...props }) => {
          const Icon = orientation === "left" ? ChevronLeftIcon : orientation === "right" ? ChevronRightIcon : ChevronDownIcon;
          return <Icon className={cn("size-5 text-primary", className)} strokeWidth={3} {...props} />;
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props }) => (
          <td {...props}>
            <div className="flex size-(--cell-size) items-center justify-center text-center">{children}</div>
          </td>
        ),
        ...components,
      }}
      {...props}
    />
  );
}

function CalendarDayButton({ className, day, modifiers, ...props }: ComponentProps<typeof DayButton>) {
  const d = getDefaultClassNames();
  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);
  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={modifiers.selected && !modifiers.range_start && !modifiers.range_end && !modifiers.range_middle}
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        "flex aspect-square size-auto min-h-0 w-full min-w-(--cell-size) flex-col gap-1 rounded-lg text-[15px] leading-none font-medium",
        "group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] group-data-[focused=true]/day:ring-ring/50",
        "data-[range-end=true]:rounded-lg data-[range-end=true]:rounded-r-lg data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground",
        "data-[range-middle=true]:rounded-none data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground",
        "data-[range-start=true]:rounded-lg data-[range-start=true]:rounded-l-lg data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground",
        "data-[selected-single=true]:bg-primary data-[selected-single=true]:font-bold data-[selected-single=true]:text-primary-foreground [&>span]:text-xs [&>span]:opacity-70",
        d.day,
        className,
      )}
      {...props}
    />
  );
}

export { Calendar, CalendarDayButton };
