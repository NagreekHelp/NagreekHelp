import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import Button from '../atoms/Button';

function ChatModal({ isOpen, onClose, centerName, requiredDocuments }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setMessages([
        { sender: 'center', text: `Please upload: ${requiredDocuments.join(', ')}` }
      ]);
    }
  }, [isOpen, requiredDocuments]);

  const sendMessage = () => {
    if (!input && !file) return;

    const newMessages = [...messages];
    if (input) newMessages.push({ sender: 'user', text: input });
    if (file) newMessages.push({ sender: 'user', text: `📄 Sent document: ${file.name}` });

    setMessages(newMessages);
    setInput('');
    setFile(null);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-lg bg-white rounded-xl p-6 shadow-xl">
          <div className="flex justify-between items-center border-b pb-2 mb-4">
            <h2 className="text-lg font-bold">{centerName}</h2>
            <button onClick={onClose}><X className="w-5 h-5" /></button>
          </div>

          <div className="h-64 overflow-y-auto space-y-3 mb-4 px-2">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-md max-w-[80%] text-sm ${
                  msg.sender === 'user' ? 'bg-green-100 self-end ml-auto' : 'bg-gray-100'
                }`}
              >
                {msg.text}
              </div>
            ))}
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

export default ChatModal;
