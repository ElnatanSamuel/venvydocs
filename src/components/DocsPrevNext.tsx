import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const flatPages = [
  { title: "Getting Started", href: "/" },
  { title: "Validators", href: "/validators" },
  { title: "CLI Reference", href: "/cli" },
  { title: "Runtime Protection", href: "/runtime" },
  { title: "Zod Integration", href: "/zod" },
  { title: "Compatibility", href: "/compatibility" },
];

const DocsPrevNext: React.FC = () => {
  const { pathname } = useLocation();
  const idx = flatPages.findIndex((p) => p.href === pathname);
  const prev = idx > 0 ? flatPages[idx - 1] : null;
  const next = idx < flatPages.length - 1 ? flatPages[idx + 1] : null;

  return (
    <div className="grid grid-cols-2 gap-3 mt-14 pt-6" style={{ borderTop: '1px solid hsl(var(--border) / 0.3)' }}>
      {prev ? (
        <Link to={prev.href} className="group flex flex-col gap-1 rounded-lg px-4 py-3 transition-colors hover:bg-muted/50" style={{ border: '1px solid hsl(var(--border) / 0.3)' }}>
          <span className="flex items-center gap-1 text-[11px] text-muted-foreground uppercase tracking-wider">
            <ChevronLeft className="h-3 w-3" />
            Previous
          </span>
          <span className="text-sm font-medium group-hover:text-accent transition-colors">{prev.title}</span>
        </Link>
      ) : <div />}
      {next ? (
        <Link to={next.href} className="group flex flex-col items-end gap-1 rounded-lg px-4 py-3 transition-colors hover:bg-muted/50" style={{ border: '1px solid hsl(var(--border) / 0.3)' }}>
          <span className="flex items-center gap-1 text-[11px] text-muted-foreground uppercase tracking-wider">
            Next
            <ChevronRight className="h-3 w-3" />
          </span>
          <span className="text-sm font-medium group-hover:text-accent transition-colors">{next.title}</span>
        </Link>
      ) : <div />}
    </div>
  );
};

export default DocsPrevNext;
