export type Tab = "chats" | "contacts" | "notifications" | "profile" | "search";

export interface Message {
  id: number;
  from: string;
  text: string;
  time: string;
}

export interface Chat {
  id: number;
  name: string;
  avatar: string;
  type: "personal" | "group";
  lastMsg: string;
  time: string;
  unread: number;
  status: string | null;
  messages: Message[];
}

export interface Contact {
  id: number;
  name: string;
  status: string;
  avatar: string;
  lastSeen: string;
}

export const CONTACTS: Contact[] = [
  { id: 1, name: "Алексей Морозов", status: "online", avatar: "АМ", lastSeen: "сейчас" },
  { id: 2, name: "Ирина Волкова", status: "online", avatar: "ИВ", lastSeen: "сейчас" },
  { id: 3, name: "Дмитрий Козлов", status: "away", avatar: "ДК", lastSeen: "5 мин назад" },
  { id: 4, name: "Мария Новикова", status: "offline", avatar: "МН", lastSeen: "вчера" },
  { id: 5, name: "Сергей Петров", status: "offline", avatar: "СП", lastSeen: "3 дня назад" },
  { id: 6, name: "Анна Соколова", status: "online", avatar: "АС", lastSeen: "сейчас" },
];

export const CHATS_DATA: Chat[] = [
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

export const statusDot = (s: string | null): string => {
  if (s === "online") return "bg-emerald-400 sw-online-dot";
  if (s === "away") return "bg-amber-400";
  return "bg-[hsl(240,8%,32%)]";
};
