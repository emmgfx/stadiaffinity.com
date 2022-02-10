// if Vercel prod deployment, then use main domain; else use temporary domain unless you're on dev
export const DOMAIN = process.env.NEXT_PUBLIC_VERCEL_URL
  ? process.env.NEXT_PUBLIC_VERCEL_URL
  : process.env.NEXT_PUBLIC_AUTH_REDIRECT_TO;
