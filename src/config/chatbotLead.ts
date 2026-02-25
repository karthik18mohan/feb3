const DEFAULT_LEAD_EMAIL = "karthikmohan133@gmail.com";

export const chatbotLeadConfig = {
  leadToEmail: process.env.LEAD_TO_EMAIL ?? DEFAULT_LEAD_EMAIL,
  formSubmitEndpoint: process.env.FORMSUBMIT_ENDPOINT ?? "https://formsubmit.co",
};
