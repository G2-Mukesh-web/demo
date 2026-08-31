import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

/**
 * Editorial Architectural Button Primitive
 * Primary: Normal #D4AF37 (text #FFFFFF), Hover #1B2A47 (text #FFFFFF), 0.3s ease
 * Secondary: Normal transparent (border/text #1B2A47), Hover #1B2A47 (text #FFFFFF), 0.3s ease
 * Dark Section: Normal #D4AF37 (text #FFFFFF), Hover #FDFBF7 (text #1B2A47), 0.3s ease
 * Geometry: Sharp 2px corners (no bubbly curves)
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
  const baseStyles = "inline-flex items-center justify-center font-sans font-medium tracking-wide uppercase transition-all duration-300 relative select-none rounded-[2px] min-h-[44px]";

  const sizeStyles = {
    sm: "text-[11px] tracking-[0.14em] py-2.5 px-4 gap-2 sm:min-h-[38px]",
    md: "text-xs tracking-[0.15em] py-3.5 px-6 gap-2.5 min-h-[44px]",
    lg: "text-xs tracking-[0.18em] py-4 px-8 gap-3 min-h-[48px]",
  };

  const variantStyles = {
    primary: "bg-[#D4AF37] text-white hover:bg-[#1B2A47] hover:text-white border border-[#D4AF37] hover:border-[#1B2A47] shadow-subtle active:scale-[0.99]",
    dark: "bg-[#D4AF37] text-white hover:bg-[#FDFBF7] hover:text-[#1B2A47] border border-[#D4AF37] hover:border-[#FDFBF7] shadow-subtle active:scale-[0.99]",
    outline: "bg-transparent text-[#1B2A47] border border-[#1B2A47] hover:bg-[#1B2A47] hover:text-[#FDFBF7] hover:border-[#1B2A47] transition-colors active:scale-[0.99]",
    white: "bg-[#FDFBF7] text-[#1B2A47] hover:bg-[#D4AF37] hover:text-white border border-[#FDFBF7] hover:border-[#D4AF37] active:scale-[0.99]",
    ghost: "bg-transparent text-[#1B2A47] hover:text-[#D4AF37] px-3 py-2",
    subtle: "bg-[#FDFBF7] text-[#1B2A47] hover:bg-[#1B2A47] hover:text-white border border-[#EAE6DF] hover:border-[#D4AF37]",
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
      <Link to={to} className={combinedClasses} {...props}>
        <span>{children}</span>
        {renderIcon()}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={combinedClasses} target="_blank" rel="noopener noreferrer" {...props}>
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
