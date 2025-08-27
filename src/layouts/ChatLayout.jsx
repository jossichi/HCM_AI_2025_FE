export default function ChatLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <main className="flex-1 p-4 flex flex-col justify-between max-w-2xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}
