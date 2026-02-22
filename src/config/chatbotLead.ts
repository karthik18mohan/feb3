export const chatbotLeadConfig = {
  leadToEmail: process.env.LEAD_TO_EMAIL ?? "",
  resendFrom: process.env.RESEND_FROM ?? "noreply@nathanandco.com",
  enableResend: Boolean(process.env.RESEND_API_KEY && process.env.LEAD_TO_EMAIL),
};
