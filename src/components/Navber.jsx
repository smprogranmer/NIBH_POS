import {
  MdDashboard,
  MdShoppingBag,
  MdListAlt,
  MdPeople,
  MdLabel,
  MdSettings,
  MdClose,
  MdAutoAwesome,
} from "react-icons/md";
import { FaStore } from "react-icons/fa";
import { NavLink } from "react-router";

const navItems = [
  { to: "/", icon: MdDashboard, label: "Dashboard" },
  { to: "/sales", icon: MdShoppingBag, label: "Sales / POS" },
  { to: "/inventory", icon: MdListAlt, label: "Inventory" },
  { to: "/customers", icon: MdPeople, label: "Customers" },
  //   { to: '/categories', icon: MdLabel, label: 'Categories' },
  { to: "/settings", icon: MdSettings, label: "Settings" },
];

const Navber = ({ open, onClose }) => {
  // console.log(open, onClosed)

  // console.log("LHJELKJLDSJOSDJS")
  // const [isNavOpen, setIsNavOpen] = useState(false)

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-30 flex w-64 flex-col bg-white transition-transform duration-300
         lg:static lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}
    >
      {/* Logo */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-sidebar-border">
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-200">
            <FaStore className="h-4 w-4 text-sidebar" />
          </div>
          <div>
            <p className="font-heading text-base font-semibold text-sidebar-foreground leading-none">
              NIBH
            </p>
            <p className="text-[10px] text-sidebar-foreground/50 tracking-widest uppercase mt-0.5">
              Retail OS
            </p>
          </div>
        </div>
        <button
          className="rounded-md p-1 text-sidebar-foreground/50 hover:text-sidebar-foreground lg:hidden"
          aria-label="Close sidebar"
        >
          <MdClose className="h-4 w-4" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <p className="px-3 mb-2 text-[10px] font-semibold tracking-widest uppercase text-sidebar-foreground/40">
          Main Menu
        </p>
        <ul className="space-y-0.5">
          {navItems.slice(0, 5).map(({ to, icon: Icon, label }) => (
            <li key={to}>
              <NavLink
                onClick={onClose}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-emerald-50 text-emerald-700"
                      : "text-slate-500 hover:bg-emerald-50 hover:text-slate-900"
                  }`
                }
              >
                <Icon className="h-4 w-4 shrink-0" />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <p className="px-3 mt-6 mb-2 text-[10px] font-semibold tracking-widest uppercase text-sidebar-foreground/40">
          System
        </p>
        <ul className="space-y-0.5">
          {navItems.slice(5).map(({ to, icon: Icon, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({
                  isActive,
                }) => `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors
                    isActive
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'text-slate-500 hover:bg-emerald-50 hover:text-slate-900'`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* User profile */}
      <div className="border-t border-sidebar-border px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-gold flex items-center justify-center text-sidebar font-semibold text-sm">
            A
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">
              Admin User
            </p>
            <p className="text-xs text-sidebar-foreground/50 truncate">
              admin@alhaya.com
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Navber;
