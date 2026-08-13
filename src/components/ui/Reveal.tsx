"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delayMs?: number;
};

export function Reveal({ children, className, delayMs = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;

    const alreadyInView =
      node.getBoundingClientRect().top < window.innerHeight * 0.92;

    if (alreadyInView) {
      setAnimate(true);
      return;
    }

    setAnimate(true);
    setVisible(false);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "reveal-item will-change-transform motion-reduce:translate-y-0 motion-reduce:opacity-100",
        animate && "transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-6 opacity-0",
        className,
      )}
      style={{ transitionDelay: visible && animate ? `${delayMs}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}
