# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Configure the backend by specifying a port.  Add `PORT=3000` (or your
   preferred value) to `.env.local` or export it in your shell.
4. Start the Express server:
   `npm run server`
5. In another terminal, start the frontend:
   `npm run dev`
   
   You can also use a single script that launches both processes if provided
   (for example `npm run start`).
