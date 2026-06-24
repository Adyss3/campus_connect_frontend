import React, { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { FaHeart, FaRegHeart, FaComment, FaPaperPlane, FaTrash } from 'react-icons/fa';

const TYPE_CONFIG = {
  update:       { label: 'Update',       color: '#718096',  bg: 'rgba(113,128,150,0.1)' },
  announcement: { label: 'Announcement', color: '#C05621',  bg: 'rgba(192,86,33,0.1)'  },
  product:      { label: 'Product',      color: '#2B6CB0',  bg: 'rgba(43,108,176,0.1)' },
  job:          { label: 'Opportunity',  color: '#6B46C1',  bg: 'rgba(107,70,193,0.1)' },
  event:        { label: 'Event',        color: '#2F855A',  bg: 'rgba(47,133,90,0.1)'  },
};

const ROLE_COLORS = {
  Student:      '#2F855A',
  Entrepreneur: '#2B6CB0',
  Staff:        '#6B46C1',
  Organization: '#C05621',
  Admin:        '#1A202C',
};

const PostCard = ({ post, onLike, onAddComment, onDelete, currentUser }) => {
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    onAddComment(post.id, commentText);
    setCommentText('');
  };

  const initials = post.user ? post.user.slice(0, 2).toUpperCase() : '??';
  const avatarColors = ['#2F855A', '#2B6CB0', '#6B46C1', '#C05621', '#2C7A7B', '#B7791F'];
  const avatarBg = ROLE_COLORS[post.role] || avatarColors[post.user?.charCodeAt(0) % avatarColors.length] || '#2F855A';

  const typeConf = TYPE_CONFIG[post.type] || TYPE_CONFIG.update;
  const isOwnPost = currentUser && (
    `${currentUser.firstName} ${currentUser.lastName || ''}`.trim() === post.user
  );

  return (
    <div
      className="mb-4"
      style={{
        background: 'var(--card-bg)',
        border: '1px solid var(--border-color)',
        borderRadius: 18,
        overflow: 'hidden',
        boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
        transition: 'box-shadow 0.2s',
      }}
    >
      <div className="p-4">
        {/* Header */}
        <div className="d-flex align-items-start justify-content-between gap-3 mb-3">
          <div className="d-flex align-items-center gap-3">
            {/* Avatar */}
            <div style={{
              width: 46, height: 46, borderRadius: '50%',
              background: avatarBg, color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 700, fontSize: '1rem', flexShrink: 0,
              boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
            }}>
              {initials}
            </div>
            <div>
              <div className="fw-bold" style={{ color: 'var(--text-primary)', fontSize: '0.95rem', lineHeight: 1.2 }}>
                {post.user}
              </div>
              <div className="d-flex align-items-center gap-2 mt-1 flex-wrap">
                {/* Role badge */}
                {post.role && (
                  <span style={{
                    fontSize: '0.68rem', fontWeight: 700, borderRadius: 50,
                    padding: '2px 8px',
                    background: `${avatarBg}20`,
                    color: avatarBg,
                    border: `1px solid ${avatarBg}40`,
                  }}>
                    {post.role}
                  </span>
                )}
                {/* Post type badge */}
                <span style={{
                  fontSize: '0.68rem', fontWeight: 700, borderRadius: 50,
                  padding: '2px 8px',
                  background: typeConf.bg,
                  color: typeConf.color,
                  border: `1px solid ${typeConf.color}40`,
                }}>
                  {typeConf.label}
                </span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>
                  {post.timestamp}
                </span>
              </div>
            </div>
          </div>

          {/* Delete own post */}
          {isOwnPost && (
            <button
              onClick={() => onDelete(post.id)}
              title="Delete post"
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'var(--text-muted)', padding: 6, borderRadius: 8,
                flexShrink: 0, transition: 'color 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#E53E3E'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
            >
              <FaTrash size={13} />
            </button>
          )}
        </div>

        {/* Content */}
        <p style={{ color: 'var(--text-primary)', lineHeight: 1.7, whiteSpace: 'pre-wrap', marginBottom: post.image ? '0.75rem' : 0, fontSize: '0.95rem' }}>
          {post.content}
        </p>

        {/* Image */}
        {post.image && (
          <div className="rounded-3 overflow-hidden mt-3" style={{ border: '1px solid var(--border-color)' }}>
            <img src={post.image} alt="Post" style={{ width: '100%', maxHeight: 320, objectFit: 'cover', display: 'block' }} />
          </div>
        )}
      </div>

      {/* Action Bar */}
      <div style={{ padding: '10px 16px', borderTop: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: 8 }}>
        {/* Like */}
        <button
          onClick={() => onLike(post.id)}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: post.liked ? 'rgba(229,62,62,0.08)' : 'transparent',
            border: `1px solid ${post.liked ? 'rgba(229,62,62,0.3)' : 'var(--border-color)'}`,
            borderRadius: 50, padding: '6px 14px',
            cursor: 'pointer', transition: 'all 0.15s',
            color: post.liked ? '#E53E3E' : 'var(--text-secondary)',
            fontWeight: 600, fontSize: '0.82rem',
          }}
        >
          {post.liked ? <FaHeart size={14} color="#E53E3E" /> : <FaRegHeart size={14} />}
          {post.likes > 0 && post.likes}
        </button>

        {/* Comment toggle */}
        <button
          onClick={() => setShowComments(prev => !prev)}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: showComments ? 'rgba(47,133,90,0.08)' : 'transparent',
            border: `1px solid ${showComments ? 'rgba(47,133,90,0.3)' : 'var(--border-color)'}`,
            borderRadius: 50, padding: '6px 14px',
            cursor: 'pointer', transition: 'all 0.15s',
            color: showComments ? 'var(--primary-color)' : 'var(--text-secondary)',
            fontWeight: 600, fontSize: '0.82rem',
          }}
        >
          <FaComment size={14} />
          {post.comments.length > 0 ? post.comments.length : ''} {post.comments.length === 1 ? 'Comment' : 'Comments'}
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div style={{ padding: '12px 16px 16px', borderTop: '1px solid var(--border-color)', background: 'var(--bg-primary)' }}>
          {/* Existing comments */}
          {post.comments.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', textAlign: 'center', margin: '8px 0 12px' }}>
              No comments yet — be the first!
            </p>
          ) : (
            <div className="d-flex flex-column gap-2 mb-3">
              {post.comments.map(c => (
                <div key={c.id} style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: 12, padding: '10px 14px' }}>
                  <div className="d-flex justify-content-between mb-1">
                    <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.82rem' }}>{c.user}</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>{c.timestamp}</span>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', margin: 0, lineHeight: 1.5 }}>{c.content}</p>
                </div>
              ))}
            </div>
          )}

          {/* Comment input */}
          <Form onSubmit={handleCommentSubmit}>
            <InputGroup>
              <Form.Control
                placeholder="Write a comment..."
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
                style={{
                  background: 'var(--input-bg)', color: 'var(--input-text)',
                  borderColor: 'var(--border-color)',
                  borderRadius: '50rem 0 0 50rem',
                  fontSize: '0.88rem',
                }}
              />
              <Button
                type="submit"
                style={{ background: 'var(--primary-gradient)', border: 'none', borderRadius: '0 50rem 50rem 0', padding: '0 16px' }}
                disabled={!commentText.trim()}
              >
                <FaPaperPlane size={13} />
              </Button>
            </InputGroup>
          </Form>
        </div>
      )}
    </div>
  );
};

export default PostCard;
