import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  icon?: ReactNode;
}

export function Button({ 
  variant = "primary", 
  size = "md", 
  children, 
  icon, 
  className = "", 
  ...props 
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center gap-2 font-medium transition-all duration-300 rounded-lg outline-none focus:ring-2 focus:ring-offset-1 active:scale-[0.98]";
  
  const variants = {
    primary: "bg-[#1e293b] text-white hover:bg-black hover:shadow-lg focus:ring-[#1e293b]",
    secondary: "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:text-gray-900 focus:ring-gray-200 shadow-sm",
    danger: "bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 focus:ring-red-200",
    ghost: "bg-transparent text-gray-500 hover:text-[#1e293b] hover:bg-gray-100",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  );
}
