import React from 'react';

/**
 * Base Card Primitive
 */
export function Card({
  children,
  variant = 'default',
  hover = true,
  className = '',
  ...props
}) {
  const variantStyles = {
    default: "bg-bg-surface border border-border-light",
    flat: "bg-transparent border border-border-light",
    warm: "bg-bg-warm border border-border-light",
    dark: "bg-bg-dark-surface border border-border-dark text-ink-light",
  };

  const hoverStyles = hover
    ? "transition-all duration-500 hover:shadow-card hover:-translate-y-1"
    : "";

  return (
    <div
      className={`relative overflow-hidden ${variantStyles[variant] || variantStyles.default} ${hoverStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export default Card;
