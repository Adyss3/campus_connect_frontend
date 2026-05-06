import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Form, InputGroup, Button, Modal, Badge } from 'react-bootstrap';
import { FaPaperPlane, FaSearch, FaPlus, FaArrowLeft, FaCircle, FaInbox } from 'react-icons/fa';
import { useMessaging, MOCK_USERS } from '../../context/MessagingContext';
import { useAuth } from '../../context/AuthContext';

// ---------------------------
// Helper: format timestamp
// ---------------------------
const formatTime = (ts) => {
  if (!ts) return '';
  const d = new Date(ts);
  const now = new Date();
  const diffDays = Math.floor((now - d) / 86400000);
  if (diffDays === 0) return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return d.toLocaleDateString([], { weekday: 'short' });
  return d.toLocaleDateString([], { month: 'short', day: 'numeric' });
};

// ---------------------------
// Avatar component
// ---------------------------
const Avatar = ({ label, online = false, size = 44 }) => {
  const colors = ['#2F855A', '#2B6CB0', '#6B46C1', '#C05621', '#2C7A7B', '#B7791F'];
  const color = colors[label.charCodeAt(0) % colors.length];
  return (
    <div style={{ position: 'relative', flexShrink: 0 }}>
      <div
        style={{
          width: size, height: size, borderRadius: '50%',
          background: color, color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 700, fontSize: size * 0.38,
          flexShrink: 0,
        }}
      >
        {label.slice(0, 2).toUpperCase()}
      </div>
      {online && (
        <FaCircle
          size={11}
          color="#48BB78"
          style={{
            position: 'absolute', bottom: 1, right: 1,
            border: '2px solid var(--card-bg)', borderRadius: '50%',
            background: '#48BB78',
          }}
        />
      )}
    </div>
  );
};

// ---------------------------
// Conversation List Item
// ---------------------------
const ConvItem = ({ conv, otherUser, isActive, onClick, currentUserId }) => {
  const lastMsg = conv.messages[conv.messages.length - 1];
  const preview = lastMsg
    ? (lastMsg.senderId === currentUserId ? `You: ${lastMsg.text}` : lastMsg.text)
    : 'No messages yet';

  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: '12px',
        padding: '14px 16px',
        background: isActive ? 'rgba(47, 133, 90, 0.12)' : 'transparent',
        borderLeft: isActive ? '3px solid #2F855A' : '3px solid transparent',
        cursor: 'pointer',
        transition: 'all 0.15s ease',
        borderBottom: '1px solid var(--border-color)',
      }}
      onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'rgba(0,0,0,0.04)'; }}
      onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
    >
      <Avatar label={otherUser?.avatar || '?'} online={otherUser?.online} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '130px' }}>
            {otherUser?.name || 'Unknown'}
          </span>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', flexShrink: 0 }}>
            {formatTime(lastMsg?.timestamp)}
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 }}>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '150px' }}>
            {preview.length > 40 ? preview.slice(0, 40) + '…' : preview}
          </p>
          {conv.unreadCount > 0 && (
            <Badge bg="success" pill style={{ fontSize: '0.65rem', flexShrink: 0 }}>{conv.unreadCount}</Badge>
          )}
        </div>
      </div>
    </div>
  );
};

// ---------------------------
// Message Bubble
// ---------------------------
const MessageBubble = ({ msg, isMine }) => (
  <div style={{ display: 'flex', justifyContent: isMine ? 'flex-end' : 'flex-start', marginBottom: '8px' }}>
    <div
      style={{
        maxWidth: '70%',
        padding: '10px 14px',
        borderRadius: isMine ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
        background: isMine ? 'var(--primary-gradient)' : 'var(--card-bg)',
        color: isMine ? '#fff' : 'var(--text-primary)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        border: isMine ? 'none' : '1px solid var(--border-color)',
      }}
    >
      <p style={{ margin: 0, lineHeight: 1.5, fontSize: '0.93rem', wordBreak: 'break-word' }}>{msg.text}</p>
      <small style={{ display: 'block', textAlign: 'right', marginTop: 4, fontSize: '0.68rem', opacity: 0.7 }}>
        {formatTime(msg.timestamp)}
      </small>
    </div>
  </div>
);

