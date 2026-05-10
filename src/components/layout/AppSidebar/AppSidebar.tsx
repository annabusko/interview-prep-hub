import { useTranslation } from "react-i18next";
import { NavLink, useLocation } from "react-router-dom";
import { PATHS } from "@/routes/paths";
import { NAV_ICON_SRC } from "./AppSidebar.icons";
import { NAV_ITEMS } from "./navConfig";

const navItemIsActive = (
  pathname: string,
  to: string,
  end: boolean | undefined,
): boolean => {
  if (end) return pathname === to;
  if (to === PATHS.topics) {
    return pathname === PATHS.topics || pathname.startsWith(`${PATHS.topics}/`);
  }
  return pathname === to || pathname.startsWith(`${to}/`);
};

export const AppSidebar = () => {
  const { pathname } = useLocation();
  const { t } = useTranslation();

  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-slate-200 bg-slate-50 py-6 px-4">
      <div className="mb-6">
        <span className="text-sm font-semibold text-slate-900">
          {t("nav.appName")}
        </span>
        <p className="mt-1 text-xs text-slate-500">{t("nav.appTagline")}</p>
      </div>
      <nav className="flex flex-1 flex-col gap-1" aria-label="Main">
        {NAV_ITEMS.map((item) => {
          const isActive = navItemIsActive(pathname, item.to, item.end);
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={[
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
                isActive
                  ? "border-l-2 border-slate-900 bg-slate-200 pl-2.5 font-medium text-slate-900"
                  : "font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900",
              ].join(" ")}
            >
              <img
                src={NAV_ICON_SRC[item.to]}
                alt=""
                aria-hidden="true"
                className="h-4 w-4"
              />
              {t(item.label)}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};
