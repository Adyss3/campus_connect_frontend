import React, { useState } from 'react';
import { Container, Row, Col, Form, InputGroup, Button } from 'react-bootstrap';
import { FaSearch, FaStore } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/marketplace/ProductCard';
import { useAppContext } from '../../context/AppContext';

const Marketplace = () => {
  const { products } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest'); // newest, cheapest, highest

  const categories = ['All', ...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'All' || p.category === category;
    return matchesSearch && matchesCategory;
  });

  // Sorting logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'cheapest') {
      return a.price - b.price;
    }
    if (sortBy === 'highest') {
      return b.price - a.price;
    }
    // newest (by id or timestamp)
    return b.id.localeCompare(a.id);
  });

  return (
    <Container className="py-5">
      {/* Promo Banner */}
      <div className="mb-5 p-4 p-md-5 rounded-4 text-center text-white" style={{ background: 'var(--primary-gradient)', position: 'relative', overflow: 'hidden' }}>
        <h2 className="fw-bold display-6 mb-2" style={{ color: '#fff' }}>Back to School Promo 🎒</h2>
        <p className="fs-5 mb-0" style={{ color: 'rgba(255,255,255,0.88)' }}>Support student entrepreneurs! Buy locally from campus stores.</p>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-5 flex-wrap gap-3">
        <div>
          <h2 className="display-6 fw-bold mb-1" style={{ color: 'var(--text-primary)' }}>
            Campus <span className="text-gradient">Marketplace</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)' }} className="mb-0">Discover products and services offered directly by MTU students.</p>
        </div>
        <Link to="/stores" className="btn btn-premium d-flex align-items-center gap-2">
          <FaStore size={14} /> Browse Store Directory
        </Link>
      </div>

      {/* Search + Filters */}
      <Row className="mb-4 g-3 align-items-center">
        <Col md={5}>
          <InputGroup>
            <InputGroup.Text style={{ background: 'var(--input-bg)', borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
              <FaSearch />
            </InputGroup.Text>
            <Form.Control
              placeholder="Search products, textbooks, snacks…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ background: 'var(--input-bg)', borderColor: 'var(--border-color)', color: 'var(--input-text)', borderLeft: 'none' }}
            />
          </InputGroup>
        </Col>
        <Col md={4}>
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
        <Col md={3} className="text-end">
          <div className="d-flex align-items-center justify-content-md-end gap-2">
            <span className="small text-muted" style={{ whiteSpace: 'nowrap' }}>Sort by:</span>
            <Form.Select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)} 
              style={{ width: 'auto', background: 'var(--input-bg)', color: 'var(--input-text)', borderColor: 'var(--border-color)', fontSize: '0.85rem' }}
              className="rounded-3 py-1"
            >
              <option value="newest">Newest</option>
              <option value="cheapest">Cheapest First</option>
              <option value="highest">Highest Price First</option>
            </Form.Select>
          </div>
        </Col>
      </Row>

      {/* Product Grid */}
      <Row className="g-4">
        {sortedProducts.map(product => (
          <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
            <ProductCard {...product} />
          </Col>
        ))}
        {sortedProducts.length === 0 && (
          <Col xs={12} className="text-center py-5">
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>No products found matching your search.</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Marketplace;
