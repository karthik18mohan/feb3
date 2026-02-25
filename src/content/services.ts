export interface ServiceSubsection {
  title: string;
  offerings: string[];
}

export interface ServiceDetail {
  id: string;
  title: string;
  intro: string;
  subsections?: ServiceSubsection[];
  offerings?: string[];
}

export const servicesData: ServiceDetail[] = [
  {
    id: "audit-assurance",
    title: "Audit & Assurance",
    intro: "Every engagement at Nathan & Co. is thoughtfully customized to meet client specific business requirements. Our Leadership Team remain closely involved at every stage, ensuring impactful, timely, and value-driven outcomes.",
    offerings: [
      "Statutory Audit",
      "Internal Audit",
      "Process Audit",
      "Concurrent Audit",
      "Revenue Audit",
      "Forensic Audit",
      "Stock Audit",
      "Asset Audit",
      "Management Audit",
      "Information System Audit"
    ]
  },
  {
    id: "taxation-compliance",
    title: "Taxation & Compliance",
    intro: "Our Regulatory and Compliance services are crafted to assist businesses meet their legal and reporting obligations with accuracy, timeliness, and integrity. Every engagement is executed in complete alignment with applicable laws, regulations, and professional standards, ensuring complete compliance with ethical and statutory requirements. Through a robust compliance-driven approach, we support organizations in mitigating risks and maintaining the highest levels of governance.",
    subsections: [
      {
        title: "Income Tax & International Taxation",
        offerings: [
          "Tax Planning and Advisory",
          "Compliance Review",
          "Assistance in filing Forms and Returns",
          "Representations before relevant Authority"
        ]
      },
      {
        title: "GST & Other Indirect Taxation",
        offerings: [
          "Tax Registration",
          "Tax Planning and Advisory",
          "Assistance in Filing Forms and Returns",
          "Compliance Review",
          "Representations before relevant Authority"
        ]
      }
    ]
  },
  {
    id: "corporate-allied-laws",
    title: "Corporate & Allied Laws",
    intro: "At our Corporate & Allied Laws desk, we deliver comprehensive end-to-end legal and secretarial solutions—right from entity incorporation to restructuring and final exit—across companies, LLPs, trusts, and joint ventures. Our practice encompasses a wide spectrum of corporate governance, secretarial compliance, and regulatory advisory services, executed with uncompromising integrity, independence, and adherence to statutory standards. We work as your strategic partner to simplify regulatory complexity, mitigate compliance risks, and enable sustainable, long-term growth.",
    offerings: [
      "Consultancy in Corporate Governance",
      "Advice on Compliance filing and adherence to Secretarial Standards",
      "Representations before ROC",
      "Capital structuring, founders' arrangement, and shareholders' agreements",
      "Assisting in setting up LLP and Partnerships",
      "Filing of Foreign Liabilities and Assets with RBI",
      "Advisory on structuring Inbound and Outbound investment (FDI and ODI)",
      "Reporting on FDI and ODI investments",
      "External Commercial Borrowing (ECB) Compliance",
      "IPO advisory & readiness"
    ]
  },
  {
    id: "accounting-bookkeeping",
    title: "Accounting & Bookkeeping Outsourcing",
    intro: "Empowering businesses with cloud-based accounting, structured record-keeping, and reliable financial reporting — executed with accuracy, confidentiality, and strict adherence to professional standards and applicable Laws.",
    offerings: [
      "IFRS / USGAAP / IND-AS compliant bookkeeping",
      "Internal Financial control to suit business practices",
      "Liaison with Customer, Vendor, Banker & other Stakeholders",
      "Compliance of Various Statutes (PF/ESI/Gratuity/GST/TDS/Corporate Governance/FLA)"
    ]
  },
  {
    id: "financial-planning-analysis",
    title: "Financial Planning & Analysis (FP&A)",
    intro: "Structured Financial Planning and Performance Analysis enhanced with customized dashboards — transforming data into actionable insights that drive informed decisions, calculated risk management, and sustainable business growth.",
    offerings: [
      "Budgets & Forecasts",
      "Financial Analysis & Reporting",
      "Performance Monitoring including suitable enhancement",
      "Strategic Planning Support",
      "Decision Support & Data Visualization"
    ]
  },
  {
    id: "virtual-cfo",
    title: "Virtual CFO Services",
    intro: "Providing Strategic Financial Management through effective planning, insightful analysis, and diligent oversight — supporting businesses make informed, timely decisions while fostering sustainable financial discipline and long-term development.",
    offerings: [
      "Cash Flow Analysis & Planning",
      "Working Capital Management",
      "Developing Financial Strategy",
      "Monitoring Financial health & Corporate goals / KPIs",
      "Capital Structuring / Restructuring",
      "Risk Management & Advisory",
      "Financial Reporting & Compliance"
    ]
  },
  {
    id: "esg-blockchain-accounting",
    title: "ESG & Blockchain Accounting",
    intro: "Our ESG & Blockchain Accounting solutions are designed around each client’s sustainability priorities and evolving digital asset structures. Senior leadership provides hands-on oversight throughout the engagement to ensure precision, governance, and regulatory confidence. This approach delivers clear, credible insights that drive compliance, accountability, and long-term value creation.",
    offerings: [
      "Setting up ESG Goals",
      "Monitoring ESG Strategy",
      "Reporting & Compliances",
      "ESG Assurance",
      "Block chain - Crypto Accounting",
      "Ledger reconciliations",
      "Tax structuring",
      "Reporting & Compliances"
    ]
  },
  {
    id: "erp-process-roadmap",
    title: "ERP & Process Roadmap",
    intro: "Our ERP & Process Roadmap services are structured to align technology, operations, and business strategy for scalable growth. Leadership oversight ensures disciplined execution, seamless integration, and informed decision-making at every phase. The outcome is a future-ready operating model that improves efficiency, control, and enterprise-wide performance.",
    offerings: [
      "Translating business requirements for ERP readiness",
      "Process Mapping & Optimization",
      "ERP Setup & Go-Live",
      "User Training and SOP",
      "Compliance & Reporting",
      "Monitor & Control Risk"
    ]
  },
  {
    id: "other-services",
    title: "Other Services",
    intro: "Integrated financial, corporate, and strategic advisory — delivering end-to-end solutions for startups, MSMEs, M&A, collaborations, valuations, forensic investigations, ERP and IND AS implementations, and financial restructuring, enabling businesses to grow, transform, and create sustained value.",
    offerings: [
      "End-to-end support for Startup & MSME",
      "Forensic audit & Investigation",
      "Valuation & Due Diligence review",
      "Corporate Finance & Fundraising Avenues",
      "Financial Reconstruction, revival & rehabilitation",
      "Acquisition, Amalgamations & Mergers",
      "Collaborations / Joint Ventures",
      "ERP Implementations",
      "IND AS implementations"
    ]
  }
];
