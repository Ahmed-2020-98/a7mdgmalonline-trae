import Link from "next/link";

type ButtonProps = {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

const styles = {
  primary:
    "bg-primary text-white hover:bg-primary/90 shadow-sm shadow-primary/20",
  secondary:
    "bg-secondary text-primary hover:bg-secondary/80 border border-secondary",
  ghost: "border border-primary/20 text-primary hover:bg-primary/5",
};

export default function Button({
  label,
  href,
  variant = "primary",
  className = "",
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition ${styles[variant]} ${className}`}
    >
      {label}
    </Link>
  );
}
