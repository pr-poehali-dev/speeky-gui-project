import Icon from "@/components/ui/icon";
import AvatarBubble from "./AvatarBubble";
import { Tab, Chat, CONTACTS, CHATS_DATA, statusDot } from "./data";

interface SidePanelProps {
  activeTab: Tab;
  selectedChat: Chat;
  selectChat: (chat: Chat) => void;
  searchQuery: string;
  setSearchQuery: (v: string) => void;
  globalSearch: string;
  setGlobalSearch: (v: string) => void;
  setActiveTab: (tab: Tab) => void;
  filteredChats: Chat[];
  globalResults: Chat[];
}

export default function SidePanel({
  activeTab,
  selectedChat,
  selectChat,
  searchQuery,
  setSearchQuery,
  globalSearch,
  setGlobalSearch,
  setActiveTab,
  filteredChats,
  globalResults,
}: SidePanelProps) {
  return (
    <aside className="w-[280px] bg-[hsl(240,12%,10%)] border-r border-[hsl(240,8%,14%)] flex flex-col flex-shrink-0 relative z-10">

      {/* CHATS */}
      {activeTab === "chats" && (
        <>
          <div className="px-4 pt-5 pb-3 border-b border-[hsl(240,8%,14%)]">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-semibold text-[hsl(240,8%,42%)] tracking-[0.12em] uppercase">Переписки</span>
              <button className="w-6 h-6 flex items-center justify-center text-[hsl(240,8%,42%)] hover:text-[hsl(265,70%,65%)] transition-colors">
                <Icon name="Plus" size={14} />
              </button>
            </div>
            <div className="relative">
              <Icon name="Search" size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(240,8%,38%)]" />
              <input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Поиск..."
                className="w-full pl-8 pr-3 py-2 text-[12px] bg-[hsl(240,10%,13%)] rounded-lg border border-[hsl(240,8%,16%)] outline-none placeholder:text-[hsl(240,8%,35%)] text-[hsl(260,15%,80%)] focus:border-[hsl(265,30%,30%)] transition-colors"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto py-2">
            {filteredChats.map((chat, i) => (
              <button
                key={chat.id}
                onClick={() => selectChat(chat)}
                className={`w-full px-3 py-3 flex items-center gap-3 text-left sw-chat-item animate-slide-in
                  ${selectedChat.id === chat.id
                    ? "bg-[hsl(265,30%,14%)] border-l-2 border-[hsl(265,70%,60%)]"
                    : "hover:bg-[hsl(240,10%,13%)] border-l-2 border-transparent"
                  }`}
                style={{ animationDelay: `${i * 40}ms`, opacity: 0 }}
              >
                <div className="relative flex-shrink-0">
                  <AvatarBubble initials={chat.avatar} purple={selectedChat.id === chat.id} />
                  {chat.status && (
                    <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-[hsl(240,12%,10%)] ${statusDot(chat.status)}`} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className={`text-[13px] font-medium truncate ${selectedChat.id === chat.id ? "text-[hsl(265,80%,80%)]" : "text-[hsl(260,15%,82%)]"}`}>
                      {chat.name}
                    </span>
                    <span className="text-[10px] text-[hsl(240,8%,40%)] ml-2 flex-shrink-0">{chat.time}</span>
                  </div>
                  <div className="flex items-center justify-between mt-0.5">
                    <span className="text-[11px] text-[hsl(240,8%,45%)] truncate">{chat.lastMsg}</span>
                    {chat.unread > 0 && (
                      <span
                        className="ml-2 flex-shrink-0 min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center text-[10px] font-semibold text-white"
                        style={{ background: "linear-gradient(135deg, hsl(265,65%,55%), hsl(280,55%,48%))", boxShadow: "0 2px 8px hsl(265 65% 55% / 0.4)" }}
                      >
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </>
      )}

      {/* CONTACTS */}
      {activeTab === "contacts" && (
        <>
          <div className="px-4 pt-5 pb-3 border-b border-[hsl(240,8%,14%)]">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-semibold text-[hsl(240,8%,42%)] tracking-[0.12em] uppercase">Контакты</span>
              <button className="w-6 h-6 flex items-center justify-center text-[hsl(240,8%,42%)] hover:text-[hsl(265,70%,65%)] transition-colors">
                <Icon name="UserPlus" size={14} />
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto py-2">
            {(["online", "away", "offline"] as const).map(group => {
              const grouped = CONTACTS.filter(c => c.status === group);
              if (!grouped.length) return null;
              const label = group === "online" ? `В сети — ${grouped.length}` : group === "away" ? "Недавно" : "Не в сети";
              return (
                <div key={group}>
                  <div className="px-4 py-2">
                    <span className="text-[10px] font-semibold text-[hsl(240,8%,38%)] uppercase tracking-widest">{label}</span>
                  </div>
                  {grouped.map((contact, i) => (
                    <div
                      key={contact.id}
                      className="px-3 py-2.5 flex items-center gap-3 hover:bg-[hsl(240,10%,13%)] cursor-pointer sw-chat-item animate-slide-in"
                      style={{ animationDelay: `${i * 35}ms`, opacity: 0 }}
                    >
                      <div className="relative flex-shrink-0">
                        <AvatarBubble initials={contact.avatar} size="sm" />
                        <span className={`absolute bottom-0 right-0 w-2 h-2 rounded-full border-2 border-[hsl(240,12%,10%)] ${statusDot(contact.status)}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[12px] font-medium text-[hsl(260,15%,80%)]">{contact.name}</div>
                        <div className="text-[11px] text-[hsl(240,8%,42%)]">{contact.lastSeen}</div>
                      </div>
                      <button className="w-7 h-7 flex items-center justify-center text-[hsl(240,8%,38%)] hover:text-[hsl(265,70%,65%)] hover:bg-[hsl(265,30%,14%)] rounded-lg transition-all">
                        <Icon name="MessageSquare" size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* SEARCH */}
      {activeTab === "search" && (
        <>
          <div className="px-4 pt-5 pb-3 border-b border-[hsl(240,8%,14%)]">
            <span className="text-[10px] font-semibold text-[hsl(240,8%,42%)] tracking-[0.12em] uppercase block mb-4">Поиск</span>
            <div className="relative">
              <Icon name="Search" size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(240,8%,38%)]" />
              <input
                value={globalSearch}
                onChange={e => setGlobalSearch(e.target.value)}
                placeholder="Чаты, контакты, сообщения..."
                autoFocus
                className="w-full pl-8 pr-3 py-2 text-[12px] bg-[hsl(240,10%,13%)] rounded-lg border border-[hsl(240,8%,16%)] outline-none placeholder:text-[hsl(240,8%,35%)] text-[hsl(260,15%,80%)] focus:border-[hsl(265,30%,30%)] transition-colors"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto py-2">
            {globalSearch.length > 1 ? (
              globalResults.length > 0 ? (
                <>
                  <div className="px-4 py-2">
                    <span className="text-[10px] font-semibold text-[hsl(240,8%,38%)] uppercase tracking-widest">
                      Найдено — {globalResults.length}
                    </span>
                  </div>
                  {globalResults.map((chat, i) => (
                    <button
                      key={chat.id}
                      onClick={() => { selectChat(chat); setActiveTab("chats"); setGlobalSearch(""); }}
                      className="w-full px-3 py-2.5 flex items-center gap-3 text-left hover:bg-[hsl(240,10%,13%)] sw-chat-item animate-slide-in"
                      style={{ animationDelay: `${i * 35}ms`, opacity: 0 }}
                    >
                      <AvatarBubble initials={chat.avatar} size="sm" purple />
                      <div>
                        <div className="text-[12px] font-medium text-[hsl(260,15%,80%)]">{chat.name}</div>
                        <div className="text-[11px] text-[hsl(240,8%,42%)] truncate max-w-[180px]">{chat.lastMsg}</div>
                      </div>
                    </button>
                  ))}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-40 gap-2 text-[hsl(240,8%,38%)]">
                  <Icon name="SearchX" size={22} />
                  <span className="text-[12px]">Ничего не найдено</span>
                </div>
              )
            ) : (
              <div className="flex flex-col items-center justify-center h-40 gap-2 text-[hsl(240,8%,35%)]">
                <Icon name="Search" size={20} />
                <span className="text-[12px]">Введите запрос</span>
              </div>
            )}
          </div>
        </>
      )}

      {/* NOTIFICATIONS */}
      {activeTab === "notifications" && (
        <>
          <div className="px-4 pt-5 pb-3 border-b border-[hsl(240,8%,14%)]">
            <span className="text-[10px] font-semibold text-[hsl(240,8%,42%)] tracking-[0.12em] uppercase">Уведомления</span>
          </div>
          <div className="flex-1 overflow-y-auto py-2">
            {[
              { id: 1, avatar: "ИВ", text: "Ирина Волкова отправила сообщение", time: "2 мин назад", unread: true },
              { id: 2, avatar: "КП", text: "В «Команда продукта» 3 новых сообщения", time: "15 мин назад", unread: true },
              { id: 3, avatar: "ДК", text: "Дмитрий Козлов добавил вас в контакты", time: "1 час назад", unread: true },
              { id: 4, avatar: "АМ", text: "Алексей Морозов: Окей, договорились", time: "вчера", unread: false },
            ].map((n, i) => (
              <div
                key={n.id}
                className={`px-3 py-3 flex items-start gap-3 cursor-pointer sw-chat-item animate-slide-in
                  ${n.unread ? "bg-[hsl(265,20%,12%)] hover:bg-[hsl(265,20%,14%)]" : "hover:bg-[hsl(240,10%,13%)]"}`}
                style={{ animationDelay: `${i * 40}ms`, opacity: 0 }}
              >
                <div className="relative flex-shrink-0">
                  <AvatarBubble initials={n.avatar} size="sm" purple={n.unread} />
                  {n.unread && (
                    <span
                      className="absolute top-0 right-0 w-1.5 h-1.5 rounded-full bg-[hsl(265,70%,65%)]"
                      style={{ boxShadow: "0 0 5px hsl(265 70% 65% / 0.8)" }}
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] text-[hsl(260,15%,78%)] leading-relaxed">{n.text}</p>
                  <span className="text-[10px] text-[hsl(240,8%,40%)] mt-0.5 block">{n.time}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* PROFILE */}
      {activeTab === "profile" && (
        <>
          <div className="px-4 pt-5 pb-3 border-b border-[hsl(240,8%,14%)]">
            <span className="text-[10px] font-semibold text-[hsl(240,8%,42%)] tracking-[0.12em] uppercase">Профиль</span>
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className="px-4 py-6 flex flex-col items-center border-b border-[hsl(240,8%,14%)]">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-semibold text-white mb-3"
                style={{ background: "linear-gradient(135deg, hsl(265,65%,50%), hsl(280,55%,42%))", boxShadow: "0 0 24px hsl(265 65% 50% / 0.4)" }}
              >
                ВА
              </div>
              <div className="text-[14px] font-semibold text-[hsl(260,15%,88%)]">Вы</div>
              <div className="text-[11px] text-[hsl(240,8%,45%)] mt-0.5">@username</div>
              <div className="mt-2.5 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full sw-online-dot" />
                <span className="text-[11px] text-[hsl(240,8%,48%)]">В сети</span>
              </div>
            </div>
            <div className="px-3 py-3 space-y-0.5">
              {[
                { icon: "Bell", label: "Уведомления" },
                { icon: "Shield", label: "Приватность и безопасность" },
                { icon: "Lock", label: "Сквозное шифрование" },
                { icon: "Palette", label: "Внешний вид" },
                { icon: "Languages", label: "Язык интерфейса" },
                { icon: "HelpCircle", label: "Помощь" },
              ].map(item => (
                <button
                  key={item.label}
                  className="w-full px-3 py-2.5 flex items-center gap-3 rounded-lg hover:bg-[hsl(240,10%,13%)] text-left transition-colors group"
                >
                  <Icon name={item.icon} size={14} className="text-[hsl(240,8%,40%)] group-hover:text-[hsl(265,60%,65%)] transition-colors" />
                  <span className="text-[12px] text-[hsl(260,12%,68%)] group-hover:text-[hsl(260,15%,82%)] transition-colors">{item.label}</span>
                  <Icon name="ChevronRight" size={12} className="ml-auto text-[hsl(240,8%,32%)]" />
                </button>
              ))}
            </div>
            <div className="px-3 pb-4">
              <button className="w-full px-3 py-2.5 flex items-center gap-3 rounded-lg hover:bg-[hsl(0,20%,12%)] text-left transition-colors">
                <Icon name="LogOut" size={14} className="text-red-500/70" />
                <span className="text-[12px] text-red-500/70">Выйти из аккаунта</span>
              </button>
            </div>
          </div>
        </>
      )}
    </aside>
  );
}
