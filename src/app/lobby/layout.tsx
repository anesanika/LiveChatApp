import Chatlist from "../components/chatList/Chatlist";

export default function LobbyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full bg-white rounded-lg shadow-lg flex overflow-hidden h-screen">
      <Chatlist />
      {children}
    </div>
  );
}
