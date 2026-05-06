import React from 'react';
import { Container, Card, ListGroup, Form } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

const Settings = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Container className="py-5" style={{ maxWidth: '640px' }}>
      <h2 className="fw-bold mb-4" style={{ color: 'var(--text-primary)' }}>Account Settings</h2>

      <Card className="shadow-sm border-0 mb-4" style={{ background: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
        <Card.Header style={{ background: 'var(--card-bg-alt)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }} className="fw-bold py-3 px-4">
          Preferences
        </Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item className="d-flex justify-content-between align-items-center py-3 px-4" style={{ background: 'var(--card-bg)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
            <div>
              <div className="fw-semibold" style={{ color: 'var(--text-primary)' }}>Email Notifications</div>
              <small style={{ color: 'var(--text-secondary)' }}>Receive alerts about jobs, events, and messages</small>
            </div>
            <Form.Check type="switch" id="email-switch" defaultChecked />
          </ListGroup.Item>
          <ListGroup.Item className="d-flex justify-content-between align-items-center py-3 px-4" style={{ background: 'var(--card-bg)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
            <div>
              <div className="fw-semibold" style={{ color: 'var(--text-primary)' }}>Dark Mode</div>
              <small style={{ color: 'var(--text-secondary)' }}>Toggle between light and dark theme</small>
            </div>
            <Form.Check
              type="switch"
              id="dark-mode-switch"
              checked={theme === 'dark'}
              onChange={toggleTheme}
            />
          </ListGroup.Item>
          <ListGroup.Item className="d-flex justify-content-between align-items-center py-3 px-4" style={{ background: 'var(--card-bg)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
            <div>
              <div className="fw-semibold" style={{ color: 'var(--text-primary)' }}>Push Notifications</div>
              <small style={{ color: 'var(--text-secondary)' }}>Browser push notifications for messages</small>
            </div>
            <Form.Check type="switch" id="push-switch" />
          </ListGroup.Item>
        </ListGroup>
      </Card>

      <Card className="shadow-sm border-0" style={{ background: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
        <Card.Body className="p-4 d-flex flex-wrap justify-content-between align-items-center gap-3">
          <div>
            <h6 className="fw-bold text-danger mb-1">Danger Zone</h6>
            <p className="mb-0 small" style={{ color: 'var(--text-secondary)' }}>Sign out of your device securely.</p>
          </div>
          <button className="btn btn-outline-danger fw-bold" onClick={handleLogout}>Log Out</button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Settings;
