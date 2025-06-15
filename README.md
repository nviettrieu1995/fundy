# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

## Run Locally

**Prerequisites:**  Node.js and a running MongoDB instance


1. Install dependencies:
   `npm install`
2. Copy `.env.example` to `.env` and update `MONGODB_URI` and `JWT_SECRET`.
3. Set the `GEMINI_API_KEY` and `VITE_API_URL` in `.env.local`.
4. Start the API server in another terminal:
   `node server/server.js`
5. Run the app:
   `npm run dev`
