import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash, FaMinus, FaPlus, FaShoppingCart } from 'react-icons/fa';
import { useAppContext } from '../../context/AppContext';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateCartQty, clearCart } = useAppContext();

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const tax = 500;
  const total = subtotal + tax;

  if (cart.length === 0) {
    return (
      <Container className="py-5 text-center" style={{ maxWidth: '500px' }}>
        <FaShoppingCart size={64} style={{ color: 'var(--text-muted)', marginBottom: 20 }} />
        <h4 className="fw-bold mb-2" style={{ color: 'var(--text-primary)' }}>Your cart is empty</h4>
        <p style={{ color: 'var(--text-secondary)' }}>Add some items from the marketplace to get started.</p>
        <Link to="/marketplace" className="btn-premium text-decoration-none mt-2 d-inline-block">
          Continue Shopping
        </Link>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <h2 className="fw-bold mb-0" style={{ color: 'var(--text-primary)' }}>Your Cart</h2>
        <button
          onClick={clearCart}
          style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 500 }}
        >
          Clear all
        </button>
      </div>

      <Row className="g-4">
        {/* Items */}
        <Col lg={8}>
          <div className="d-flex flex-column gap-3">
            {cart.map((item, idx) => (
              <div
                key={`${item.id}-${item.size}-${idx}`}
                style={{ background: 'var(--card-bg)', borderRadius: 16, border: '1px solid var(--border-color)', padding: '1.25rem' }}
                className="d-flex align-items-center gap-3 flex-wrap"
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 12, flexShrink: 0, background: 'var(--bg-primary)' }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="fw-semibold" style={{ color: 'var(--text-primary)', fontSize: '0.95rem', lineHeight: 1.3 }}>{item.name}</div>
                  {item.size && <div style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', marginTop: 2 }}>Size: {item.size}</div>}
                  <div className="fw-bold text-success mt-1">₦{item.price.toLocaleString()}</div>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <div
                    className="d-flex align-items-center"
                    style={{ border: '1px solid var(--border-color)', borderRadius: 10, overflow: 'hidden', background: 'var(--bg-primary)' }}
                  >
                    <button
                      onClick={() => updateCartQty(item.id, item.size, -1)}
                      style={{ width: 36, height: 36, border: 'none', background: 'transparent', color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      <FaMinus size={10} />
                    </button>
                    <span style={{ minWidth: 28, textAlign: 'center', fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.95rem' }}>{item.qty}</span>
                    <button
                      onClick={() => updateCartQty(item.id, item.size, 1)}
                      style={{ width: 36, height: 36, border: 'none', background: 'transparent', color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      <FaPlus size={10} />
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id, item.size)}
                    style={{ width: 36, height: 36, border: '1px solid #FED7D7', borderRadius: 10, background: 'transparent', color: '#E53E3E', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <FaTrash size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Col>

        {/* Summary */}
        <Col lg={4}>
          <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: 20, padding: '1.5rem', position: 'sticky', top: 90 }}>
            <h5 className="fw-bold mb-4" style={{ color: 'var(--text-primary)' }}>Order Summary</h5>

            <div className="d-flex justify-content-between mb-2">
              <span style={{ color: 'var(--text-secondary)' }}>Subtotal</span>
              <span className="fw-semibold" style={{ color: 'var(--text-primary)' }}>₦{subtotal.toLocaleString()}</span>
            </div>
            <div className="d-flex justify-content-between mb-3">
              <span style={{ color: 'var(--text-secondary)' }}>Taxes & Fees</span>
              <span className="fw-semibold" style={{ color: 'var(--text-primary)' }}>₦{tax.toLocaleString()}</span>
            </div>
            <hr style={{ borderColor: 'var(--border-color)', opacity: 1 }} />
            <div className="d-flex justify-content-between mb-4">
              <span className="fw-bold fs-5" style={{ color: 'var(--text-primary)' }}>Total</span>
              <span className="fw-bold fs-5 text-success">₦{total.toLocaleString()}</span>
            </div>

            <button
              className="btn-premium w-100 justify-content-center py-3"
              onClick={() => navigate('/checkout')}
            >
              Proceed to Checkout
            </button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
