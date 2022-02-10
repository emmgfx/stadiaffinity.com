// If is running on Vercel, use his url.
export const DOMAIN = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : process.env.NEXT_PUBLIC_AUTH_REDIRECT_TO;
