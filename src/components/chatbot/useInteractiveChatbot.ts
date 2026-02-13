"use client";

import { useMemo, useState } from "react";
import { caFirmFlows } from "../../data/chatbot/caFirmFlows";
import { ChatMessage, ChatbotNode, ChatbotOption } from "../../types/chatbot";

const createId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const userInputMask = (value: string, shouldMask: boolean) => {
  if (!shouldMask) return value;
  return value.length > 3 ? `${value.slice(0, 3)}***` : "***";
};

const initialNode = caFirmFlows.nodes[caFirmFlows.startNodeId];

export const useInteractiveChatbot = () => {
  const [currentNodeId, setCurrentNodeId] = useState(initialNode.id);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: createId(), author: "bot", text: initialNode.message },
  ]);
  const [nodeTrail, setNodeTrail] = useState<string[]>([initialNode.id]);

  const currentNode = caFirmFlows.nodes[currentNodeId];

  const pushBotNode = (node: ChatbotNode) => {
    setCurrentNodeId(node.id);
    setNodeTrail((prev) => [...prev, node.id]);
    setMessages((prev) => [...prev, { id: createId(), author: "bot", text: node.message }]);
  };

  const onSelectOption = (option: ChatbotOption) => {
    setMessages((prev) => [...prev, { id: createId(), author: "user", text: option.label }]);

    if (option.action.type === "link") {
      window.open(option.action.href, "_blank", "noopener,noreferrer");
      return;
    }

    const nextNode = caFirmFlows.nodes[option.action.nextNodeId];
    if (!nextNode) return;
    pushBotNode(nextNode);
  };

  const onSubmitInput = (value: string) => {
    if (!currentNode.input) return;
    const trimmed = value.trim();
    if (!trimmed) return;

    const shouldMask = currentNode.input.type === "email";

    setMessages((prev) => [
      ...prev,
      { id: createId(), author: "user", text: userInputMask(trimmed, shouldMask) },
    ]);

    const nextNode = caFirmFlows.nodes[currentNode.input.nextNodeId];
    if (!nextNode) return;
    pushBotNode(nextNode);
  };

  const goHome = () => {
    setCurrentNodeId(initialNode.id);
    setNodeTrail([initialNode.id]);
    setMessages([{ id: createId(), author: "bot", text: initialNode.message }]);
  };

  const goBack = () => {
    if (nodeTrail.length < 2) return;

    const updatedTrail = nodeTrail.slice(0, -1);
    const prevNodeId = updatedTrail[updatedTrail.length - 1];
    const prevNode = caFirmFlows.nodes[prevNodeId];
    if (!prevNode) return;

    setNodeTrail(updatedTrail);
    setCurrentNodeId(prevNodeId);

    const lastBotIndex = [...messages]
      .map((message, index) => ({ message, index }))
      .filter((entry) => entry.message.author === "bot")
      .slice(0, -1)
      .pop()?.index;

    if (lastBotIndex === undefined) {
      setMessages([{ id: createId(), author: "bot", text: initialNode.message }]);
      return;
    }

    setMessages(messages.slice(0, lastBotIndex + 1));
  };

  const state = useMemo(
    () => ({
      messages,
      currentNode,
      canGoBack: nodeTrail.length > 1,
    }),
    [messages, currentNode, nodeTrail.length]
  );

  return {
    ...state,
    onSelectOption,
    onSubmitInput,
    goHome,
    goBack,
    restart: goHome,
  };
};
