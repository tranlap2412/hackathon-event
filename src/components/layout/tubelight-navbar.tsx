"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Frame } from "@/components/ui/frame";
import { useLingui } from "@lingui/react";
import { MessageDescriptor } from "@lingui/core";

interface NavItem {
  name: MessageDescriptor;
  url: string; // "#id"
  icon: LucideIcon;
}

interface NavBarProps {
  items: NavItem[];
  className?: string;
}

export function NavBar({ items, className }: NavBarProps) {
  const { i18n } = useLingui();
  const [activeTab, setActiveTab] = useState<string>(items[0]?.url || "");
  const ignoreScroll = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (ignoreScroll.current) return;

      const scrollPosition = window.scrollY + window.innerHeight / 2; // điểm giữa viewport

      let current = activeTab;
      for (const item of items) {
        const section = document.querySelector(item.url) as HTMLElement | null;
        if (section) {
          const top = section.offsetTop;
          const height = section.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            current = item.url;
            break;
          }
        }
      }
      setActiveTab(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // chạy ngay lần đầu để sync active

    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  const handleClick = (e: React.MouseEvent, item: NavItem) => {
    e.preventDefault();
    const target = document.querySelector(item.url);
    if (target) {
      ignoreScroll.current = true;
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveTab(item.url);
      window.history.pushState(null, "", item.url);
      setTimeout(() => {
        ignoreScroll.current = false;
      }, 1000);
    }
  };

  return (
    <div className={cn("relative", className)}>
      <div className="flex items-center gap-1 p-1">
        {items.map((item) => {
          const Icon = item.icon;
          const label = i18n._(item.name);
          const isActive = activeTab === item.url;

          return (
            <a
              key={item.url}
              href={item.url}
              onClick={(e) => handleClick(e, item)}
              className={cn(
                "relative cursor-pointer text-sm font-semibold py-2 flex items-center gap-2 px-6 xl:px-3 2xl:px-5",
                "text-foreground/70 hover:text-primary transition-all"
                // isActive && "text-primary"
              )}
            >
              <Icon size={22} strokeWidth={2} className="xl:hidden" />
              <Icon size={18} strokeWidth={2} className="hidden xl:inline" />
              <span className="hidden xl:inline text-nowrap">{label}</span>

              {isActive && (
                <motion.div
                  layoutId="nav-frame"
                  className="absolute inset-0 z-10"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <Frame
                    enableBackdropBlur={false}
                    className="drop-shadow-[0_0_8px_var(--color-primary)]"
                    paths={JSON.parse(
                      `[{
                        "show": true,
                        "style": {
                          "strokeWidth": "1",
                          "stroke": "var(--color-frame-1-stroke)",
                          "fill": "var(--color-frame-1-fill)"
                        },
                        "path": [
                          ["M","17","0"],              
                          ["L","100% - 7","0"],       
                          ["L","100% - 7","90%"],     
                          ["L","4","100% - 6"],       
                          ["L","0","100% - 15"],      
                          ["L","17","0"]              
                        ]
                      },
                      {
                        "show": true,
                        "style": {
                          "strokeWidth": "1",
                          "stroke": "var(--color-frame-2-stroke)",
                          "fill": "var(--color-frame-2-fill)"
                        },
                        "path": [
                          ["M","9","100% - 6"],
                          ["L","100% - 22","100% - 6"],
                          ["L","100% - 25","100% + 0"],
                          ["L","12","100% + 0"],
                          ["L","9","100% - 6"]
                        ]
                      }]`
                    )}
                  />
                </motion.div>
              )}
            </a>
          );
        })}
      </div>
    </div>
  );
}
