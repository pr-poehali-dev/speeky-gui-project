import { useState } from "react";
import Icon from "@/components/ui/icon";

const CONTACTS = [
  { id: 1, name: "Алексей Морозов", status: "online", avatar: "АМ", lastSeen: "сейчас" },
  { id: 2, name: "Ирина Волкова", status: "online", avatar: "ИВ", lastSeen: "сейчас" },
  { id: 3, name: "Дмитрий Козлов", status: "away", avatar: "ДК", lastSeen: "5 мин назад" },
  { id: 4, name: "Мария Новикова", status: "offline", avatar: "МН", lastSeen: "вчера" },
  { id: 5, name: "Сергей Петров", status: "offline", avatar: "СП", lastSeen: "3 дня назад" },
  { id: 6, name: "Анна Соколова", status: "online", avatar: "АС", lastSeen: "сейчас" },
];

const CHATS_DATA = [
  {
    id: 1, name: "Алексей Морозов", avatar: "АМ", type: "personal",
    lastMsg: "Окей, договорились на завтра", time: "14:32", unread: 0, status: "online",
    messages: [
      { id: 1, from: "them", text: "Привет! Как дела?", time: "14:20" },
      { id: 2, from: "me", text: "Отлично, спасибо! Готов к встрече завтра", time: "14:25" },
      { id: 3, from: "them", text: "Отлично, я тоже. В 10:00?", time: "14:28" },
      { id: 4, from: "me", text: "Да, в 10:00. Буду на месте", time: "14:30" },
      { id: 5, from: "them", text: "Окей, договорились на завтра", time: "14:32" },
    ]
  },
  {
    id: 2, name: "Команда продукта", avatar: "КП", type: "group",
    lastMsg: "Ирина: Дизайн готов для ревью", time: "13:15", unread: 3, status: null,
    messages: [
      { id: 1, from: "Ирина", text: "Всем привет! Созвон сегодня в 16:00?", time: "12:00" },
      { id: 2, from: "me", text: "Да, буду", time: "12:05" },
      { id: 3, from: "Дмитрий", text: "Я тоже подключусь", time: "12:10" },
      { id: 4, from: "Ирина", text: "Дизайн готов для ревью", time: "13:15" },
    ]
  },
  {
    id: 3, name: "Ирина Волкова", avatar: "ИВ", type: "personal",
    lastMsg: "Спасибо за помощь!", time: "11:48", unread: 1, status: "online",
    messages: [
      { id: 1, from: "them", text: "Можешь помочь с отчётом?", time: "11:30" },
      { id: 2, from: "me", text: "Конечно, пришли файл", time: "11:35" },
      { id: 3, from: "them", text: "Спасибо за помощь!", time: "11:48" },
    ]
  },
  {
    id: 4, name: "Разработка", avatar: "РЗ", type: "group",
    lastMsg: "Деплой прошёл успешно 🚀", time: "10:22", unread: 0, status: null,
    messages: [
      { id: 1, from: "Сергей", text: "Начинаем деплой", time: "10:15" },
      { id: 2, from: "Дмитрий", text: "Ок, мониторю логи", time: "10:18" },
      { id: 3, from: "Сергей", text: "Деплой прошёл успешно 🚀", time: "10:22" },
    ]
  },
  {
    id: 5, name: "Мария Новикова", avatar: "МН", type: "personal",
    lastMsg: "До встречи!", time: "Вчера", unread: 0, status: "offline",
    messages: [
      { id: 1, from: "them", text: "Документы отправила на почту", time: "Вчера" },
      { id: 2, from: "me", text: "Получил, спасибо", time: "Вчера" },
      { id: 3, from: "them", text: "До встречи!", time: "Вчера" },
    ]
  },
];

type Tab = "chats" | "contacts" | "notifications" | "profile" | "search";

const statusDot = (s: string | null) => {
  if (s === "online") return "bg-emerald-400 sw-online-dot";
  if (s === "away") return "bg-amber-400";
  return "bg-[hsl(240,8%,32%)]";
};

const AvatarBubble = ({ initials, size = "md", purple = false }: { initials: string; size?: "sm" | "md" | "lg"; purple?: boolean }) => {
  const s = size === "lg" ? "w-14 h-14 text-base" : size === "sm" ? "w-8 h-8 text-[10px]" : "w-10 h-10 text-[11px]";
  return (
    <div className={`${s} rounded-full flex items-center justify-center font-semibold flex-shrink-0
      ${purple
        ? "bg-[hsl(265,40%,22%)] text-[hsl(265,80%,78%)]"
        : "bg-[hsl(240,10%,18%)] text-[hsl(240,15%,65%)]"
      }`}>
      {initials}
    </div>
  );
};

