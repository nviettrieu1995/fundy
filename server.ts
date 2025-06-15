import express, { Request, Response, NextFunction } from 'express';
import { MOCK_TRANSACTION_HISTORY, MOCK_USER_EMAIL } from './constants.ts';

interface UserCredits {
  [email: string]: number;
}

const userCredits: UserCredits = {
  [MOCK_USER_EMAIL]: 100,
};

/**
 * Middleware to decrement a user's credit balance when accessing protected routes.
 * The user is identified via the `x-user-email` request header. If the user has
 * no remaining credits, the request is rejected with a 403 status code.
 */
const decrementCredits = (req: Request, res: Response, next: NextFunction) => {
  const email = req.header('x-user-email');
  if (!email) {
    return res.status(401).json({ error: 'Missing user email' });
  }

  const current = userCredits[email] ?? 0;
  if (current <= 0) {
    return res.status(403).json({ error: 'Insufficient credits' });
  }

  userCredits[email] = current - 1;
  next();
};

const app = express();
app.use(express.json());

// Endpoint to return payment and credit history for the current user
app.get('/api/transactions', (_req: Request, res: Response) => {
  res.json(MOCK_TRANSACTION_HISTORY);
});

// Example protected endpoint using the credit decrement middleware
app.get('/api/protected', decrementCredits, (req: Request, res: Response) => {
  const email = req.header('x-user-email') as string;
  res.json({ success: true, remainingCredits: userCredits[email] });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
