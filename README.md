# Nathan & Co. Chartered Accountants

Premium corporate website built with Next.js App Router, TypeScript, Tailwind CSS, and Framer Motion.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production Build

```bash
npm run build
npm run start
```

## Deploy to Vercel

1. Push this repository to your Git provider.
2. Create a new project in Vercel and import the repository.
3. Keep the default framework preset (Next.js).
4. Deploy — Vercel will run `npm install` and `npm run build` automatically.


## Chatbot callback lead configuration

Set these environment variables in Vercel (or `.env.local`) to enable chatbot callback email notifications:

- `LEAD_TO_EMAIL=your-inbox@example.com`
- `RESEND_API_KEY=re_xxx`
- `RESEND_FROM=noreply@nathanandco.com` (optional, defaults to this value)
