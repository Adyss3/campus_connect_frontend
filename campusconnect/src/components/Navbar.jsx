import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar as BsNavbar, Nav, Container, NavDropdown, Badge, Offcanvas } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useAppContext } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';
import { useMessaging } from '../context/MessagingContext';
import { FaUserCircle, FaShoppingCart, FaMoon, FaSun, FaCommentDots } from 'react-icons/fa';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { cart } = useAppContext();
    const { theme, toggleTheme } = useTheme();
    const { getTotalUnread } = useMessaging();
    const navigate = useNavigate();

    const [showMenu, setShowMenu] = useState(false);
    const handleClose = () => setShowMenu(false);
    const handleShow = () => setShowMenu(true);

    const handleLogout = () => {
        handleClose();
        logout();
        navigate('/login');
    };

    const cartCount = cart.reduce((total, item) => total + item.qty, 0);
    const unreadMessages = getTotalUnread('u1'); // current user is always 'u1' in mock

    return (
        <BsNavbar className="shadow-sm border-bottom py-2" expand="lg" sticky="top" style={{ background: 'var(--nav-bg)' }} collapseOnSelect>
            <Container>
                <BsNavbar.Brand as={Link} to="/dashboard" className="d-flex align-items-center py-0">
                    <img src="/logo.png" alt="Campus Connect" className="nav-logo" style={{ transformOrigin: 'left center', objectFit: 'contain' }} />
                </BsNavbar.Brand>
                
                <div className="d-flex align-items-center gap-2 d-lg-none">
                    {/* Theme Toggle (Mobile) */}
                    <button
                        className="nav-icon-btn p-2 rounded-circle border-0 bg-transparent"
                        onClick={toggleTheme}
                        style={{ color: 'var(--text-primary)' }}
                    >
                        {theme === 'dark' ? <FaSun size={20} /> : <FaMoon size={20} />}
                    </button>
                    <BsNavbar.Toggle onClick={handleShow} aria-controls="offcanvasNavbar" className="border-0 shadow-none px-2" />
                </div>

                <BsNavbar.Offcanvas 
                    id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel"
                    placement="end"
                    style={{ background: 'var(--card-bg)' }}
                    show={showMenu}
                    onHide={handleClose}
                >
                    <Offcanvas.Header closeButton closeVariant={theme === 'dark' ? 'white' : undefined}>
                        <Offcanvas.Title id="offcanvasNavbarLabel" style={{ color: 'var(--text-primary)' }}>
                            Menu
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="me-auto mt-3 mt-lg-0 fw-semibold gap-1 gap-lg-3">
                            <Nav.Link as={Link} to="/dashboard" onClick={handleClose} className="px-lg-0 py-2">Dashboard</Nav.Link>
                            <Nav.Link as={Link} to="/feed" onClick={handleClose} className="px-lg-0 py-2">Feed</Nav.Link>
                            <Nav.Link as={Link} to="/marketplace" onClick={handleClose} className="px-lg-0 py-2">Marketplace</Nav.Link>
                            <Nav.Link as={Link} to="/jobs" onClick={handleClose} className="px-lg-0 py-2">Jobs</Nav.Link>
                            <Nav.Link as={Link} to="/events" onClick={handleClose} className="px-lg-0 py-2">Events</Nav.Link>
                        </Nav>
                        <Nav className="align-items-lg-center flex-row flex-wrap justify-content-between justify-content-lg-end gap-3 mt-4 mt-lg-0 pt-3 pt-lg-0 border-top border-lg-0" style={{ borderColor: 'var(--border-color) !important' }}>
                            
                            {/* Theme Toggle (Desktop) */}
                            <button
                                className="nav-icon-btn d-none d-lg-flex align-items-center justify-content-center p-2 rounded-circle border-0 bg-transparent"
                                onClick={toggleTheme}
                                title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                                style={{ color: 'var(--text-primary)' }}
                            >
                                {theme === 'dark' ? <FaSun size={20} /> : <FaMoon size={20} />}
                            </button>

                            {/* Messages icon */}
                            <Nav.Link as={Link} to="/messages" onClick={handleClose} className="position-relative nav-icon-btn d-flex align-items-center p-2 rounded-circle" title="Messages" style={{ color: 'var(--text-primary)' }}>
                                <FaCommentDots size={22} />
                                {unreadMessages > 0 && (
                                    <Badge
                                        pill bg="danger"
                                        className="position-absolute translate-middle"
                                        style={{ top: '6px', right: '-10px', fontSize: '0.65rem' }}
                                    >
                                        {unreadMessages}
                                    </Badge>
                                )}
                            </Nav.Link>

                            {/* Cart icon */}
                            <Nav.Link as={Link} to="/cart" onClick={handleClose} className="position-relative nav-icon-btn d-flex align-items-center p-2 rounded-circle" title="Cart" style={{ color: 'var(--text-primary)' }}>
                                <FaShoppingCart size={22} />
                                {cartCount > 0 && (
                                    <Badge
                                        pill bg="danger"
                                        className="position-absolute translate-middle"
                                        style={{ top: '6px', right: '-10px', fontSize: '0.65rem' }}
                                    >
                                        {cartCount}
                                    </Badge>
                                )}
                            </Nav.Link>

                            {/* User Dropdown */}
                            <NavDropdown
                                title={<div className="d-inline-flex align-items-center hover-lift"><FaUserCircle size={24} className="me-2" style={{ color: 'var(--text-secondary)' }} /> <span className="fw-bold" style={{ color: 'var(--text-primary)' }}>{user?.firstName || user?.name?.split(' ')[0] || 'Account'}</span></div>}
                                id="basic-nav-dropdown"
                                align="end"
                                className="ms-auto ms-lg-0 mt-1 mt-lg-0"
                                style={{ color: 'var(--text-primary)' }}
                            >
                                <NavDropdown.Item as={Link} to="/profile" onClick={handleClose} className="py-2">Profile</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/messages" onClick={handleClose} className="py-2 d-flex justify-content-between align-items-center">
                                    Messages {unreadMessages > 0 && <Badge bg="danger" pill>{unreadMessages}</Badge>}
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/settings" onClick={handleClose} className="py-2">Settings</NavDropdown.Item>
                                <NavDropdown.Divider style={{ borderColor: 'var(--border-color)' }} />
                                <NavDropdown.Item onClick={handleLogout} className="text-danger fw-bold py-2">Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Offcanvas.Body>
                </BsNavbar.Offcanvas>
            </Container>
        </BsNavbar>
    );
};

export default Navbar;
