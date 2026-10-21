import Link from "next/link";

type Variant = "light" | "dark" | "small";

const variantClass: Record<Variant, string> = {
  light:
    "bg-steel-100 py-1.5 pl-5 pr-1.5 text-sm text-steel-500 hover:bg-white hover:text-steel-950 hover:shadow-sm",
  dark: "bg-steel-300 py-1.5 pl-5 pr-1.5 text-sm text-steel-950 hover:bg-steel-950 hover:text-white",
  small: "bg-steel-800 py-1 pl-4 pr-1 text-sm text-white hover:bg-steel-950",
};

function ArrowGlyphs() {
  return (
    <span className="arrow-btn-orb" aria-hidden="true">
      <svg className="arrow-btn-diag" viewBox="0 0 20 20" fill="none">
        <path
          d="M6 14L14 6M14 6H8.5M14 6v5.5"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <svg className="arrow-btn-line" viewBox="0 0 20 20" fill="none">
        <path
          d="M4 10h12M12 6l4 4-4 4"
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
      <span>{children}</span>
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
