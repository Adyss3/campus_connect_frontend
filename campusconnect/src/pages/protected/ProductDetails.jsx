import React, { useState } from 'react';
import { Container, Row, Col, Button, Badge, Form, Card } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FaArrowLeft, FaShoppingCart, FaCheck, FaStore } from 'react-icons/fa';
import { useAppContext } from '../../context/AppContext';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, stores, addToCart } = useAppContext();
  
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState('M');
  const [added, setAdded] = useState(false);

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <Container className="py-5 text-center">
        <h4 className="mb-3">Product not found</h4>
        <Button variant="success" onClick={() => navigate('/marketplace')}>Back to Marketplace</Button>
      </Container>
    );
  }

  const store = stores.find(s => s.id === product.storeId);

  const handleAddToCart = () => {
    addToCart(product, qty, size);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <Container className="py-5">
      <Button variant="link" className="text-secondary text-decoration-none px-0 mb-4 d-flex align-items-center" onClick={() => navigate('/marketplace')}>
        <FaArrowLeft className="me-2" /> Back to Marketplace
      </Button>

      <Row className="g-5">
        <Col md={6}>
          <div className="rounded-4 p-5 d-flex justify-content-center align-items-center h-100" style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', minHeight: '350px' }}>
            <img src={product.imageUrl} alt={product.name} className="img-fluid rounded shadow-sm" style={{ maxHeight: '100%', objectFit: 'contain' }} />
          </div>
        </Col>
        <Col md={6}>
          <div className="d-flex align-items-center justify-content-between mb-2">
            <Badge bg="success" className="px-3 py-2 rounded-pill">{product.category}</Badge>
            {store && (
              <Link to={`/store/${store.id}`} className="text-decoration-none small text-success fw-bold d-inline-flex align-items-center">
                <FaStore className="me-1" /> {store.storeName}
              </Link>
            )}
          </div>
          
          <h2 className="fw-bold display-6 mb-3" style={{ color: 'var(--text-primary)' }}>{product.name}</h2>
          <h3 className="text-success fw-bold mb-4">₦{product.price.toLocaleString()}</h3>
          
          <p className="lh-lg mb-4" style={{ color: 'var(--text-secondary)' }}>{product.description}</p>
          
          {product.category === 'Apparel' && (
            <div className="d-flex align-items-center flex-wrap mb-4 gap-2">
              <span className="me-2 fw-bold" style={{ color: 'var(--text-primary)' }}>Size:</span>
              {['S', 'M', 'L', 'XL'].map(s => (
                <button 
                  key={s} 
                  className="px-3 py-1 rounded-pill"
                  style={{ 
                    background: size === s ? 'var(--primary-color)' : 'var(--input-bg)',
                    color: size === s ? '#fff' : 'var(--input-text)',
                    border: `1px solid ${size === s ? 'var(--primary-color)' : 'var(--border-color)'}`,
                    fontWeight: 600, fontSize: '0.85rem'
                  }}
                  onClick={() => setSize(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <div className="d-flex align-items-center mb-4">
            <span className="me-3 fw-bold" style={{ color: 'var(--text-primary)' }}>Quantity:</span>
            <Form.Select 
              value={qty} 
              onChange={e => setQty(Number(e.target.value))} 
              style={{ width: '80px', background: 'var(--input-bg)', color: 'var(--input-text)', borderColor: 'var(--border-color)' }}
              className="rounded-3"
            >
              {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
            </Form.Select>
          </div>
          
          <div className="d-grid mt-5 gap-2">
            <Button 
              variant={added ? "primary" : "success"} 
              size="lg" 
              className="btn-premium py-3 shadow-sm d-flex align-items-center justify-content-center transition-all w-100" 
              onClick={handleAddToCart}
            >
              {added ? (
                <><FaCheck className="me-2" /> Added to Cart!</>
              ) : (
                <><FaShoppingCart className="me-2" /> Add to Cart</>
              )}
            </Button>
          </div>

          {/* Store Info Card */}
          {store && (
            <Card className="border-0 shadow-sm rounded-4 mt-5 p-3" style={{ background: 'var(--card-bg-alt)' }}>
              <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                <div className="d-flex align-items-center gap-3">
                  <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: '#fff', border: '1px solid var(--border-color)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={store.logo} alt={store.storeName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div>
                    <h6 className="fw-bold mb-0" style={{ color: 'var(--text-primary)' }}>{store.storeName}</h6>
                    <small className="text-muted d-block">{store.category} Store · {store.followers?.length || 0} Followers</small>
                  </div>
                </div>
                <Link to={`/store/${store.id}`} className="btn btn-premium btn-sm rounded-pill">
                  View Store
                </Link>
              </div>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;
