import React, { useState } from 'react';
import { Container, Row, Col, Form, InputGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import ProductCard from '../../components/marketplace/ProductCard';

const mockProducts = [
  { id: 1, name: 'Campus Hoodie - Black', price: 29.99, oldPrice: 59.99, category: 'Apparel', imageUrl: 'https://placehold.co/300x220?text=Hoodie' },
  { id: 2, name: 'Intro to Physics Textbook', price: 45.00, oldPrice: 90.00, category: 'Books', imageUrl: 'https://placehold.co/300x220?text=Textbook' },
  { id: 3, name: 'Wireless Headphones', price: 89.99, category: 'Electronics', imageUrl: 'https://placehold.co/300x220?text=Headphones' },
  { id: 4, name: 'Dorm Room Mini Fridge', price: 120.00, oldPrice: 150.00, category: 'Furniture', imageUrl: 'https://placehold.co/300x220?text=Fridge' },
  { id: 5, name: 'Vintage Varsity Jacket', price: 55.00, category: 'Apparel', imageUrl: 'https://placehold.co/300x220?text=Jacket' },
  { id: 6, name: 'Calculus Early Transcendentals', price: 60.00, category: 'Books', imageUrl: 'https://placehold.co/300x220?text=Calc+Book' },
];

const CATEGORIES = ['All', 'Apparel', 'Books', 'Electronics', 'Furniture'];

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');

  const filteredProducts = mockProducts.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'All' || p.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <Container className="py-5">
      {/* Promo Banner */}
      <div className="mb-5 p-4 p-md-5 rounded-4 text-center text-white" style={{ background: 'var(--primary-gradient)', position: 'relative', overflow: 'hidden' }}>
        <h2 className="fw-bold display-6 mb-2" style={{ color: '#fff' }}>Back to School Promo 🎒</h2>
        <p className="fs-5 mb-0" style={{ color: 'rgba(255,255,255,0.88)' }}>Up to <strong>50% OFF</strong> on selected items. Don't miss out!</p>
      </div>

      {/* Search + Filters */}
      <Row className="mb-4 g-3 align-items-center">
        <Col md={6}>
          <InputGroup>
            <InputGroup.Text style={{ background: 'var(--input-bg)', borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
              <FaSearch />
            </InputGroup.Text>
            <Form.Control
              placeholder="Search products, textbooks…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ background: 'var(--input-bg)', borderColor: 'var(--border-color)', color: 'var(--input-text)', borderLeft: 'none' }}
            />
          </InputGroup>
        </Col>
        <Col md={6}>
          <div className="d-flex gap-2 flex-wrap">
            {CATEGORIES.map(cat => (
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

      {/* Product Grid */}
      <Row className="g-4">
        {filteredProducts.map(product => (
          <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
            <ProductCard {...product} />
          </Col>
        ))}
        {filteredProducts.length === 0 && (
          <Col xs={12} className="text-center py-5">
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>No products found matching your search.</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Marketplace;
