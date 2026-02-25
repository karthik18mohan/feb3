import { ChatbotFlow } from "../../types/chatbot";

export const caFirmFlows: ChatbotFlow = {
  startNodeId: "welcome",
  nodes: {
    welcome: {
      id: "welcome",
      message:
        "Welcome to Nathan and co, Chartered Accountants.\nWe offer a range of services to help your business thrive. How can I assist you today?",
      options: [
        { label: "Audit & Assurance", action: { type: "node", nextNodeId: "audit-initial" } },
        { label: "Taxation & Compliance", action: { type: "node", nextNodeId: "tax-initial" } },
        { label: "Corporate & Allied Laws", action: { type: "node", nextNodeId: "corporate-initial" } },
        { label: "Accounting & Bookkeeping", action: { type: "node", nextNodeId: "accounting-initial" } },
        { label: "FP&A", action: { type: "node", nextNodeId: "fpna-initial" } },
        { label: "Virtual CFO", action: { type: "node", nextNodeId: "virtual-cfo-initial" } },
        { label: "ERP and Process Readiness", action: { type: "node", nextNodeId: "erp-initial" } },
        { label: "ESG & Crypto Consultancy", action: { type: "node", nextNodeId: "esg-initial" } },
        { label: "Other Areas", action: { type: "node", nextNodeId: "other-areas-input" } },
      ],
    },

    "audit-initial": {
      id: "audit-initial",
      message: "Are you looking for assistance with statutory compliance or internal risk assessment?",
      options: [
        { label: "Statutory", action: { type: "node", nextNodeId: "audit-statutory" } },
        { label: "Internal", action: { type: "node", nextNodeId: "audit-internal" } },
      ],
    },
    "audit-statutory": {
      id: "audit-statutory",
      message: "Is this for a Private Limited Company, an LLP, or a Charitable Trust?",
      options: [
        { label: "Private Limited Company", action: { type: "node", nextNodeId: "audit-cta" } },
        { label: "LLP", action: { type: "node", nextNodeId: "audit-cta" } },
        { label: "Charitable Trust", action: { type: "node", nextNodeId: "audit-cta" } },
      ],
    },
    "audit-internal": {
      id: "audit-internal",
      message: "Are you looking to improve internal controls or perform a specific management audit?",
      options: [
        { label: "Improve internal controls", action: { type: "node", nextNodeId: "audit-cta" } },
        { label: "Specific management audit", action: { type: "node", nextNodeId: "audit-cta" } },
      ],
    },
    "audit-cta": {
      id: "audit-cta",
      message:
        "Would you like to schedule a complimentary preliminary document review with one of our audit specialists?",
      options: [{ label: "Continue", action: { type: "node", nextNodeId: "service-terminal-audit" } }],
    },

    "tax-initial": {
      id: "tax-initial",
      message: "Are you seeking help with Direct Tax (like Income Tax) or Indirect Tax (like GST)?",
      options: [
        { label: "Direct Tax", action: { type: "node", nextNodeId: "tax-direct" } },
        { label: "Indirect Tax", action: { type: "node", nextNodeId: "tax-indirect" } },
      ],
    },
    "tax-direct": {
      id: "tax-direct",
      message:
        "Is this for individual tax filing, corporate tax planning, or international taxation and transfer pricing?",
      options: [
        { label: "Individual tax filing", action: { type: "node", nextNodeId: "tax-cta" } },
        { label: "Corporate tax planning", action: { type: "node", nextNodeId: "tax-cta" } },
        { label: "International taxation & transfer pricing", action: { type: "node", nextNodeId: "tax-cta" } },
      ],
    },
    "tax-indirect": {
      id: "tax-indirect",
      message: "Do you need assistance with monthly returns, annual reconciliation, or representation in a tax dispute?",
      options: [
        { label: "Monthly returns", action: { type: "node", nextNodeId: "tax-cta" } },
        { label: "Annual reconciliation", action: { type: "node", nextNodeId: "tax-cta" } },
        { label: "Representation in a tax dispute", action: { type: "node", nextNodeId: "tax-cta" } },
      ],
    },
    "tax-cta": {
      id: "tax-cta",
      message: "You can check our interactive Tax Calendar for important deadlines or speak directly with a tax expert now.",
      options: [{ label: "Continue", action: { type: "node", nextNodeId: "service-terminal-tax" } }],
    },

    "corporate-initial": {
      id: "corporate-initial",
      message:
        "Are you looking to set up a new business entity or manage ongoing ROC (Registrar of Companies) compliances?",
      options: [
        { label: "New Entity", action: { type: "node", nextNodeId: "corporate-new-entity" } },
        { label: "Ongoing Compliance", action: { type: "node", nextNodeId: "corporate-ongoing" } },
      ],
    },
    "corporate-new-entity": {
      id: "corporate-new-entity",
      message:
        "Are you considering a Private Limited Company, a One-Person Company (OPC), or an LLP registration?",
      options: [
        { label: "Private Limited Company", action: { type: "node", nextNodeId: "corporate-input" } },
        { label: "OPC", action: { type: "node", nextNodeId: "corporate-input" } },
        { label: "LLP registration", action: { type: "node", nextNodeId: "corporate-input" } },
      ],
    },
    "corporate-ongoing": {
      id: "corporate-ongoing",
      message: "Do you need help with annual filings, changes in directorship, or share transfers?",
      options: [
        { label: "Annual filings", action: { type: "node", nextNodeId: "corporate-input" } },
        { label: "Changes in directorship", action: { type: "node", nextNodeId: "corporate-input" } },
        { label: "Share transfers", action: { type: "node", nextNodeId: "corporate-input" } },
      ],
    },
    "corporate-input": {
      id: "corporate-input",
      message: "Let's get you a checklist of the required documents for your corporate filing. Where should I send it?",
      input: {
        type: "email",
        placeholder: "Enter email or phone",
        submitLabel: "Submit",
        nextNodeId: "corporate-confirmation",
      },
    },
    "corporate-confirmation": {
      id: "corporate-confirmation",
      message: "Thanks — our team will share the checklist shortly.",
    },

    "accounting-initial": {
      id: "accounting-initial",
      message: "How do you currently manage your business's accounts?",
      options: [
        { label: "Manually using spreadsheets (e.g., Excel)", action: { type: "node", nextNodeId: "accounting-follow-up" } },
        {
          label: "Using cloud-based software (e.g., QuickBooks, Zoho, Tally)",
          action: { type: "node", nextNodeId: "accounting-follow-up" },
        },
        { label: "We don't have a system in place yet.", action: { type: "node", nextNodeId: "accounting-follow-up" } },
      ],
    },
    "accounting-follow-up": {
      id: "accounting-follow-up",
      message: "What is the average volume of your monthly transactions? (e.g., Less than 50, 50-200, or more than 200)",
      options: [
        { label: "Less than 50", action: { type: "node", nextNodeId: "accounting-cta" } },
        { label: "50-200", action: { type: "node", nextNodeId: "accounting-cta" } },
        { label: "More than 200", action: { type: "node", nextNodeId: "accounting-cta" } },
      ],
    },
    "accounting-cta": {
      id: "accounting-cta",
      message:
        "Based on your needs, we can provide a customized quote for our outsourced bookkeeping services. Would you like to request one?",
      options: [{ label: "Continue", action: { type: "node", nextNodeId: "service-terminal-accounting" } }],
    },

    "fpna-initial": {
      id: "fpna-initial",
      message: "What is your primary goal for financial planning and analysis?",
      options: [
        { label: "Budgeting & Forecasting", action: { type: "node", nextNodeId: "fpna-follow-up" } },
        { label: "Cash Flow Management", action: { type: "node", nextNodeId: "fpna-follow-up" } },
        { label: "Business Performance & Variance Analysis", action: { type: "node", nextNodeId: "fpna-follow-up" } },
      ],
    },
    "fpna-follow-up": {
      id: "fpna-follow-up",
      message: "Would you like to see a sample dashboard of how we track key business performance indicators?",
      options: [
        { label: "Yes", action: { type: "node", nextNodeId: "fpna-cta" } },
        { label: "No", action: { type: "node", nextNodeId: "fpna-cta" } },
      ],
    },
    "fpna-cta": {
      id: "fpna-cta",
      message:
        "We can schedule a brief demo of our FP&A reporting and analytics platform. Does that sound interesting?",
      options: [{ label: "Continue", action: { type: "node", nextNodeId: "service-terminal-fpna" } }],
    },

    "virtual-cfo-initial": {
      id: "virtual-cfo-initial",
      message:
        "Is your business in need of strategic financial leadership without the overhead of a full-time CFO?",
      options: [{ label: "Continue", action: { type: "node", nextNodeId: "virtual-cfo-follow-up" } }],
    },
    "virtual-cfo-follow-up": {
      id: "virtual-cfo-follow-up",
      message:
        "Which of these areas requires the most immediate attention in your business: Fundraising, Strategic Planning, or improving Operational Efficiency?",
      options: [
        { label: "Fundraising", action: { type: "node", nextNodeId: "virtual-cfo-cta" } },
        { label: "Strategic Planning", action: { type: "node", nextNodeId: "virtual-cfo-cta" } },
        { label: "Improving Operational Efficiency", action: { type: "node", nextNodeId: "virtual-cfo-cta" } },
      ],
    },
    "virtual-cfo-cta": {
      id: "virtual-cfo-cta",
      message:
        "Let's schedule a 15-minute, no-obligation discovery call with our lead Virtual CFO consultant.",
      options: [{ label: "Continue", action: { type: "node", nextNodeId: "service-terminal-virtual-cfo" } }],
    },

    "erp-initial": {
      id: "erp-initial",
      message:
        "Are you planning to implement a new ERP system or looking to optimize your existing business processes?",
      options: [
        { label: "ERP Implementation", action: { type: "node", nextNodeId: "erp-implementation" } },
        { label: "Process Optimization", action: { type: "node", nextNodeId: "erp-optimization" } },
      ],
    },
    "erp-implementation": {
      id: "erp-implementation",
      message: "Which ERP system are you considering? (e.g., SAP, Oracle, NetSuite, Tally Prime, Other)",
      options: [
        { label: "SAP", action: { type: "node", nextNodeId: "erp-cta" } },
        { label: "Oracle", action: { type: "node", nextNodeId: "erp-cta" } },
        { label: "NetSuite", action: { type: "node", nextNodeId: "erp-cta" } },
        { label: "Tally Prime", action: { type: "node", nextNodeId: "erp-cta" } },
        { label: "Other", action: { type: "node", nextNodeId: "erp-other-input" } },
      ],
    },
    "erp-other-input": {
      id: "erp-other-input",
      message: "Enter ERP name",
      input: {
        type: "text",
        placeholder: "Enter ERP name",
        submitLabel: "Submit",
        nextNodeId: "erp-cta",
      },
    },
    "erp-optimization": {
      id: "erp-optimization",
      message: "Are you experiencing bottlenecks in your Procurement, Sales, or Inventory management cycles?",
      options: [
        { label: "Procurement", action: { type: "node", nextNodeId: "erp-cta" } },
        { label: "Sales", action: { type: "node", nextNodeId: "erp-cta" } },
        { label: "Inventory management", action: { type: "node", nextNodeId: "erp-cta" } },
      ],
    },
    "erp-cta": {
      id: "erp-cta",
      message: "We have a helpful 'ERP Readiness Checklist' that can guide you. Would you like me to send it to you?",
      options: [
        { label: "Yes", action: { type: "node", nextNodeId: "erp-send-input" } },
        { label: "No", action: { type: "node", nextNodeId: "erp-no-confirmation" } },
      ],
    },
    "erp-send-input": {
      id: "erp-send-input",
      message: "Please share your email or phone.",
      input: {
        type: "email",
        placeholder: "Enter email or phone",
        submitLabel: "Submit",
        nextNodeId: "erp-send-confirmation",
      },
    },
    "erp-send-confirmation": {
      id: "erp-send-confirmation",
      message: "Thanks — our team will share the checklist shortly.",
      options: [{ label: "Continue", action: { type: "node", nextNodeId: "service-terminal-erp" } }],
    },
    "erp-no-confirmation": {
      id: "erp-no-confirmation",
      message: "No problem. Let me know if you'd like it later.",
      options: [{ label: "Continue", action: { type: "node", nextNodeId: "service-terminal-erp" } }],
    },

    "esg-initial": {
      id: "esg-initial",
      message:
        "Are you looking for guidance on ESG (Environmental, Social, and Governance) reporting or seeking Tax and Regulatory advice on Crypto assets?",
      options: [
        { label: "ESG", action: { type: "node", nextNodeId: "esg-path" } },
        { label: "Crypto", action: { type: "node", nextNodeId: "crypto-path" } },
      ],
    },
    "esg-path": {
      id: "esg-path",
      message:
        "Do you need assistance with BRSR (Business Responsibility and Sustainability Reporting) or help in developing a comprehensive sustainability framework?",
      options: [
        { label: "BRSR", action: { type: "node", nextNodeId: "esg-cta" } },
        { label: "Sustainability framework", action: { type: "node", nextNodeId: "esg-cta" } },
      ],
    },
    "crypto-path": {
      id: "crypto-path",
      message:
        "Are you an individual investor or a business that deals with Virtual Digital Assets (VDAs)?",
      options: [
        { label: "Individual investor", action: { type: "node", nextNodeId: "esg-cta" } },
        { label: "Business dealing with VDAs", action: { type: "node", nextNodeId: "esg-cta" } },
      ],
    },
    "esg-cta": {
      id: "esg-cta",
      message:
        "Stay informed with the latest regulatory updates on Crypto and ESG. Would you like to subscribe to our newsletter?",
      options: [
        { label: "Yes", action: { type: "node", nextNodeId: "esg-newsletter-input" } },
        { label: "No", action: { type: "node", nextNodeId: "esg-no-confirmation" } },
      ],
    },
    "esg-newsletter-input": {
      id: "esg-newsletter-input",
      message: "Please share your email.",
      input: {
        type: "email",
        placeholder: "Enter email",
        submitLabel: "Submit",
        nextNodeId: "esg-newsletter-confirmation",
      },
    },
    "esg-newsletter-confirmation": {
      id: "esg-newsletter-confirmation",
      message: "Thanks — you're subscribed for updates.",
      options: [{ label: "Continue", action: { type: "node", nextNodeId: "service-terminal-esg" } }],
    },
    "esg-no-confirmation": {
      id: "esg-no-confirmation",
      message: "Understood. You can subscribe any time.",
      options: [{ label: "Continue", action: { type: "node", nextNodeId: "service-terminal-esg" } }],
    },

    "other-areas-input": {
      id: "other-areas-input",
      message:
        "If your query isn't covered by the options above, please describe the specific service or challenge you need help with.",
      input: {
        type: "multiline",
        placeholder: "Describe your requirement",
        submitLabel: "Submit",
        nextNodeId: "other-areas-confirmation",
      },
    },
    "other-areas-confirmation": {
      id: "other-areas-confirmation",
      message:
        "Thank you for providing the details. Our team will review your request and get back to you within four business hours.",
      options: [{ label: "Continue", action: { type: "node", nextNodeId: "service-terminal-other" } }],
    },

    "service-terminal-audit": {
      id: "service-terminal-audit",
      message: "To help you faster, please share your name and email or phone number.",
    },
    "service-terminal-tax": {
      id: "service-terminal-tax",
      message: "To help you faster, please share your name and email or phone number.",
    },
    "service-terminal-corporate": {
      id: "service-terminal-corporate",
      message: "To help you faster, please share your name and email or phone number.",
    },
    "service-terminal-accounting": {
      id: "service-terminal-accounting",
      message: "To help you faster, please share your name and email or phone number.",
    },
    "service-terminal-fpna": {
      id: "service-terminal-fpna",
      message: "To help you faster, please share your name and email or phone number.",
    },
    "service-terminal-virtual-cfo": {
      id: "service-terminal-virtual-cfo",
      message: "To help you faster, please share your name and email or phone number.",
    },
    "service-terminal-erp": {
      id: "service-terminal-erp",
      message: "To help you faster, please share your name and email or phone number.",
    },
    "service-terminal-esg": {
      id: "service-terminal-esg",
      message: "To help you faster, please share your name and email or phone number.",
    },
    "service-terminal-other": {
      id: "service-terminal-other",
      message: "To help you faster, please share your name and email or phone number.",
    },
  },
};
