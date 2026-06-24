import React, { useState } from 'react';
import { Container, Row, Col, Card, Badge, Button, Table, Modal, Form, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { FaStore, FaPlus, FaEdit, FaTrash, FaEye, FaUsers, FaBoxOpen, FaChartLine } from 'react-icons/fa';
import { useAppContext } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';

const StoreDashboard = () => {
  const { user } = useAuth();
  const { stores, products, addProduct, updateProduct, deleteProduct } = useAppContext();
  const navigate = useNavigate();

  const store = stores.find(s => s.id === user?.storeId || s.ownerId === user?.id);

  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  
  const [productForm, setProductForm] = useState({
    name: '',
    price: '',
    oldPrice: '',
    category: 'Apparel',
    imageUrl: '',
    description: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // If user doesn't own a store, show prompt
  if (!user?.hasStore || !store) {
    return (
      <Container className="py-5 text-center">
        <Card className="glass-card p-5 border-0 rounded-4 mx-auto" style={{ maxWidth: '500px', background: 'var(--card-bg)' }}>
          <div className="fs-1 mb-3">🏢</div>
          <h4 className="fw-bold mb-3" style={{ color: 'var(--text-primary)' }}>Register Your Brand</h4>
          <p className="text-muted mb-4">To start cataloguing products, you first need to establish your store identity on Campus Connect.</p>
          <Link to="/store/create" className="btn btn-premium px-4 py-2">Create a Store</Link>
        </Card>
      </Container>
    );
  }

  const storeProducts = products.filter(p => p.storeId === store.id);

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setProductForm({
      name: '',
      price: '',
      oldPrice: '',
      category: store.category || 'Apparel',
      imageUrl: '',
      description: ''
    });
    setError('');
    setShowProductModal(true);
  };

  const handleOpenEditModal = (product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      price: product.price,
      oldPrice: product.oldPrice || '',
      category: product.category,
      imageUrl: product.imageUrl,
      description: product.description || ''
    });
    setError('');
    setShowProductModal(true);
  };

  const handleProductSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!productForm.name || !productForm.price || !productForm.description) {
      setError('Please fill out all required fields.');
      return;
    }

    try {
      if (editingProduct) {
        // Edit existing product
        updateProduct(editingProduct.id, productForm);
        setSuccess('Product updated successfully!');
      } else {
        // Add new product
        addProduct({
          ...productForm,
          storeId: store.id,
          ownerId: user.id
        });
        setSuccess('Product added to catalog!');
      }

      setTimeout(() => {
        setShowProductModal(false);
        setSuccess('');
      }, 1000);
    } catch (err) {
      setError('Something went wrong. Please check your inputs.');
    }
  };

  const handleDelete = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(productId);
    }
  };

  const stats = [
    { title: 'Store Followers', value: store.followers?.length || 0, icon: <FaUsers size={20} className="text-success" />, desc: 'Users following your brand' },
    { title: 'Catalogued Products', value: storeProducts.length, icon: <FaBoxOpen size={20} className="text-primary" />, desc: 'Active products listed' },
    { title: 'Store Views', value: (storeProducts.length * 15) + (store.followers?.length || 0) * 8 + 4, icon: <FaChartLine size={20} className="text-warning" />, desc: 'Simulated catalog traffic' }
  ];

  return (
    <Container className="py-5">
      {/* Dashboard Header */}
      <Row className="mb-5 align-items-center g-3">
        <Col>
          <span className="text-success fw-bold text-uppercase small mb-2 d-block" style={{ letterSpacing: '0.08em' }}>
            Store Management Center
          </span>
          <h2 className="display-6 fw-bold mb-1" style={{ color: 'var(--text-primary)' }}>
            Manager for <span className="text-gradient">{store.storeName}</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)' }} className="mb-0">Add products, edit details, and analyze your customer reach.</p>
        </Col>
        <Col xs="auto" className="d-flex gap-2">
          <Link to={`/store/${store.id}`} className="btn btn-premium-outline rounded-pill px-4">
            <FaEye className="me-2" /> View Storefront
          </Link>
          <Button onClick={handleOpenAddModal} className="btn-premium rounded-pill px-4">
            <FaPlus className="me-2" /> Add Product
          </Button>
        </Col>
      </Row>

      {/* Stats Cards */}
      <Row className="g-4 mb-5">
        {stats.map((stat, idx) => (
          <Col md={4} key={idx}>
            <Card className="border-0 shadow-sm rounded-4" style={{ background: 'var(--card-bg)' }}>
              <Card.Body className="p-4 d-flex align-items-center justify-content-between">
                <div>
                  <small className="text-muted d-block mb-1">{stat.title}</small>
                  <h3 className="fw-bold mb-1" style={{ color: 'var(--text-primary)' }}>{stat.value}</h3>
                  <span className="small text-muted" style={{ fontSize: '0.75rem' }}>{stat.desc}</span>
                </div>
                <div className="bg-light p-3 rounded-3" style={{ background: 'var(--bg-primary)' }}>
                  {stat.icon}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Catalog Table */}
      <Card className="border-0 shadow-sm rounded-4 overflow-hidden" style={{ background: 'var(--card-bg)' }}>
        <Card.Header style={{ background: 'transparent', borderBottom: '1px solid var(--border-color)' }} className="pt-4 pb-3 px-4 d-flex justify-content-between align-items-center">
          <h5 className="fw-bold mb-0" style={{ color: 'var(--text-primary)' }}>Product Catalog</h5>
          <Link to="/store/edit" className="btn btn-sm btn-light rounded-pill px-3 fw-bold" style={{ border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>
            Edit Store Identity
          </Link>
        </Card.Header>
        <Card.Body className="p-0">
          <Table responsive hover className="mb-0 align-middle">
            <thead className="table-dark" style={{ background: '#1A202C' }}>
              <tr>
                <th className="px-4 py-3">Product</th>
                <th className="py-3">Category</th>
                <th className="py-3">Price</th>
                <th className="py-3">Old Price</th>
                <th className="px-4 py-3 text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {storeProducts.map(product => (
                <tr key={product.id}>
                  <td className="px-4 py-3">
                    <div className="d-flex align-items-center">
                      <div className="rounded me-3 d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px', background: 'var(--bg-primary)', overflow: 'hidden' }}>
                        <img src={product.imageUrl} alt={product.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                      </div>
                      <div>
                        <div className="fw-bold" style={{ color: 'var(--text-primary)', fontSize: '0.9rem' }}>{product.name}</div>
                        <div className="text-muted small text-truncate" style={{ maxWidth: '280px' }}>{product.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3">
                    <Badge bg="light" className="text-secondary border rounded-pill px-3 py-1" style={{ fontSize: '0.75rem' }}>{product.category}</Badge>
                  </td>
                  <td className="py-3 fw-bold text-success">₦{product.price.toLocaleString()}</td>
                  <td className="py-3 text-muted" style={{ textDecoration: 'line-through' }}>
                    {product.oldPrice ? `₦${product.oldPrice.toLocaleString()}` : '-'}
                  </td>
                  <td className="px-4 py-3 text-end">
                    <div className="d-flex gap-2 justify-content-end">
                      <Button variant="light" size="sm" className="rounded-circle p-2 border" title="Edit Product" onClick={() => handleOpenEditModal(product)} style={{ color: 'var(--text-primary)' }}>
                        <FaEdit size={14} />
                      </Button>
                      <Button variant="light" size="sm" className="rounded-circle p-2 border text-danger" title="Delete Product" onClick={() => handleDelete(product.id)}>
                        <FaTrash size={14} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}

              {storeProducts.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-5 text-muted">
                    <div className="fs-3 mb-2">📦</div>
                    <div className="fw-bold mb-1">Your store catalog is empty</div>
                    <small>Get started by clicking the "Add Product" button above.</small>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Product Add/Edit Modal */}
      <Modal show={showProductModal} onHide={() => setShowProductModal(false)} centered contentClassName="rounded-4 border-0">
        <div style={{ height: 4, background: 'var(--primary-gradient)', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }} />
        <Modal.Header closeButton className="border-0 px-4 pt-4 pb-0">
          <Modal.Title className="fw-bold">{editingProduct ? 'Modify Product Details' : 'Catalogue New Product'}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <Form onSubmit={handleProductSubmit}>
            <Form.Group className="mb-3" controlId="prodName">
              <Form.Label style={{ fontWeight: 600 }}>Product Name*</Form.Label>
              <Form.Control
                type="text"
                value={productForm.name}
                onChange={e => setProductForm({ ...productForm, name: e.target.value })}
                placeholder="e.g. Classic College Sweatshirt"
                required
              />
            </Form.Group>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="prodPrice">
                  <Form.Label style={{ fontWeight: 600 }}>Price (₦)*</Form.Label>
                  <Form.Control
                    type="number" step="0.01" min="0"
                    value={productForm.price}
                    onChange={e => setProductForm({ ...productForm, price: e.target.value })}
                    placeholder="25.00"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="prodOldPrice">
                  <Form.Label style={{ fontWeight: 600 }}>Original Price (₦)</Form.Label>
                  <Form.Control
                    type="number" step="0.01" min="0"
                    value={productForm.oldPrice}
                    onChange={e => setProductForm({ ...productForm, oldPrice: e.target.value })}
                    placeholder="35.00"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="prodCategory">
                  <Form.Label style={{ fontWeight: 600 }}>Category*</Form.Label>
                  <Form.Select
                    value={productForm.category}
                    onChange={e => setProductForm({ ...productForm, category: e.target.value })}
                    required
                  >
                    <option value="Apparel">Apparel & Fashion</option>
                    <option value="Food & Snacks">Food & Snacks</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Books">Books & Stationery</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Services">Services</option>
                    <option value="Other">Other</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="prodImage">
                  <Form.Label style={{ fontWeight: 600 }}>Image URL</Form.Label>
                  <Form.Control
                    type="text"
                    value={productForm.imageUrl}
                    onChange={e => setProductForm({ ...productForm, imageUrl: e.target.value })}
                    placeholder="https://..."
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-4" controlId="prodDesc">
              <Form.Label style={{ fontWeight: 600 }}>Description*</Form.Label>
              <Form.Control
                as="textarea" rows={3}
                value={productForm.description}
                onChange={e => setProductForm({ ...productForm, description: e.target.value })}
                placeholder="Product material, dimensions, condition or sizing specifications..."
                required
                style={{ resize: 'none' }}
              />
            </Form.Group>

            <div className="d-flex justify-content-end gap-2 mt-4">
              <Button variant="light" onClick={() => setShowProductModal(false)} className="rounded-pill fw-bold border px-3">
                Cancel
              </Button>
              <Button variant="success" type="submit" className="btn-premium px-4">
                {editingProduct ? 'Save Changes' : 'Add to Catalog'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default StoreDashboard;
