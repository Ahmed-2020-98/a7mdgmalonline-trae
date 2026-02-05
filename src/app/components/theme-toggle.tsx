"use client";

import { useTheme } from "next-themes";

const themes = [
  { value: "light", label: "فاتح", icon: "☀️" },
  { value: "dark", label: "داكن", icon: "🌙" },
  { value: "system", label: "النظام", icon: "🖥️" },
];

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const activeTheme = theme === "system" ? resolvedTheme : theme;

  return (
    <div className="flex items-center gap-2 rounded-full border border-border bg-background p-1 text-xs font-semibold text-foreground/70">
      {themes.map((item) => (
        <button
          key={item.value}
          type="button"
          onClick={() => setTheme(item.value)}
          className={`flex items-center gap-1 rounded-full px-3 py-2 transition ${
            (activeTheme ?? "system") === item.value
              ? "bg-primary text-white"
              : "hover:bg-muted/70"
          }`}
          aria-pressed={(activeTheme ?? "system") === item.value}
        >
          <span aria-hidden="true">{item.icon}</span>
          <span className="hidden sm:inline">{item.label}</span>
        </button>
      ))}
    </div>
  );
}
