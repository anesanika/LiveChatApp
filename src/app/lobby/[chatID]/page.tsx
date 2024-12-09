import Chatmessages from "@/app/components/chatmessages/Chatmessages";

export default async function Chatpage({
  params,
}: {
  params: Promise<{ chatID: string }>;
}) {
  const chatId = (await params).chatID;

  return <Chatmessages slugId={chatId} />;
}