export default function Index() {
  const [activeTab, setActiveTab] = useState<Tab>("chats");
  const [selectedChat, setSelectedChat] = useState(CHATS_DATA[0]);
  const [inputText, setInputText] = useState("");
  const [chatMessages, setChatMessages] = useState(CHATS_DATA[0].messages);
  const [searchQuery, setSearchQuery] = useState("");
  const [globalSearch, setGlobalSearch] = useState("");

  const selectChat = (chat: typeof CHATS_DATA[0]) => {
    setSelectedChat(chat);
    setChatMessages(chat.messages);
    setInputText("");
  };

  const sendMessage = () => {
    if (!inputText.trim()) return;
    const newMsg = { id: chatMessages.length + 1, from: "me", text: inputText, time: "сейчас" };
    setChatMessages(prev => [...prev, newMsg]);
    setInputText("");
  };

  const filteredChats = CHATS_DATA.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.lastMsg.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const globalResults = globalSearch.length > 1 ? [
    ...CHATS_DATA.filter(c => c.name.toLowerCase().includes(globalSearch.toLowerCase())),
    ...CHATS_DATA.filter(c =>
      c.messages.some(m => m.text.toLowerCase().includes(globalSearch.toLowerCase())) &&
      !c.name.toLowerCase().includes(globalSearch.toLowerCase())
    )
  ] : [];

  const totalUnread = CHATS_DATA.reduce((a, c) => a + c.unread, 0);

  const navItems: { tab: Tab; icon: string; label: string }[] = [
    { tab: "chats", icon: "MessageSquare", label: "Чаты" },
    { tab: "contacts", icon: "Users", label: "Контакты" },
    { tab: "search", icon: "Search", label: "Поиск" },
    { tab: "notifications", icon: "Bell", label: "Уведомления" },
  ];

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-[hsl(240,12%,8%)] relative">
      {/* Ambient orbs */}
      <div className="sw-orb-1" />
      <div className="sw-orb-2" />

      {/* Navigation rail */}
      <nav className="w-[60px] bg-[hsl(240,14%,6%)] border-r border-[hsl(240,8%,12%)] flex flex-col items-center py-5 gap-1 flex-shrink-0 relative z-10">
        <div className="mb-6">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, hsl(265,65%,50%), hsl(280,60%,42%))", boxShadow: "0 0 16px hsl(265 65% 50% / 0.45)" }}>
            <span className="font-mono font-bold text-[11px] text-white tracking-tight">sw</span>
          </div>
        </div>

        {navItems.map(({ tab, icon, label }) => {
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
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[hsl(265,70%,65%)] rounded-full"
                  style={{ boxShadow: "0 0 6px hsl(265 70% 65% / 0.8)" }} />
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

      {/* Left panel */}
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
                        <span className="ml-2 flex-shrink-0 min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center text-[10px] font-semibold text-white"
                          style={{ background: "linear-gradient(135deg, hsl(265,65%,55%), hsl(280,55%,48%))", boxShadow: "0 2px 8px hsl(265 65% 55% / 0.4)" }}>
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
                      <div key={contact.id}
                        className="px-3 py-2.5 flex items-center gap-3 hover:bg-[hsl(240,10%,13%)] cursor-pointer sw-chat-item animate-slide-in"
                        style={{ animationDelay: `${i * 35}ms`, opacity: 0 }}>
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
                      <button key={chat.id}
                        onClick={() => { selectChat(chat); setActiveTab("chats"); setGlobalSearch(""); }}
                        className="w-full px-3 py-2.5 flex items-center gap-3 text-left hover:bg-[hsl(240,10%,13%)] sw-chat-item animate-slide-in"
                        style={{ animationDelay: `${i * 35}ms`, opacity: 0 }}>
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
                <div key={n.id}
                  className={`px-3 py-3 flex items-start gap-3 cursor-pointer sw-chat-item animate-slide-in
                    ${n.unread ? "bg-[hsl(265,20%,12%)] hover:bg-[hsl(265,20%,14%)]" : "hover:bg-[hsl(240,10%,13%)]"}`}
                  style={{ animationDelay: `${i * 40}ms`, opacity: 0 }}>
                  <div className="relative flex-shrink-0">
                    <AvatarBubble initials={n.avatar} size="sm" purple={n.unread} />
                    {n.unread && (
                      <span className="absolute top-0 right-0 w-1.5 h-1.5 rounded-full bg-[hsl(265,70%,65%)]"
                        style={{ boxShadow: "0 0 5px hsl(265 70% 65% / 0.8)" }} />
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
                <div className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-semibold text-white mb-3 relative"
                  style={{ background: "linear-gradient(135deg, hsl(265,65%,50%), hsl(280,55%,42%))", boxShadow: "0 0 24px hsl(265 65% 50% / 0.4)" }}>
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
                  <button key={item.label}
                    className="w-full px-3 py-2.5 flex items-center gap-3 rounded-lg hover:bg-[hsl(240,10%,13%)] text-left transition-colors group">
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

      {/* Chat area */}
      <main className="flex-1 flex flex-col min-w-0 relative z-10">

        {/* Header */}
        <header className="h-14 bg-[hsl(240,12%,9%)] border-b border-[hsl(240,8%,14%)] flex items-center px-5 gap-3 flex-shrink-0">
          <div className="relative flex-shrink-0">
            <AvatarBubble initials={selectedChat.avatar} purple />
            {selectedChat.status && (
              <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-[hsl(240,12%,9%)] ${statusDot(selectedChat.status)}`} />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[13px] font-semibold text-[hsl(260,15%,88%)]">{selectedChat.name}</div>
            <div className="text-[11px] text-[hsl(240,8%,45%)]">
              {selectedChat.type === "group"
                ? `${selectedChat.messages.length} сообщений · группа`
                : selectedChat.status === "online" ? "В сети" : "Не в сети"
              }
            </div>
          </div>

          {/* E2E badge */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[hsl(265,30%,22%)] bg-[hsl(265,30%,12%)]">
            <Icon name="Lock" size={9} className="text-[hsl(265,60%,60%)]" />
            <span className="encrypted-badge text-[hsl(265,50%,58%)] uppercase">E2E encrypted</span>
          </div>

          <div className="flex items-center gap-1 ml-1">
            {[
              { icon: "Phone", label: "Звонок" },
              { icon: "Video", label: "Видео" },
              { icon: "MoreHorizontal", label: "Ещё" },
            ].map(btn => (
              <button key={btn.icon}
                className="w-8 h-8 flex items-center justify-center text-[hsl(240,8%,40%)] hover:text-[hsl(265,70%,68%)] hover:bg-[hsl(265,30%,14%)] rounded-lg transition-all sw-nav-btn">
                <Icon name={btn.icon} size={15} />
              </button>
            ))}
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-3">
          {chatMessages.map((msg, i) => (
            <div
              key={msg.id}
              className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}
              style={{
                animation: `${msg.from === "me" ? "sw-bubble-out" : "sw-bubble-in"} 0.3s cubic-bezier(0.34,1.4,0.64,1) ${i * 22}ms both`
              }}
            >
              <div className={`flex flex-col max-w-[62%] gap-1 ${msg.from === "me" ? "items-end" : "items-start"}`}>
                {msg.from !== "me" && selectedChat.type === "group" && (
                  <span className="text-[10px] font-semibold text-[hsl(265,60%,60%)] px-1">{msg.from}</span>
                )}
                <div className={`px-4 py-2.5 text-[13px] leading-relaxed ${msg.from === "me" ? "message-bubble-out" : "message-bubble-in"}`}>
                  {msg.text}
                </div>
                <span className="text-[10px] text-[hsl(240,8%,40%)] px-1 flex items-center gap-1">
                  {msg.time}
                  {msg.from === "me" && <Icon name="CheckCheck" size={10} className="text-[hsl(265,50%,55%)]" />}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="flex-shrink-0 px-5 pb-5">
          <div className="bg-[hsl(240,12%,11%)] border border-[hsl(240,8%,16%)] rounded-2xl flex items-end gap-2 px-3 py-2.5 sw-input">
            <button className="w-7 h-7 flex items-center justify-center text-[hsl(240,8%,38%)] hover:text-[hsl(265,60%,62%)] transition-colors flex-shrink-0 mb-0.5">
              <Icon name="Paperclip" size={15} />
            </button>
            <textarea
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
              placeholder="Написать сообщение..."
              rows={1}
              className="flex-1 resize-none bg-transparent text-[13px] text-[hsl(260,15%,85%)] placeholder:text-[hsl(240,8%,35%)] outline-none leading-relaxed py-0.5 max-h-24 overflow-y-auto"
            />
            <button className="w-7 h-7 flex items-center justify-center text-[hsl(240,8%,38%)] hover:text-[hsl(265,60%,62%)] transition-colors flex-shrink-0 mb-0.5">
              <Icon name="Smile" size={15} />
            </button>
            <button
              onClick={sendMessage}
              className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mb-0.5 sw-send-btn
                ${inputText.trim()
                  ? "text-white"
                  : "bg-[hsl(240,10%,16%)] text-[hsl(240,8%,38%)]"
                }`}
              style={inputText.trim() ? {
                background: "linear-gradient(135deg, hsl(265,65%,55%), hsl(280,55%,46%))",
              } : {}}
            >
              <Icon name="Send" size={14} />
            </button>
          </div>
          <div className="flex items-center justify-center gap-1.5 mt-2">
            <Icon name="Lock" size={9} className="text-[hsl(240,8%,32%)]" />
            <span className="encrypted-badge text-[hsl(240,8%,32%)]">СООБЩЕНИЯ ЗАЩИЩЕНЫ СКВОЗНЫМ ШИФРОВАНИЕМ</span>
          </div>
        </div>
      </main>
    </div>
  );
}
