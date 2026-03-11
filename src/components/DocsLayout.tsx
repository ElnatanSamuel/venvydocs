import React, { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Menu, Github, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./ThemeToggle";
import DocSidebar from "./DocSidebar";
import DocsPrevNext from "./DocsPrevNext";
import TableOfContents from "./TableOfContents";
import { useTheme } from "@/contexts/ThemeContext";

const DocsLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { dark } = useTheme();
  
  console.log('DocsLayout - dark:', dark);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 h-12 bg-background/90 backdrop-blur-md border-b">
        <div className="flex items-center justify-between h-full px-4">
          <div className="flex items-center gap-2.5">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 md:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="h-3.5 w-3.5" />
            </Button>
            <Link to="/" className="flex items-center">
              <div className="rounded flex items-center justify-center">
               <img 
                 key={dark ? 'dark' : 'light'} 
                 src={dark ? "/venvywhite.png" : "/venvyblack.png"} 
                 alt="venvy" 
                 className="h-5 w-5" 
               />
              </div>
              <span className="font-bold text-lg" style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>venvy</span>
            </Link>
            
          </div>
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <a href="https://www.npmjs.com/package/venvy" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon" className="h-7 w-7" title="npm">
                <Package className="h-3.5 w-3.5" />
              </Button>
            </a>
            <a href="https://github.com/ElnatanSamuel/venvy" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon" className="h-7 w-7" title="GitHub">
                <Github className="h-3.5 w-3.5" />
              </Button>
            </a>
          </div>
        </div>
      </header>

      <div className="flex">
        <DocSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(false)} />
        <main className="flex-1 min-w-0 px-6 md:px-12 py-8">
          <div className="flex gap-10">
            <div className="flex-1 min-w-0 max-w-3xl">
              <Outlet key={location.pathname} />
              <DocsPrevNext />
            </div>
            <TableOfContents />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DocsLayout;
