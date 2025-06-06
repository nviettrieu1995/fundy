import { UserMembershipType, WorkerMembershipType } from "./types";

export const APP_NAME = "Fundy"; // Updated App Name
export const DEFAULT_AVATAR_URL = "https://picsum.photos/200";

export const SPARK_AGENT_CHAT_URL = "https://chatbot.sparkagentai.com?t=undefined"; // As per user spec
export const ELEVENLABS_AGENT_ID = "agent_01jwjv32gqemxrg9pfepcemjtf";

export const BANK_DETAILS = {
  bankName: "ACB",
  accountName: "Nguyễn Việt Triều",
  accountNumber: "1155158",
};

export const CREDIT_PRICE_VND = 240; // 1 credit = 240 VND

export const USER_MEMBERSHIP_PLANS = {
  [UserMembershipType.Free]: { 
    name: "Miễn Phí",
    price: 0,
    features: [
      "5 phút AI trò chuyện điện thoại",
      "20 lượt chat tự động qua app/website",
      "Truy cập các tính năng cơ bản"
    ],
  },
  [UserMembershipType.Advanced]: {
    name: "Nâng Cao (User)",
    price: 1500000,
    features: [
      "100 phút AI trò chuyện điện thoại",
      "500 lượt chat tự động qua app/website (≈ 80-100 tin nhắn/ngày)",
      "Hỗ trợ xây dựng Mô Hình Kinh Doanh",
      "Hỗ trợ chuẩn bị Gọi Vốn"
    ],
  },
  [UserMembershipType.Professional]: {
    name: "Chuyên Nghiệp (User)",
    price: 15000000,
    features: [
      "1,200 phút AI trò chuyện điện thoại (≈ 20-25 cuộc gọi/ngày, full tháng)",
      "6,000 lượt chat tự động (≈ 200 tin nhắn/ngày)",
      "Tất cả tính năng của gói Nâng Cao",
      "Tư vấn Pháp Lý cơ bản qua AI",
      "Hỗ trợ Tìm Nhân Tài"
    ],
  },
};

export const WORKER_MEMBERSHIP_PLANS = {
  [WorkerMembershipType.WorkerAdvanced]: {
    key: WorkerMembershipType.WorkerAdvanced,
    name: "Nâng Cao (Worker)",
    price: 599000,
    features: [
      "Học Chứng Chỉ: 2 lớp online/month",
      "Theo dõi tiến độ học",
      "5 chứng chỉ miễn phí (PDF có xác thực)",
      "Thông tin cơ bản công khai",
      "Điểm Trust Score công khai",
    ],
  },
  [WorkerMembershipType.WorkerProfessional]: {
    key: WorkerMembershipType.WorkerProfessional,
    name: "Chuyên Nghiệp (Worker)",
    price: 1599000, 
    features: [
      "Học Chứng Chỉ: Unlimited online classes",
      "System tự đề xuất lộ trình học qua AI",
      "Giấy xác minh từ viet-kultura.com",
      "Xem không giới hạn về công ty",
      "Full info công ty: ESOP/ISOP, cap table",
      "Dữ liệu gọi vốn real-time + dự đoán",
      "AI Analysis",
    ],
  },
};


export const MOCK_USER_EMAIL = "user@fundy.com"; // Updated domain
export const MOCK_USER_PASSWORD = "123456";
export const MOCK_WORKER_EMAIL = "worker@fundy.com"; // Updated domain
export const MOCK_WORKER_PASSWORD = "123456";
export const MOCK_ADMIN_EMAIL = "admin@fundy.com"; // Updated domain
export const MOCK_ADMIN_PASSWORD = "123456";

// Constants for localStorage keys
export const ONBOARDING_COMPLETED_KEY = 'fundyOnboardingComplete';
export const PRIVACY_ACCEPTED_KEY = 'fundyPrivacyAccepted';

// Marketing Page Content (Example - can be expanded)
export const FUNDY_TAGLINE = "Giải pháp AI Toàn Diện Cho Startup và Doanh Nghiệp";
export const FUNDY_BENEFITS = [
    { title: "Tiết Kiệm Thời Gian", description: "Tự động hóa quy trình, giảm 60% thời gian cho các tác vụ thủ công.", icon: "ClockIcon" },
    { title: "Tăng Hiệu Quả", description: "Cải thiện 80% hiệu suất làm việc với sự hỗ trợ của AI thông minh.", icon: "TrendingUpIcon" },
    { title: "Quyết Định Chính Xác", description: "Dữ liệu và phân tích sâu sắc giúp bạn đưa ra quyết định tốt hơn.", icon: "LightBulbIcon" },
    { title: "Phát Triển Bền Vững", description: "Xây dựng nền tảng vững chắc cho sự tăng trưởng dài hạn của doanh nghiệp.", icon: "AcademicCapIcon" }
];
export const FUNDY_PRODUCT_FEATURES = {
    businessModel: { name: "Xây Dựng Mô Hình Kinh Doanh", description: "Fundy AI giúp bạn phân tích và hoàn thiện mô hình kinh doanh một cách hiệu quả." },
    fundraising: { name: "Hỗ Trợ Gọi Vốn", description: "Chuẩn bị hồ sơ, pitch deck và kết nối với nhà đầu tư tiềm năng." },
    legalConsulting: { name: "Tư Vấn Pháp Lý AI", description: "Phân tích tài liệu pháp lý, phát hiện rủi ro và đề xuất giải pháp." },
    talentMatching: { name: "Tìm Kiếm Nhân Tài", description: "Kết nối doanh nghiệp với những ứng viên tài năng phù hợp nhất." }
};

export const MOCK_INVOICES = [
    { id: "INV001", date: "2024-07-01", amount: 1500000, status: "Paid", description: "Gói Nâng Cao (User) - Tháng 7" },
    { id: "INV002", date: "2024-06-15", amount: 24000, status: "Paid", description: "Mua 100 Credits" },
    { id: "INV003", date: "2024-06-01", amount: 1500000, status: "Paid", description: "Gói Nâng Cao (User) - Tháng 6" },
];

export const MOCK_NOTIFICATIONS = [
    { id: "NOTIF001", message: "Gói Miễn Phí của bạn sẽ hết hạn sau 3 ngày. Nâng cấp ngay để không gián đoạn dịch vụ!", type: "warning", date: new Date(Date.now() - 86400000 * 2).toISOString() },
    { id: "NOTIF002", message: "Chào mừng bạn đến với Fundy! Hãy khám phá các tính năng tuyệt vời.", type: "info", date: new Date(Date.now() - 86400000 * 5).toISOString() },
    { id: "NOTIF003", message: "Cập nhật chính sách bảo mật mới. Vui lòng xem chi tiết.", type: "info", date: new Date(Date.now() - 86400000 * 10).toISOString() },
];

export const MOCK_TRANSACTION_HISTORY = [
    { id: "TRX001", date: "2024-07-01", description: "Thanh toán gói Nâng Cao (User)", amount: -1500000, type: "membership" },
    { id: "TRX002", date: "2024-06-15", description: "Nạp 100 Credits", amount: -24000, type: "credit" },
    { id: "TRX003", date: "2024-06-10", description: "Sử dụng 20 Credits cho Tư Vấn Pháp Lý", amount: 0, type: "usage" },
];

export const FUNDY_CONTACT_EMAIL = "contact@fundy.com";
export const FUNDY_PHONE_NUMBER = "+84 123 456 789";
export const FUNDY_ADDRESS = "123 Đường ABC, Quận XYZ, TP. Hồ Chí Minh";
