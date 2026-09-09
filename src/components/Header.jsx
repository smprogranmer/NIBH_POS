import { MdMenu, } from 'react-icons/md'
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoCalendarOutline } from "react-icons/io5";
import { useLocation } from "react-router-dom";

const Header = ({onMenuClick}) => {
    const location = useLocation();

    const pathName = location.pathname.split("/")[1];

    const cureentPath = pathName ? pathName.charAt(0).toUpperCase() + pathName.slice(1) : "Dashboard";

    
    
  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-4 sm:px-8">
      <div className="flex items-center gap-3">
        <button
          className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
          onClick={onMenuClick}
        >
          <MdMenu size={21} />
        </button>
        <div>
          <p className="text-xs font-semibold text-slate-400">
            Workspace / <span className="text-slate-600">{cureentPath}</span>
          </p>
          <h1 className="mt-1 text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">
            {cureentPath}
          </h1>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-2 rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 sm:flex">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          Store open
        </div>
        <div className="hidden items-center gap-2 text-xs font-medium text-slate-400 md:flex">
          <IoCalendarOutline size={15} /> Sep 6, 2026
        </div>
        <button className="relative rounded-xl p-2 text-slate-500 hover:bg-slate-100">
          <IoMdNotificationsOutline size={19} />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500" />
        </button>
      </div>
    </header>
  );
};

export default Header;
