import React from 'react';
import { Container, Row, Col, Card, Badge, ListGroup } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <Container className="py-5">
      <Row className="mb-5 align-items-center fade-up-1 g-3">
        <Col>
          <span className="text-success fw-bold text-uppercase small mb-2 d-block" style={{ letterSpacing: '0.08em' }}>
            Dashboard
          </span>
          <h2 className="display-6 fw-bold mb-1" style={{ color: 'var(--text-primary)' }}>
            Welcome back, <span className="text-gradient">{user?.firstName || user?.name?.split(' ')[0] || 'Student'}!</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)' }} className="fs-5 mb-0">Here is your campus pulse for today.</p>
        </Col>
        <Col xs="auto">
          <Link to="/verification" className="text-decoration-none">
            <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} className="rounded-pill shadow-sm px-4 py-2 d-flex align-items-center hover-lift">
              <span className="text-warning fw-bold fs-5 me-2">⚠️</span>
              <span className="fw-bold" style={{ color: 'var(--text-primary)' }}>Verification Pending</span>
            </div>
          </Link>
        </Col>
      </Row>

      <Row className="g-4">
        {/* Main Feed Column */}
        <Col lg={8} className="fade-up-2">
          <Card className="glass-card border-0 mb-4" style={{ minHeight: '280px' }}>
            <Card.Header style={{ background: 'transparent', borderBottom: '1px solid var(--border-color)' }} className="pt-4 pb-3 px-4">
              <h4 className="fw-bold mb-0" style={{ color: 'var(--text-primary)' }}>Campus Feed</h4>
            </Card.Header>
            <Card.Body className="p-4 d-flex flex-column justify-content-center align-items-center">
              <div style={{ background: 'var(--bg-primary)', border: '1px dashed var(--border-color)' }} className="text-center w-100 py-5 rounded-4">
                <p className="fs-5 mb-1 opacity-50" style={{ color: 'var(--text-muted)' }}>Nothing to see here yet.</p>
                <small style={{ color: 'var(--text-muted)' }}>Join groups and follow tags to see updates.</small>
                <div className="mt-3">
                  <Link to="/feed" className="btn-premium text-decoration-none px-4" style={{ fontSize: '0.85rem' }}>Go to Feed</Link>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Right Sidebar Columns */}
        <Col lg={4}>
          <Row className="g-4">
            {/* Announcements */}
            <Col xs={12} className="fade-up-3">
              <Card className="glass-card border-0">
                <Card.Header style={{ background: 'transparent', borderBottom: '1px solid var(--border-color)' }} className="pt-4 px-4 pb-3">
                  <h5 className="fw-bold mb-0" style={{ color: 'var(--text-primary)' }}>Announcements</h5>
                </Card.Header>
                <Card.Body className="p-3">
                  <div style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)' }} className="p-3 rounded-3">
                    <Badge bg="danger" className="mb-2 rounded-pill">Urgent</Badge>
                    <p className="small mb-0 fw-semibold" style={{ color: 'var(--text-primary)' }}>
                      Library hours extended for midterms. Open 24/7 starting Monday.
                    </p>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* Quick Links */}
            <Col xs={12} className="fade-up-4">
              <Card className="glass-card border-0">
                <Card.Body className="p-4">
                  <h5 className="fw-bold mb-4" style={{ color: 'var(--text-primary)' }}>Quick Shortcuts</h5>
                  <div className="d-grid gap-3">
                    {[
                      { to: '/marketplace', icon: '🛒', label: 'Marketplace' },
                      { to: '/jobs', icon: '💼', label: 'Job Board' },
                      { to: '/events', icon: '📅', label: 'Upcoming Events' },
                    ].map(({ to, icon, label }) => (
                      <Link key={to} to={to} className="quick-link-btn text-decoration-none">
                        <span className="fs-4 me-3">{icon}</span> {label}
                      </Link>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
