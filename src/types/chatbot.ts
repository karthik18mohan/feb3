export type ChatbotNodeId = string;

export type ChatbotInputType = "text" | "email" | "multiline";

export type ChatbotMessageAuthor = "bot" | "user";

export type ChatbotLinkAction = {
  type: "link";
  href: string;
};

export type ChatbotFlowAction = {
  type: "node";
  nextNodeId: ChatbotNodeId;
};

export type ChatbotAction = ChatbotFlowAction | ChatbotLinkAction;

export type ChatbotOption = {
  label: string;
  action: ChatbotAction;
};

export type ChatbotInputConfig = {
  type: ChatbotInputType;
  placeholder: string;
  submitLabel: string;
  nextNodeId: ChatbotNodeId;
};

export type ChatbotCta = {
  message: string;
  buttons: ChatbotOption[];
};

export type ChatbotNode = {
  id: ChatbotNodeId;
  message: string;
  options?: ChatbotOption[];
  input?: ChatbotInputConfig;
  cta?: ChatbotCta;
};

export type ChatbotFlow = {
  startNodeId: ChatbotNodeId;
  nodes: Record<ChatbotNodeId, ChatbotNode>;
};

export type ChatMessage = {
  id: string;
  author: ChatbotMessageAuthor;
  text: string;
};
