import React, { useState } from 'react';
import { APP_NAME, FUNDY_CONTACT_EMAIL, FUNDY_PHONE_NUMBER, FUNDY_ADDRESS } from '../../../constants';
import Button from '../../common/Button';
import Input from '../../common/Input'; // Re-use existing Input component
import { SparklesIcon, PhoneIcon } from '../../common/Icon'; // Removed MailIcon, LocationMarkerIcon

const LocationMarkerIconFC: React.FC<React.SVGProps<SVGSVGElement>> = (props) => ( // Placeholder if not in Icon.tsx
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
);
const MailIconFC: React.FC<React.SVGProps<SVGSVGElement>> = (props) => ( // Placeholder if not in Icon.tsx
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
);


const MarketingContactPage: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitMessage('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.');
    setFormData({ name: '', email: '', subject: '', message: '' }); // Reset form
  };

  return (
    <div className="py-12 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <SparklesIcon className="h-12 w-12 text-primary-600 mx-auto mb-4" />
          <h1 className="text-4xl font-extrabold text-secondary-900 sm:text-5xl">
            Liên Hệ Với {APP_NAME}
          </h1>
          <p className="mt-4 text-xl text-secondary-600 max-w-2xl mx-auto">
            Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Form */}
          <div className="bg-secondary-50 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-secondary-800 mb-6">Gửi Tin Nhắn Cho Chúng Tôi</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input label="Họ và Tên" id="name" name="name" value={formData.name} onChange={handleChange} required />
              <Input label="Email" id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
              <Input label="Chủ đề" id="subject" name="subject" value={formData.subject} onChange={handleChange} required />
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-secondary-700 mb-1">Tin nhắn</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="block w-full px-3 py-2 bg-white text-secondary-800 placeholder-secondary-500 border border-secondary-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
              </div>
              <Button type="submit" variant="primary" className="w-full" isLoading={isSubmitting}>
                Gửi Tin Nhắn
              </Button>
              {submitMessage && <p className="mt-4 text-green-600">{submitMessage}</p>}
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-secondary-800">Thông Tin Liên Hệ</h2>
            <div className="bg-secondary-50 p-6 rounded-lg shadow-md flex items-start space-x-4">
              <MailIconFC className="h-8 w-8 text-primary-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-medium text-secondary-700">Email</h3>
                <a href={`mailto:${FUNDY_CONTACT_EMAIL}`} className="text-primary-600 hover:underline">{FUNDY_CONTACT_EMAIL}</a>
              </div>
            </div>
            <div className="bg-secondary-50 p-6 rounded-lg shadow-md flex items-start space-x-4">
              <PhoneIcon className="h-8 w-8 text-primary-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-medium text-secondary-700">Điện thoại</h3>
                <a href={`tel:${FUNDY_PHONE_NUMBER}`} className="text-primary-600 hover:underline">{FUNDY_PHONE_NUMBER}</a>
              </div>
            </div>
            <div className="bg-secondary-50 p-6 rounded-lg shadow-md flex items-start space-x-4">
              <LocationMarkerIconFC className="h-8 w-8 text-primary-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-medium text-secondary-700">Địa chỉ</h3>
                <p className="text-secondary-600">{FUNDY_ADDRESS}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketingContactPage;