import { ReactNode } from "react";

interface BadgeProps {
  status?: "success" | "warning" | "danger" | "neutral" | "info";
  children: ReactNode;
  className?: string;
  dot?: boolean;
}

export function Badge({ status = "neutral", children, className = "", dot = false }: BadgeProps) {
  const styles = {
    success: "bg-green-50 text-green-700 border-green-200",
    warning: "bg-yellow-50 text-yellow-700 border-yellow-200",
    danger: "bg-red-50 text-red-700 border-red-200",
    info: "bg-blue-50 text-blue-700 border-blue-200",
    neutral: "bg-gray-50 text-gray-700 border-gray-200",
  };

  const dotColors = {
    success: "bg-green-500",
    warning: "bg-yellow-500",
    danger: "bg-red-500",
    info: "bg-blue-500",
    neutral: "bg-gray-500",
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border transition-all hover:shadow-sm ${styles[status]} ${className}`}>
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColors[status]}`}></span>}
      {children}
    </span>
  );
}