// ---------------------------
// Main Messages Component
// ---------------------------
const Messages = () => {
  const { user } = useAuth();
  const {
    getConversationsForUser,
    getConversation,
    getOtherUser,
    sendMessage,
    markAsRead,
    startConversation,
    activeConversationId,
    setActiveConversationId,
  } = useMessaging();

  // The logged-in user's ID is always 'u1' in mock mode
  const currentUserId = 'u1';

  const [inputText, setInputText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewChat, setShowNewChat] = useState(false);
  const [userSearch, setUserSearch] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [mobileView, setMobileView] = useState('list'); // 'list' | 'chat'

  const scrollRef = useRef(null);
  const inputRef = useRef(null);
  const typingTimer = useRef(null);

  const conversations = getConversationsForUser(currentUserId);
  const activeConv = activeConversationId ? getConversation(activeConversationId) : null;
  const otherUser = activeConv ? getOtherUser(activeConv, currentUserId) : null;

  // Filter conversations by search
  const filteredConvs = conversations.filter(c => {
    const other = getOtherUser(c, currentUserId);
    return !searchTerm || other?.name?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Auto scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [activeConv?.messages?.length]);

  // Mark as read when opened
  useEffect(() => {
    if (activeConversationId) {
      markAsRead(activeConversationId);
      setMobileView('chat');
    }
  }, [activeConversationId]);

  // Fake typing indicator (stops after 2s of no new messages)
  useEffect(() => {
    if (activeConv && activeConv.messages.length > 0) {
      const lastMsg = activeConv.messages[activeConv.messages.length - 1];
      if (lastMsg.senderId !== currentUserId) {
        clearTimeout(typingTimer.current);
        // Show typing briefly after arriving messages
      }
    }
  }, [activeConv?.messages?.length]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim() || !activeConversationId) return;
    sendMessage(activeConversationId, currentUserId, inputText);
    setInputText('');
    setIsTyping(false);
    // Fake: other user "types" after you send
    setTimeout(() => setIsTyping(true), 800);
    setTimeout(() => setIsTyping(false), 3000);
    if (inputRef.current) inputRef.current.focus();
  };

  const handleSelectConv = (convId) => {
    setActiveConversationId(convId);
  };

  const handleStartNewChat = (targetUserId) => {
    startConversation(currentUserId, targetUserId);
    setShowNewChat(false);
    setUserSearch('');
  };

  const availableUsers = MOCK_USERS.filter(u =>
    !userSearch || u.name.toLowerCase().includes(userSearch.toLowerCase())
  );

  // Panel styles
  const cardStyle = {
    background: 'var(--card-bg)',
    border: '1px solid var(--border-color)',
    overflow: 'hidden',
    boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
    height: 'calc(100vh - 180px)',
    minHeight: '560px',
    display: 'flex',
  };

  return (
    <Container className="py-md-4 py-0 px-md-3 px-0" style={{ maxWidth: '1100px' }}>
      <div className={`justify-content-between align-items-center mb-md-4 mb-0 py-3 py-md-0 px-3 px-md-0 ${mobileView === 'chat' ? 'd-none d-md-flex' : 'd-flex'}`}>
        <h3 style={{ fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>Messages</h3>
        <Button
          onClick={() => setShowNewChat(true)}
          style={{ background: 'var(--primary-gradient)', border: 'none', borderRadius: '50rem', padding: '8px 20px', fontWeight: 600 }}
        >
          <FaPlus className="me-2" size={12} /> New Chat
        </Button>
      </div>

      <div style={cardStyle} className="rounded-0 rounded-md-4 border-start-0 border-end-0 border-md-1">
        {/* LEFT PANEL */}
        <div className={`messages-left-panel ${mobileView === 'chat' ? 'd-none d-md-flex' : 'd-flex'}`}
          style={{
            flexShrink: 0,
            borderRight: '1px solid var(--border-color)',
            flexDirection: 'column',
            background: 'var(--bg-secondary)',
          }}
        >
          {/* Search */}
          <div style={{ padding: '16px', borderBottom: '1px solid var(--border-color)' }}>
            <div style={{ position: 'relative' }}>
              <FaSearch style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)', fontSize: '0.8rem' }} />
              <input
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                style={{
                  width: '100%', padding: '8px 12px 8px 34px',
                  border: '1px solid var(--border-color)',
                  borderRadius: '50rem', fontSize: '0.85rem',
                  background: 'var(--bg-primary)', color: 'var(--text-primary)',
                  outline: 'none',
                }}
              />
            </div>
          </div>

          {/* Conversation List */}
          <div style={{ overflowY: 'auto', flex: 1 }}>
            {filteredConvs.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-secondary)' }}>
                <FaInbox size={32} style={{ marginBottom: 12, opacity: 0.4 }} />
                <p style={{ fontSize: '0.85rem' }}>No conversations yet.<br />Start one with the + button!</p>
              </div>
            ) : (
              filteredConvs.map(conv => (
                <ConvItem
                  key={conv.id}
                  conv={conv}
                  otherUser={getOtherUser(conv, currentUserId)}
                  isActive={conv.id === activeConversationId}
                  currentUserId={currentUserId}
                  onClick={() => handleSelectConv(conv.id)}
                />
              ))
            )}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className={`messages-right-panel ${mobileView === 'list' ? 'd-none d-md-flex' : 'd-flex'}`} style={{
          flex: 1, flexDirection: 'column', minWidth: 0,
        }}>
          {!activeConv ? (
            /* Empty state */
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', padding: 40, textAlign: 'center' }}>
              <div style={{ fontSize: 64, marginBottom: 16, opacity: 0.2 }}>💬</div>
              <h5 style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>
                Select a conversation
              </h5>
              <p style={{ fontSize: '0.9rem', maxWidth: 280 }}>
                Choose a chat on the left or start a new one with the <strong>+ New Chat</strong> button.
              </p>
            </div>
          ) : (
            <>
              {/* Chat Header */}
              <div style={{
                padding: '12px 20px',
                borderBottom: '1px solid var(--border-color)',
                display: 'flex', alignItems: 'center', gap: 12,
                background: 'var(--card-bg)',
              }}>
                {/* Mobile back button */}
                <button
                  className="d-md-none btn btn-link p-0 me-1"
                  onClick={() => { setMobileView('list'); setActiveConversationId(null); }}
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <FaArrowLeft />
                </button>
                <Avatar label={otherUser?.avatar || '?'} online={otherUser?.online} size={46} />
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '1rem' }}>{otherUser?.name}</div>
                  <div style={{ fontSize: '0.75rem', color: otherUser?.online ? '#48BB78' : 'var(--text-secondary)', fontWeight: 600 }}>
                    {otherUser?.online ? '● Online' : '● Offline'} · {otherUser?.role}
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div
                ref={scrollRef}
                style={{
                  flex: 1, overflowY: 'auto',
                  padding: '24px 20px', display: 'flex',
                  flexDirection: 'column', gap: 4,
                  background: 'var(--bg-primary)',
                }}
              >
                {activeConv.messages.length === 0 ? (
                  <div style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: 'auto', marginBottom: 'auto', padding: 40 }}>
                    <p style={{ fontSize: '0.9rem' }}>No messages yet.<br />Say hello! 👋</p>
                  </div>
                ) : (
                  activeConv.messages.map(msg => (
                    <MessageBubble
                      key={msg.id}
                      msg={msg}
                      isMine={msg.senderId === currentUserId}
                    />
                  ))
                )}

                {/* Typing Indicator */}
                {isTyping && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 0' }}>
                    <Avatar label={otherUser?.avatar || '?'} size={28} />
                    <div style={{
                      padding: '8px 14px',
                      background: 'var(--card-bg)',
                      borderRadius: '18px 18px 18px 4px',
                      border: '1px solid var(--border-color)',
                      display: 'flex', gap: 4, alignItems: 'center',
                    }}>
                      {[0, 0.2, 0.4].map((delay, i) => (
                        <div key={i} style={{
                          width: 7, height: 7,
                          borderRadius: '50%',
                          background: 'var(--text-secondary)',
                          animation: 'typingDot 1.2s infinite',
                          animationDelay: `${delay}s`,
                        }} />
                      ))}
                    </div>
                    <small style={{ color: 'var(--text-secondary)', fontSize: '0.72rem' }}>typing…</small>
                  </div>
                )}
              </div>

              {/* Message Input */}
              <form
                onSubmit={handleSend}
                style={{
                  padding: '14px 20px',
                  borderTop: '1px solid var(--border-color)',
                  background: 'var(--card-bg)',
                  display: 'flex', gap: 10, alignItems: 'center',
                }}
              >
                <input
                  ref={inputRef}
                  placeholder={`Message ${otherUser?.name || ''}…`}
                  value={inputText}
                  onChange={e => setInputText(e.target.value)}
                  style={{
                    flex: 1, padding: '11px 18px',
                    border: '1px solid var(--border-color)',
                    borderRadius: '50rem', fontSize: '0.9rem',
                    background: 'var(--bg-primary)', color: 'var(--text-primary)',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={e => e.target.style.borderColor = '#2F855A'}
                  onBlur={e => e.target.style.borderColor = 'var(--border-color)'}
                />
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  style={{
                    width: 44, height: 44, borderRadius: '50%',
                    background: inputText.trim() ? 'var(--primary-gradient)' : 'var(--border-color)',
                    border: 'none', color: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: inputText.trim() ? 'pointer' : 'not-allowed',
                    transition: 'all 0.2s',
                    flexShrink: 0,
                  }}
                >
                  <FaPaperPlane size={15} />
                </button>
              </form>
            </>
          )}
        </div>
      </div>

      {/* New Chat Modal */}
      <Modal show={showNewChat} onHide={() => { setShowNewChat(false); setUserSearch(''); }} centered>
        <Modal.Header closeButton style={{ background: 'var(--card-bg)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
          <Modal.Title style={{ fontWeight: 700 }}>Start a new conversation</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: 'var(--card-bg)', padding: '20px' }}>
          <div style={{ position: 'relative', marginBottom: 16 }}>
            <FaSearch style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)', fontSize: '0.8rem' }} />
            <input
              placeholder="Search users..."
              value={userSearch}
              onChange={e => setUserSearch(e.target.value)}
              style={{
                width: '100%', padding: '10px 12px 10px 34px',
                border: '1px solid var(--border-color)',
                borderRadius: '10px', fontSize: '0.9rem',
                background: 'var(--bg-primary)', color: 'var(--text-primary)',
                outline: 'none',
              }}
              autoFocus
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {availableUsers.map(u => (
              <div
                key={u.id}
                onClick={() => handleStartNewChat(u.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '12px 14px', borderRadius: '12px',
                  cursor: 'pointer', transition: 'background 0.15s',
                  border: '1px solid var(--border-color)',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(47,133,90,0.08)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <Avatar label={u.avatar} online={u.online} />
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.9rem' }}>{u.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{u.role}</div>
                </div>
                <div style={{ marginLeft: 'auto', fontSize: '0.75rem', color: u.online ? '#48BB78' : 'var(--text-secondary)', fontWeight: 600 }}>
                  {u.online ? 'Online' : 'Offline'}
                </div>
              </div>
            ))}
          </div>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Messages;
