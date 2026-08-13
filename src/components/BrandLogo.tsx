import Image from "next/image";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  priority?: boolean;
  sizes?: string;
};

export function BrandLogo({
  className,
  priority = false,
  sizes = "56px",
}: BrandLogoProps) {
  const shared = cn("h-12 w-12 object-contain sm:h-14 sm:w-14", className);

  return (
    <span className="relative inline-flex shrink-0">
      <Image
        src={siteConfig.assets.logo}
        alt={`${siteConfig.name} logo`}
        width={160}
        height={150}
        quality={100}
        sizes={sizes}
        priority={priority}
        unoptimized
        className={cn(shared, "logo-for-dark")}
      />
      <Image
        src={siteConfig.assets.logoLight}
        alt=""
        width={160}
        height={150}
        quality={100}
        sizes={sizes}
        priority={priority}
        unoptimized
        aria-hidden
        className={cn(shared, "logo-for-light absolute inset-0")}
      />
    </span>
  );
}
