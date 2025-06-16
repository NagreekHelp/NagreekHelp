import { useState } from 'react';
import { Paperclip, Send } from 'lucide-react';

const ChatWindow = ({ messages, onSendMessage, onUpload }) => {
  const [message, setMessage] = useState('');
  const [attachment, setAttachment] = useState(null);

  const handleSend = () => {
    if (message.trim() || attachment) {
      onSendMessage({ text: message, file: attachment });
      setMessage('');
      setAttachment(null);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAttachment(file);
    onUpload(file);
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white shadow-md rounded-lg flex flex-col h-[500px] border">
      {/* Header */}
      <div className="bg-primary-green text-white px-4 py-3 font-semibold rounded-t-lg">
        Chat with Center
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2 bg-gray-50">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-[70%] px-3 py-2 rounded-lg text-sm ${
              msg.sender === 'user'
                ? 'bg-primary-green text-white self-start'
                : 'bg-gray-300 text-gray-900 self-end'
            }`}
          >
            {msg.file && (
              <div className="mb-1">
                <a
                  href={URL.createObjectURL(msg.file)}
                  download={msg.file.name}
                  className="underline text-xs"
                >
                  📎 {msg.file.name}
                </a>
              </div>
            )}
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input box */}
      <div className="flex items-center border-t p-2 gap-2">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 px-3 py-2 rounded border focus:outline-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <label className="cursor-pointer">
          <Paperclip className="w-5 h-5 text-gray-600" />
          <input
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
        <button
          onClick={handleSend}
          className="bg-primary-green text-white px-4 py-2 rounded hover:bg-green-700"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
