import Link from "next/link";

type Variant = "light" | "dark" | "small";

const variantClass: Record<Variant, string> = {
  light:
    "bg-steel-100 py-1.5 pl-5 pr-1.5 text-sm text-steel-500 transition-colors duration-500 hover:text-steel-950",
  dark: "bg-steel-300 py-1.5 pl-5 pr-1.5 text-sm text-steel-950",
  small: "bg-steel-800 py-1 pl-4 pr-1 text-sm text-white",
};

function ArrowGlyphs() {
  return (
    <span className="arrow-btn-orb" aria-hidden="true">
      <svg viewBox="0 0 20 20" fill="none">
        <path
          d="M6 14L14 6M14 6H8.5M14 6v5.5"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function ArrowButton({
  href,
  variant = "light",
  children,
  className = "",
  type = "button",
  disabled,
  onClick,
}: {
  href?: string;
  variant?: Variant;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
}) {
  const cls = `arrow-btn arrow-btn-${variant} ${variantClass[variant]} ${className}`.trim();
  const inner = (
    <>
      <span className="arrow-btn-label">
        {variant === "dark" ? (
          <span className="arrow-btn-label-hover" aria-hidden="true">
            {children}
          </span>
        ) : null}
        {children}
      </span>
      <ArrowGlyphs />
    </>
  );

  if (href && /^(tel:|mailto:|https?:)/.test(href)) {
    return (
      <a href={href} className={cls} onClick={onClick}>
        {inner}
      </a>
    );
  }

  if (href) {
    return (
      <Link href={href} className={cls} onClick={onClick}>
        {inner}
      </Link>
    );
  }

  return (
    <button type={type} className={cls} disabled={disabled} onClick={onClick}>
      {inner}
    </button>
  );
}
