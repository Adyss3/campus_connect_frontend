import React, { useState } from 'react';
import { Container, Row, Col, Button, Badge, Form } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaShoppingCart, FaCheck } from 'react-icons/fa';
import { useAppContext } from '../../context/AppContext';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useAppContext();
  
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState('M');
  const [added, setAdded] = useState(false);

  // Mock data for any product
  const product = {
    id: id || 'item-1',
    name: 'Campus Hoodie - Premium Edition',
    price: 59.99,
    description: 'Show your university pride with this ultra-comfortable, durable hoodie. Made with 100% organic cotton, featuring a classic fit and a cozy fleece lining. Perfect for those late-night study sessions or early morning classes.',
    category: 'Apparel',
    imageUrl: 'https://placehold.co/600x600?text=Premium+Hoodie'
  };

  const handleAddToCart = () => {
    addToCart(product, qty, size);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <Container className="py-5">
      <Button variant="link" className="text-secondary text-decoration-none px-0 mb-4 d-flex align-items-center" onClick={() => navigate(-1)}>
        <FaArrowLeft className="me-2" /> Back to Marketplace
      </Button>

      <Row className="g-5">
        <Col md={6}>
          <div className="rounded-4 p-5 d-flex justify-content-center align-items-center h-100" style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}>
            <img src={product.imageUrl} alt={product.name} className="img-fluid rounded shadow-sm" />
          </div>
        </Col>
        <Col md={6}>
          <Badge bg="success" className="mb-2 px-3 py-2 rounded-pill">{product.category}</Badge>
          <h2 className="fw-bold display-6 mb-3" style={{ color: 'var(--text-primary)' }}>{product.name}</h2>
          <h3 className="text-success fw-bold mb-4">${product.price}</h3>
          
          <p className="lh-lg mb-4" style={{ color: 'var(--text-secondary)' }}>{product.description}</p>
          
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
          
          <div className="d-grid mt-5">
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
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;
