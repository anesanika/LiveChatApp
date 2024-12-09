"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const Chatlist = () => {
  const [chatRooms, setChatRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/chat/room/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        });
        setChatRooms(response.data); // Assuming the response contains an array of chat rooms
      } catch (err) {
        setError("Failed to load chat rooms.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchChatRooms();
  }, []);

  return (
    <div className="min-w-[300px] bg-neutral-100 border-r border-neutral-300 flex flex-col">
      <div className="p-4 flex-1 overflow-y-auto">
        <div className="flex mb-4 items-center justify-between">
          <span className="font-semibold text-neutral-800">Chat</span>
        </div>

        {/* Show error message if fetching failed */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Show loading indicator if data is being fetched */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="flex flex-col">
            {/* Render chat rooms dynamically */}
            {chatRooms.map((room) => (
              <Link href={`/lobby/${room.slug}`} key={room.id} className="my-2">
                <div className="flex gap-3 mb-4 items-center bg-blue-200 p-3 rounded-lg">
                  <div className="flex-1">
                    <span className="font-semibold text-neutral-800 block">
                      {room.name} {/* Assuming room has a name */}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Chatlist;
