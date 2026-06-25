import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Badge } from 'react-bootstrap';
import { FaImage, FaPaperPlane, FaBriefcase, FaCalendarAlt, FaBullhorn, FaStore, FaUsers } from 'react-icons/fa';
import PostCard from '../../components/feed/PostCard';
import { useAuth } from '../../context/AuthContext';
import { useAppContext } from '../../context/AppContext';

const initialPosts = [
  {
    id: 1,
    user: 'Sarah Jenkins',
    role: 'Student',
    content: 'Just finished my final project for CS301! So relieved 😅 Huge shoutout to my team for pulling all-nighters with me.',
    timestamp: '2 hours ago',
    type: 'update',
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
    role: 'Organization',
    content: "Don't forget! The Spring Festival is happening this Friday at the main quad. Free food, live music, and lots of giveaways! 🎉",
    timestamp: '5 hours ago',
    type: 'announcement',
    likes: 45,
    liked: false,
    comments: [],
    image: '/images/events/spring career fair.jpg',
  },
  {
    id: 3,
    user: 'ByteCode Tech',
    role: 'Entrepreneur',
    content: '🔥 New drop! Wireless ANC Headphones now available in our campus store. Perfect for blocking out dorm noise during exams. Limited stock — grab yours before it sells out!',
    timestamp: '1 day ago',
    type: 'product',
    likes: 28,
    liked: false,
    comments: [],
    image: '/images/products/anc haeadphones.jpg',
  },
  {
    id: 4,
    user: 'Professor Dele',
    role: 'Staff',
    content: '📢 Reminder: Office hours have moved to Thursdays 3–5PM for the rest of the semester. Final exam schedules will be posted on the portal by end of week.',
    timestamp: '1 day ago',
    type: 'announcement',
    likes: 33,
    liked: false,
    comments: [
      { id: 2, user: 'Jane Doe', content: 'Thank you for the heads up Prof!', timestamp: '20 hours ago' }
    ],
    image: null,
  },
];

const POST_TYPES = [
  { value: 'update', label: 'Update', icon: '💬' },
  { value: 'announcement', label: 'Announcement', icon: '📢' },
  { value: 'product', label: 'Product/Store', icon: '🛍️' },
  { value: 'job', label: 'Job/Opportunity', icon: '💼' },
  { value: 'event', label: 'Event', icon: '📅' },
];

