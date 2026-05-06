import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';

const AuthLayout = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-primary)' }}>
      {/* Simple Header for Auth */}
      <header className="p-3 shadow-sm border-bottom" style={{ backgroundColor: 'var(--nav-bg)', borderColor: 'var(--border-color)' }}>
        <Container>
          <Link to="/" className="text-decoration-none fw-bold fs-4 d-flex align-items-center">
            <img src="/logo.png" alt="Campus Connect" style={{ height: '40px', transform: 'scale(1.2)', transformOrigin: 'left center', objectFit: 'contain' }} />
          </Link>
        </Container>
      </header>

      {/* Centered Content */}
      <main className="flex-grow-1 d-flex align-items-center justify-content-center p-3" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <Container>
          <Row className="justify-content-center">
            <Col xs={12} md={8} lg={6} xl={5}>
              <Card 
                className="shadow-sm border-0 rounded-4" 
                style={{ 
                  backgroundColor: 'var(--card-bg)', 
                  borderTop: '4px solid var(--primary-color) !important' 
                }}
              >
                <div style={{ height: 4, background: 'var(--primary-gradient)', borderTopLeftRadius: '16px', borderTopRightRadius: '16px' }} />
                <Card.Body className="p-4 p-md-5">
                  <Outlet />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
};

export default AuthLayout;
