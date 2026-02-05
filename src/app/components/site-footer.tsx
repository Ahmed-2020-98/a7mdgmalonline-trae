import Image from "next/image";
import Link from "next/link";
import { navigation } from "../data/navigation";
import { siteConfig } from "../data/site";
import logoImage from "@/assets/images/logo.webp";

export default function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <Image src={logoImage} alt={siteConfig.name} width={40} height={40} />
              <p className="text-lg font-semibold text-primary">
                {siteConfig.name}
              </p>
            </div>
            <p className="text-sm text-foreground/70">
              {siteConfig.description}
            </p>
          </div>
          <nav className="flex flex-wrap gap-4 text-sm text-foreground/70">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center justify-between text-xs text-foreground/60">
          <span>
            {siteConfig.footerNote} © {new Date().getFullYear()}
          </span>
          <Link href={siteConfig.url} className="text-primary">
            {siteConfig.url}
          </Link>
        </div>
      </div>
    </footer>
  );
}
