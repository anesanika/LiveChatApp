"use client";

const Message = ({ msg }: any) => {
  const myName = localStorage.getItem("myName");
  return (
    <div
      className={`flex  gap-3 ${
        msg.username === myName && "justify-end"
      } items-start`}
    >
      <div
        className={`flex gap-2 ${
          msg.username === myName && "flex-row-reverse"
        }`}
      >
        <div>
          <div
            className={`p-3 rounded-md ${
              msg.username === myName ? "bg-blue-500" : "bg-gray-400"
            }  text-neutral-50`}
          >
            <p className="text-sm">{msg.message}</p>
          </div>
          <p className="text-gray-400 text-[10px]">{msg.username}</p>
        </div>
      </div>
    </div>
  );
};

export default Message;
