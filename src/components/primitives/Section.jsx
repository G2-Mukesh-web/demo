import React from 'react';

/**
 * Editorial Section Wrapper Primitive
 * Alternates structured backgrounds (#FAF9F5, #FFFFFF, #F1ECE3, #181816)
 * with subtle architectural dividers and precise typography hierarchy.
 */
export function Section({
  children,
  id,
  variant = 'default',
  spacing = 'normal',
  container = true,
  className = '',
  eyebrow,
  title,
  subtitle,
  headerAction,
  ...props
}) {
  const isDark = variant === 'dark';

  const variantStyles = {
    default: "bg-bg-primary text-ink-primary",
    surface: "bg-bg-surface text-ink-primary border-y border-border-light",
    warm: "bg-bg-warm text-ink-primary border-y border-border-warm/60",
    dark: "bg-bg-dark text-white border-y border-border-dark",
    transparent: "bg-transparent text-ink-primary",
  };

  const spacingStyles = {
    none: "py-0",
    compact: "py-12 md:py-16",
    normal: "py-20 md:py-28 lg:py-32",
    loose: "py-24 md:py-32 lg:py-40",
  };

  const hasHeader = eyebrow || title || subtitle || headerAction;

  return (
    <section
      id={id}
      className={`relative w-full ${variantStyles[variant] || variantStyles.default} ${spacingStyles[spacing] || spacingStyles.normal} ${className}`}
      {...props}
    >
      <div className={container ? "editorial-container" : "w-full"}>
        {hasHeader && (
          <div className="mb-12 md:mb-16 lg:mb-20">
            <div className={`flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b ${isDark ? 'border-border-dark' : 'border-border-light'}`}>
              <div className="max-w-2xl">
                {eyebrow && (
                  <p className="editorial-eyebrow mb-3 flex items-center gap-2">
                    <span className="w-2.5 h-px bg-accent-brass" />
                    <span>{eyebrow}</span>
                  </p>
                )}
                {title && (
                  <h2 className={`editorial-heading-2 ${isDark ? 'text-white' : 'text-ink-primary'}`}>
                    {title}
                  </h2>
                )}
                {subtitle && (
                  <p className={`mt-3 text-sm md:text-base leading-relaxed font-light ${isDark ? 'text-ink-subtle' : 'text-ink-muted'}`}>
                    {subtitle}
                  </p>
                )}
              </div>
              {headerAction && (
                <div className="shrink-0">
                  {headerAction}
                </div>
              )}
            </div>
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

export default Section;
