// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import { LayoutDashboard, Receipt, BarChart3, Settings, LogOut, Wallet } from 'lucide-react';
// import { useAuth } from '../context/AuthContext';
// import { clsx } from 'clsx';

// export const Sidebar: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
//   const { logout } = useAuth();

//   const links = [
//     { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
//     { to: '/expenses', label: 'Expenses', icon: Receipt },
//     { to: '/analytics', label: 'Analytics', icon: BarChart3 },
//     { to: '/settings', label: 'Settings', icon: Settings },
//   ];

//   return (
//     <>
//       {/* Mobile backdrop */}
//       {isOpen && (
//         <div 
//           className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
//           onClick={onClose}
//         />
//       )}

//       <aside className={clsx(
//         "fixed top-0 left-0 bottom-0 z-50 w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700/60 flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0",
//         isOpen ? "translate-x-0" : "-translate-x-full"
//       )}>
//         {/* Brand */}
//         <div className="h-16 flex items-center px-6 border-b border-slate-200 dark:border-slate-700/60">
//           <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-500 font-bold text-xl">
//             <div className="p-1.5 bg-emerald-100 dark:bg-emerald-950/60 rounded-lg">
//               <Wallet className="w-6 h-6" />
//             </div>
//             <span>SpendWise</span>
//           </div>
//         </div>

//         {/* Navigation Links */}
//         <nav className="flex-1 p-4 space-y-1">
//           {links.map((link) => {
//             const Icon = link.icon;
//             return (
//               <NavLink
//                 key={link.to}
//                 to={link.to}
//                 onClick={onClose}
//                 className={({ isActive }) => clsx(
//                   "flex items-center gap-3 px-3.5 py-2.5 rounded-lg font-medium text-sm transition-colors",
//                   isActive 
//                     ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400" 
//                     : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-slate-100"
//                 )}
//               >
//                 <Icon className="w-5 h-5" />
//                 {link.label}
//               </NavLink>
//             );
//           })}
//         </nav>

//         {/* Footer Logout */}
//         <div className="p-4 border-t border-slate-200 dark:border-slate-700/60">
//           <button
//             onClick={logout}
//             className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg font-medium text-sm text-slate-600 dark:text-slate-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
//           >
//             <LogOut className="w-5 h-5" />
//             Sign Out
//           </button>
//         </div>
//       </aside>
//     </>
//   );
// };

import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Receipt,
  BarChart3,
  Settings,
  LogOut,
  Wallet,
  HelpCircle,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { clsx } from 'clsx';

export const Sidebar: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const { logout, user } = useAuth();

  const mainLinks = [
    {
      to: '/dashboard',
      label: 'Home',
      icon: LayoutDashboard,
    },
    {
      to: '/expenses',
      label: 'Expenses',
      icon: Receipt,
    },
    {
      to: '/analytics',
      label: 'Analytics',
      icon: BarChart3,
    },
    {
      to: '/settings',
      label: 'Settings',
      icon: Settings,
    },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-[#5a3947]/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={clsx(
          `
          fixed top-0 left-0 bottom-0 z-50
          w-[250px]
          bg-white
          border-r border-[#f4e3e9]
          flex flex-col
          transition-transform duration-300 ease-in-out
          lg:translate-x-0
          `,
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo */}
        <div className="px-7 pt-7 pb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[14px] bg-[#fff0f5] flex items-center justify-center">
              <Wallet className="w-5 h-5 text-[#e96d98]" />
            </div>

            <div>
              <h1 className="text-[19px] font-bold tracking-tight text-[#51434a]">
                SpendWise
              </h1>
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#c09eaa]">
                Personal Finance
              </p>
            </div>
          </div>
        </div>

        {/* Main navigation */}
        <div className="px-4">
          <p className="px-4 mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#c4aab3]">
            Workspace
          </p>

          <nav className="space-y-1.5">
            {mainLinks.map((link) => {
              const Icon = link.icon;

              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={onClose}
                  className={({ isActive }) =>
                    clsx(
                      `
                      group flex items-center gap-3
                      px-4 py-3
                      rounded-2xl
                      text-[13px] font-semibold
                      transition-all duration-200
                      `,
                      isActive
                        ? `
                          bg-[#f6a2bd]
                          text-white
                          shadow-[0_8px_20px_rgba(237,111,155,0.20)]
                        `
                        : `
                          text-[#8e7a83]
                          hover:bg-[#fff3f7]
                          hover:text-[#df628e]
                        `
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        className={clsx(
                          'w-[17px] h-[17px] transition-transform',
                          isActive
                            ? 'text-white'
                            : 'text-[#b29ba4] group-hover:text-[#e96d98]'
                        )}
                      />

                      <span>{link.label}</span>

                      {isActive && (
                        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white" />
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Decorative card */}
        <div className="px-5 mt-8">
          <div className="relative overflow-hidden rounded-[22px] bg-gradient-to-br from-[#fff0f5] to-[#ffe4ee] p-4">
            <div className="absolute -right-5 -top-5 w-20 h-20 rounded-full bg-[#f7b1c8]/30" />

            <Sparkles className="relative w-5 h-5 text-[#e96d98] mb-3" />

            <p className="relative text-[12px] font-bold text-[#744b5c]">
              Spend smarter
            </p>

            <p className="relative mt-1 text-[10px] leading-4 text-[#a17d8b]">
              Keep track of your everyday spending and reach your goals.
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-auto p-4 space-y-1 border-t border-[#f7e8ed]">
          <div className="flex items-center gap-3 px-3 py-3">
            <div className="w-9 h-9 rounded-full bg-[#f9c0d4] flex items-center justify-center text-white font-bold text-sm">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>

            <div className="min-w-0">
              <p className="text-xs font-bold text-[#59474f] truncate">
                {user?.name || 'User'}
              </p>
              <p className="text-[10px] text-[#b39ca5] truncate">
                {user?.email || 'Personal account'}
              </p>
            </div>
          </div>

          <button
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-[13px] font-semibold text-[#a38c95] hover:bg-[#fff3f7] hover:text-[#e96d98] transition-colors"
            onClick={logout}
          >
            <LogOut className="w-[17px] h-[17px]" />
            Sign Out
          </button>

          <button
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-[13px] font-semibold text-[#a38c95] hover:bg-[#fff3f7] hover:text-[#e96d98] transition-colors"
          >
            <HelpCircle className="w-[17px] h-[17px]" />
            Help & Support
          </button>
        </div>
      </aside>
    </>
  );
};