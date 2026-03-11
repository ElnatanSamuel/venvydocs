import React from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavItem { title: string; href: string; }

const navigation: NavItem[] = [
  { title: "Getting Started", href: "/" },
  { title: "Validators", href: "/validators" },
  { title: "CLI Reference", href: "/cli" },
  { title: "Runtime Protection", href: "/runtime" },
  { title: "Zod Integration", href: "/zod" },
  { title: "Compatibility", href: "/compatibility" },
];

interface DocSidebarProps { isOpen: boolean; onToggle: () => void; }

const DocSidebar: React.FC<DocSidebarProps> = ({ isOpen, onToggle }) => {
  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-30 md:hidden" onClick={onToggle} />}
      <aside className={cn(
        "fixed top-12 left-0 z-40 h-[calc(100vh-3rem)] w-52 bg-background overflow-y-auto transition-transform duration-200 md:sticky md:top-12 md:translate-x-0 md:shrink-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )} style={{ borderRight: '1px solid hsl(var(--border) / 0.3)' }}>
        <nav className="p-4 space-y-0.5">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2 px-2">Documentation</p>
          {navigation.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              end
              className={({ isActive }) => cn(
                "block px-2 py-1.5 text-[13px] rounded-md transition-colors",
                isActive
                  ? "bg-accent/10 font-medium text-accent"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
              onClick={() => { if (window.innerWidth < 768) onToggle(); }}
            >
              {item.title}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default DocSidebar;
