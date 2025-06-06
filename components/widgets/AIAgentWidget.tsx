
import React, { useState } from 'react';
import { SPARK_AGENT_CHAT_URL, ELEVENLABS_AGENT_ID } from '../../constants';
import { ChatBubbleLeftRightIcon, PhoneIcon, CogIcon } from '../common/Icon';

// The global augmentation for 'elevenlabs-convai' has been moved to custom.d.ts

type WidgetType = 'chat' | 'call' | null;

const AIAgentWidget: React.FC = () => {
  const [activeWidget, setActiveWidget] = useState<WidgetType>(null); // 'chat', 'call', or null (closed)
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleWidget = (type: WidgetType) => {
    if (activeWidget === type) {
      setActiveWidget(null); // Close if already active
      setIsMenuOpen(false);
    } else {
      setActiveWidget(type);
      setIsMenuOpen(false); // Close menu when a widget is selected
    }
  };

  const toggleMenu = () => {
    if (isMenuOpen && activeWidget) { // If menu is open and a widget is active, closing menu also closes widget
        setActiveWidget(null);
    }
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <>
      {/* Main Toggle Button */}
      <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 9999 }}>
        <button
          onClick={toggleMenu}
          className="bg-primary-600 text-white p-3 rounded-full shadow-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          aria-label="Toggle AI Assistant Menu"
        >
          <CogIcon className="h-6 w-6" />
        </button>
      </div>

      {/* Widget Menu (appears when CogIcon is clicked) */}
      {isMenuOpen && (
        <div
          style={{ position: 'fixed', bottom: '80px', right: '20px', zIndex: 9998 }}
          className="bg-white rounded-lg shadow-xl p-2 space-y-2 flex flex-col"
        >
          <button
            onClick={() => toggleWidget('chat')}
            className={`flex items-center space-x-2 p-2 rounded-md w-full text-left hover:bg-secondary-100 ${activeWidget === 'chat' ? 'bg-primary-100 text-primary-700' : 'text-secondary-700'}`}
            aria-label="Open chat widget"
          >
            <ChatBubbleLeftRightIcon className="h-5 w-5" />
            <span>Chat</span>
          </button>
          <button
            onClick={() => toggleWidget('call')}
            className={`flex items-center space-x-2 p-2 rounded-md w-full text-left hover:bg-secondary-100 ${activeWidget === 'call' ? 'bg-primary-100 text-primary-700' : 'text-secondary-700'}`}
            aria-label="Open call widget"
          >
            <PhoneIcon className="h-5 w-5" />
            <span>Gọi</span>
          </button>
        </div>
      )}
      
      {/* Chat Widget Container */}
      {activeWidget === 'chat' && (
        <div 
            id="chat-widget" 
            style={{ 
                position: 'fixed', 
                bottom: '20px', 
                right: '20px', 
                width: '360px', 
                height: '500px', 
                zIndex: 9997 
            }}
            className="shadow-2xl rounded-lg overflow-hidden border border-secondary-300"
            role="dialog"
            aria-modal="true"
            aria-label="AI Chat Widget"
        >
          <iframe
            src={SPARK_AGENT_CHAT_URL}
            title="Spark Agent AI Chat"
            style={{ width: '100%', height: '100%', border: 'none' }}
          />
        </div>
      )}

      {/* Call Widget Container */}
      {activeWidget === 'call' && (
         <div 
            id="call-widget" 
            style={{ 
                position: 'fixed', 
                bottom: '20px', 
                right: '20px', 
                width: '360px', /* Adjust as needed for elevenlabs widget */
                height: 'auto', /* Adjust as needed */
                zIndex: 9997 
            }}
            className="bg-white p-4 shadow-2xl rounded-lg border border-secondary-300"
            role="dialog"
            aria-modal="true"
            aria-label="AI Call Widget"
        >
          {/* The custom element, now recognized by TypeScript thanks to the global declaration in custom.d.ts */}
          <elevenlabs-convai agent-id={ELEVENLABS_AGENT_ID}></elevenlabs-convai>
          {/* The ElevenLabs widget might control its own height. Add a min-height if needed. */}
        </div>
      )}
    </>
  );
};

export default AIAgentWidget;
