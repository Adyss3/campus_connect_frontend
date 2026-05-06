import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { FaUserCircle, FaCheck, FaCamera } from 'react-icons/fa';

const Profile = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    bio: '',
    major: '',
    year: '3rd Year',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 1000);
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={9} lg={7}>
          <Card className="shadow-sm border-0 rounded-4 overflow-hidden" style={{ background: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>

            {/* Profile Header */}
            <div style={{ background: 'var(--primary-gradient)', height: '120px', position: 'relative' }} />
            <Card.Body className="px-4 pb-4" style={{ marginTop: '-56px' }}>
              <div className="d-flex align-items-end mb-4 flex-wrap gap-3">
                <div style={{ position: 'relative' }}>
                  <div style={{
                    width: 96, height: 96, borderRadius: '50%',
                    background: 'var(--bg-secondary)',
                    border: '4px solid var(--card-bg)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <FaUserCircle size={72} style={{ color: 'var(--text-secondary)' }} />
                  </div>
                  <button style={{
                    position: 'absolute', bottom: 4, right: 4, width: 28, height: 28,
                    borderRadius: '50%', background: '#2F855A', border: '2px solid var(--card-bg)',
                    color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer',
                  }}>
                    <FaCamera size={11} />
                  </button>
                </div>
                <div style={{ marginBottom: 8 }}>
                  <h4 className="fw-bold mb-0" style={{ color: 'var(--text-primary)' }}>
                    {formData.firstName || 'Student'} {formData.lastName}
                  </h4>
                  <small style={{ color: 'var(--text-secondary)' }}>{user?.role || 'Student'} · State University</small>
                </div>
              </div>

              <hr style={{ borderColor: 'var(--border-color)', margin: '0 0 1.5rem' }} />

              <h5 className="fw-bold mb-4" style={{ color: 'var(--text-primary)' }}>Edit Profile</h5>
              {saved && <Alert variant="success" className="rounded-3"><FaCheck className="me-2" />Profile updated successfully!</Alert>}

              <Form onSubmit={handleSubmit}>
                <Row className="g-3">
                  <Col sm={6}>
                    <Form.Group>
                      <Form.Label style={{ color: 'var(--text-primary)', fontWeight: 600 }}>First Name</Form.Label>
                      <Form.Control
                        type="text" name="firstName"
                        value={formData.firstName} onChange={handleChange}
                        style={{ background: 'var(--input-bg)', color: 'var(--input-text)', borderColor: 'var(--border-color)' }}
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={6}>
                    <Form.Group>
                      <Form.Label style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Last Name</Form.Label>
                      <Form.Control
                        type="text" name="lastName"
                        value={formData.lastName} onChange={handleChange}
                        style={{ background: 'var(--input-bg)', color: 'var(--input-text)', borderColor: 'var(--border-color)' }}
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={6}>
                    <Form.Group>
                      <Form.Label style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Email</Form.Label>
                      <Form.Control
                        type="email" name="email"
                        value={formData.email} onChange={handleChange}
                        style={{ background: 'var(--input-bg)', color: 'var(--input-text)', borderColor: 'var(--border-color)' }}
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={6}>
                    <Form.Group>
                      <Form.Label style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Year of Study</Form.Label>
                      <Form.Select
                        name="year" value={formData.year} onChange={handleChange}
                        style={{ background: 'var(--input-bg)', color: 'var(--input-text)', borderColor: 'var(--border-color)' }}
                      >
                        {['1st Year','2nd Year','3rd Year','4th Year','Postgraduate'].map(y => <option key={y}>{y}</option>)}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col xs={12}>
                    <Form.Group>
                      <Form.Label style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Bio</Form.Label>
                      <Form.Control
                        as="textarea" rows={3} name="bio"
                        value={formData.bio} onChange={handleChange}
                        placeholder="Tell the campus about yourself..."
                        style={{ background: 'var(--input-bg)', color: 'var(--input-text)', borderColor: 'var(--border-color)', resize: 'none' }}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <div className="mt-4">
                  <Button variant="success" type="submit" className="fw-bold px-4 rounded-pill" disabled={isSaving}>
                    {isSaving ? 'Saving…' : 'Save Changes'}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
