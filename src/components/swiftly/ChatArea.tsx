import { useState } from "react";
import Icon from "@/components/ui/icon";
import AvatarBubble from "./AvatarBubble";
import { Chat, Message, statusDot } from "./data";

interface ChatAreaProps {
  selectedChat: Chat;
  chatMessages: Message[];
  setChatMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

export default function ChatArea({ selectedChat, chatMessages, setChatMessages }: ChatAreaProps) {
  const [inputText, setInputText] = useState("");

  const sendMessage = () => {
    if (!inputText.trim()) return;
    const newMsg: Message = { id: chatMessages.length + 1, from: "me", text: inputText, time: "сейчас" };
    setChatMessages(prev => [...prev, newMsg]);
    setInputText("");
  };

  return (
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
          <div className="text-[14px] font-semibold text-[hsl(260,15%,88%)]">{selectedChat.name}</div>
          <div className="text-[11px] text-[hsl(240,8%,45%)]">
            {selectedChat.type === "group"
              ? `${selectedChat.messages.length} сообщений · группа`
              : selectedChat.status === "online" ? "В сети" : "Не в сети"
            }
          </div>
        </div>

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
            <button
              key={btn.icon}
              className="w-8 h-8 flex items-center justify-center text-[hsl(240,8%,40%)] hover:text-[hsl(265,70%,68%)] hover:bg-[hsl(265,30%,14%)] rounded-lg transition-all sw-nav-btn"
            >
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
              animation: `${msg.from === "me" ? "sw-bubble-out" : "sw-bubble-in"} 0.3s cubic-bezier(0.34,1.4,0.64,1) ${i * 22}ms both`,
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
              ${inputText.trim() ? "text-white" : "bg-[hsl(240,10%,16%)] text-[hsl(240,8%,38%)]"}`}
            style={inputText.trim() ? { background: "linear-gradient(135deg, hsl(265,65%,55%), hsl(280,55%,46%))" } : {}}
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
  );
}
