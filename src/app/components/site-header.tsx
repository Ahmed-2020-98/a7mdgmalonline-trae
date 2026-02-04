import Link from "next/link";
import { headerCta, headerLabels } from "../data/header";
import { navigation } from "../data/navigation";
import { siteConfig } from "../data/site";
import ThemeToggle from "./theme-toggle";
import Button from "../ui/button";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-lg font-semibold text-primary">
          {siteConfig.name}
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-foreground/80 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <Button label={headerCta.label} href={headerCta.href} variant="primary" />
        </div>
        <details className="relative md:hidden">
          <summary className="flex cursor-pointer list-none items-center justify-center rounded-full border border-border p-2 text-primary">
            <span className="sr-only">{headerLabels.menu}</span>
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </summary>
          <div className="absolute left-0 right-0 mt-3 rounded-2xl border border-border bg-background p-4 shadow-lg">
            <div className="flex flex-col gap-4 text-sm font-medium text-foreground">
              {navigation.map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ))}
              <ThemeToggle />
              <Button
                label={headerCta.label}
                href={headerCta.href}
                variant="secondary"
              />
            </div>
          </div>
        </details>
      </div>
    </header>
  );
}
