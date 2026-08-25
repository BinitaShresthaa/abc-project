"use client";

import { useEffect, useState } from "react";
import type { NavItem } from "@/lib/nav-config";
import NavIcon from "./icons";
import Logo from "./Logo";

function isParentActive(item: NavItem, activeKey: string) {
  if (item.key === activeKey) return true;
  return item.children?.some((c) => c.key === activeKey) ?? false;
}

export default function Sidebar({
  items,
  activeKey,
  onSelect,
}: {
  items: NavItem[];
  activeKey: string;
  onSelect: (key: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [openMobile, setOpenMobile] = useState(false);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const filtered = items.filter((item) => item.label.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    const active = items.find((item) => item.children?.some((c) => c.key === activeKey));
    if (active) setExpanded((prev) => new Set(prev).add(active.key));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeKey]);

  function toggleExpand(key: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  }

  function handleSelect(key: string) {
    onSelect(key);
    setOpenMobile(false);
  }

  return (
    <>
      <button
        onClick={() => setOpenMobile(true)}
        className="fixed left-4 top-4 z-40 flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900 lg:hidden"
        aria-label="Open menu"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-700 dark:text-slate-200">
          <path d="M3 6h18M3 12h18M3 18h18" />
        </svg>
      </button>

      {openMobile && (
        <div className="fixed inset-0 z-40 bg-slate-900/40 lg:hidden" onClick={() => setOpenMobile(false)} />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-200 dark:border-slate-800 dark:bg-slate-900 lg:static lg:translate-x-0 ${
          openMobile ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-5">
          <Logo />
          <button onClick={() => setOpenMobile(false)} className="text-slate-500 dark:text-slate-400 lg:hidden" aria-label="Close menu">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-5 pb-4">
          <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-400">
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search features"
              className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400 dark:text-slate-200"
            />
          </div>
        </div>

        <nav className="styled-scrollbar flex-1 space-y-1 overflow-y-auto px-3">
          {filtered.map((item) => {
            const hasChildren = !!item.children?.length;
            const active = isParentActive(item, activeKey);
            const isOpen = expanded.has(item.key);

            return (
              <div key={item.key}>
                <div className="relative flex items-center">
                  {active && <span className="absolute -left-3 h-6 w-1 rounded-r-full bg-primary" />}

                  {hasChildren ? (
                    <button
                      onClick={() => toggleExpand(item.key)}
                      aria-expanded={isOpen}
                      className={`flex flex-1 items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                        active ? "bg-primary/10 text-primary" : "text-slate-600 hover:bg-slate-50 hover:text-primary dark:text-slate-300 dark:hover:bg-slate-800"
                      }`}
                    >
                      <NavIcon name={item.icon} className="h-[18px] w-[18px] shrink-0" />
                      <span className="flex-1 truncate">{item.label}</span>
                      <svg
                        width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                        className={`shrink-0 text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`}
                      >
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleSelect(item.key)}
                      className={`flex flex-1 items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                        active ? "bg-primary/10 text-primary" : "text-slate-600 hover:bg-slate-50 hover:text-primary dark:text-slate-300 dark:hover:bg-slate-800"
                      }`}
                    >
                      <NavIcon name={item.icon} className="h-[18px] w-[18px] shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </button>
                  )}
                </div>

                {hasChildren && (
                  <div className={`overflow-hidden transition-all duration-200 ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                    <div className="relative ml-[26px] mt-1 space-y-0.5 pl-4">
                      <span className="absolute left-0 top-0 h-full w-px bg-slate-200 dark:bg-slate-700" />
                      {item.children!.map((child, idx) => {
                        const childActive = child.key === activeKey;
                        const isLast = idx === item.children!.length - 1;
                        return (
                          <div key={child.key} className="relative">
                            <span className="absolute -left-4 top-1/2 h-px w-4 bg-slate-200 dark:bg-slate-700" />
                            {isLast && <span className="absolute -left-4 top-1/2 bottom-[-100vh] w-px bg-white dark:bg-slate-900" />}
                            <button
                              onClick={() => handleSelect(child.key)}
                              className={`block w-full rounded-md py-1.5 pl-2 text-left text-sm transition-colors ${
                                childActive ? "font-medium text-primary" : "text-slate-500 hover:text-primary dark:text-slate-400"
                              }`}
                            >
                              {child.label}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="border-t border-slate-100 p-3 dark:border-slate-800">
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-50 hover:text-red-600 dark:text-slate-400 dark:hover:bg-slate-800">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
            </svg>
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}