import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from "lucide-react";
import type { ComponentProps } from "react";
import { buttonVariants, type Button } from "./button";
import { cn } from "../web/utils";

function Pagination({ className, ...props }: ComponentProps<"nav">) {
  return <nav role="navigation" aria-label="Paginação" data-slot="pagination" className={cn("mx-auto flex w-full justify-center", className)} {...props} />;
}

function PaginationContent({ className, ...props }: ComponentProps<"ul">) {
  return <ul data-slot="pagination-content" className={cn("flex flex-row items-center gap-1", className)} {...props} />;
}

function PaginationItem(props: ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />;
}

type PaginationLinkProps = { isActive?: boolean } & Pick<ComponentProps<typeof Button>, "size"> & ComponentProps<"a">;

/** The current page is outlined with its depth edge; the others are quiet. */
function PaginationLink({ className, isActive, size = "icon", ...props }: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(buttonVariants({ variant: isActive ? "outline" : "ghost", size }), className)}
      {...props}
    />
  );
}

function PaginationPrevious({ className, ...props }: ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink aria-label="Página anterior" size="default" className={cn("gap-1 px-2.5 medium:pl-2.5", className)} {...props}>
      <ChevronLeftIcon />
      <span className="hidden medium:block">Anterior</span>
    </PaginationLink>
  );
}

function PaginationNext({ className, ...props }: ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink aria-label="Próxima página" size="default" className={cn("gap-1 px-2.5 medium:pr-2.5", className)} {...props}>
      <span className="hidden medium:block">Próxima</span>
      <ChevronRightIcon />
    </PaginationLink>
  );
}

function PaginationEllipsis({ className, ...props }: ComponentProps<"span">) {
  return (
    <span aria-hidden data-slot="pagination-ellipsis" className={cn("flex size-12 items-center justify-center", className)} {...props}>
      <MoreHorizontalIcon className="size-5" />
      <span className="sr-only">Mais páginas</span>
    </span>
  );
}

export { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious };
