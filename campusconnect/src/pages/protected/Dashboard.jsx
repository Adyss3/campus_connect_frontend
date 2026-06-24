import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, ListGroup, ProgressBar, Button } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { useAppContext } from '../../context/AppContext';
import { useMessaging } from '../../context/MessagingContext';
import { Link } from 'react-router-dom';
import { FaGraduationCap, FaStore, FaBullhorn, FaCalendarAlt, FaCheckCircle, FaHourglass, FaExclamationTriangle, FaUserCircle } from 'react-icons/fa';
import StoreDashboard from './StoreDashboard';

const Dashboard = () => {
  const { user } = useAuth();
  const { products, jobs, events, rsvpedEvents, appliedJobs } = useAppContext();
  const { conversations } = useMessaging();

  // Dual-role selector state: 'student' or 'entrepreneur'
  const [dualRoleTab, setDualRoleTab] = useState('student');

  // Read verification status from localStorage
  const [verificationStatus, setVerificationStatus] = useState('none'); // none | pending | approved | rejected

  useEffect(() => {
    if (user) {
      const verifications = JSON.parse(localStorage.getItem('cc_verifications') || '[]');
      const record = verifications.find(v => v.userId === user.id);
      setVerificationStatus(record ? record.status : 'none');
    }
  }, [user]);

  // Load recent messages for logged-in user (always u1 in mock)
  const recentConversations = conversations.filter(c => c.participants.includes('u1')).slice(0, 3);

  // If user is strictly an Entrepreneur, show the Store Dashboard directly
  if (user?.role === 'Entrepreneur' && !user?.isVerifiedStudent) {
    return <StoreDashboard />;
  }

  // Render Student Dashboard Layout
  const renderStudentDashboard = () => {
    // Selections for highlights
    const featuredProducts = products.slice(0, 3);
    const featuredJobs = jobs.slice(0, 3);
    const upcomingEvents = events.slice(0, 3);

    return (
      <Row className="g-4">
        {/* Main Feed/Highlights Column */}
        <Col lg={8} className="fade-up-2">
          {/* Marketplace Highlights */}
          <Card className="border-0 shadow-sm rounded-4 mb-4" style={{ background: 'var(--card-bg)' }}>
            <Card.Header style={{ background: 'transparent', borderBottom: '1px solid var(--border-color)' }} className="pt-4 pb-3 px-4 d-flex justify-content-between align-items-center">
              <h5 className="fw-bold mb-0" style={{ color: 'var(--text-primary)' }}>Featured Marketplace Deals</h5>
              <Link to="/marketplace" className="text-success text-decoration-none fw-bold small">View All</Link>
            </Card.Header>
            <Card.Body className="p-4">
              <Row className="g-3">
                {featuredProducts.map(p => (
                  <Col key={p.id} xs={12} sm={4}>
                    <Link to={`/product/${p.id}`} className="text-decoration-none text-dark">
                      <div className="p-2 border rounded-3 h-100 hover-lift text-center" style={{ background: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
                        <div style={{ height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="mb-2">
                          <img src={p.imageUrl} alt={p.name} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
                        </div>
                        <div className="fw-bold small text-truncate" style={{ color: 'var(--text-primary)' }}>{p.name}</div>
                        <span className="fw-bold text-success text-center d-block small">₦{p.price.toLocaleString()}</span>
                      </div>
                    </Link>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>

          {/* Job Openings Highlights */}
          <Card className="border-0 shadow-sm rounded-4 mb-4" style={{ background: 'var(--card-bg)' }}>
            <Card.Header style={{ background: 'transparent', borderBottom: '1px solid var(--border-color)' }} className="pt-4 pb-3 px-4 d-flex justify-content-between align-items-center">
              <h5 className="fw-bold mb-0" style={{ color: 'var(--text-primary)' }}>Featured Career Opportunities</h5>
              <Link to="/jobs" className="text-success text-decoration-none fw-bold small">View All</Link>
            </Card.Header>
            <Card.Body className="p-4">
              <ListGroup variant="flush">
                {featuredJobs.map(j => (
                  <ListGroup.Item key={j.id} className="px-0 py-3 border-bottom d-flex justify-content-between align-items-center flex-wrap gap-2" style={{ background: 'transparent' }}>
                    <div>
                      <div className="fw-bold" style={{ color: 'var(--text-primary)' }}>{j.title}</div>
                      <small className="text-muted">{j.company} · {j.location} ({j.type})</small>
                    </div>
                    <div>
                      <Badge bg="success" className="rounded-pill me-2">{j.salary}</Badge>
                      <Link to={`/jobs/${j.id}`} className="btn btn-sm btn-light border fw-bold px-3 rounded-pill" style={{ color: 'var(--text-primary)' }}>View</Link>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        {/* Right Sidebar Column */}
        <Col lg={4}>
          <Row className="g-4">
            {/* Announcements */}
            <Col xs={12} className="fade-up-3">
              <Card className="border-0 shadow-sm rounded-4" style={{ background: 'var(--card-bg)' }}>
                <Card.Header style={{ background: 'transparent', borderBottom: '1px solid var(--border-color)' }} className="pt-4 px-4 pb-3">
                  <h6 className="fw-bold mb-0" style={{ color: 'var(--text-primary)' }}><FaBullhorn className="text-danger me-2" />Announcements</h6>
                </Card.Header>
                <Card.Body className="p-4">
                  <div style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)' }} className="p-3 rounded-3 mb-3">
                    <Badge bg="danger" className="mb-2 rounded-pill">Urgent</Badge>
                    <p className="small mb-0 fw-semibold" style={{ color: 'var(--text-primary)', lineHeight: 1.4 }}>
                      Library hours extended for midterms. Open 24/7 starting Monday.
                    </p>
                  </div>
                  <div style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)' }} className="p-3 rounded-3">
                    <Badge bg="success" className="mb-2 rounded-pill">Event</Badge>
                    <p className="small mb-0 fw-semibold" style={{ color: 'var(--text-primary)', lineHeight: 1.4 }}>
                      Register for Hackathon 2026 before April 30 to get free merch.
                    </p>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* Profile Completion & Verification Status */}
            <Col xs={12} className="fade-up-4">
              <Card className="border-0 shadow-sm rounded-4" style={{ background: 'var(--card-bg)' }}>
                <Card.Body className="p-4">
                  <h6 className="fw-bold mb-3" style={{ color: 'var(--text-primary)' }}>Profile Status</h6>
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <span className="small text-muted">Completion</span>
                    <span className="small fw-bold text-success">85%</span>
                  </div>
                  <ProgressBar now={85} variant="success" className="mb-4 rounded-pill" style={{ height: '8px' }} />

                  <hr style={{ borderColor: 'var(--border-color)' }} />

                  <Link to="/verification" className="text-decoration-none">
                    <div className="d-flex align-items-center mt-3 hover-lift">
                      {verificationStatus === 'approved' && <FaCheckCircle className="text-success me-2" size={18} />}
                      {verificationStatus === 'pending' && <FaHourglass className="me-2" style={{ color: '#ED8936' }} size={18} />}
                      {(verificationStatus === 'none' || verificationStatus === 'rejected') && <FaExclamationTriangle className="me-2" style={{ color: '#E53E3E' }} size={18} />}
                      <div>
                        {verificationStatus === 'approved' && (
                          <>
                            <div className="fw-bold small text-success">Verified MTU Student</div>
                            <small className="text-muted d-block" style={{ fontSize: '0.72rem' }}>Identity confirmed</small>
                          </>
                        )}
                        {verificationStatus === 'pending' && (
                          <>
                            <div className="fw-bold small" style={{ color: '#ED8936' }}>Verification Pending</div>
                            <small className="text-muted d-block" style={{ fontSize: '0.72rem' }}>Under review · 24–48 hrs</small>
                          </>
                        )}
                        {(verificationStatus === 'none' || verificationStatus === 'rejected') && (
                          <>
                            <div className="fw-bold small" style={{ color: '#E53E3E' }}>
                              {verificationStatus === 'rejected' ? 'Verification Rejected' : 'Not Yet Verified'}
                            </div>
                            <small className="text-muted d-block" style={{ fontSize: '0.72rem' }}>Click to submit documents</small>
                          </>
                        )}
                      </div>
                    </div>
                  </Link>
                </Card.Body>
              </Card>
            </Col>

            {/* Upcoming Events RSVPs */}
            <Col xs={12} className="fade-up-4">
              <Card className="border-0 shadow-sm rounded-4" style={{ background: 'var(--card-bg)' }}>
                <Card.Header style={{ background: 'transparent', borderBottom: '1px solid var(--border-color)' }} className="pt-4 px-4 pb-3 d-flex justify-content-between align-items-center">
                  <h6 className="fw-bold mb-0" style={{ color: 'var(--text-primary)' }}><FaCalendarAlt className="text-success me-2" />Events Spot</h6>
                  <Link to="/events" className="text-success text-decoration-none fw-bold small">Browse</Link>
                </Card.Header>
                <Card.Body className="p-4">
                  {upcomingEvents.map(e => {
                    const isRsvped = rsvpedEvents.includes(e.id);
                    return (
                      <div key={e.id} className="d-flex justify-content-between align-items-center py-2 border-bottom last-border-0">
                        <div>
                          <div className="fw-bold small text-truncate" style={{ color: 'var(--text-primary)', maxWidth: '160px' }}>{e.title}</div>
                          <small className="text-muted" style={{ fontSize: '0.72rem' }}>{e.date}</small>
                        </div>
                        {isRsvped && <Badge bg="success" pill>Going</Badge>}
                      </div>
                    );
                  })}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  };

  // Render Campus Staff/Organization Dashboard Layout
  const renderCampusDashboard = () => {
    return (
      <Row className="g-4">
        {/* Main Feed Column */}
        <Col lg={8} className="fade-up-2">
          {/* Post/Manage Card */}
          <Card className="border-0 shadow-sm rounded-4 mb-4" style={{ background: 'var(--card-bg)' }}>
            <Card.Header style={{ background: 'transparent', borderBottom: '1px solid var(--border-color)' }} className="pt-4 pb-3 px-4">
              <h5 className="fw-bold mb-0" style={{ color: 'var(--text-primary)' }}>Quick Campus Controls</h5>
            </Card.Header>
            <Card.Body className="p-4">
              <p style={{ color: 'var(--text-secondary)' }} className="small mb-4">Post announcements and updates to MTU student feeds, create event calendars, or request verification reports.</p>
              <Row className="g-3">
                <Col sm={6}>
                  <div className="p-3 border rounded-3 text-center hover-lift" style={{ background: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
                    <div className="fs-3 mb-2">📢</div>
                    <h6 className="fw-bold mb-2">Publish Bulletin</h6>
                    <Button variant="success" size="sm" className="rounded-pill px-3">Create Post</Button>
                  </div>
                </Col>
                <Col sm={6}>
                  <div className="p-3 border rounded-3 text-center hover-lift" style={{ background: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
                    <div className="fs-3 mb-2">📅</div>
                    <h6 className="fw-bold mb-2">Host Campus Event</h6>
                    <Link to="/events" className="btn btn-sm btn-success rounded-pill px-3">Organize Event</Link>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Job Listings Managed by Staff */}
          <Card className="border-0 shadow-sm rounded-4 mb-4" style={{ background: 'var(--card-bg)' }}>
            <Card.Header style={{ background: 'transparent', borderBottom: '1px solid var(--border-color)' }} className="pt-4 pb-3 px-4 d-flex justify-content-between align-items-center">
              <h5 className="fw-bold mb-0" style={{ color: 'var(--text-primary)' }}>Career Center Highlights</h5>
              <Link to="/jobs" className="text-success text-decoration-none fw-bold small">View Board</Link>
            </Card.Header>
            <Card.Body className="p-4">
              <ListGroup variant="flush">
                {jobs.slice(0, 3).map(j => (
                  <ListGroup.Item key={j.id} className="px-0 py-3 border-bottom d-flex justify-content-between align-items-center flex-wrap gap-2" style={{ background: 'transparent' }}>
                    <div>
                      <div className="fw-bold" style={{ color: 'var(--text-primary)' }}>{j.title}</div>
                      <small className="text-muted">{j.company} · {j.location}</small>
                    </div>
                    <div>
                      <Badge bg="primary" className="rounded-pill">{j.type}</Badge>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        {/* Right Sidebar Column */}
        <Col lg={4}>
          <Row className="g-4">
            {/* Campus Profile Summary */}
            <Col xs={12} className="fade-up-3">
              <Card className="border-0 shadow-sm rounded-4 text-center p-4" style={{ background: 'var(--card-bg)' }}>
                <div className="mx-auto mb-3" style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--bg-secondary)', border: '2px solid var(--border-color)', display: 'flex', alignItems: 'center', justify: 'center' }}>
                  <FaUserCircle size={56} style={{ color: 'var(--text-secondary)' }} />
                </div>
                <h5 className="fw-bold mb-1">{user?.firstName} {user?.lastName}</h5>
                <Badge bg="dark" className="rounded-pill px-3 py-1 mb-3" style={{ background: 'var(--dark-gradient)' }}>{user?.role}</Badge>
                <p className="small text-muted mb-0">{user?.email}</p>
                <p className="small text-muted">{user?.university || 'Mountain Top University'}</p>
              </Card>
            </Col>

            {/* Verification Stats */}
            <Col xs={12} className="fade-up-4">
              <Card className="border-0 shadow-sm rounded-4" style={{ background: 'var(--card-bg)' }}>
                <Card.Header style={{ background: 'transparent', borderBottom: '1px solid var(--border-color)' }} className="pt-4 px-4 pb-3">
                  <h6 className="fw-bold mb-0" style={{ color: 'var(--text-primary)' }}>Announcement Stats</h6>
                </Card.Header>
                <Card.Body className="p-4">
                  <div className="d-flex align-items-center justify-content-between mb-3 border-bottom pb-2">
                    <span className="small text-muted">Active Announcements</span>
                    <span className="fw-bold text-success">5</span>
                  </div>
                  <div className="d-flex align-items-center justify-content-between border-bottom pb-2 mb-3">
                    <span className="small text-muted">Upcoming Board Events</span>
                    <span className="fw-bold text-success">3</span>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <span className="small text-muted">Pending Inquiries</span>
                    <span className="fw-bold text-warning">1</span>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  };

  return (
    <Container className="py-5">
      {/* Dashboard Top Header & Title */}
      <Row className="mb-4 align-items-center fade-up-1 g-3">
        <Col>
          <span className="text-success fw-bold text-uppercase small mb-2 d-block" style={{ letterSpacing: '0.08em' }}>
            Dashboard Portal
          </span>
          <h2 className="display-6 fw-bold mb-1" style={{ color: 'var(--text-primary)' }}>
            Welcome back, <span className="text-gradient">{user?.firstName || 'User'}!</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)' }} className="fs-5 mb-0">Here is your campus pulse for today.</p>
        </Col>

        {/* Dual-role (Student + Entrepreneur) View Toggle Switch */}
        {user?.role === 'Student' && user?.hasStore && (
          <Col xs="auto" className="d-flex align-items-center">
            <div 
              className="d-inline-flex p-1 rounded-pill" 
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-soft)' }}
            >
              <button
                className="btn btn-sm rounded-pill fw-bold px-3 py-2 transition-all border-0"
                style={{
                  background: dualRoleTab === 'student' ? 'var(--primary-gradient)' : 'transparent',
                  color: dualRoleTab === 'student' ? '#fff' : 'var(--text-secondary)'
                }}
                onClick={() => setDualRoleTab('student')}
              >
                <FaGraduationCap className="me-2" /> Student Hub
              </button>
              <button
                className="btn btn-sm rounded-pill fw-bold px-3 py-2 transition-all border-0"
                style={{
                  background: dualRoleTab === 'entrepreneur' ? 'var(--primary-gradient)' : 'transparent',
                  color: dualRoleTab === 'entrepreneur' ? '#fff' : 'var(--text-secondary)'
                }}
                onClick={() => setDualRoleTab('entrepreneur')}
              >
                <FaStore className="me-2" /> Store Manager
              </button>
            </div>
          </Col>
        )}

        {/* Verification status badge — shown to students without a store */}
        {user?.role === 'Student' && !user?.hasStore && verificationStatus !== 'approved' && (
          <Col xs="auto">
            <Link to="/verification" className="text-decoration-none">
              <div
                style={{
                  background: 'var(--card-bg)',
                  border: `1px solid ${verificationStatus === 'pending' ? '#ED8936' : '#E53E3E'}`,
                  color: 'var(--text-primary)'
                }}
                className="rounded-pill shadow-sm px-4 py-2 d-flex align-items-center hover-lift"
              >
                <span className="fw-bold fs-5 me-2">{verificationStatus === 'pending' ? '⏳' : '⚠️'}</span>
                <span className="fw-bold" style={{ color: verificationStatus === 'pending' ? '#ED8936' : '#E53E3E' }}>
                  {verificationStatus === 'pending' ? 'Verification Under Review' : 'Verification Required'}
                </span>
              </div>
            </Link>
          </Col>
        )}
      </Row>

      {/* Conditionally Render Dashboards based on roles and selection */}
      {user?.role === 'Student' ? (
        user?.hasStore && dualRoleTab === 'entrepreneur' ? (
          <StoreDashboard />
        ) : (
          renderStudentDashboard()
        )
      ) : (user?.role === 'Staff' || user?.role === 'Organization' || user?.role === 'Admin') ? (
        renderCampusDashboard()
      ) : (
        <div className="text-center py-5 text-muted">
          <h4>Portal Not Configured</h4>
          <p>Please contact IT Admin to set up portal parameters for your role.</p>
        </div>
      )}
    </Container>
  );
};

export default Dashboard;
