const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// In-memory "database"
let memberships = [
  {
    id: 'Free',
    key: 'Free',
    name: 'Miễn Phí',
    price: 0,
    features: [
      '5 phút AI trò chuyện điện thoại',
      '20 lượt chat tự động qua app/website',
      'Truy cập các tính năng cơ bản'
    ]
  },
  {
    id: 'Advanced',
    key: 'Advanced',
    name: 'Nâng Cao (User)',
    price: 1500000,
    features: [
      '100 phút AI trò chuyện điện thoại',
      '500 lượt chat tự động qua app/website (≈ 80-100 tin nhắn/ngày)',
      'Hỗ trợ xây dựng Mô Hình Kinh Doanh',
      'Hỗ trợ chuẩn bị Gọi Vốn'
    ]
  },
  {
    id: 'Professional',
    key: 'Professional',
    name: 'Chuyên Nghiệp (User)',
    price: 15000000,
    features: [
      '1,200 phút AI trò chuyện điện thoại (≈ 20-25 cuộc gọi/ngày, full tháng)',
      '6,000 lượt chat tự động (≈ 200 tin nhắn/ngày)',
      'Tất cả tính năng của gói Nâng Cao',
      'Tư vấn Pháp Lý cơ bản qua AI',
      'Hỗ trợ Tìm Nhân Tài'
    ]
  }
];

let users = [
  { id: '1', name: 'Demo User', membership: 'Free' }
];

app.get('/api/memberships', (req, res) => {
  res.json(memberships);
});

app.post('/api/memberships', (req, res) => {
  const newPlan = { id: Date.now().toString(), ...req.body };
  memberships.push(newPlan);
  res.status(201).json(newPlan);
});

app.put('/api/memberships/:id', (req, res) => {
  const idx = memberships.findIndex(m => m.id === req.params.id);
  if (idx === -1) return res.status(404).end();
  memberships[idx] = { ...memberships[idx], ...req.body };
  res.json(memberships[idx]);
});

app.delete('/api/memberships/:id', (req, res) => {
  const idx = memberships.findIndex(m => m.id === req.params.id);
  if (idx === -1) return res.status(404).end();
  memberships.splice(idx, 1);
  res.status(204).end();
});

app.put('/api/users/:id/membership', (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  if (!user) return res.status(404).end();
  const { membership } = req.body;
  user.membership = membership;
  res.json(user);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
