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

const statusColor = (s: string | null) => {
  if (s === "online") return "bg-emerald-400";
  if (s === "away") return "bg-amber-400";
  return "bg-gray-300";
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
    setChatMessages([...chatMessages, newMsg]);
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

  const navItems = [
    { tab: "chats" as Tab, icon: "MessageSquare", label: "Чаты" },
    { tab: "contacts" as Tab, icon: "Users", label: "Контакты" },
    { tab: "search" as Tab, icon: "Search", label: "Поиск" },
    { tab: "notifications" as Tab, icon: "Bell", label: "Уведомления" },
  ];

  const totalUnread = CHATS_DATA.reduce((a, c) => a + c.unread, 0);

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-[hsl(220,10%,96%)]">

      {/* Navigation rail */}
      <nav className="w-16 bg-[hsl(222,60%,22%)] flex flex-col items-center py-5 gap-1 flex-shrink-0">
        <div className="mb-6 flex flex-col items-center gap-1">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <span className="text-[hsl(222,60%,22%)] font-mono font-semibold text-xs">sp</span>
          </div>
        </div>

        {navItems.map(({ tab, icon, label }) => {
          const hasNotif = tab === "chats" && totalUnread > 0;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              title={label}
              className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-150
                ${activeTab === tab
                  ? "bg-white/15 text-white"
                  : "text-white/40 hover:text-white/70 hover:bg-white/10"
                }`}
            >
              <Icon name={icon} size={18} />
              {hasNotif && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-400 rounded-full" />
              )}
            </button>
          );
        })}

        <div className="flex-1" />

        <button
          onClick={() => setActiveTab("profile")}
          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-150
            ${activeTab === "profile"
              ? "bg-white/15 text-white"
              : "text-white/40 hover:text-white/70 hover:bg-white/10"
            }`}
          title="Профиль"
        >
          <Icon name="UserCircle" size={18} />
        </button>
      </nav>

      {/* Left panel */}
      <aside className="w-72 bg-white border-r border-[hsl(220,10%,92%)] flex flex-col flex-shrink-0">

        {activeTab === "chats" && (
          <>
            <div className="px-4 pt-5 pb-3 border-b border-[hsl(220,10%,93%)]">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-[11px] font-semibold text-[hsl(220,15%,45%)] tracking-widest uppercase">Переписки</h2>
                <button className="w-6 h-6 flex items-center justify-center text-[hsl(220,10%,60%)] hover:text-[hsl(222,60%,22%)] transition-colors">
                  <Icon name="Plus" size={15} />
                </button>
              </div>
              <div className="relative">
                <Icon name="Search" size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(220,10%,65%)]" />
                <input
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Поиск переписок..."
                  className="w-full pl-8 pr-3 py-2 text-[13px] bg-[hsl(220,10%,96%)] rounded-lg border-none outline-none placeholder:text-[hsl(220,10%,65%)] text-[hsl(220,15%,15%)]"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto py-2">
              {filteredChats.map((chat, i) => (
                <button
                  key={chat.id}
                  onClick={() => selectChat(chat)}
                  className={`w-full px-3 py-2.5 flex items-center gap-3 text-left transition-all duration-100 animate-slide-in
                    ${selectedChat.id === chat.id
                      ? "bg-[hsl(222,60%,96%)]"
                      : "hover:bg-[hsl(220,10%,96%)]"
                    }`}
                  style={{ animationDelay: `${i * 30}ms` }}
                >
                  <div className="relative flex-shrink-0">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-[11px] font-semibold
                      ${chat.type === "group"
                        ? "bg-[hsl(220,10%,90%)] text-[hsl(220,15%,30%)]"
                        : "bg-[hsl(222,60%,92%)] text-[hsl(222,60%,22%)]"}`}>
                      {chat.avatar}
                    </div>
                    {chat.status && (
                      <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white ${statusColor(chat.status)}`} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[13px] font-medium text-[hsl(220,15%,12%)] truncate">{chat.name}</span>
                      <span className="text-[11px] text-[hsl(220,10%,60%)] ml-2 flex-shrink-0">{chat.time}</span>
                    </div>
                    <div className="flex items-center justify-between mt-0.5">
                      <span className="text-[12px] text-[hsl(220,10%,55%)] truncate">{chat.lastMsg}</span>
                      {chat.unread > 0 && (
                        <span className="ml-2 flex-shrink-0 w-4 h-4 bg-[hsl(222,60%,22%)] text-white text-[10px] rounded-full flex items-center justify-center font-medium">
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

        {activeTab === "contacts" && (
          <>
            <div className="px-4 pt-5 pb-3 border-b border-[hsl(220,10%,93%)]">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-[11px] font-semibold text-[hsl(220,15%,45%)] tracking-widest uppercase">Контакты</h2>
                <button className="w-6 h-6 flex items-center justify-center text-[hsl(220,10%,60%)] hover:text-[hsl(222,60%,22%)] transition-colors">
                  <Icon name="UserPlus" size={15} />
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
                      <span className="text-[10px] font-semibold text-[hsl(220,10%,60%)] uppercase tracking-widest">{label}</span>
                    </div>
                    {grouped.map(contact => (
                      <div key={contact.id} className="px-3 py-2.5 flex items-center gap-3 hover:bg-[hsl(220,10%,96%)] cursor-pointer">
                        <div className="relative flex-shrink-0">
                          <div className="w-9 h-9 rounded-full bg-[hsl(222,60%,92%)] text-[hsl(222,60%,22%)] flex items-center justify-center text-[11px] font-semibold">
                            {contact.avatar}
                          </div>
                          <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white ${statusColor(contact.status)}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[13px] font-medium text-[hsl(220,15%,12%)]">{contact.name}</div>
                          <div className="text-[11px] text-[hsl(220,10%,60%)]">{contact.lastSeen}</div>
                        </div>
                        <button className="w-7 h-7 flex items-center justify-center text-[hsl(220,10%,60%)] hover:text-[hsl(222,60%,22%)] hover:bg-[hsl(220,10%,94%)] rounded-lg transition-all">
                          <Icon name="MessageSquare" size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </>
        )}

        {activeTab === "search" && (
          <>
            <div className="px-4 pt-5 pb-3 border-b border-[hsl(220,10%,93%)]">
              <h2 className="text-[11px] font-semibold text-[hsl(220,15%,45%)] tracking-widest uppercase mb-4">Поиск</h2>
              <div className="relative">
                <Icon name="Search" size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(220,10%,65%)]" />
                <input
                  value={globalSearch}
                  onChange={e => setGlobalSearch(e.target.value)}
                  placeholder="Чаты, контакты, сообщения..."
                  autoFocus
                  className="w-full pl-8 pr-3 py-2 text-[13px] bg-[hsl(220,10%,96%)] rounded-lg border-none outline-none placeholder:text-[hsl(220,10%,65%)] text-[hsl(220,15%,15%)]"
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto py-2">
              {globalSearch.length > 1 ? (
                globalResults.length > 0 ? (
                  <>
                    <div className="px-4 py-2">
                      <span className="text-[10px] font-semibold text-[hsl(220,10%,60%)] uppercase tracking-widest">Результаты — {globalResults.length}</span>
                    </div>
                    {globalResults.map(chat => (
                      <button
                        key={chat.id}
                        onClick={() => { selectChat(chat); setActiveTab("chats"); setGlobalSearch(""); }}
                        className="w-full px-3 py-2.5 flex items-center gap-3 text-left hover:bg-[hsl(220,10%,96%)]"
                      >
                        <div className="w-9 h-9 rounded-full bg-[hsl(222,60%,92%)] text-[hsl(222,60%,22%)] flex items-center justify-center text-[11px] font-semibold flex-shrink-0">
                          {chat.avatar}
                        </div>
                        <div>
                          <div className="text-[13px] font-medium text-[hsl(220,15%,12%)]">{chat.name}</div>
                          <div className="text-[12px] text-[hsl(220,10%,55%)]">{chat.lastMsg}</div>
                        </div>
                      </button>
                    ))}
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-40 gap-2 text-[hsl(220,10%,65%)]">
                    <Icon name="SearchX" size={24} />
                    <span className="text-[12px]">Ничего не найдено</span>
                  </div>
                )
              ) : (
                <div className="flex flex-col items-center justify-center h-40 gap-2 text-[hsl(220,10%,65%)]">
                  <Icon name="Search" size={22} />
                  <span className="text-[12px]">Введите запрос для поиска</span>
                </div>
              )}
            </div>
          </>
        )}

        {activeTab === "notifications" && (
          <>
            <div className="px-4 pt-5 pb-3 border-b border-[hsl(220,10%,93%)]">
              <h2 className="text-[11px] font-semibold text-[hsl(220,15%,45%)] tracking-widest uppercase">Уведомления</h2>
            </div>
            <div className="flex-1 overflow-y-auto py-2">
              {[
                { id: 1, avatar: "ИВ", text: "Ирина Волкова отправила вам сообщение", time: "2 мин назад", unread: true },
                { id: 2, avatar: "КП", text: "В группе «Команда продукта» 3 новых сообщения", time: "15 мин назад", unread: true },
                { id: 3, avatar: "ДК", text: "Дмитрий Козлов добавил вас в контакты", time: "1 час назад", unread: true },
                { id: 4, avatar: "АМ", text: "Алексей Морозов: Окей, договорились", time: "вчера", unread: false },
              ].map(n => (
                <div key={n.id} className={`px-3 py-3 flex items-start gap-3 hover:bg-[hsl(220,10%,96%)] cursor-pointer ${n.unread ? "bg-[hsl(222,60%,98%)]" : ""}`}>
                  <div className="relative flex-shrink-0">
                    <div className="w-9 h-9 rounded-full bg-[hsl(222,60%,92%)] text-[hsl(222,60%,22%)] flex items-center justify-center text-[11px] font-semibold">
                      {n.avatar}
                    </div>
                    {n.unread && <span className="absolute top-0 right-0 w-2 h-2 bg-[hsl(222,60%,22%)] rounded-full" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] text-[hsl(220,15%,15%)] leading-relaxed">{n.text}</p>
                    <span className="text-[11px] text-[hsl(220,10%,60%)] mt-0.5 block">{n.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === "profile" && (
          <>
            <div className="px-4 pt-5 pb-3 border-b border-[hsl(220,10%,93%)]">
              <h2 className="text-[11px] font-semibold text-[hsl(220,15%,45%)] tracking-widest uppercase">Профиль</h2>
            </div>
            <div className="flex-1 overflow-y-auto">
              <div className="px-4 py-6 flex flex-col items-center border-b border-[hsl(220,10%,93%)]">
                <div className="w-16 h-16 rounded-full bg-[hsl(222,60%,22%)] text-white flex items-center justify-center text-xl font-semibold mb-3">
                  ВА
                </div>
                <div className="text-[15px] font-semibold text-[hsl(220,15%,10%)]">Вы</div>
                <div className="text-[12px] text-[hsl(220,10%,55%)] mt-0.5">@username</div>
                <div className="mt-2 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                  <span className="text-[11px] text-[hsl(220,10%,55%)]">В сети</span>
                </div>
              </div>
              <div className="px-4 py-4 space-y-1">
                {[
                  { icon: "Bell", label: "Уведомления" },
                  { icon: "Shield", label: "Приватность и безопасность" },
                  { icon: "Lock", label: "Сквозное шифрование" },
                  { icon: "Palette", label: "Внешний вид" },
                  { icon: "Languages", label: "Язык интерфейса" },
                  { icon: "HelpCircle", label: "Помощь" },
                ].map(item => (
                  <button key={item.label} className="w-full px-3 py-2.5 flex items-center gap-3 rounded-lg hover:bg-[hsl(220,10%,96%)] text-left transition-colors">
                    <Icon name={item.icon} size={15} className="text-[hsl(220,10%,55%)]" />
                    <span className="text-[13px] text-[hsl(220,15%,20%)]">{item.label}</span>
                    <Icon name="ChevronRight" size={13} className="ml-auto text-[hsl(220,10%,65%)]" />
                  </button>
                ))}
              </div>
              <div className="px-4 pb-4">
                <button className="w-full px-3 py-2.5 flex items-center gap-3 rounded-lg text-red-500 hover:bg-red-50 transition-colors text-left">
                  <Icon name="LogOut" size={15} />
                  <span className="text-[13px]">Выйти из аккаунта</span>
                </button>
              </div>
            </div>
          </>
        )}
      </aside>

      {/* Chat area */}
      <main className="flex-1 flex flex-col min-w-0 bg-[hsl(220,10%,97%)]">

        {/* Chat header */}
        <header className="h-14 bg-white border-b border-[hsl(220,10%,92%)] flex items-center px-5 gap-3 flex-shrink-0">
          <div className="relative flex-shrink-0">
            <div className="w-9 h-9 rounded-full bg-[hsl(222,60%,92%)] text-[hsl(222,60%,22%)] flex items-center justify-center text-[11px] font-semibold">
              {selectedChat.avatar}
            </div>
            {selectedChat.status && (
              <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white ${statusColor(selectedChat.status)}`} />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[14px] font-semibold text-[hsl(220,15%,10%)]">{selectedChat.name}</div>
            <div className="text-[11px] text-[hsl(220,10%,55%)]">
              {selectedChat.type === "group"
                ? `${selectedChat.messages.length} сообщений · группа`
                : selectedChat.status === "online" ? "В сети" : "Не в сети"
              }
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-[hsl(222,60%,97%)] rounded-full border border-[hsl(222,60%,88%)]">
            <Icon name="Lock" size={10} className="text-[hsl(222,60%,40%)]" />
            <span className="encrypted-badge text-[hsl(222,60%,40%)] uppercase font-medium">E2E encrypted</span>
          </div>

          <div className="flex items-center gap-1 ml-1">
            <button className="w-8 h-8 flex items-center justify-center text-[hsl(220,10%,55%)] hover:text-[hsl(222,60%,22%)] hover:bg-[hsl(220,10%,94%)] rounded-lg transition-all">
              <Icon name="Phone" size={15} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center text-[hsl(220,10%,55%)] hover:text-[hsl(222,60%,22%)] hover:bg-[hsl(220,10%,94%)] rounded-lg transition-all">
              <Icon name="Video" size={15} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center text-[hsl(220,10%,55%)] hover:text-[hsl(222,60%,22%)] hover:bg-[hsl(220,10%,94%)] rounded-lg transition-all">
              <Icon name="MoreHorizontal" size={15} />
            </button>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-3">
          {chatMessages.map((msg, i) => (
            <div
              key={msg.id}
              className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"} animate-fade-in`}
              style={{ animationDelay: `${i * 20}ms` }}
            >
              <div className={`flex flex-col max-w-[65%] gap-1 ${msg.from === "me" ? "items-end" : "items-start"}`}>
                {msg.from !== "me" && selectedChat.type === "group" && (
                  <span className="text-[11px] font-medium text-[hsl(222,60%,35%)] px-1">{msg.from}</span>
                )}
                <div className={`px-4 py-2.5 text-[13px] leading-relaxed ${msg.from === "me" ? "message-bubble-out" : "message-bubble-in"}`}>
                  {msg.text}
                </div>
                <span className="text-[10px] text-[hsl(220,10%,62%)] px-1 flex items-center gap-1">
                  {msg.time}
                  {msg.from === "me" && <Icon name="CheckCheck" size={10} className="text-[hsl(222,60%,45%)]" />}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Input area */}
        <div className="flex-shrink-0 px-5 pb-5">
          <div className="bg-white border border-[hsl(220,10%,90%)] rounded-2xl flex items-end gap-2 px-3 py-2.5 shadow-sm">
            <button className="w-7 h-7 flex items-center justify-center text-[hsl(220,10%,60%)] hover:text-[hsl(222,60%,22%)] transition-colors flex-shrink-0 mb-0.5">
              <Icon name="Paperclip" size={15} />
            </button>
            <textarea
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              placeholder="Написать сообщение..."
              rows={1}
              className="flex-1 resize-none bg-transparent text-[13px] text-[hsl(220,15%,10%)] placeholder:text-[hsl(220,10%,65%)] outline-none leading-relaxed py-0.5 max-h-24 overflow-y-auto"
            />
            <button className="w-7 h-7 flex items-center justify-center text-[hsl(220,10%,60%)] hover:text-[hsl(222,60%,22%)] transition-colors flex-shrink-0 mb-0.5">
              <Icon name="Smile" size={15} />
            </button>
            <button
              onClick={sendMessage}
              className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mb-0.5 transition-all duration-150
                ${inputText.trim()
                  ? "bg-[hsl(222,60%,22%)] text-white hover:bg-[hsl(222,60%,18%)]"
                  : "bg-[hsl(220,10%,92%)] text-[hsl(220,10%,60%)]"
                }`}
            >
              <Icon name="Send" size={14} />
            </button>
          </div>
          <div className="flex items-center justify-center gap-1.5 mt-2">
            <Icon name="Lock" size={9} className="text-[hsl(220,10%,70%)]" />
            <span className="encrypted-badge text-[hsl(220,10%,65%)]">СООБЩЕНИЯ ЗАЩИЩЕНЫ СКВОЗНЫМ ШИФРОВАНИЕМ</span>
          </div>
        </div>
      </main>
    </div>
  );
}
