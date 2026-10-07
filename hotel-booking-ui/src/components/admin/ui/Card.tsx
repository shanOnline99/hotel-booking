import { ReactNode } from "react";

export function Card({ children, className = "", noPadding = false }: { children: ReactNode; className?: string; noPadding?: boolean }) {
  return (
    <div className={`bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 ${noPadding ? '' : 'p-6'} ${className}`}>
      {children}
    </div>
  );
}
