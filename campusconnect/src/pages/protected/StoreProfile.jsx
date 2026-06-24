import React from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FaArrowLeft, FaEnvelope, FaPhone, FaInstagram, FaTwitter, FaGlobe, FaEdit, FaCog } from 'react-icons/fa';
import { useAppContext } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import ProductCard from '../../components/marketplace/ProductCard';

const StoreProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { stores, products, followStore, unfollowStore } = useAppContext();
  const { user } = useAuth();

  const store = stores.find(s => s.id === id);

  if (!store) {
    return (
      <Container className="py-5 text-center">
        <h4 className="mb-3">Store not found</h4>
        <Button variant="success" onClick={() => navigate('/stores')}>Back to Directory</Button>
      </Container>
    );
  }

  const isOwner = user?.id === store.ownerId;
  const isFollowing = store.followers?.includes(user?.id);
  const storeProducts = products.filter(p => p.storeId === id);

  const handleFollowToggle = () => {
    if (!user) return;
    if (isFollowing) {
      unfollowStore(store.id, user.id);
    } else {
      followStore(store.id, user.id);
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh' }}>
      {/* Store Banner */}
      <div style={{ height: '240px', background: 'var(--primary-gradient)', position: 'relative', overflow: 'hidden' }}>
        {store.banner ? (
          <img src={store.banner} alt={store.storeName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : null}
        <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 10 }}>
          <Button variant="light" className="shadow-sm rounded-pill px-3 py-2 fw-bold" onClick={() => navigate('/stores')}>
            <FaArrowLeft className="me-2" /> Back to Stores
          </Button>
        </div>
      </div>

      <Container style={{ marginTop: '-80px', position: 'relative', zIndex: 5 }} className="pb-5">
        <Row className="g-4">
          {/* Sidebar / Store Info Card */}
          <Col lg={4}>
            <Card className="border-0 shadow-sm rounded-4 overflow-hidden mb-4" style={{ background: 'var(--card-bg)' }}>
              <Card.Body className="p-4 text-center">
                {/* Store Logo */}
                <div className="mx-auto mb-3" style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '24px',
                  background: 'var(--bg-secondary)',
                  border: '5px solid var(--card-bg)',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.1)'
                }}>
                  <img src={store.logo} alt={store.storeName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>

                <Badge bg="success" className="rounded-pill px-3 py-1 mb-2">{store.category}</Badge>
                <h4 className="fw-bold mb-1" style={{ color: 'var(--text-primary)' }}>{store.storeName}</h4>
                <p className="small text-muted mb-3">👥 {store.followers?.length || 0} Followers</p>

                {isOwner ? (
                  <div className="d-grid gap-2 mb-4">
                    <Link to="/store/dashboard" className="btn btn-premium w-100 py-2 d-flex align-items-center justify-content-center">
                      <FaCog className="me-2" /> Store Dashboard
                    </Link>
                    <Link to="/store/edit" className="btn btn-premium-outline w-100 py-2 d-flex align-items-center justify-content-center">
                      <FaEdit className="me-2" /> Edit Store Identity
                    </Link>
                  </div>
                ) : (
                  <Button
                    onClick={handleFollowToggle}
                    variant={isFollowing ? 'light' : 'success'}
                    className={`w-100 fw-bold py-2 mb-4 rounded-pill ${!isFollowing ? 'btn-premium' : ''}`}
                    style={isFollowing ? { border: '1px solid var(--border-color)', color: 'var(--text-primary)' } : {}}
                  >
                    {isFollowing ? 'Following' : 'Follow Store'}
                  </Button>
                )}

                <hr style={{ borderColor: 'var(--border-color)' }} />

                <div className="text-start mt-3">
                  <h6 className="fw-bold mb-3" style={{ color: 'var(--text-primary)' }}>About Brand</h6>
                  <p className="small text-muted mb-4" style={{ lineHeight: '1.6' }}>{store.description}</p>

                  <h6 className="fw-bold mb-3" style={{ color: 'var(--text-primary)' }}>Contact Details</h6>
                  {store.contactDetails?.email && (
                    <p className="small text-muted mb-2 d-flex align-items-center">
                      <FaEnvelope className="me-2 text-success" /> {store.contactDetails.email}
                    </p>
                  )}
                  {store.contactDetails?.phone && (
                    <p className="small text-muted mb-4 d-flex align-items-center">
                      <FaPhone className="me-2 text-success" /> {store.contactDetails.phone}
                    </p>
                  )}

                  {(store.socialLinks?.instagram || store.socialLinks?.twitter || store.socialLinks?.website) && (
                    <>
                      <h6 className="fw-bold mb-3" style={{ color: 'var(--text-primary)' }}>Connect</h6>
                      <div className="d-flex gap-3">
                        {store.socialLinks.instagram && (
                          <a href={`https://instagram.com/${store.socialLinks.instagram}`} target="_blank" rel="noreferrer" className="text-muted hover-lift" title="Instagram">
                            <FaInstagram size={20} />
                          </a>
                        )}
                        {store.socialLinks.twitter && (
                          <a href={`https://twitter.com/${store.socialLinks.twitter}`} target="_blank" rel="noreferrer" className="text-muted hover-lift" title="Twitter">
                            <FaTwitter size={20} />
                          </a>
                        )}
                        {store.socialLinks.website && (
                          <a href={`https://${store.socialLinks.website}`} target="_blank" rel="noreferrer" className="text-muted hover-lift" title="Website">
                            <FaGlobe size={20} />
                          </a>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Product Listing Section */}
          <Col lg={8}>
            <Card className="border-0 shadow-sm rounded-4 overflow-hidden" style={{ background: 'var(--card-bg)' }}>
              <Card.Header style={{ background: 'transparent', borderBottom: '1px solid var(--border-color)' }} className="p-4">
                <h5 className="fw-bold mb-0" style={{ color: 'var(--text-primary)' }}>Products offered by {store.storeName}</h5>
              </Card.Header>
              <Card.Body className="p-4">
                <Row className="g-4">
                  {storeProducts.map(product => (
                    <Col key={product.id} xs={12} sm={6} md={6}>
                      <ProductCard {...product} />
                    </Col>
                  ))}

                  {storeProducts.length === 0 && (
                    <Col xs={12} className="text-center py-5">
                      <div className="text-muted mb-3" style={{ fontSize: '3rem' }}>🛍️</div>
                      <h6 className="fw-bold text-muted mb-2">No products catalogued yet</h6>
                      <p className="small text-muted mb-0">Check back later or check other campus stores.</p>
                    </Col>
                  )}
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default StoreProfile;
