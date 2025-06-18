import io from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import { Dialog } from "@headlessui/react";
import Button from "../atoms/Button";
import { X } from "lucide-react";

function ChatModel({
  isOpen,
  onClose,
  centerName,
  requiredDocuments,
  currentUserId,
  receiverId,
}) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);

const socketRef = useRef(null);

useEffect(() => {
  if (isOpen) {
    socketRef.current = io("http://localhost:5050");

    const roomId = [currentUserId, receiverId].sort().join("_");

    socketRef.current.emit("join-room", roomId);

    socketRef.current.on("receive-message", (msg) => {
      if (
        (msg.senderId === currentUserId && msg.receiverId === receiverId) ||
        (msg.senderId === receiverId && msg.receiverId === currentUserId)
      ) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    return () => {
      socketRef.current.emit("leave-room", roomId);
      socketRef.current.disconnect(); // Ensure the socket is cleaned up
    };
  }
}, [isOpen, currentUserId, receiverId]);
const sendMessage = async () => {
  if (!input && !file) return;

  const roomId = [currentUserId, receiverId].sort().join("_");

  const messageData = {
    senderId: currentUserId,
    receiverId,
    text: input,
    file: file ? file.name : null,
    roomId,
  };

  try {
    const res = await fetch("http://localhost:5050/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(messageData),
    });

    if (res.ok) {
      const savedMessage = await res.json();
      socketRef.current.emit("send-message", { ...savedMessage, roomId }); // ✅ use .current
      setMessages((prev) => [...prev, savedMessage]);
    }

    setInput("");
    setFile(null);
  } catch (err) {
    console.error("Error sending message:", err);
  }
};



  return (
    // Your existing modal UI

    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-lg bg-white rounded-xl p-6 shadow-xl">
          <div className="flex justify-between items-center border-b pb-2 mb-4">
            <h2 className="text-lg font-bold">{centerName}</h2>
            <button onClick={onClose}>
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="h-64 overflow-y-auto space-y-3 mb-4 px-2">
            {messages.map((msg, idx) => {
  const isSender = msg.senderId === currentUserId;
  return (
    <div key={idx} className={`flex ${isSender ? "justify-end" : "justify-start"}`}>
      <div
        className={`p-2 rounded-md max-w-[80%] text-sm ${
          isSender ? "bg-green-100" : "bg-gray-100"
        }`}
      >
        {msg.text}
      </div>
    </div>
  );
})}

          </div>

          <div className="flex gap-2">
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="text-sm"
            />
          </div>

          <div className="mt-2 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 border rounded-lg px-3 py-2 text-sm"
              placeholder="Type a message..."
            />
            <Button text="Send" onClick={sendMessage} />
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default ChatModel;
