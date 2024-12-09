"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Input from "../input/Input";
import Message from "../message/Message";

interface ChatMessage {
  id: number;
  user: number;
  username: string;
  message: string;
  room: string | number;
  date: string;
}

const Chatmessages = ({ slugId }: { slugId: string }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/chat/rooms/${slugId}/messages/`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          }
        );

        setMessages(response.data);
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [slugId]);

  return (
    <main className="flex-1 flex flex-col">
      <div className="h-[60px] border-b border-neutral-300 flex justify-between items-center px-6">
        <h2 className="font-title text-neutral-800">{slugId}</h2>
      </div>
      <div className="p-6 flex-1 overflow-y-auto bg-neutral-50">
        {loading && <p>Loading messages...</p>}
        {error && <p className="text-red-500">{error}</p>}
        <div className="space-y-4">
          {messages.map((msg) => (
            <Message key={msg.id} msg={msg} />
          ))}
        </div>
      </div>
      <Input newMessage={setMessages} slugID={slugId} />
    </main>
  );
};

export default Chatmessages;
