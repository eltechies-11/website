import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "btn-primary bg-[#00d1ff] text-[#021018] shadow-[0_0_24px_rgba(0,209,255,0.22)] hover:bg-[#5be7ff] hover:shadow-[0_0_32px_rgba(0,209,255,0.35)] active:translate-y-px",
  secondary:
    "btn-secondary border border-fg/25 bg-fg/10 text-fg backdrop-blur-sm hover:border-cyan/50 hover:bg-fg/15 active:translate-y-px",
  ghost: "text-fg hover:bg-fg/10 hover:text-fg",
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
    "group/btn inline-flex items-center justify-center gap-2 rounded-lg font-semibold tracking-tight transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-navy disabled:pointer-events-none disabled:opacity-55 [&_svg]:transition-transform [&_svg]:duration-300 group-hover/btn:[&_svg]:translate-x-0.5",
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
