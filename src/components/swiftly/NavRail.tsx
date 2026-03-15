import Icon from "@/components/ui/icon";
import { Tab } from "./data";

interface NavRailProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  totalUnread: number;
}

const NAV_ITEMS: { tab: Tab; icon: string; label: string }[] = [
  { tab: "chats", icon: "MessageSquare", label: "Чаты" },
  { tab: "contacts", icon: "Users", label: "Контакты" },
  { tab: "search", icon: "Search", label: "Поиск" },
  { tab: "notifications", icon: "Bell", label: "Уведомления" },
];

export default function NavRail({ activeTab, setActiveTab, totalUnread }: NavRailProps) {
  return (
    <nav className="w-[60px] bg-[hsl(240,14%,6%)] border-r border-[hsl(240,8%,12%)] flex flex-col items-center py-5 gap-1 flex-shrink-0 relative z-10">
      <div className="mb-6">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, hsl(265,65%,50%), hsl(280,60%,42%))",
            boxShadow: "0 0 18px hsl(265 65% 50% / 0.5)",
          }}
        >
          <span className="font-mono font-bold text-[12px] text-white tracking-tight">sw</span>
        </div>
      </div>

      {NAV_ITEMS.map(({ tab, icon, label }) => {
        const isActive = activeTab === tab;
        const hasNotif = tab === "chats" && totalUnread > 0;
        return (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            title={label}
            className={`relative w-10 h-10 rounded-xl flex items-center justify-center sw-nav-btn
              ${isActive
                ? "bg-[hsl(265,40%,20%)] text-[hsl(265,80%,75%)] sw-glow-sm"
                : "text-[hsl(240,8%,38%)] hover:text-[hsl(260,15%,75%)] hover:bg-[hsl(240,10%,14%)]"
              }`}
          >
            {isActive && (
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r-full bg-[hsl(265,70%,62%)]" />
            )}
            <Icon name={icon} size={17} />
            {hasNotif && (
              <span
                className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[hsl(265,70%,65%)] rounded-full"
                style={{ boxShadow: "0 0 6px hsl(265 70% 65% / 0.8)" }}
              />
            )}
          </button>
        );
      })}

      <div className="flex-1" />

      <button
        onClick={() => setActiveTab("profile")}
        title="Профиль"
        className={`w-10 h-10 rounded-xl flex items-center justify-center sw-nav-btn
          ${activeTab === "profile"
            ? "bg-[hsl(265,40%,20%)] text-[hsl(265,80%,75%)]"
            : "text-[hsl(240,8%,38%)] hover:text-[hsl(260,15%,75%)] hover:bg-[hsl(240,10%,14%)]"
          }`}
      >
        <Icon name="UserCircle" size={17} />
      </button>
    </nav>
  );
}
