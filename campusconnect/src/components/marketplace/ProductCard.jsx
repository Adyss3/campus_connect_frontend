import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useAppContext } from '../../context/AppContext';

const ProductCard = ({ id, name, price, oldPrice, category, imageUrl }) => {
  const { favorites, toggleFavorite } = useAppContext();
  const isFavorite = favorites.includes(id);

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
        onClick={() => toggleFavorite(id)}
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
      <div
        style={{
          height: 200, background: 'var(--bg-primary)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem',
        }}
      >
        <img
          src={imageUrl}
          alt={name}
          style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
        />
      </div>

      {/* Details */}
      <div className="d-flex flex-column p-3" style={{ flex: 1 }}>
        <div style={{ color: 'var(--primary-color)', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>
          {category}
        </div>
        <div className="fw-bold mb-2" style={{ color: 'var(--text-primary)', fontSize: '0.92rem', lineHeight: 1.35, flex: 1 }}>
          {name}
        </div>
        <div className="d-flex align-items-center justify-content-between mt-auto pt-2" style={{ borderTop: '1px solid var(--border-color)' }}>
          <div>
            <span className="fw-bold text-success me-2" style={{ fontSize: '1.05rem' }}>${price}</span>
            {oldPrice && (
              <span style={{ color: 'var(--text-muted)', textDecoration: 'line-through', fontSize: '0.82rem' }}>
                ${oldPrice}
              </span>
            )}
          </div>
          <Link
            to={`/product/${id}`}
            className="btn btn-sm fw-bold rounded-pill px-3"
            style={{
              background: 'var(--primary-gradient)',
              color: '#fff',
              border: 'none',
              fontSize: '0.8rem',
            }}
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
