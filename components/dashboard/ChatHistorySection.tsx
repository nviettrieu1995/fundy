
import React, { useState, useEffect } from 'react';
import Card from '../common/Card';
import LoadingSpinner from '../common/LoadingSpinner';
import { ChatMessage } from '../../types';
import { getChatHistory } from '../../services/dataService';
import { UserCircleIcon, SparklesIcon as AiIcon } from '../common/Icon';

const ChatHistorySection: React.FC = () => {
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      const data = await getChatHistory();
      setHistory(data);
      setLoading(false);
    };
    fetchHistory();
  }, []);

  if (loading) {
    return <LoadingSpinner message="Loading chat history..." />;
  }
  
  if (history.length === 0) {
    return <Card title="Lịch sử trò chuyện"><p className="text-secondary-600">Chưa có tin nhắn nào.</p></Card>;
  }

  return (
    <Card title="Lịch sử trò chuyện">
      <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
        {history.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex items-end space-x-2 max-w-xl ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              {msg.sender === 'ai' ? <AiIcon className="h-8 w-8 text-primary-500 bg-primary-100 rounded-full p-1.5"/> : <UserCircleIcon className="h-8 w-8 text-secondary-500 bg-secondary-200 rounded-full p-1"/>}
              <div
                className={`px-4 py-2 rounded-lg ${
                  msg.sender === 'user'
                    ? 'bg-primary-500 text-white rounded-br-none'
                    : 'bg-secondary-200 text-secondary-800 rounded-bl-none'
                }`}
              >
                <p className="text-sm">{msg.text}</p>
                 <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-primary-200' : 'text-secondary-500'}`}>
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                 </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-sm text-secondary-500">
        Đây là lịch sử trò chuyện mô phỏng. Dữ liệu thực tế sẽ được tích hợp từ các widget AI.
      </div>
    </Card>
  );
};

export default ChatHistorySection;
    