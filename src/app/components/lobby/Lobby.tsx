"use client";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/redux/store";
import { setUserid, setUsername } from "@/app/redux/features/userSlice";
import { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Lobby = () => {
  const user = useSelector((state: RootState) => state.user.username);
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("access") || !localStorage.getItem("refresh")) {
      router.push("/");
    }
    const getUser = async () => {
      try {
        const { data } = await axios.get("http://127.0.0.1:8000/account/me/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        });
        dispatch(setUserid(data.id));
        dispatch(setUsername(data.username));
        localStorage.setItem("myName", data.username);
      } catch (e) {
        console.error(e);
      }
    };
    getUser();
  }, []);

  return (
    <div className="w-full h-full">
      <div className="w-full h-full flex items-center justify-center flex-col">
        <h1 className="text-[60px] font-bold text-blue-400 flex gap-3">
          Hi, <p className="first-letter:uppercase">{user}</p> please select
          chat
        </h1>
      </div>
    </div>
  );
};

export default Lobby;
