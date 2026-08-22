// import React from 'react';
// import { clsx } from 'clsx';
// import { 
//   Utensils, Car, ShoppingBag, Receipt, 
//   Film, HeartPulse, GraduationCap, Plane, 
//   Tv, HelpCircle 
// } from 'lucide-react';
// import { CategoryType } from '../types';

// export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'danger' | 'outline' }> = ({
//   children,
//   variant = 'primary',
//   className,
//   disabled,
//   ...props
// }) => {
//   const base = "inline-flex items-center justify-center font-medium rounded-lg px-4 py-2 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm";
//   const variants = {
//     primary: "bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-600",
//     secondary: "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 focus:ring-slate-400",
//     danger: "bg-rose-600 text-white hover:bg-rose-700 focus:ring-rose-500",
//     outline: "border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 focus:ring-slate-400"
//   };

//   return (
//     <button className={clsx(base, variants[variant], className)} disabled={disabled} {...props}>
//       {children}
//     </button>
//   );
// };

// export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
//   <div className={clsx("bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 rounded-xl p-5 shadow-sm", className)}>
//     {children}
//   </div>
// );

// export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label?: string; error?: string }> = ({
//   label,
//   error,
//   className,
//   ...props
// }) => (
//   <div className="w-full space-y-1">
//     {label && <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">{label}</label>}
//     <input
//       className={clsx(
//         "w-full rounded-lg border bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors",
//         error ? "border-rose-500" : "border-slate-300 dark:border-slate-700",
//         className
//       )}
//       {...props}
//     />
//     {error && <p className="text-xs text-rose-500 mt-1">{error}</p>}
//   </div>
// );

// export const CategoryIcon: React.FC<{ category: CategoryType; className?: string }> = ({ category, className = "w-4 h-4" }) => {
//   const icons: Record<CategoryType, React.ReactNode> = {
//     Food: <Utensils className={className} />,
//     Transportation: <Car className={className} />,
//     Shopping: <ShoppingBag className={className} />,
//     Bills: <Receipt className={className} />,
//     Entertainment: <Film className={className} />,
//     Health: <HeartPulse className={className} />,
//     Education: <GraduationCap className={className} />,
//     Travel: <Plane className={className} />,
//     Subscriptions: <Tv className={className} />,
//     Other: <HelpCircle className={className} />,
//   };
//   return <>{icons[category] || <HelpCircle className={className} />}</>;
// };

// export const Toast: React.FC<{ message: string; type?: 'success' | 'error'; onClose: () => void }> = ({ message, type = 'success', onClose }) => (
//   <div className={clsx(
//     "fixed bottom-5 right-5 z-50 flex items-center justify-between px-4 py-3 rounded-lg shadow-lg text-sm font-medium text-white transition-all duration-300 min-w-[280px]",
//     type === 'success' ? "bg-emerald-600" : "bg-rose-600"
//   )}>
//     <span>{message}</span>
//     <button onClick={onClose} className="ml-4 text-white/80 hover:text-white">&times;</button>
//   </div>
// );



import React from 'react';
import { clsx } from 'clsx';
import {
  Utensils,
  Car,
  ShoppingBag,
  Receipt,
  Film,
  HeartPulse,
  GraduationCap,
  Plane,
  Tv,
  HelpCircle,
} from 'lucide-react';
import { CategoryType } from '../types';

export const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  }
> = ({
  children,
  variant = 'primary',
  className,
  disabled,
  ...props
}) => {
  const base = `
    inline-flex items-center justify-center
    font-semibold
    rounded-xl
    px-4 py-2.5
    transition-all duration-200
    focus:outline-none
    focus:ring-2
    focus:ring-offset-2
    disabled:opacity-50
    disabled:cursor-not-allowed
    text-sm
  `;

  const variants = {
    primary: `
      bg-[#ed6f9b]
      text-white
      hover:bg-[#d95786]
      hover:-translate-y-0.5
      shadow-[0_7px_18px_rgba(237,111,155,0.18)]
      focus:ring-[#ed6f9b]
    `,

    secondary: `
      bg-[#fff0f5]
      text-[#d95786]
      hover:bg-[#ffe5ee]
      focus:ring-[#ed6f9b]
    `,

    danger: `
      bg-[#f46f88]
      text-white
      hover:bg-[#dc5872]
      focus:ring-[#f46f88]
    `,

    outline: `
      border border-[#f1dce4]
      bg-white
      text-[#8e737d]
      hover:bg-[#fff5f8]
      hover:border-[#edb2c7]
      hover:text-[#d95786]
      focus:ring-[#ed6f9b]
    `,
  };

  return (
    <button
      className={clsx(base, variants[variant], className)}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export const Card: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <div
    className={clsx(
      `
      bg-white
      border border-[#f4e3e9]
      rounded-[22px]
      p-5
      shadow-[0_8px_28px_rgba(197,132,157,0.055)]
      `,
      className
    )}
  >
    {children}
  </div>
);

export const Input: React.FC<
  React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    error?: string;
  }
> = ({ label, error, className, ...props }) => (
  <div className="w-full space-y-1.5">
    {label && (
      <label className="block text-[11px] font-bold text-[#8e747e] uppercase tracking-[0.12em]">
        {label}
      </label>
    )}

    <input
      className={clsx(
        `
        w-full
        rounded-xl
        border
        bg-[#fffafd]
        text-[#5b4851]
        px-4 py-3
        text-sm
        placeholder:text-[#c7b0ba]
        outline-none
        transition-all
        focus:bg-white
        focus:border-[#ed9fba]
        focus:ring-4
        focus:ring-[#ed6f9b]/10
        `,
        error
          ? 'border-[#f28ca4]'
          : 'border-[#f0dfe6]',
        className
      )}
      {...props}
    />

    {error && (
      <p className="text-xs text-[#e95d7c] mt-1">
        {error}
      </p>
    )}
  </div>
);

export const CategoryIcon: React.FC<{
  category: CategoryType;
  className?: string;
}> = ({
  category,
  className = 'w-4 h-4',
}) => {
  const icons: Record<CategoryType, React.ReactNode> = {
    Food: <Utensils className={className} />,
    Transportation: <Car className={className} />,
    Shopping: <ShoppingBag className={className} />,
    Bills: <Receipt className={className} />,
    Entertainment: <Film className={className} />,
    Health: <HeartPulse className={className} />,
    Education: <GraduationCap className={className} />,
    Travel: <Plane className={className} />,
    Subscriptions: <Tv className={className} />,
    Other: <HelpCircle className={className} />,
  };

  return (
    <>
      {icons[category] || (
        <HelpCircle className={className} />
      )}
    </>
  );
};

export const Toast: React.FC<{
  message: string;
  type?: 'success' | 'error';
  onClose: () => void;
}> = ({
  message,
  type = 'success',
  onClose,
}) => (
  <div
    className={clsx(
      `
      fixed bottom-5 right-5 z-50
      flex items-center justify-between
      px-4 py-3
      rounded-2xl
      shadow-[0_12px_35px_rgba(197,132,157,0.18)]
      text-sm font-semibold
      text-white
      min-w-[280px]
      `,
      type === 'success'
        ? 'bg-[#ed6f9b]'
        : 'bg-[#ee6b83]'
    )}
  >
    <span>{message}</span>

    <button
      onClick={onClose}
      className="ml-4 text-white/80 hover:text-white"
    >
      &times;
    </button>
  </div>
);