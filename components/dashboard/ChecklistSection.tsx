
import React, { useState, useEffect, useCallback } from 'react';
import Card from '../common/Card';
import LoadingSpinner from '../common/LoadingSpinner';
import Button from '../common/Button';
import { ChecklistItem } from '../../types';
import { getChecklistItems } from '../../services/dataService';
import { CheckCircleIcon, SparklesIcon } from '../common/Icon';
import { getAISuggestion } from '../../services/geminiService'; // Assuming Gemini might suggest checklist items

const ChecklistSection: React.FC = () => {
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'fundraising' | 'businessModel'>('all');
  const [suggestionLoading, setSuggestionLoading] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    const data = await getChecklistItems();
    setItems(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const toggleComplete = (id: string) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
    // Here you would typically call an API to update the item's status
    console.log(`Toggled item ${id}. In a real app, this would sync with the backend.`);
  };
  
  const handleGetAISuggestion = async () => {
    setSuggestionLoading(true);
    setAiSuggestion(null);
    const context = `User is working on their ${filter === 'fundraising' ? 'fundraising checklist' : 'business model checklist'}. Current items: ${items.filter(i => filter === 'all' || i.category === filter).map(i => i.text).join(', ')}.`;
    const suggestion = await getAISuggestion(context); // Using Gemini service
    setAiSuggestion(suggestion);
    setSuggestionLoading(false);
  };


  const filteredItems = items.filter(item => filter === 'all' || item.category === filter);

  if (loading) {
    return <LoadingSpinner message="Loading checklists..." />;
  }

  return (
    <Card title="Checklists">
      <div className="mb-4 flex space-x-2 border-b pb-2">
        <Button onClick={() => setFilter('all')} variant={filter === 'all' ? 'primary' : 'outline'} size="sm">Tất cả</Button>
        <Button onClick={() => setFilter('fundraising')} variant={filter === 'fundraising' ? 'primary' : 'outline'} size="sm">Gọi Vốn</Button>
        <Button onClick={() => setFilter('businessModel')} variant={filter === 'businessModel' ? 'primary' : 'outline'} size="sm">Mô Hình Kinh Doanh</Button>
      </div>
      
      {filteredItems.length === 0 && <p className="text-secondary-600">Không có mục nào trong danh mục này.</p>}

      <ul className="space-y-3">
        {filteredItems.map(item => (
          <li
            key={item.id}
            className={`flex items-center justify-between p-3 rounded-md transition-colors ${
              item.completed ? 'bg-green-50' : 'bg-secondary-50 hover:bg-secondary-100'
            }`}
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                id={`checklist-${item.id}`}
                checked={item.completed}
                onChange={() => toggleComplete(item.id)}
                className="h-5 w-5 text-primary-600 border-secondary-300 rounded focus:ring-primary-500 mr-3 cursor-pointer"
              />
              <label 
                htmlFor={`checklist-${item.id}`} 
                className={`text-sm ${item.completed ? 'line-through text-secondary-500' : 'text-secondary-800'} cursor-pointer`}
              >
                {item.text}
              </label>
            </div>
            {item.completed && <CheckCircleIcon className="h-5 w-5 text-green-500" />}
          </li>
        ))}
      </ul>
      <div className="mt-6 pt-4 border-t">
        <Button onClick={handleGetAISuggestion} isLoading={suggestionLoading} size="sm" variant="secondary">
          <SparklesIcon className="h-4 w-4 mr-2" />
          Nhận gợi ý từ AI
        </Button>
        {suggestionLoading && <p className="text-sm text-secondary-600 mt-2">AI đang suy nghĩ...</p>}
        {aiSuggestion && !suggestionLoading && (
          <div className="mt-3 p-3 bg-primary-50 border border-primary-200 rounded-md">
            <h4 className="text-sm font-semibold text-primary-700">Gợi ý từ AI:</h4>
            <p className="text-sm text-primary-600">{aiSuggestion}</p>
          </div>
        )}
        <p className="text-xs text-secondary-500 mt-3">
          Các mục checklist được tự động cập nhật dựa trên tương tác với AI Agents (tính năng mô phỏng).
        </p>
      </div>
    </Card>
  );
};

export default ChecklistSection;
    