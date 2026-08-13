"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";

type ThemeToggleProps = {
  className?: string;
};

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isLight = theme === "light";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-lg border border-fg/10 text-fg/70 transition hover:border-cyan/40 hover:bg-fg/5 hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-navy",
        className,
      )}
      aria-label={mounted ? (isLight ? "Switch to dark theme" : "Switch to light theme") : "Toggle color theme"}
      title={mounted ? (isLight ? "Dark theme" : "Light theme") : "Theme"}
    >
      <span className="relative h-4 w-4">
        <Sun
          className={cn(
            "absolute inset-0 h-4 w-4 transition-opacity",
            mounted && isLight ? "opacity-0" : "opacity-100",
          )}
          aria-hidden
        />
        <Moon
          className={cn(
            "absolute inset-0 h-4 w-4 transition-opacity",
            mounted && isLight ? "opacity-100" : "opacity-0",
          )}
          aria-hidden
        />
      </span>
    </button>
  );
}
