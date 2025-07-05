export default function MessageBubble({ sender, text }) {
  return (
    <div
      className={`my-1 max-w-[75%] px-4 py-2 rounded-xl ${
        sender === "user"
          ? "bg-blue-600 text-white self-end"
          : "bg-gray-200 self-start"
      }`}>
      {text}
    </div>
  );
}
