
import React from 'react';
import Card from '../common/Card';
import { SparklesIcon, CogIcon, InformationCircleIcon, CodeBracketIcon } from '../common/Icon';
import { SPARK_AGENT_CHAT_URL, ELEVENLABS_AGENT_ID } from '../../constants';
import Input from '../common/Input';
import Button from '../common/Button';

const AIAgentManagementSection: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card title="Quản Lý Agent AI">
        <div className="p-4">
            <p className="text-secondary-600 mb-4">
                Quản lý cấu hình và theo dõi hiệu suất của các AI Agent tích hợp vào hệ thống.
            </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 border-t">
            <Card title="Cấu Hình Agent Hiện Tại">
                <div className="space-y-3">
                    <div>
                        <h4 className="font-semibold text-secondary-700">SparkAgentAI (Chat Widget)</h4>
                        <p className="text-sm text-secondary-600">URL: <a href={SPARK_AGENT_CHAT_URL} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">{SPARK_AGENT_CHAT_URL}</a></p>
                        <p className="text-xs text-secondary-500">Đây là AI Agent chính cho tư vấn qua chat.</p>
                    </div>
                     <div>
                        <h4 className="font-semibold text-secondary-700">ElevenLabs (Call Widget)</h4>
                        <p className="text-sm text-secondary-600">Agent ID: <span className="font-mono">{ELEVENLABS_AGENT_ID}</span></p>
                        <p className="text-xs text-secondary-500">Đây là AI Agent cho tư vấn qua giọng nói.</p>
                    </div>
                </div>
            </Card>

            <Card title="Cấu Hình Gemini API (Google GenAI)">
                <div className="space-y-3">
                    <Input 
                        label="API Key (process.env.API_KEY)"
                        type="text"
                        value={"********" + (process.env.API_KEY ? process.env.API_KEY.slice(-4) : "NOT SET")} // Show partial key or status
                        disabled
                        className="font-mono"
                    />
                     <p className="text-xs text-secondary-500">
                        API key được lấy từ biến môi trường <code>process.env.API_KEY</code>.
                        Gemini API được sử dụng cho các tính năng gợi ý, phân tích nội bộ.
                    </p>
                    <Input 
                        label="Text Model Mặc Định"
                        type="text"
                        value="gemini-2.5-flash-preview-04-17" // Example, could be from constants
                        disabled
                        className="font-mono"
                    />
                </div>
            </Card>
        </div>

        <div className="p-4 border-t mt-4">
            <h3 className="text-lg font-semibold text-secondary-800 mb-3 flex items-center">
                <CogIcon className="h-5 w-5 mr-2 text-primary-600" /> Tùy Chỉnh Nâng Cao (Đang Phát Triển)
            </h3>
            <div className="space-y-4">
                <div className="p-3 bg-secondary-100 rounded-md">
                    <h4 className="font-medium text-secondary-700">System Prompts & Behavior</h4>
                    <p className="text-sm text-secondary-600">Khu vực này sẽ cho phép tùy chỉnh các "system instruction" để định hướng cách AI Agent trả lời và hành xử trong các tình huống cụ thể (VD: phong cách giao tiếp, vai trò của AI).</p>
                </div>
                 <div className="p-3 bg-secondary-100 rounded-md">
                    <h4 className="font-medium text-secondary-700">Knowledge Base Management</h4>
                    <p className="text-sm text-secondary-600">Tải lên tài liệu, kết nối cơ sở dữ liệu, hoặc cung cấp URLs để mở rộng kiến thức cho AI Agent, giúp Agent trả lời chính xác hơn về các chủ đề chuyên biệt của doanh nghiệp.</p>
                </div>
                <div className="p-3 bg-secondary-100 rounded-md">
                    <h4 className="font-medium text-secondary-700">Agent Performance Analytics</h4>
                    <p className="text-sm text-secondary-600">Theo dõi số liệu về tần suất sử dụng, các chủ đề thường được hỏi, đánh giá của người dùng về Agent để cải thiện chất lượng dịch vụ.</p>
                </div>
            </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md text-blue-700 text-sm flex items-start">
          <InformationCircleIcon className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
          <span>Các tính năng quản lý AI Agent nâng cao đang được phát triển và sẽ sớm được cập nhật. Hiện tại, các cấu hình cơ bản được quản lý thông qua code và biến môi trường.</span>
        </div>
      </Card>
    </div>
  );
};

export default AIAgentManagementSection;
