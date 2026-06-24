import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { FaStore, FaArrowLeft } from 'react-icons/fa';
import { useAppContext } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';

const CreateStore = () => {
  const { user } = useAuth();
  const { createStore } = useAppContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    storeName: '',
    category: 'Apparel',
    description: '',
    logo: '',
    banner: '',
    email: user?.email || '',
    phone: '',
    instagram: '',
    twitter: '',
    website: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // If user already owns a store, redirect them or block
  if (user?.hasStore) {
    return (
      <Container className="py-5 text-center">
        <Card className="glass-card p-5 border-0 rounded-4 mx-auto" style={{ maxWidth: '500px', background: 'var(--card-bg)' }}>
          <div className="fs-1 mb-3">🏢</div>
          <h4 className="fw-bold mb-3" style={{ color: 'var(--text-primary)' }}>You already own a store!</h4>
          <p className="text-muted mb-4">You can manage your products, logo, banner, and orders directly in the owner dashboard.</p>
          <Link to="/store/dashboard" className="btn btn-premium px-4 py-2">Go to Store Dashboard</Link>
        </Card>
      </Container>
    );
  }

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.storeName || !formData.description || !formData.category) {
      setError('Please fill out all required fields.');
      return;
    }

    setLoading(true);
    try {
      // Simulate small delay
      await new Promise(resolve => setTimeout(resolve, 800));
      createStore(formData, user.id);
      navigate('/store/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to create your store.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    background: 'var(--input-bg)',
    color: 'var(--input-text)',
    borderColor: 'var(--border-color)',
    paddingTop: '11px',
    paddingBottom: '11px',
  };

  const labelStyle = { color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.9rem' };

  return (
    <Container className="py-5">
      <Button variant="link" className="text-secondary text-decoration-none px-0 mb-4 d-flex align-items-center" onClick={() => navigate(-1)}>
        <FaArrowLeft className="me-2" /> Back
      </Button>

      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="shadow-sm border-0 rounded-4" style={{ background: 'var(--card-bg)' }}>
            <div style={{ height: 4, background: 'var(--primary-gradient)', borderTopLeftRadius: '16px', borderTopRightRadius: '16px' }} />
            <Card.Body className="p-4 p-md-5">
              <div className="d-flex align-items-center gap-3 mb-4">
                <div className="bg-success text-white rounded-4 p-3 d-flex align-items-center justify-content-center">
                  <FaStore size={26} />
                </div>
                <div>
                  <h3 className="fw-bold mb-1" style={{ color: 'var(--text-primary)' }}>Create Your Store</h3>
                  <p style={{ color: 'var(--text-secondary)' }} className="mb-0 small">Launch your brand and sell to the MTU student network.</p>
                </div>
              </div>

              {error && <Alert variant="danger" className="rounded-3">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <h5 className="fw-bold mb-3 mt-4 text-success" style={{ letterSpacing: '0.03em' }}>Basic Brand Info</h5>
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group controlId="storeName">
                      <Form.Label style={labelStyle}>Store / Brand Name*</Form.Label>
                      <Form.Control
                        type="text" name="storeName"
                        placeholder="e.g. Campus Threads"
                        value={formData.storeName} onChange={handleChange} required
                        style={inputStyle}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="category">
                      <Form.Label style={labelStyle}>Category*</Form.Label>
                      <Form.Select name="category" value={formData.category} onChange={handleChange} required style={inputStyle}>
                        <option value="Apparel">Apparel & Fashion</option>
                        <option value="Food & Snacks">Food, Snacks & Drinks</option>
                        <option value="Electronics">Electronics & Gadgets</option>
                        <option value="Books">Books & Stationery</option>
                        <option value="Furniture">Furniture & Dorm Decor</option>
                        <option value="Services">Services (Coding, Styling, etc.)</option>
                        <option value="Other">Other</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col xs={12}>
                    <Form.Group controlId="description">
                      <Form.Label style={labelStyle}>Brand Description*</Form.Label>
                      <Form.Control
                        as="textarea" rows={3} name="description"
                        placeholder="Tell students about your store, what makes it special, and your business hours..."
                        value={formData.description} onChange={handleChange} required
                        style={{ ...inputStyle, resize: 'none' }}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <h5 className="fw-bold mb-3 mt-4 text-success" style={{ letterSpacing: '0.03em' }}>Design Assets (Optional)</h5>
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group controlId="logo">
                      <Form.Label style={labelStyle}>Logo Image URL</Form.Label>
                      <Form.Control
                        type="text" name="logo"
                        placeholder="https://..."
                        value={formData.logo} onChange={handleChange}
                        style={inputStyle}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="banner">
                      <Form.Label style={labelStyle}>Banner Image URL</Form.Label>
                      <Form.Control
                        type="text" name="banner"
                        placeholder="https://..."
                        value={formData.banner} onChange={handleChange}
                        style={inputStyle}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <h5 className="fw-bold mb-3 mt-4 text-success" style={{ letterSpacing: '0.03em' }}>Contact Details</h5>
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group controlId="email">
                      <Form.Label style={labelStyle}>Business Email</Form.Label>
                      <Form.Control
                        type="email" name="email"
                        placeholder="contact@store.com"
                        value={formData.email} onChange={handleChange}
                        style={inputStyle}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="phone">
                      <Form.Label style={labelStyle}>Business Phone</Form.Label>
                      <Form.Control
                        type="text" name="phone"
                        placeholder="+234..."
                        value={formData.phone} onChange={handleChange}
                        style={inputStyle}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <h5 className="fw-bold mb-3 mt-4 text-success" style={{ letterSpacing: '0.03em' }}>Social Handles (Optional)</h5>
                <Row className="g-3 mb-4">
                  <Col md={4}>
                    <Form.Group controlId="instagram">
                      <Form.Label style={labelStyle}>Instagram Username</Form.Label>
                      <Form.Control
                        type="text" name="instagram"
                        placeholder="e.g. campus_threads"
                        value={formData.instagram} onChange={handleChange}
                        style={inputStyle}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="twitter">
                      <Form.Label style={labelStyle}>Twitter Username</Form.Label>
                      <Form.Control
                        type="text" name="twitter"
                        placeholder="e.g. campus_threads"
                        value={formData.twitter} onChange={handleChange}
                        style={inputStyle}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="website">
                      <Form.Label style={labelStyle}>Website Link</Form.Label>
                      <Form.Control
                        type="text" name="website"
                        placeholder="e.g. store.com"
                        value={formData.website} onChange={handleChange}
                        style={inputStyle}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <div className="mt-5">
                  <Button variant="success" type="submit" className="btn-premium px-5 py-2 fs-6 fw-bold w-100 w-md-auto" disabled={loading}>
                    {loading ? 'Creating...' : 'Launch Store'}
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

export default CreateStore;
