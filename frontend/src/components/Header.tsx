// import React from 'react';
// import { Menu, Moon, Sun, Plus } from 'lucide-react';
// import { useAuth } from '../context/AuthContext';
// import { useTheme } from '../context/ThemeContext';
// import { Button } from './UI';

// export const Header: React.FC<{ 
//   onMenuClick: () => void; 
//   onAddExpenseClick: () => void;
// }> = ({ onMenuClick, onAddExpenseClick }) => {
//   const { user } = useAuth();
//   const { isDark, setTheme } = useTheme();

//   return (
//     <header className="h-16 border-b border-slate-200 dark:border-slate-700/60 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md sticky top-0 z-30 px-4 lg:px-8 flex items-center justify-between">
//       <div className="flex items-center gap-3">
//         <button
//           onClick={onMenuClick}
//           className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 lg:hidden"
//         >
//           <Menu className="w-5 h-5" />
//         </button>
//         <h1 className="text-lg font-semibold text-slate-800 dark:text-slate-100 hidden sm:block">
//           Financial Dashboard
//         </h1>
//       </div>

//       <div className="flex items-center gap-3">
//         <Button onClick={onAddExpenseClick} className="gap-2">
//           <Plus className="w-4 h-4" />
//           <span className="hidden sm:inline">Add Expense</span>
//         </Button>

//         <button
//           onClick={() => setTheme(isDark ? 'light' : 'dark')}
//           className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
//           aria-label="Toggle theme"
//         >
//           {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
//         </button>

//         <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-1" />

//         <div className="flex items-center gap-2.5">
//           <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-semibold flex items-center justify-center text-xs">
//             {user?.name?.charAt(0).toUpperCase() || 'U'}
//           </div>
//           <span className="text-sm font-medium text-slate-700 dark:text-slate-200 hidden md:inline">
//             {user?.name}
//           </span>
//         </div>
//       </div>
//     </header>
//   );
// };


import {
  Menu,
  Plus,
  Search,
  Bell,
} from 'lucide-react'; 
import { useAuth } from '../context/AuthContext';
// import { useTheme } from '../context/ThemeContext';
import { Button } from './UI';

export const Header: React.FC<{
  onMenuClick: () => void;
  onAddExpenseClick: () => void;
}> = ({ onMenuClick, onAddExpenseClick }) => {
  const { user } = useAuth();


  return (
    <header className="sticky top-0 z-30 px-4 lg:px-8 pt-4">
      <div
        className="
        h-[66px]
        bg-white/90
        backdrop-blur-xl
        border border-[#f4e3e9]
        rounded-[22px]
        shadow-[0_8px_30px_rgba(197,132,157,0.06)]
        px-4 lg:px-5
        flex items-center justify-between
        "
      >
        <div className="flex items-center gap-3 flex-1">
          <button
            onClick={onMenuClick}
            className="p-2.5 rounded-xl text-[#927d86] hover:bg-[#fff2f6] hover:text-[#e96d98] lg:hidden"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Search */}
          <div className="hidden sm:flex items-center gap-2.5 w-full max-w-[360px] h-10 px-3.5 rounded-xl bg-[#fff7fa] border border-[#f8e7ed]">
            <Search className="w-4 h-4 text-[#c5aab5]" />

            <input
              type="text"
              placeholder="Search here..."
              className="w-full bg-transparent outline-none border-none text-xs text-[#67535c] placeholder:text-[#c8b2ba]"
            />
          </div>

          <h1 className="text-sm font-bold text-[#59474f] sm:hidden">
            SpendWise
          </h1>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            onClick={onAddExpenseClick}
            className="
              !rounded-xl
              !px-3.5
              !py-2.5
              !bg-[#ed6f9b]
              hover:!bg-[#d95786]
              shadow-[0_7px_18px_rgba(237,111,155,0.20)]
              gap-2
            "
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Expense</span>
          </Button>

          <button
            className="relative p-2.5 rounded-xl text-[#a38c95] hover:bg-[#fff2f6] hover:text-[#e96d98]"
          >
            <Bell className="w-[18px] h-[18px]" />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-[#ed6f9b] rounded-full" />
          </button>

          {/* <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="p-2.5 rounded-xl text-[#a38c95] hover:bg-[#fff2f6] hover:text-[#e96d98] transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="w-[18px] h-[18px]" />
            ) : (
              <Moon className="w-[18px] h-[18px]" />
            )}
          </button> */}

          <div className="hidden md:block w-px h-7 bg-[#f1e1e7] mx-1" />

          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#f5abc4] text-white font-bold flex items-center justify-center text-xs shadow-sm">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>

            <div className="hidden lg:block">
              <p className="text-xs font-bold text-[#5b4851]">
                {user?.name || 'User'}
              </p>
              <p className="text-[10px] text-[#b29ca5]">
                Personal account
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};