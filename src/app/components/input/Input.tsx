"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";

interface ChatMessages {
  id: number;
  user: number;
  username: string;
  message: string;
  room: string | number;
  date?: string;
}

const Input = ({ newMessage, slugID }: any) => {
  const [websocket, setWebsocket] = useState<WebSocket | null>(null);
  const [messageValue, setMessageValue] = useState<string>("");
  const user = useSelector((state: RootState) => state.user.username);

  useEffect(() => {
    const ws = new WebSocket("ws://127.0.0.1:8000/chat/ws/chatroom");
    setWebsocket(ws);

    ws.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);

        const newMsg: ChatMessages = {
          id: Date.now(),
          user: data.user,
          username: data.username,
          message: data.message,
          room: data.room,
        };

        newMessage((prev: any) => [...prev, newMsg]);
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    return () => {
      ws.close();
    };
  }, [newMessage]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageValue.trim()) {
      return;
    }

    if (websocket && websocket.readyState === WebSocket.OPEN) {
      websocket.send(
        JSON.stringify({
          room: slugID,
          message: messageValue,
          username: user || localStorage.getItem("myName"),
        })
      );
      setMessageValue("");
    } else {
      console.error("WebSocket is not connected");
    }
  };

  return (
    <form
      className="h-[60px] border-t border-neutral-300 flex items-center px-6"
      onSubmit={sendMessage}
    >
      <input
        value={messageValue}
        onChange={(e) => setMessageValue(e.target.value)}
        type="text"
        placeholder="Type your message..."
        className="flex-1 border border-neutral-300 rounded-md p-2 text-neutral-800"
      />
      <button
        type="submit"
        className="ml-4 w-[40px] h-[40px] bg-blue-500 rounded-full flex items-center justify-center text-white"
      >
        <span className="material-symbols-outlined">send</span>
      </button>
    </form>
  );
};

export default Input;
