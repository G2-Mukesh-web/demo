import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

/**
 * Premium Architectural Button Primitive
 * Primary: Normal #C27D66 (Terracotta, text #EFEFEA), Hover #2C3531 (Deep Forest Charcoal, text #EFEFEA), 0.3s ease
 * Secondary/Outline: Normal transparent (border/text #2C3531), Hover #C27D66 (text #EFEFEA), 0.3s ease
 * Dark Section: Normal #C27D66 (text #EFEFEA), Hover #EFEFEA (text #2C3531), 0.3s ease
 * Geometry: Sharp 2px-4px corners
 * Micro-interaction: Arrow translates 4px on hover
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  onClick,
  type = 'button',
  icon,
  arrow = false,
  className = '',
  disabled = false,
  ...props
}) {
  const baseStyles = "inline-flex items-center justify-center font-sans font-medium tracking-wider uppercase transition-all duration-300 relative select-none rounded-[2px] min-h-[44px]";

  const sizeStyles = {
    sm: "text-[11px] tracking-[0.12em] py-2.5 px-4 gap-2 sm:min-h-[38px]",
    md: "text-xs tracking-[0.14em] py-3 px-6 gap-2.5 min-h-[44px]",
    lg: "text-xs tracking-[0.16em] py-3.5 px-8 gap-3 min-h-[48px]",
  };

  const variantStyles = {
    primary: "bg-[#C27D66] text-[#1D211F] hover:bg-[#A8624E] hover:text-[#F5F3ED] border border-[#C27D66] hover:border-[#A8624E] shadow-subtle active:scale-[0.99] font-semibold",
    dark: "bg-[#303A35] text-[#F5F3ED] hover:bg-[#C27D66] hover:text-[#1D211F] border border-[rgba(245,243,237,0.2)] hover:border-[#C27D66] shadow-subtle active:scale-[0.99]",
    outline: "bg-transparent text-[#303A35] border border-[#303A35] hover:bg-[#303A35] hover:text-[#F5F3ED] hover:border-[#303A35] transition-colors active:scale-[0.99]",
    outlineLight: "bg-transparent text-[#F5F3ED] border border-[rgba(245,243,237,0.4)] hover:bg-[#C27D66] hover:text-[#1D211F] hover:border-[#C27D66] transition-colors active:scale-[0.99]",
    white: "bg-[#EFEFEA] text-[#303A35] hover:bg-[#C27D66] hover:text-[#1D211F] border border-[#EFEFEA] hover:border-[#C27D66] active:scale-[0.99]",
    ghost: "bg-transparent text-[#303A35] hover:text-[#C27D66] px-3 py-2",
    subtle: "bg-[#EFEFEA] text-[#303A35] hover:bg-[#303A35] hover:text-[#F5F3ED] border border-[rgba(48,58,53,0.12)] hover:border-[#303A35]",
  };

  const combinedClasses = `${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${variantStyles[variant] || variantStyles.primary} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className}`;

  const renderIcon = () => {
    if (icon) return icon;
    if (arrow) {
      return (
        <ArrowRight className="w-3.5 h-3.5 btn-arrow shrink-0" />
      );
    }
    return null;
  };

  if (to) {
    return (
      <Link to={to} onClick={onClick} className={combinedClasses} {...props}>
        <span>{children}</span>
        {renderIcon()}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} onClick={onClick} className={combinedClasses} target="_blank" rel="noopener noreferrer" {...props}>
        <span>{children}</span>
        {renderIcon()}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClasses}
      {...props}
    >
      <span>{children}</span>
      {renderIcon()}
    </button>
  );
}

export default Button;
