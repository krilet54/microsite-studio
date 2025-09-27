import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ReactNode } from 'react';

interface BackButtonProps {
  to?: string;
  label?: string;
  className?: string;
  children?: ReactNode;
}

export function BackButton({ to, label = 'Back', className = '', children }: BackButtonProps) {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      onClick={() => (to ? navigate(to) : navigate(-1))}
      className={`group inline-flex items-center gap-2 text-[13px] font-medium text-gray-600 dark:text-gray-400 hover:text-[#FF2B2B] px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF2B2B] focus:ring-offset-white dark:focus:ring-offset-neutral-950 ${className}`}
      aria-label={label}
    >
      <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
      <span>{children || label}</span>
    </button>
  );
}

export default BackButton;
