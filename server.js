import express from 'express';
import cors from 'cors';
import Database from 'better-sqlite3';
import bcrypt from 'bcryptjs';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// SQLite database setup for persistent data
const db = new Database('fundy.db');

db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  name TEXT,
  email TEXT UNIQUE,
  password TEXT,
  credits INTEGER,
  membership TEXT,
  membershipPlanName TEXT,
  membershipRoleType TEXT,
  isAdmin INTEGER,
  isWorker INTEGER,
  phone TEXT
);
`);

// seed initial users if table is empty
const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get().count;
if (userCount === 0) {
  const seedUsers = [
    {
      id: 'user-demo-regular',
      email: 'user@fundy.com',
      name: 'Demo User',
      password: bcrypt.hashSync('123456', 10),
      credits: 100,
      membership: 'Free',
      membershipPlanName: 'Miễn Phí',
      membershipRoleType: 'user',
      isAdmin: 0,
      isWorker: 0,
      phone: '0900123456'
    },
    {
      id: 'user-admin-main',
      email: 'admin@fundy.com',
      name: 'Admin User',
      password: bcrypt.hashSync('123456', 10),
      credits: 9999,
      membership: 'Professional',
      membershipPlanName: 'Chuyên Nghiệp (User)',
      membershipRoleType: 'admin',
      isAdmin: 1,
      isWorker: 0,
      phone: '0987654321'
    },
    {
      id: 'user-worker-demo',
      email: 'worker@fundy.com',
      name: 'Demo Worker',
      password: bcrypt.hashSync('123456', 10),
      credits: 50,
      membership: 'Free',
      membershipPlanName: 'Nâng Cao (Worker)',
      membershipRoleType: 'worker',
      isAdmin: 0,
      isWorker: 1,
      phone: '0912987654'
    }
  ];
  const insert = db.prepare(`INSERT INTO users (id,name,email,password,credits,membership,membershipPlanName,membershipRoleType,isAdmin,isWorker,phone) VALUES (@id,@name,@email,@password,@credits,@membership,@membershipPlanName,@membershipRoleType,@isAdmin,@isWorker,@phone)`);
  const insertMany = db.transaction((users) => {
    for (const u of users) insert.run(u);
  });
  insertMany(seedUsers);
}

function withoutPassword(user) {
  const { password, ...rest } = user;
  return { ...rest };
}

// static data for other features
let checklistItems = [
  { id: 'fund1', text: 'Prepare Pitch Deck', completed: true, category: 'fundraising' },
  { id: 'fund2', text: 'Identify Potential Investors', completed: false, category: 'fundraising' },
  { id: 'fund3', text: 'Practice Pitch', completed: false, category: 'fundraising' },
  { id: 'bm1', text: 'Define Value Proposition', completed: true, category: 'businessModel' },
  { id: 'bm2', text: 'Analyze Target Market', completed: true, category: 'businessModel' },
  { id: 'bm3', text: 'Develop Revenue Streams', completed: false, category: 'businessModel' }
];

const guidelineData = {
  businessModel: [
    { title: '1. Customer Segments', points: ['Who are your most important customers?', 'What are their archetypes?'] },
    { title: '2. Value Propositions', points: ['What value do you deliver?', 'Which customer problem are you solving?'] },
    { title: '3. Channels', points: ['How do you reach your customers?', 'Which channels are most cost-efficient?'] },
    { title: '4. Customer Relationships', points: ['What type of relationship does each segment expect?', 'How do you maintain them?'] },
    { title: '5. Revenue Streams', points: ['For what value are customers willing to pay?', 'How do they currently pay?'] }
  ],
  fundraising: [
    { title: '1. Executive Summary', points: ['Company purpose', 'Problem being solved', 'Solution'] },
    { title: '2. Team', points: ['Key team members and expertise', 'Advisory board'] },
    { title: '3. Market Analysis', points: ['Market size and growth potential', 'Target audience'] },
    { title: '4. Financial Projections', points: ['3-5 year forecast', 'Key assumptions'] },
    { title: '5. Funding Request', points: ['Amount sought', 'Use of funds'] }
  ]
};

let talentProfiles = {
  suitable: [
    { id: 'talent1', name: 'Alice Wonderland', role: 'Frontend Developer', matchScore: 92 },
    { id: 'talent2', name: 'Bob The Builder', role: 'Project Manager', matchScore: 88 }
  ],
  invited: [
    { id: 'talent3', name: 'Charlie Brown', role: 'UX Designer', matchScore: 95 }
  ],
  saved: [
    { id: 'talent4', name: 'Diana Prince', role: 'Marketing Lead', matchScore: 90 }
  ]
};

let legalDocuments = [
  { id: 'legal1', name: 'NDA_Template_v1.docx', type: 'NDA', uploadDate: '2024-07-01', score: 85, issues: ['Clause 3.2 unclear on duration'] },
  { id: 'legal2', name: 'ServiceAgreement_ClientX.pdf', type: 'Service Agreement', uploadDate: '2024-06-15', score: 92, issues: [] }
];

let chatHistory = [
  { id: 'msg1', sender: 'ai', text: 'Hello! How can I assist you with your business today?', timestamp: new Date(Date.now() - 60000 * 5) },
  { id: 'msg2', sender: 'user', text: 'I need help refining my business model.', timestamp: new Date(Date.now() - 60000 * 4) },
  { id: 'msg3', sender: 'ai', text: "Great! Let's start with your value proposition. Can you describe it to me?", timestamp: new Date(Date.now() - 60000 * 3) }
];

let generatedCodes = [
  { id: 'code_001', code: 'PROMO2024', type: 'coupon', details: '15% off first month', isUsed: false, createdAt: new Date(Date.now() - 86400000 * 5) },
  { id: 'code_002', code: 'ADVFREE01', type: 'membership', details: 'Advanced Plan - 1 Month Free', isUsed: true, createdAt: new Date(Date.now() - 86400000 * 10) },
  { id: 'code_003', code: 'SAVEBIG10', type: 'coupon', details: '10 USD off', isUsed: false, createdAt: new Date(Date.now() - 86400000 * 2) }
];

const CREDIT_PRICE_VND = 240;

app.get('/api/checklist', (_req, res) => {
  res.json(checklistItems);
});

app.get('/api/guidelines', (_req, res) => {
  res.json(guidelineData);
});

app.get('/api/talent-profiles', (_req, res) => {
  res.json(talentProfiles);
});

app.get('/api/legal-documents', (_req, res) => {
  res.json(legalDocuments);
});

app.get('/api/chat-history', (_req, res) => {
  res.json(chatHistory);
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  if (user && bcrypt.compareSync(password, user.password)) {
    res.json(withoutPassword(user));
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  const existing = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  if (existing) {
    return res.status(400).json({ message: 'User already exists' });
  }
  const newUser = {
    id: `user_${Date.now()}`,
    name,
    email,
    password: bcrypt.hashSync(password || '123456', 10),
    credits: 5,
    membership: 'Free',
    membershipPlanName: 'Miễn Phí',
    membershipRoleType: 'user',
    isAdmin: 0,
    isWorker: 0,
    phone: ''
  };
  db.prepare(`INSERT INTO users (id,name,email,password,credits,membership,membershipPlanName,membershipRoleType,isAdmin,isWorker,phone) VALUES (@id,@name,@email,@password,@credits,@membership,@membershipPlanName,@membershipRoleType,@isAdmin,@isWorker,@phone)`).run(newUser);
  res.json(withoutPassword(newUser));
});

app.post('/api/auth/logout', (_req, res) => {
  res.status(204).end();
});

app.get('/api/admin/overview', (_req, res) => {
  const users = db.prepare('SELECT * FROM users').all();
  const totalActiveUsers = users.length;
  const totalCreditsUsed = users.reduce((sum, u) => sum + (u.credits < 500 ? (500 - u.credits) : 0), 0) + 5000;
  const totalRevenueFromCredits = totalCreditsUsed * CREDIT_PRICE_VND * 0.7;
  const totalRevenueFromMemberships = users.filter(u => u.membership !== 'Free').length * 1000000;
  const recentChatSnippets = chatHistory.slice(-2).map(m => ({ user: 'sample@fundy.com', snippet: m.text, timestamp: m.timestamp }));
  const aiSuggestions = [
    'Consider adding a tutorial for new users on the checklist feature.',
    'Monitor chat topics to identify common user pain points.',
    'Offer a discount for annual membership subscriptions.'
  ];
  res.json({ totalActiveUsers, totalCreditsUsed, totalRevenueFromCredits, totalRevenueFromMemberships, recentChatSnippets, aiSuggestions });
});

app.get('/api/admin/users', (_req, res) => {
  const users = db.prepare('SELECT * FROM users').all().map(withoutPassword);
  res.json(users);
});

app.put('/api/admin/users/:id', (req, res) => {
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.params.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  const updates = { ...user, ...req.body };
  if (updates.password) {
    updates.password = bcrypt.hashSync(updates.password, 10);
  }
  db.prepare(`UPDATE users SET name=@name,email=@email,password=@password,credits=@credits,membership=@membership,membershipPlanName=@membershipPlanName,membershipRoleType=@membershipRoleType,isAdmin=@isAdmin,isWorker=@isWorker,phone=@phone WHERE id=@id`).run(updates);
  const updated = db.prepare('SELECT * FROM users WHERE id = ?').get(req.params.id);
  res.json(withoutPassword(updated));
});

app.delete('/api/admin/users/:id', (req, res) => {
  const info = db.prepare('DELETE FROM users WHERE id = ?').run(req.params.id);
  res.json({ success: info.changes > 0 });
});

app.get('/api/admin/generated-codes', (_req, res) => {
  res.json(generatedCodes);
});

app.post('/api/admin/generated-codes', (req, res) => {
  const code = { id: `code_${Date.now()}`, ...req.body, createdAt: new Date() };
  generatedCodes.unshift(code);
  res.json(code);
});

app.get('/api/admin/credit-price', (_req, res) => {
  res.json({ price: CREDIT_PRICE_VND });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