const Feed = () => {
  const { user } = useAuth();
  const { events, jobs } = useAppContext();

  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem('cc_feed_posts');
    return saved ? JSON.parse(saved) : initialPosts;
  });

  const [newPostContent, setNewPostContent] = useState('');
  const [postType, setPostType] = useState('update');
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem('cc_feed_posts', JSON.stringify(posts));
  }, [posts]);

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;
    const newPost = {
      id: Date.now(),
      user: user?.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : 'Campus Student',
      role: user?.role || 'Student',
      content: newPostContent,
      timestamp: 'Just now',
      type: postType,
      likes: 0,
      liked: false,
      comments: [],
      image: null,
    };
    setPosts(prev => [newPost, ...prev]);
    setNewPostContent('');
    setPostType('update');
  };

  const handleLike = (postId) => {
    setPosts(prev => prev.map(p =>
      p.id === postId ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p
    ));
  };

  const handleAddComment = (postId, content) => {
    setPosts(prev => prev.map(p =>
      p.id === postId
        ? { ...p, comments: [...p.comments, { id: Date.now(), user: `${user?.firstName || 'Me'}`, content, timestamp: 'Just now' }] }
        : p
    ));
  };

  const handleDeletePost = (postId) => {
    setPosts(prev => prev.filter(p => p.id !== postId));
  };

  const filteredPosts = activeFilter === 'all'
    ? posts
    : posts.filter(p => p.type === activeFilter);

  const upcomingEvents = events.slice(0, 3);
  const recentJobs = jobs.slice(0, 3);

  const initials = user ? `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase() : 'U';
  const avatarColors = { Student: '#2F855A', Entrepreneur: '#2B6CB0', Staff: '#6B46C1', Organization: '#C05621', Admin: '#1A202C' };
  const avatarBg = avatarColors[user?.role] || '#2F855A';

  return (
    <Container className="py-5">
      <Row className="g-4">
        {/* ── Main Feed Column ── */}
        <Col lg={8}>
          {/* Page title */}
          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
            <div>
              <h2 className="fw-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                Campus <span className="text-gradient">Feed</span>
              </h2>
              <p className="mb-0 small" style={{ color: 'var(--text-secondary)' }}>
                What's happening around MTU right now
              </p>
            </div>
          </div>

          {/* Compose Post */}
          <Card className="mb-4 border-0 shadow-sm" style={{ background: 'var(--card-bg)', borderRadius: 16 }}>
            <Card.Body className="p-4">
              {/* Composer header */}
              <div className="d-flex align-items-center gap-3 mb-3">
                <div style={{ width: 42, height: 42, borderRadius: '50%', background: avatarBg, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.9rem', flexShrink: 0 }}>
                  {initials}
                </div>
                <div style={{ flex: 1, background: 'var(--bg-primary)', borderRadius: 50, padding: '10px 16px', color: 'var(--text-secondary)', fontSize: '0.9rem', cursor: 'text', border: '1px solid var(--border-color)' }}
                  onClick={() => document.getElementById('feedTextarea').focus()}
                >
                  What's on your mind, {user?.firstName || 'Student'}?
                </div>
              </div>

              <Form onSubmit={handleCreatePost}>
                <Form.Control
                  id="feedTextarea"
                  as="textarea"
                  rows={3}
                  placeholder="Share an update, announcement, or opportunity..."
                  value={newPostContent}
                  onChange={e => setNewPostContent(e.target.value)}
                  style={{ background: 'var(--bg-primary)', color: 'var(--input-text)', borderColor: 'var(--border-color)', borderRadius: 12, resize: 'none', fontSize: '0.95rem' }}
                  className="mb-3"
                />

                {/* Post type selector */}
                <div className="d-flex flex-wrap gap-2 mb-3">
                  {POST_TYPES.map(t => (
                    <button
                      key={t.value}
                      type="button"
                      onClick={() => setPostType(t.value)}
                      style={{
                        padding: '4px 12px', borderRadius: 50, fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer',
                        border: `1.5px solid ${postType === t.value ? 'var(--primary-color)' : 'var(--border-color)'}`,
                        background: postType === t.value ? 'rgba(47,133,90,0.1)' : 'transparent',
                        color: postType === t.value ? 'var(--primary-color)' : 'var(--text-secondary)',
                        transition: 'all 0.15s',
                      }}
                    >
                      {t.icon} {t.label}
                    </button>
                  ))}
                </div>

                <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                  <button
                    type="button"
                    style={{ background: 'none', border: 'none', cursor: 'not-allowed', display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-secondary)', fontSize: '0.88rem', fontWeight: 600, padding: '6px 12px', borderRadius: 8, opacity: 0.6 }}
                    title="Image upload — coming soon"
                  >
                    <FaImage size={16} color="#2F855A" /> Add Photo
                  </button>
                  <Button type="submit" disabled={!newPostContent.trim()} className="btn-premium d-flex align-items-center gap-2 px-4">
                    <FaPaperPlane size={12} /> Post
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>

          {/* Filter Tabs */}
          <div className="d-flex gap-2 flex-wrap mb-4">
            {[
              { value: 'all', label: 'All Posts' },
              { value: 'announcement', label: '📢 Announcements' },
              { value: 'product', label: '🛍️ Products' },
              { value: 'job', label: '💼 Jobs' },
              { value: 'event', label: '📅 Events' },
            ].map(f => (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                style={{
                  padding: '6px 16px', borderRadius: 50, fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer',
                  border: `1.5px solid ${activeFilter === f.value ? 'var(--primary-color)' : 'var(--border-color)'}`,
                  background: activeFilter === f.value ? 'var(--primary-color)' : 'transparent',
                  color: activeFilter === f.value ? '#fff' : 'var(--text-secondary)',
                  transition: 'all 0.15s',
                }}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Posts */}
          {filteredPosts.length === 0 ? (
            <div className="text-center py-5" style={{ color: 'var(--text-muted)' }}>
              <div style={{ fontSize: 52, marginBottom: 12 }}>📭</div>
              <h5 style={{ color: 'var(--text-primary)' }}>No posts here yet</h5>
              <p style={{ color: 'var(--text-secondary)' }}>Be the first to post something!</p>
            </div>
          ) : (
            filteredPosts.map(post => (
              <PostCard
                key={post.id}
                post={post}
                onLike={handleLike}
                onAddComment={handleAddComment}
                onDelete={handleDeletePost}
                currentUser={user}
              />
            ))
          )}
        </Col>

        {/* ── Right Sidebar ── */}
        <Col lg={4} className="d-none d-lg-block">
          {/* Upcoming Events */}
          <Card className="border-0 shadow-sm rounded-4 mb-4" style={{ background: 'var(--card-bg)' }}>
            <Card.Header style={{ background: 'transparent', borderBottom: '1px solid var(--border-color)' }} className="pt-4 px-4 pb-3 d-flex justify-content-between align-items-center">
              <h6 className="fw-bold mb-0 d-flex align-items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <FaCalendarAlt className="text-success" /> Upcoming Events
              </h6>
            </Card.Header>
            <Card.Body className="p-3">
              {upcomingEvents.map(ev => (
                <div key={ev.id} className="d-flex align-items-start gap-3 p-2 rounded-3 mb-1" style={{ transition: 'background 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-secondary)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: 'rgba(47,133,90,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '1.2rem' }}>
                    📅
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div className="fw-bold" style={{ fontSize: '0.85rem', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{ev.title}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{ev.date} · {ev.location}</div>
                  </div>
                </div>
              ))}
            </Card.Body>
          </Card>

          {/* Recent Jobs */}
          <Card className="border-0 shadow-sm rounded-4 mb-4" style={{ background: 'var(--card-bg)' }}>
            <Card.Header style={{ background: 'transparent', borderBottom: '1px solid var(--border-color)' }} className="pt-4 px-4 pb-3 d-flex justify-content-between align-items-center">
              <h6 className="fw-bold mb-0 d-flex align-items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <FaBriefcase className="text-primary" /> Recent Opportunities
              </h6>
            </Card.Header>
            <Card.Body className="p-3">
              {recentJobs.map(job => (
                <div key={job.id} className="d-flex align-items-start gap-3 p-2 rounded-3 mb-1" style={{ transition: 'background 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-secondary)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: 'rgba(66,153,225,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '1.2rem' }}>
                    💼
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div className="fw-bold" style={{ fontSize: '0.85rem', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{job.title}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{job.company} · {job.salary}</div>
                  </div>
                </div>
              ))}
            </Card.Body>
          </Card>

          {/* Campus Stats */}
          <Card className="border-0 shadow-sm rounded-4" style={{ background: 'var(--card-bg)' }}>
            <Card.Body className="p-4">
              <h6 className="fw-bold mb-3 d-flex align-items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <FaUsers className="text-success" /> Campus Stats
              </h6>
              {[
                { label: 'Active Students', value: '1,240+', color: '#2F855A' },
                { label: 'Campus Stores', value: '18', color: '#2B6CB0' },
                { label: 'Jobs Posted', value: '64', color: '#6B46C1' },
                { label: 'Events This Month', value: '9', color: '#C05621' },
              ].map(stat => (
                <div key={stat.label} className="d-flex justify-content-between align-items-center py-2" style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{stat.label}</span>
                  <span style={{ fontSize: '0.9rem', fontWeight: 700, color: stat.color }}>{stat.value}</span>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Feed;
