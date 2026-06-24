import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Navbar as BsNavbar, Nav, Container, Badge, Offcanvas } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useAppContext } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';
import { useMessaging } from '../context/MessagingContext';
import {
  FaUserCircle, FaShoppingCart, FaMoon, FaSun, FaCommentDots,
  FaStore, FaTachometerAlt, FaCog, FaSignOutAlt, FaIdCard,
  FaPlus, FaEye, FaUser
} from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart } = useAppContext();
  const { theme, toggleTheme } = useTheme();
  const { getTotalUnread } = useMessaging();
  const navigate = useNavigate();
  const location = useLocation();

  const [showMenu, setShowMenu] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleClose = () => setShowMenu(false);
  const handleShow = () => setShowMenu(true);

  const handleLogout = () => {
    handleClose();
    setDropdownOpen(false);
    logout();
    navigate('/login/student');
  };

  const handleDropdownLink = () => {
    setDropdownOpen(false);
    handleClose();
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setDropdownOpen(false);
  }, [location.pathname]);

  const cartCount = cart.reduce((total, item) => total + item.qty, 0);
  const unreadMessages = getTotalUnread('u1');

  const isActive = (path) => location.pathname === path;

  const navLinkStyle = (path) => ({
    color: isActive(path) ? 'var(--primary-color)' : 'var(--text-primary)',
    fontWeight: isActive(path) ? 700 : 600,
    fontSize: '0.92rem',
    position: 'relative',
  });

  // Avatar initials
  const initials = user
    ? `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase()
    : 'U';

  const avatarColors = { Student: '#2F855A', Entrepreneur: '#2B6CB0', Staff: '#6B46C1', Organization: '#C05621', Admin: '#1A202C' };
  const avatarBg = avatarColors[user?.role] || '#2F855A';

  return (
    <BsNavbar
      className="border-bottom py-2"
      expand="lg"
      sticky="top"
      style={{ background: 'var(--nav-bg)', boxShadow: '0 2px 12px rgba(0,0,0,0.07)', zIndex: 1030 }}
      collapseOnSelect
    >
      <Container>
        {/* Brand */}
        <BsNavbar.Brand as={Link} to="/dashboard" className="d-flex align-items-center py-0">
          <img src="/logo.png" alt="Campus Connect" className="nav-logo" style={{ transformOrigin: 'left center', objectFit: 'contain' }} />
        </BsNavbar.Brand>

        {/* Mobile: theme + hamburger */}
        <div className="d-flex align-items-center gap-2 d-lg-none">
          <button className="nav-icon-btn p-2 rounded-circle border-0 bg-transparent" onClick={toggleTheme} style={{ color: 'var(--text-primary)' }}>
            {theme === 'dark' ? <FaSun size={20} /> : <FaMoon size={20} />}
          </button>
          <BsNavbar.Toggle onClick={handleShow} aria-controls="offcanvasNavbar" className="border-0 shadow-none px-2" />
        </div>

        <BsNavbar.Offcanvas
          id="offcanvasNavbar"
          placement="end"
          style={{ background: 'var(--card-bg)' }}
          show={showMenu}
          onHide={handleClose}
        >
          <Offcanvas.Header closeButton closeVariant={theme === 'dark' ? 'white' : undefined}>
            <Offcanvas.Title style={{ color: 'var(--text-primary)', fontWeight: 700 }}>Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {/* Main Nav Links */}
            <Nav className="me-auto mt-3 mt-lg-0 fw-semibold gap-1 gap-lg-2">
              {[
                { to: '/dashboard', label: 'Dashboard' },
                { to: '/feed', label: 'Feed' },
                { to: '/marketplace', label: 'Marketplace' },
                { to: '/jobs', label: 'Jobs' },
                { to: '/events', label: 'Events' },
              ].map(({ to, label }) => (
                <Nav.Link
                  key={to}
                  as={Link}
                  to={to}
                  onClick={handleClose}
                  className="px-lg-2 py-2 rounded-3"
                  style={{
                    ...navLinkStyle(to),
                    background: isActive(to) ? 'rgba(47,133,90,0.08)' : 'transparent',
                  }}
                >
                  {label}
                  {isActive(to) && (
                    <span style={{
                      position: 'absolute', bottom: 0, left: '50%',
                      transform: 'translateX(-50%)',
                      width: 20, height: 2,
                      background: 'var(--primary-color)',
                      borderRadius: 2,
                      display: window.innerWidth >= 992 ? 'block' : 'none'
                    }} />
                  )}
                </Nav.Link>
              ))}
            </Nav>

            {/* Right side icons */}
            <Nav className="align-items-lg-center flex-row flex-wrap justify-content-between justify-content-lg-end gap-2 mt-4 mt-lg-0 pt-3 pt-lg-0 border-top border-lg-0"
              style={{ borderColor: 'var(--border-color)' }}>

              {/* Theme toggle desktop */}
              <button
                className="nav-icon-btn d-none d-lg-flex align-items-center justify-content-center p-2 rounded-circle border-0 bg-transparent"
                onClick={toggleTheme}
                title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                style={{ color: 'var(--text-primary)', width: 38, height: 38 }}
              >
                {theme === 'dark' ? <FaSun size={18} /> : <FaMoon size={18} />}
              </button>

              {/* Messages */}
              <Nav.Link as={Link} to="/messages" onClick={handleClose}
                className="position-relative nav-icon-btn d-flex align-items-center justify-content-center p-2 rounded-circle"
                style={{ color: 'var(--text-primary)', width: 38, height: 38 }}
                title="Messages"
              >
                <FaCommentDots size={20} />
                {unreadMessages > 0 && (
                  <Badge pill bg="danger" className="position-absolute"
                    style={{ top: 2, right: 0, fontSize: '0.6rem', padding: '3px 5px' }}>
                    {unreadMessages}
                  </Badge>
                )}
              </Nav.Link>

              {/* Cart */}
              <Nav.Link as={Link} to="/cart" onClick={handleClose}
                className="position-relative nav-icon-btn d-flex align-items-center justify-content-center p-2 rounded-circle"
                style={{ color: 'var(--text-primary)', width: 38, height: 38 }}
                title="Cart"
              >
                <FaShoppingCart size={20} />
                {cartCount > 0 && (
                  <Badge pill bg="danger" className="position-absolute"
                    style={{ top: 2, right: 0, fontSize: '0.6rem', padding: '3px 5px' }}>
                    {cartCount}
                  </Badge>
                )}
              </Nav.Link>

              {/* ── Profile Dropdown ── */}
              <div ref={dropdownRef} style={{ position: 'relative' }}>
                <button
                  onClick={() => setDropdownOpen(prev => !prev)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    background: dropdownOpen ? 'var(--bg-secondary)' : 'var(--card-bg)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 50,
                    padding: '5px 12px 5px 6px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: dropdownOpen ? '0 2px 12px rgba(0,0,0,0.1)' : 'none',
                  }}
                >
                  {/* Avatar */}
                  <div style={{
                    width: 30, height: 30, borderRadius: '50%',
                    background: avatarBg, color: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 700, fontSize: '0.75rem', flexShrink: 0,
                  }}>
                    {initials}
                  </div>
                  <span style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-primary)', maxWidth: 90, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {user?.firstName || 'Account'}
                  </span>
                  <svg width="12" height="12" viewBox="0 0 12 12" style={{ color: 'var(--text-secondary)', flexShrink: 0, transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>
                    <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                {/* Dropdown Panel */}
                {dropdownOpen && (
                  <div style={{
                    position: 'absolute', top: 'calc(100% + 8px)', right: 0,
                    width: 240,
                    background: 'var(--card-bg)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 16,
                    boxShadow: '0 16px 48px rgba(0,0,0,0.16)',
                    zIndex: 9999,
                    overflow: 'hidden',
                    animation: 'fadeUp 0.15s ease-out forwards',
                  }}>
                    {/* User info header */}
                    <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-secondary)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{
                          width: 40, height: 40, borderRadius: '50%',
                          background: avatarBg, color: '#fff',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontWeight: 700, fontSize: '0.9rem', flexShrink: 0,
                        }}>
                          {initials}
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {user?.firstName} {user?.lastName}
                          </div>
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {user?.email}
                          </div>
                          <span style={{
                            display: 'inline-block', marginTop: 3,
                            background: `${avatarBg}22`, color: avatarBg,
                            border: `1px solid ${avatarBg}44`,
                            borderRadius: 50, padding: '1px 8px',
                            fontSize: '0.68rem', fontWeight: 700,
                          }}>
                            {user?.role}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Menu items */}
                    <div style={{ padding: '6px 0' }}>
                      <DropItem to="/profile" icon={<FaUser size={13} />} label="My Profile" onClick={handleDropdownLink} />
                      <DropItem to="/verification" icon={<FaIdCard size={13} />} label="Verification" onClick={handleDropdownLink} />

                      {/* Store links */}
                      {user?.hasStore ? (
                        <>
                          <div style={{ height: 1, background: 'var(--border-color)', margin: '4px 12px' }} />
                          <DropItem to="/store/dashboard" icon={<FaTachometerAlt size={13} />} label="Store Dashboard" onClick={handleDropdownLink} accent />
                          <DropItem to={`/store/${user.storeId}`} icon={<FaEye size={13} />} label="View Storefront" onClick={handleDropdownLink} />
                        </>
                      ) : (user?.role === 'Student' || user?.role === 'Entrepreneur') && (
                        <>
                          <div style={{ height: 1, background: 'var(--border-color)', margin: '4px 12px' }} />
                          <DropItem to="/store/create" icon={<FaPlus size={13} />} label="Create a Store" onClick={handleDropdownLink} accent />
                        </>
                      )}

                      <div style={{ height: 1, background: 'var(--border-color)', margin: '4px 12px' }} />
                      <DropItem to="/settings" icon={<FaCog size={13} />} label="Settings" onClick={handleDropdownLink} />

                      {/* Logout */}
                      <button
                        onClick={handleLogout}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 10,
                          width: '100%', padding: '9px 16px',
                          background: 'none', border: 'none', cursor: 'pointer',
                          color: '#E53E3E', fontWeight: 600, fontSize: '0.875rem',
                          transition: 'background 0.15s',
                          textAlign: 'left',
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(229,62,62,0.08)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'none'}
                      >
                        <span style={{ width: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <FaSignOutAlt size={13} />
                        </span>
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>

            </Nav>
          </Offcanvas.Body>
        </BsNavbar.Offcanvas>
      </Container>
    </BsNavbar>
  );
};

// Reusable dropdown item
const DropItem = ({ to, icon, label, onClick, accent }) => (
  <Link
    to={to}
    onClick={onClick}
    style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '9px 16px', textDecoration: 'none',
      color: accent ? 'var(--primary-color)' : 'var(--text-primary)',
      fontWeight: accent ? 700 : 500,
      fontSize: '0.875rem',
      transition: 'background 0.15s',
    }}
    onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-secondary)'}
    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
  >
    <span style={{ width: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: accent ? 'var(--primary-color)' : 'var(--text-secondary)' }}>
      {icon}
    </span>
    {label}
  </Link>
);

export default Navbar;
