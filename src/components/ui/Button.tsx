import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "btn-primary bg-[#00d1ff] text-[#021018] shadow-[0_0_0_1px_rgba(0,209,255,0.35)] hover:bg-[#5be7ff] active:translate-y-px",
  secondary:
    "btn-secondary border border-white/25 bg-white/10 text-white hover:border-cyan/50 hover:bg-white/15 active:translate-y-px",
  ghost: "text-white hover:bg-white/10 hover:text-white",
};

const sizeClasses: Record<ButtonSize, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-sm sm:h-[3.25rem] sm:px-7 sm:text-[0.9375rem]",
};

type CommonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

type ButtonAsButton = CommonProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof CommonProps> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<ComponentPropsWithoutRef<"a">, keyof CommonProps> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-lg font-semibold tracking-tight transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-navy disabled:pointer-events-none disabled:opacity-55",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

  if ("href" in props && props.href) {
    const { href, ...rest } = props;
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  const buttonProps = props as ButtonAsButton;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
