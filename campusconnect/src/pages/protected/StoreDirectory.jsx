import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, InputGroup, Button, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaArrowLeft, FaStore } from 'react-icons/fa';
import { useAppContext } from '../../context/AppContext';

const StoreDirectory = () => {
  const { stores } = useAppContext();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');

  const categories = ['All', ...new Set(stores.map(s => s.category))];

  const filteredStores = stores.filter(store => {
    const matchesSearch = store.storeName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          store.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'All' || store.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <Container className="py-5">
      <Button variant="link" className="text-secondary text-decoration-none px-0 mb-4 d-flex align-items-center" onClick={() => navigate('/marketplace')}>
        <FaArrowLeft className="me-2" /> Back to Marketplace
      </Button>

      <div className="d-flex justify-content-between align-items-center mb-5 flex-wrap gap-3">
        <div>
          <h2 className="display-6 fw-bold mb-1" style={{ color: 'var(--text-primary)' }}>
            Store <span className="text-gradient">Directory</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)' }} className="mb-0">Browse and follow MTU campus stores and local student brands.</p>
        </div>
      </div>

      {/* Search and Filters */}
      <Row className="mb-5 g-3 align-items-center">
        <Col md={6}>
          <InputGroup>
            <InputGroup.Text style={{ background: 'var(--input-bg)', borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
              <FaSearch />
            </InputGroup.Text>
            <Form.Control
              placeholder="Search stores, brands, or keywords…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ background: 'var(--input-bg)', borderColor: 'var(--border-color)', color: 'var(--input-text)', borderLeft: 'none' }}
            />
          </InputGroup>
        </Col>
        <Col md={6}>
          <div className="d-flex gap-2 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                style={{
                  padding: '6px 16px',
                  borderRadius: '50rem',
                  border: `1.5px solid ${category === cat ? '#2F855A' : 'var(--border-color)'}`,
                  background: category === cat ? '#2F855A' : 'var(--btn-light-bg)',
                  color: category === cat ? '#fff' : 'var(--btn-light-text)',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </Col>
      </Row>

      {/* Grid */}
      <Row className="g-4">
        {filteredStores.map(store => (
          <Col key={store.id} xs={12} md={6} lg={4}>
            <Card className="glass-card border-0 hover-lift h-100 d-flex flex-column" style={{ background: 'var(--card-bg)', borderRadius: 20, overflow: 'hidden' }}>
              <div style={{ height: '100px', background: 'var(--primary-gradient)', position: 'relative' }}>
                {store.banner && (
                  <img
                    src={store.banner}
                    alt={store.storeName}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
                  />
                )}
              </div>
              <Card.Body className="p-4 d-flex flex-column" style={{ marginTop: '-40px', position: 'relative', zIndex: 1 }}>
                <div className="mb-3 d-flex align-items-end gap-3">
                  <div
                    style={{
                      width: '70px',
                      height: '70px',
                      borderRadius: '16px',
                      background: 'var(--bg-secondary)',
                      border: '3px solid var(--card-bg)',
                      overflow: 'hidden',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                    }}
                  >
                    {store.logo ? (
                      <img src={store.logo} alt={store.storeName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <FaStore size={30} style={{ color: 'var(--text-secondary)' }} />
                    )}
                  </div>
                  <div className="mb-1">
                    <Badge bg="success" className="rounded-pill px-3 py-1" style={{ fontSize: '0.7rem' }}>{store.category}</Badge>
                  </div>
                </div>

                <h5 className="fw-bold mb-1" style={{ color: 'var(--text-primary)' }}>{store.storeName}</h5>
                <small className="text-success fw-bold d-block mb-3">
                  👥 {store.followers?.length || 0} Followers
                </small>
                
                <p className="small text-muted flex-grow-1 mb-4" style={{ lineClamp: 3, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {store.description}
                </p>

                <Link
                  to={`/store/${store.id}`}
                  className="btn btn-premium w-100 py-2 d-flex align-items-center justify-content-center"
                >
                  Visit Store
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}

        {filteredStores.length === 0 && (
          <Col xs={12} className="text-center py-5">
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>No stores found matching your criteria.</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default StoreDirectory;
