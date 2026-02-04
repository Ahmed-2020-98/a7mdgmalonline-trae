import { ServiceIconName } from "../lib/types";

type ServiceIconProps = {
  name: ServiceIconName;
};

const iconClasses = "h-6 w-6 text-primary";

export function ServiceIcon({ name }: ServiceIconProps) {
  if (name === "info-site") {
    return (
      <svg viewBox="0 0 24 24" className={iconClasses} fill="none">
        <path
          d="M4 12c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8-8-3.582-8-8Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M12 8.5h.01M10.75 11.5h2.5v4h-2.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (name === "cart-basket") {
    return (
      <svg viewBox="0 0 24 24" className={iconClasses} fill="none">
        <path
          d="M5 7h14l-1.5 9h-11L5 7Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M9 7l1.5-3h3L15 7"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M9 19a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  if (name === "wordpress") {
    return (
      <svg viewBox="0 0 24 24" className={iconClasses} fill="none">
        <path
          d="M12 4.5a7.5 7.5 0 1 0 0 15 7.5 7.5 0 0 0 0-15Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M8.5 9.5c.8 2.2 1.6 4.5 2.4 6.7m4.6-6.7c-.9 2.4-1.8 4.7-2.7 7.1"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className={iconClasses} fill="none">
      <path
        d="M4 6h16v12H4z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M8 10h4M8 14h8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
