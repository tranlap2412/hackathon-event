"use client";

import {
  DialogBackdrop,
  DialogCloseTrigger,
  DialogContent,
  DialogPositioner,
  DialogRoot,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { MessageDescriptor } from "@lingui/core";
import { useLingui } from "@lingui/react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { DreamForgeMark } from "@/components/brand/mark";
import { Button } from "@/components/ui/button";
import { Frame } from "@/components/ui/frame";
import { Switcher } from "./switcher";

interface NavItem {
  name: MessageDescriptor;
  url: string;
  icon: LucideIcon;
}

interface MobileNavProps {
  items: NavItem[];
}

export function MobileNav({ items }: MobileNavProps) {
  const { i18n } = useLingui();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>(i18n._(items[0]?.name));
  const ignoreScroll = useRef(false);

  useEffect(() => {
    if (ignoreScroll.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (ignoreScroll.current) return;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            const match = items.find((i) => i.url === `#${id}`);
            if (match) setActiveTab(i18n._(match.name));
          }
        });
      },
      { threshold: 0.5 }
    );

    items.forEach((item) => {
      const el = document.querySelector(item.url);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items, i18n]);

  const handleLinkClick = (e: React.MouseEvent, item: NavItem) => {
    e.preventDefault();
    const label = i18n._(item.name);

    setIsOpen(false);

    setTimeout(() => {
      const target = document.querySelector(item.url);
      if (target) {
        ignoreScroll.current = true;
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        setActiveTab(label);
        setTimeout(() => {
          ignoreScroll.current = false;
        }, 800);
      }
      window.history.pushState(null, "", item.url);
    }, 350);
  };

  return (
    <DialogRoot
      open={isOpen}
      onOpenChange={(details) => setIsOpen(details.open)}
    >
      <DialogTrigger asChild>
        <Button className="ml-auto px-7 h-9 w-9">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 16 16"
              className="pb-2 text-primary"
            >
              <path
                fill="currentColor"
                d="M2 3.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m0 4a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m0 4a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5"
              />
            </svg>
          </div>
        </Button>
      </DialogTrigger>

      {/* Backdrop */}
      <DialogBackdrop />

      <DialogPositioner>
        <DialogContent className="!p-8 flex flex-col gap-6">
          {/* Close button */}
          <DialogCloseTrigger />

          {/* Header */}
          <div className="flex items-center justify-center">
            <span className="relative flex items-center gap-2 !text-2xl font-semibold text-shadow-lg text-shadow-primary [font-family:var(--font-orbitron)]">
              <DreamForgeMark className="w-7 h-7 text-primary" />
              DreamForge
            </span>
          </div>

          {/* Navigation */}
          <nav className="relative flex flex-col gap-3">
            {items.map((item) => {
              const label = i18n._(item.name);
              const isActive = activeTab === label;

              return (
                <Link
                  key={label}
                  href={item.url}
                  onClick={(e) => handleLinkClick(e, item)}
                  className={cn(
                    "relative flex items-center gap-3 rounded-md px-4 py-3 text-base font-medium",
                    "text-muted-foreground hover:text-primary",
                    isActive && "text-primary"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{label}</span>

                  {/* Frame effect */}
                  <div className="absolute inset-0 -z-10">
                    <Frame
                      className={cn(
                        isActive
                          ? "drop-shadow-[0_0_8px_var(--color-primary)]"
                          : "opacity-0 group-hover:opacity-100"
                      )}
                      paths={JSON.parse(
                        '[{"show":true,"style":{"strokeWidth":"1","stroke":"var(--color-frame-1-stroke)","fill":"transparent"},"path":[["M","6","0"],["L","100% - 6","0"],["L","100%","100%"],["L","0","100%"],["L","6","0"]]}]'
                      )}
                    />
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* Footer: Switcher */}
          <div className="relative pt-4 mt-4 border-t border-border">
            <Switcher />
          </div>
        </DialogContent>
      </DialogPositioner>
    </DialogRoot>
  );
}
