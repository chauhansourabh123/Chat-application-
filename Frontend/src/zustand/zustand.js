import { create } from "zustand";

const useStore = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
  messages: [],
  setMessages: (messages) => set((state) => ({
    messages: Array.isArray(messages) ? messages : [...state.messages, messages]
  })),
}));

export default useStore;
