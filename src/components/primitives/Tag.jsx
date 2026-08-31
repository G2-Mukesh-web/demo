import React from 'react';

/**
 * Tag / Pill Primitive for category filters, metadata badges, and status pills.
 * Active: Deep Navy (#1B2A47) with Ivory text or Warm Brass
 * Inactive: Ivory / White Surface with subtle hairline border
 */
export function Tag({
  children,
  active = false,
  onClick,
  variant = 'default',
  size = 'md',
  className = '',
  as: Component = 'span',
  ...props
}) {
  const isClickable = !!onClick;
  const Element = isClickable ? 'button' : Component;

  const baseStyles = "inline-flex items-center justify-center font-sans font-medium uppercase transition-all duration-200 select-none min-h-[40px] sm:min-h-[36px]";

  const sizeStyles = {
    xs: "text-[10px] tracking-[0.12em] px-2.5 py-1 min-h-[36px]",
    sm: "text-[11px] tracking-[0.14em] px-3 py-1.5 min-h-[40px] sm:min-h-[38px]",
    md: "text-xs tracking-[0.14em] px-4 py-2 min-h-[44px] sm:min-h-[38px]",
    lg: "text-xs tracking-[0.16em] px-5 py-2.5 min-h-[48px] sm:min-h-[42px]",
  };

  const variantStyles = {
    default: active
      ? "bg-[#1B2A47] text-[#FDFBF7] border border-[#1B2A47] shadow-subtle"
      : "bg-[#FFFFFF] text-[#5F6470] border border-[#E5E0D6] hover:border-[#D4AF37] hover:text-[#1B2A47] shadow-subtle",
    brass: active
      ? "bg-[#D4AF37] text-[#1B2A47] border border-[#D4AF37] shadow-subtle"
      : "bg-[#FFFFFF] text-[#5F6470] border border-[#E5E0D6] hover:border-[#D4AF37] hover:text-[#1B2A47]",
    dark: active
      ? "bg-[#D4AF37] text-[#1B2A47] border border-[#D4AF37]"
      : "bg-transparent text-[#D9DCE2] border border-[#35435B] hover:border-[#D4AF37] hover:text-[#FDFBF7]",
  };

  return (
    <Element
      onClick={onClick}
      type={isClickable ? 'button' : undefined}
      className={`${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${variantStyles[variant] || variantStyles.default} ${isClickable ? 'cursor-pointer' : ''} ${className}`}
      {...props}
    >
      {children}
    </Element>
  );
}

export default Tag;
