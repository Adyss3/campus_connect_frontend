import React, { createContext, useContext, useState, useEffect } from 'react';

const MessagingContext = createContext();

export const useMessaging = () => useContext(MessagingContext);

// Mock users that are "on the platform" (the logged-in user will be injected separately)
export const MOCK_USERS = [
  { id: 'u2', name: 'Jessica Parker', avatar: 'J', online: true, role: 'Computer Science' },
  { id: 'u3', name: 'Campus IT Helpdesk', avatar: 'IT', online: true, role: 'Support Staff' },
  { id: 'u4', name: 'Mark Thompson', avatar: 'M', online: false, role: 'Mathematics' },
  { id: 'u5', name: 'Priya Singh', avatar: 'P', online: true, role: 'Biology' },
  { id: 'u6', name: 'Daniel Osei', avatar: 'D', online: false, role: 'Engineering' },
];

const DEFAULT_CONVERSATIONS = [
  {
    id: 'c1',
    participants: ['u1', 'u2'],
    messages: [
      { id: 'm1', senderId: 'u2', text: 'Hey! Did you finish the physics assignment?', timestamp: Date.now() - 3600000 * 3 },
      { id: 'm2', senderId: 'u1', text: 'Almost done. Just stuck on question 4.', timestamp: Date.now() - 3600000 * 2 },
      { id: 'm3', senderId: 'u2', text: 'Are we still meeting for the project?', timestamp: Date.now() - 1800000 },
    ],
    unreadCount: 1,
  },
  {
    id: 'c2',
    participants: ['u1', 'u3'],
    messages: [
      { id: 'm1', senderId: 'u3', text: 'Hi! Your ticket #4001 has been resolved. Let us know if you need further help.', timestamp: Date.now() - 86400000 },
      { id: 'm2', senderId: 'u1', text: 'Thanks, all sorted!', timestamp: Date.now() - 80000000 },
    ],
    unreadCount: 0,
  },
  {
    id: 'c3',
    participants: ['u1', 'u4'],
    messages: [
      { id: 'm1', senderId: 'u4', text: 'Thanks for sharing your calc notes!', timestamp: Date.now() - 86400000 * 2 },
    ],
    unreadCount: 0,
  },
];

export const MessagingProvider = ({ children }) => {
  const [conversations, setConversations] = useState(() => {
    const saved = localStorage.getItem('cc_conversations');
    return saved ? JSON.parse(saved) : DEFAULT_CONVERSATIONS;
  });

  const [activeConversationId, setActiveConversationId] = useState(null);

  useEffect(() => {
    localStorage.setItem('cc_conversations', JSON.stringify(conversations));
  }, [conversations]);

  // Get a conversation by ID
  const getConversation = (id) => conversations.find(c => c.id === id) || null;

  // Get all conversations for a given user ID
  const getConversationsForUser = (userId) =>
    conversations.filter(c => c.participants.includes(userId));

  // Get the other participant in a conversation
  const getOtherUser = (conversation, currentUserId) => {
    const otherId = conversation.participants.find(p => p !== currentUserId);
    return MOCK_USERS.find(u => u.id === otherId) || null;
  };

  // Send a message to the active conversation
  const sendMessage = (conversationId, senderId, text) => {
    if (!text.trim()) return;
    const newMsg = {
      id: `m${Date.now()}`,
      senderId,
      text: text.trim(),
      timestamp: Date.now(),
    };
    setConversations(prev =>
      prev.map(c =>
        c.id === conversationId
          ? { ...c, messages: [...c.messages, newMsg] }
          : c
      )
    );
  };

  // Mark conversation as read
  const markAsRead = (conversationId) => {
    setConversations(prev =>
      prev.map(c =>
        c.id === conversationId ? { ...c, unreadCount: 0 } : c
      )
    );
  };

  // Start a new conversation or navigate to existing one
  const startConversation = (currentUserId, otherUserId) => {
    const existing = conversations.find(c =>
      c.participants.includes(currentUserId) && c.participants.includes(otherUserId)
    );
    if (existing) {
      setActiveConversationId(existing.id);
      return existing.id;
    }
    const newConv = {
      id: `c${Date.now()}`,
      participants: [currentUserId, otherUserId],
      messages: [],
      unreadCount: 0,
    };
    setConversations(prev => [newConv, ...prev]);
    setActiveConversationId(newConv.id);
    return newConv.id;
  };

  // Total unread for badge
  const getTotalUnread = (userId) =>
    conversations
      .filter(c => c.participants.includes(userId))
      .reduce((sum, c) => sum + (c.unreadCount || 0), 0);

  return (
    <MessagingContext.Provider value={{
      conversations,
      activeConversationId,
      setActiveConversationId,
      getConversation,
      getConversationsForUser,
      getOtherUser,
      sendMessage,
      markAsRead,
      startConversation,
      getTotalUnread,
    }}>
      {children}
    </MessagingContext.Provider>
  );
};
