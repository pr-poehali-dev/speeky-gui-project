import { useState } from "react";
import { Tab, Chat, CHATS_DATA } from "@/components/swiftly/data";
import NavRail from "@/components/swiftly/NavRail";
import SidePanel from "@/components/swiftly/SidePanel";
import ChatArea from "@/components/swiftly/ChatArea";
import AuthScreen from "@/components/swiftly/AuthScreen";
import Particles from "@/components/swiftly/Particles";

export default function Index() {
  const [authed, setAuthed] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("chats");
  const [selectedChat, setSelectedChat] = useState<Chat>(CHATS_DATA[0]);
  const [chatMessages, setChatMessages] = useState(CHATS_DATA[0].messages);
  const [searchQuery, setSearchQuery] = useState("");
  const [globalSearch, setGlobalSearch] = useState("");

  const selectChat = (chat: Chat) => {
    setSelectedChat(chat);
    setChatMessages(chat.messages);
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

  if (!authed) {
    return <AuthScreen onAuth={() => setAuthed(true)} />;
  }

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-[hsl(240,12%,8%)] relative">
      <Particles count={38} />
      <div className="sw-orb-1" />
      <div className="sw-orb-2" />

      <NavRail
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        totalUnread={totalUnread}
      />

      <SidePanel
        activeTab={activeTab}
        selectedChat={selectedChat}
        selectChat={selectChat}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        globalSearch={globalSearch}
        setGlobalSearch={setGlobalSearch}
        setActiveTab={setActiveTab}
        filteredChats={filteredChats}
        globalResults={globalResults}
      />

      <ChatArea
        selectedChat={selectedChat}
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  );
}
