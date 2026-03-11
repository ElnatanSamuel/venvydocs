import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface Heading {
  id: string;
  text: string;
  level: number;
}

const TableOfContents: React.FC = () => {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      const els = document.querySelectorAll(".doc-prose h2[id], .doc-prose h3[id]");
      const items: Heading[] = Array.from(els).map((el) => ({
        id: el.id,
        text: el.textContent || "",
        level: el.tagName === "H2" ? 2 : 3,
      }));
      setHeadings(items);
    }, 100);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0.1 }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <div className="hidden xl:block w-48 shrink-0 sticky top-20 h-fit max-h-[calc(100vh-6rem)] overflow-y-auto">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">
        On this page
      </p>
      <nav className="space-y-0.5">
        {headings.map((h) => (
          <a
            key={h.id}
            href={`#${h.id}`}
            className={`block text-[12px] py-0.5 transition-colors ${
              h.level === 3 ? "pl-3" : ""
            } ${
              activeId === h.id
                ? "text-accent font-medium"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(h.id)?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            {h.text}
          </a>
        ))}
      </nav>
    </div>
  );
};

export default TableOfContents;
