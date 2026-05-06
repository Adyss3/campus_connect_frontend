import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { FaImage, FaPaperPlane } from 'react-icons/fa';
import PostCard from '../../components/feed/PostCard';
import { useAuth } from '../../context/AuthContext';

const initialPosts = [
  {
    id: 1,
    user: 'Sarah Jenkins',
    content: 'Just finished my final project for CS301! So relieved 😅 Huge shoutout to my team for pulling all-nighters with me.',
    timestamp: '2 hours ago',
    likes: 12,
    liked: false,
    comments: [
      { id: 1, user: 'Mike T.', content: 'Congrats! That project was brutal.', timestamp: '1 hour ago' }
    ],
    image: null,
  },
  {
    id: 2,
    user: 'Campus Activities Board',
    content: "Don't forget! The Spring Festival is happening this Friday at the main quad. Free food, live music, and lots of giveaways! 🎉",
    timestamp: '5 hours ago',
    likes: 45,
    liked: false,
    comments: [],
    image: 'https://placehold.co/600x280?text=Spring+Festival+2026',
  },
];

const Feed = () => {
  const { user } = useAuth();

  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem('socialPosts');
    return saved ? JSON.parse(saved) : initialPosts;
  });

  const [newPostContent, setNewPostContent] = useState('');

  useEffect(() => {
    localStorage.setItem('socialPosts', JSON.stringify(posts));
  }, [posts]);

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;
    const newPost = {
      id: Date.now(),
      user: user?.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : 'Campus Student',
      content: newPostContent,
      timestamp: 'Just now',
      likes: 0,
      liked: false,
      comments: [],
      image: null,
    };
    setPosts([newPost, ...posts]);
    setNewPostContent('');
  };

  const handleLike = (postId) => {
    setPosts(prev => prev.map(p =>
      p.id === postId
        ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
        : p
    ));
  };

  const handleAddComment = (postId, content) => {
    setPosts(prev => prev.map(p =>
      p.id === postId
        ? { ...p, comments: [...p.comments, { id: Date.now(), user: user?.firstName || 'Me', content, timestamp: 'Just now' }] }
        : p
    ));
  };

  return (
    <Container className="py-5" style={{ maxWidth: '680px' }}>
      <h2 className="fw-bold mb-4" style={{ color: 'var(--text-primary)' }}>Campus Feed</h2>

      {/* Create Post */}
      <Card className="mb-4 border-0 shadow-sm" style={{ background: 'var(--card-bg)', borderColor: 'var(--border-color)', borderRadius: '16px' }}>
        <Card.Body className="p-4">
          <Form onSubmit={handleCreatePost}>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="What's on your mind? Share an update or ask a question…"
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              style={{
                background: 'var(--bg-primary)',
                color: 'var(--input-text)',
                borderColor: 'var(--border-color)',
                borderRadius: 12,
                resize: 'none',
                fontSize: '0.95rem',
              }}
              className="mb-3 border"
            />
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
              <Button
                variant="light"
                className="d-flex align-items-center gap-2 rounded-pill fw-semibold"
                style={{ background: 'var(--btn-light-bg)', color: 'var(--btn-light-text)', border: '1px solid var(--border-color)' }}
                onClick={() => alert('Image upload — coming soon!')}
                type="button"
              >
                <FaImage style={{ color: '#2F855A' }} /> Photo
              </Button>
              <Button
                type="submit"
                disabled={!newPostContent.trim()}
                className="btn-premium d-flex align-items-center gap-2 px-4"
              >
                <FaPaperPlane size={13} /> Post
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      {/* Posts */}
      {posts.length === 0 ? (
        <div className="text-center py-5" style={{ color: 'var(--text-muted)' }}>
          <div style={{ fontSize: 56, marginBottom: 12 }}>📣</div>
          <h5 style={{ color: 'var(--text-primary)' }}>No posts yet</h5>
          <p style={{ color: 'var(--text-secondary)' }}>Be the first to say something!</p>
        </div>
      ) : (
        posts.map(post => (
          <PostCard key={post.id} post={post} onLike={handleLike} onAddComment={handleAddComment} />
        ))
      )}
    </Container>
  );
};

export default Feed;
