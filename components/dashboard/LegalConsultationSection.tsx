
import React, { useState, useEffect, useCallback } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import LoadingSpinner from '../common/LoadingSpinner';
import { LegalDocument, ChecklistItem } from '../../types';
import { getLegalDocuments } from '../../services/dataService';
import { ArrowUpTrayIcon, CheckCircleIcon, XCircleIcon, InformationCircleIcon, ChatBubbleLeftRightIcon } from '../common/Icon';

const industries = ["Công nghệ thông tin", "Thương mại điện tử", "Sản xuất", "Dịch vụ", "Bất động sản", "Khác"];

const LegalConsultationSection: React.FC = () => {
  const [documents, setDocuments] = useState<LegalDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndustry, setSelectedIndustry] = useState<string>(industries[0]);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<LegalDocument | null>(null);
  const [autoChecklist, setAutoChecklist] = useState<ChecklistItem[]>([]);
  const [chatMessage, setChatMessage] = useState('');

  const fetchDocuments = useCallback(async () => {
    setLoading(true);
    const data = await getLegalDocuments();
    setDocuments(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setUploadedFile(file);
      // Simulate processing and adding to documents list
      const newDoc: LegalDocument = {
        id: `doc-${Date.now()}`,
        name: file.name,
        type: file.type.startsWith('application/pdf') ? 'PDF Document' : (file.name.endsWith('.docx') ? 'Word Document' : 'Image File'),
        uploadDate: new Date().toISOString().split('T')[0],
        // Simulate AI analysis
        score: Math.floor(Math.random() * 30) + 70, // Random score 70-99
        issues: Math.random() > 0.5 ? ["Potential issue with clause X.", "Consider clarifying section Y."] : [],
      };
      setDocuments(prev => [newDoc, ...prev]);
      setSelectedDocument(newDoc);
      generateAutoChecklist(newDoc);
      alert(`Tệp "${file.name}" đã được tải lên và phân tích (mô phỏng).`);
    }
  };

  const generateAutoChecklist = (doc: LegalDocument) => {
    const checklist: ChecklistItem[] = [];
    if (doc.score && doc.score >= 90 && (!doc.issues || doc.issues.length === 0)) {
      checklist.push({ id: 'lc1', text: 'Tài liệu đạt điểm cao, không có lỗ hổng nghiêm trọng.', completed: true, category: 'businessModel' });
      checklist.push({ id: 'lc2', text: 'Xem xét các khuyến nghị (nếu có).', completed: false, category: 'businessModel' });
    } else {
      checklist.push({ id: 'lc1', text: 'Tài liệu có điểm cần cải thiện hoặc có lỗ hổng.', completed: false, category: 'businessModel' });
      if (doc.issues && doc.issues.length > 0) {
        doc.issues.forEach((issue, index) => {
          checklist.push({ id: `lc-issue-${index}`, text: `Giải quyết: ${issue}`, completed: false, category: 'businessModel' });
        });
      }
      checklist.push({ id: 'lc-final', text: 'Tham khảo ý kiến chuyên gia pháp lý.', completed: false, category: 'businessModel' });
    }
    setAutoChecklist(checklist);
  };
  
  const handleDocumentSelect = (doc: LegalDocument) => {
    setSelectedDocument(doc);
    generateAutoChecklist(doc);
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    alert(`AI Chatbot: "Đang xử lý câu hỏi của bạn về '${selectedDocument?.name || 'tài liệu'}': ${chatMessage}" (Mô phỏng)`);
    setChatMessage('');
  };


  if (loading && documents.length === 0) { // Show spinner only on initial load
    return <LoadingSpinner message="Loading legal documents..." />;
  }

  return (
    <Card title="Tư Vấn Pháp Lý">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Column 1: Upload & Filters */}
        <div className="md:col-span-1 space-y-4">
          <div>
            <label htmlFor="industry-select" className="block text-sm font-medium text-secondary-700 mb-1">Chọn ngành nghề:</label>
            <select
              id="industry-select"
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border-secondary-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
            >
              {industries.map(industry => <option key={industry} value={industry}>{industry}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="file-upload" className="cursor-pointer w-full">
                <Button as="span" variant="primary" className="w-full">
                    <ArrowUpTrayIcon className="h-5 w-5 mr-2" /> Tải lên tài liệu
                </Button>
            </label>
            <input id="file-upload" type="file" className="hidden" onChange={handleFileUpload} accept=".docx,.pdf,.jpg,.png" />
            {uploadedFile && <p className="text-xs text-secondary-500 mt-1">Đã chọn: {uploadedFile.name}</p>}
          </div>
          <div className="mt-4">
            <h4 className="text-md font-semibold text-secondary-700 mb-2">Tài liệu đã tải lên:</h4>
            {documents.length === 0 && <p className="text-sm text-secondary-500">Chưa có tài liệu nào.</p>}
            <ul className="space-y-2 max-h-60 overflow-y-auto">
              {documents.map(doc => (
                <li key={doc.id}>
                  <button 
                    onClick={() => handleDocumentSelect(doc)}
                    className={`w-full text-left p-2 rounded-md text-sm ${selectedDocument?.id === doc.id ? 'bg-primary-100 text-primary-700' : 'bg-secondary-50 hover:bg-secondary-100'}`}
                  >
                    {doc.name} <span className="text-xs text-secondary-400">({doc.type})</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Column 2 & 3: Document Details & Chat */}
        <div className="md:col-span-2">
          {!selectedDocument ? (
            <div className="flex items-center justify-center h-full bg-secondary-50 rounded-lg p-8">
              <p className="text-secondary-500">Chọn một tài liệu để xem chi tiết và phân tích.</p>
            </div>
          ) : (
            <Card title={`Chi tiết: ${selectedDocument.name}`} className="bg-white">
              <div className="space-y-3 mb-4">
                <p className="text-sm">Loại: <span className="font-medium">{selectedDocument.type}</span> | Ngày tải lên: <span className="font-medium">{selectedDocument.uploadDate}</span></p>
                <div className="flex items-center">
                  <p className="text-sm mr-2">Điểm đánh giá (Score):</p>
                  <div className="w-full bg-secondary-200 rounded-full h-2.5">
                    <div 
                        className={`h-2.5 rounded-full ${ (selectedDocument.score || 0) >= 85 ? 'bg-green-500' : (selectedDocument.score || 0) >= 60 ? 'bg-yellow-400' : 'bg-red-500'}`} 
                        style={{ width: `${selectedDocument.score || 0}%` }}>
                    </div>
                  </div>
                  <span className="ml-2 text-sm font-bold">{selectedDocument.score || 'N/A'}%</span>
                </div>
                {selectedDocument.issues && selectedDocument.issues.length > 0 && (
                  <div>
                    <h5 className="text-sm font-semibold text-red-600 flex items-center"><XCircleIcon className="h-4 w-4 mr-1"/> Lỗ hổng/Sai phạm:</h5>
                    <ul className="list-disc list-inside text-sm text-red-500 pl-4">
                      {selectedDocument.issues.map((issue, idx) => <li key={idx}>{issue}</li>)}
                    </ul>
                  </div>
                )}
                {(!selectedDocument.issues || selectedDocument.issues.length === 0) && (
                    <p className="text-sm text-green-600 flex items-center"><CheckCircleIcon className="h-4 w-4 mr-1"/> Không phát hiện lỗ hổng/sai phạm nghiêm trọng.</p>
                )}
              </div>

              {autoChecklist.length > 0 && (
                <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                  <h5 className="text-sm font-semibold text-blue-700 flex items-center"><InformationCircleIcon className="h-4 w-4 mr-1"/> Checklist tự động:</h5>
                   <ul className="list-disc list-inside text-sm text-blue-600 pl-4 mt-1">
                      {autoChecklist.map(item => <li key={item.id} className={item.completed ? 'line-through' : ''}>{item.text}</li>)}
                    </ul>
                </div>
              )}

              <div>
                <h5 className="text-sm font-semibold text-secondary-700 mb-1">Agent AI Chatbot Tư Vấn:</h5>
                <form onSubmit={handleChatSubmit} className="flex space-x-2">
                  <input 
                    type="text" 
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    placeholder="Đặt câu hỏi về tài liệu này..." 
                    className="flex-grow p-2 border border-secondary-300 rounded-md text-sm focus:ring-primary-500 focus:border-primary-500"
                  />
                  <Button type="submit" size="md">
                    <ChatBubbleLeftRightIcon className="h-5 w-5" />
                  </Button>
                </form>
                 <p className="text-xs text-secondary-500 mt-1">Chatbot sẽ giúp bạn kiểm tra lại các điều khoản (mô phỏng).</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </Card>
  );
};

export default LegalConsultationSection;
    