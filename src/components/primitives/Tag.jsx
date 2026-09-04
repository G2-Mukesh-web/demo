import React from 'react';

/**
 * Tag / Pill Primitive for category filters, metadata badges, and status pills.
 * Active: Deep Forest Charcoal (#2C3531) with Soft Linen text or Terracotta (#C27D66)
 * Inactive: Soft Linen Gray with subtle hairline border
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

  const baseStyles = "inline-flex items-center justify-center font-sans font-medium uppercase transition-all duration-200 select-none min-h-[40px] sm:min-h-[36px] rounded-[2px]";

  const sizeStyles = {
    xs: "text-[10px] tracking-[0.10em] px-2.5 py-1 min-h-[36px]",
    sm: "text-[11px] tracking-[0.12em] px-3 py-1.5 min-h-[40px] sm:min-h-[38px]",
    md: "text-xs tracking-[0.12em] px-4 py-2 min-h-[44px] sm:min-h-[38px]",
    lg: "text-xs tracking-[0.14em] px-5 py-2.5 min-h-[48px] sm:min-h-[42px]",
  };

  const variantStyles = {
    default: active
      ? "bg-[#C27D66] text-[#1D211F] font-semibold border border-[#C27D66] shadow-subtle"
      : "bg-[#303A35] text-[#A3ADA7] border border-[rgba(245,243,237,0.12)] hover:border-[#C27D66] hover:text-[#F5F3ED] shadow-subtle",
    light: active
      ? "bg-[#303A35] text-[#F5F3ED] font-semibold border border-[#303A35] shadow-subtle"
      : "bg-[#EFEFEA] text-[#5C6661] border border-[rgba(48,58,53,0.12)] hover:border-[#C27D66] hover:text-[#303A35]",
    brass: active
      ? "bg-[#C27D66] text-[#1D211F] font-semibold border border-[#C27D66] shadow-subtle"
      : "bg-transparent text-[#A3ADA7] border border-[rgba(245,243,237,0.15)] hover:border-[#C27D66] hover:text-[#F5F3ED]",
    dark: active
      ? "bg-[#C27D66] text-[#1D211F] font-semibold border border-[#C27D66]"
      : "bg-transparent text-[#A3ADA7] border border-[rgba(245,243,237,0.15)] hover:border-[#C27D66] hover:text-[#F5F3ED]",
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
