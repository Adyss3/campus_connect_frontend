import React, { useState } from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaShoppingCart, FaCheck, FaStore } from 'react-icons/fa';
import { useAppContext } from '../../context/AppContext';

const ProductCard = ({ id, name, price, oldPrice, category, imageUrl, storeId }) => {
  const { favorites, toggleFavorite, stores, addToCart } = useAppContext();
  const isFavorite = favorites.includes(id);
  const [added, setAdded] = useState(false);

  // Find store details
  const store = stores.find(s => s.id === storeId);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ id, name, price, oldPrice, category, imageUrl, storeId }, 1, 'M');
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div
      className="hover-lift h-100 d-flex flex-column"
      style={{
        background: 'var(--card-bg)',
        border: '1px solid var(--border-color)',
        borderRadius: 18,
        overflow: 'hidden',
        position: 'relative',
        transition: 'all 0.3s cubic-bezier(0.25,0.8,0.25,1)',
      }}
    >
      {/* Sale Badge */}
      {oldPrice && (
        <Badge
          bg="danger"
          className="position-absolute rounded-pill px-3 py-2"
          style={{ top: 12, left: 12, zIndex: 2, fontSize: '0.72rem' }}
        >
          Sale
        </Badge>
      )}

      {/* Favorite Button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleFavorite(id);
        }}
        style={{
          position: 'absolute', top: 10, right: 10, zIndex: 2,
          width: 34, height: 34, borderRadius: '50%',
          background: 'var(--card-bg)',
          border: '1px solid var(--border-color)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', transition: 'all 0.2s',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        {isFavorite
          ? <FaHeart color="#E53E3E" size={15} />
          : <FaRegHeart style={{ color: 'var(--text-secondary)' }} size={15} />
        }
      </button>

      {/* Product Image */}
      <Link to={`/product/${id}`} style={{ textDecoration: 'none' }}>
        <div
          style={{
            height: 180, background: 'var(--bg-primary)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem',
          }}
        >
          <img
            src={imageUrl}
            alt={name}
            style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
          />
        </div>
      </Link>

      {/* Details */}
      <div className="d-flex flex-column p-3" style={{ flex: 1 }}>
        <div className="d-flex justify-content-between align-items-center mb-1">
          <span style={{ color: 'var(--primary-color)', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            {category}
          </span>
          {store && (
            <Link to={`/store/${store.id}`} className="text-decoration-none small text-success fw-bold d-inline-flex align-items-center" style={{ fontSize: '0.78rem' }}>
              <FaStore className="me-1" size={10} /> {store.storeName}
            </Link>
          )}
        </div>
        
        <Link to={`/product/${id}`} className="text-decoration-none" style={{ color: 'inherit' }}>
          <div className="fw-bold mb-2 text-gradient-hover" style={{ color: 'var(--text-primary)', fontSize: '0.9rem', lineHeight: 1.35, height: '36px', overflow: 'hidden' }}>
            {name}
          </div>
        </Link>

        <div className="d-flex align-items-center justify-content-between mt-auto pt-2" style={{ borderTop: '1px solid var(--border-color)' }}>
          <div>
            <span className="fw-bold text-success me-2" style={{ fontSize: '1rem' }}>₦{price.toLocaleString()}</span>
            {oldPrice && (
              <span style={{ color: 'var(--text-muted)', textDecoration: 'line-through', fontSize: '0.78rem' }}>
                ₦{oldPrice.toLocaleString()}
              </span>
            )}
          </div>
          <div className="d-flex gap-1">
            <Link
              to={`/product/${id}`}
              className="btn btn-sm btn-light border fw-bold rounded-pill px-2"
              style={{ fontSize: '0.72rem', color: 'var(--text-primary)' }}
            >
              Info
            </Link>
            <Button
              size="sm"
              variant={added ? "primary" : "success"}
              className="fw-bold rounded-pill px-3 d-flex align-items-center"
              style={!added ? { background: 'var(--primary-gradient)', border: 'none', fontSize: '0.72rem' } : { fontSize: '0.72rem' }}
              onClick={handleAddToCart}
            >
              {added ? <FaCheck size={10} /> : <><FaShoppingCart className="me-1" size={10} /> Add</>}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
