import React, { useState } from 'react';
import { Card, Button, Form, InputGroup } from 'react-bootstrap';
import { FaHeart, FaRegHeart, FaComment, FaPaperPlane } from 'react-icons/fa';

const PostCard = ({ post, onLike, onAddComment }) => {
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    onAddComment(post.id, commentText);
    setCommentText('');
  };

  const initials = post.user ? post.user.slice(0, 2).toUpperCase() : '?';
  const colors = ['#2F855A','#2B6CB0','#6B46C1','#C05621','#2C7A7B'];
  const avatarColor = colors[post.user?.charCodeAt(0) % colors.length] || '#2F855A';

  return (
    <Card className="mb-4 border-0 shadow-sm" style={{ background: 'var(--card-bg)', borderColor: 'var(--border-color)', borderRadius: '16px', overflow: 'hidden' }}>
      <Card.Body className="p-4">
        {/* Author row */}
        <div className="d-flex align-items-center mb-3 gap-3">
          <div style={{
            width: 46, height: 46, borderRadius: '50%',
            background: avatarColor, color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 700, fontSize: '1rem', flexShrink: 0,
          }}>
            {initials}
          </div>
          <div>
            <div className="fw-bold" style={{ color: 'var(--text-primary)', fontSize: '0.95rem' }}>{post.user}</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.78rem' }}>{post.timestamp}</div>
          </div>
        </div>

        {/* Content */}
        <p style={{ color: 'var(--text-primary)', lineHeight: 1.65, whiteSpace: 'pre-wrap', marginBottom: '0.75rem' }}>{post.content}</p>

        {/* Optional image */}
        {post.image && (
          <div className="mb-3 rounded-3 overflow-hidden">
            <img src={post.image} alt="Post Attachment" className="w-100 object-fit-cover" style={{ maxHeight: '380px' }} />
          </div>
        )}

        <hr style={{ borderColor: 'var(--border-color)', opacity: 1, margin: '0.75rem 0' }} />

        {/* Actions */}
        <div className="d-flex align-items-center gap-4">
          <button
            className="btn btn-link p-0 text-decoration-none d-flex align-items-center gap-2"
            style={{ color: 'var(--text-secondary)' }}
            onClick={() => onLike(post.id)}
          >
            {post.liked ? <FaHeart className="text-danger" size={18} /> : <FaRegHeart size={18} style={{ color: 'var(--text-secondary)' }} />}
            <span className="fw-semibold" style={{ color: 'var(--text-primary)', fontSize: '0.88rem' }}>{post.likes}</span>
          </button>

          <button
            className="btn btn-link p-0 text-decoration-none d-flex align-items-center gap-2"
            style={{ color: 'var(--text-secondary)' }}
            onClick={() => setShowComments(!showComments)}
          >
            <FaComment size={18} style={{ color: 'var(--text-secondary)' }} />
            <span className="fw-semibold" style={{ color: 'var(--text-primary)', fontSize: '0.88rem' }}>{post.comments.length}</span>
          </button>
        </div>

        {/* Comments section */}
        {showComments && (
          <div className="mt-3 pt-3" style={{ borderTop: '1px solid var(--border-color)' }}>
            {post.comments.length === 0 && (
              <p className="text-center mb-3" style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>No comments yet. Be the first!</p>
            )}
            <div className="d-flex flex-column gap-2 mb-3">
              {post.comments.map(c => (
                <div key={c.id} className="p-3 rounded-3" style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}>
                  <div className="d-flex justify-content-between mb-1">
                    <span className="fw-bold" style={{ color: 'var(--text-primary)', fontSize: '0.82rem' }}>{c.user}</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>{c.timestamp}</span>
                  </div>
                  <p className="mb-0" style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>{c.content}</p>
                </div>
              ))}
            </div>

            <Form onSubmit={handleCommentSubmit}>
              <InputGroup>
                <Form.Control
                  placeholder="Add a comment…"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  style={{
                    background: 'var(--input-bg)', color: 'var(--input-text)',
                    borderColor: 'var(--border-color)', borderRadius: '50rem 0 0 50rem',
                  }}
                />
                <Button type="submit" variant="success" style={{ borderRadius: '0 50rem 50rem 0' }}>
                  <FaPaperPlane size={13} />
                </Button>
              </InputGroup>
            </Form>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default PostCard;
