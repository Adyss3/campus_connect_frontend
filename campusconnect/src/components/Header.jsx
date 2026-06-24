import { Link } from 'react-router-dom'
import { Navbar, Nav, Container, Button, Offcanvas } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    const handleClose = () => setShowMenu(false);
    const handleShow = () => setShowMenu(true);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <Navbar 
            className={`transition-all ${scrolled ? 'shadow-sm py-2' : 'py-3 border-bottom'}`}
            style={{ transition: 'all 0.3s ease', background: 'var(--nav-bg)', borderColor: 'var(--border-color)' }}
            expand="lg" 
            fixed="top"
            collapseOnSelect
        >
            <Container>
                <Navbar.Brand as={Link} to="/" className="d-flex align-items-center py-0">
                    <img src="/logo.png" alt="Campus Connect Platform" className="nav-logo" style={{ transformOrigin: 'left center', objectFit: 'contain' }} />
                </Navbar.Brand>

                <Navbar.Toggle onClick={handleShow} aria-controls="offcanvasHeader" className="border-0 shadow-none px-2"/>
                <Navbar.Offcanvas
                    id="offcanvasHeader"
                    aria-labelledby="offcanvasHeaderLabel"
                    placement="end"
                    style={{ background: 'var(--card-bg)' }}
                    show={showMenu}
                    onHide={handleClose}
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id="offcanvasHeaderLabel" style={{ color: 'var(--text-primary)' }}>
                            Campus Connect
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="fw-semibold mx-lg-4 gap-2 gap-lg-4 mt-2 mt-lg-0 fs-6">
                            <Nav.Link as={Link} to="/" onClick={handleClose} className="hover-lift px-lg-0 py-2" style={{ color: 'var(--text-primary)' }}>Home</Nav.Link>
                            <Nav.Link href="#features" onClick={handleClose} className="hover-lift px-lg-0 py-2" style={{ color: 'var(--text-primary)' }}>Features</Nav.Link>
                            <Nav.Link href="#about" onClick={handleClose} className="hover-lift px-lg-0 py-2" style={{ color: 'var(--text-primary)' }}>About</Nav.Link>
                            <Nav.Link href="#contact" onClick={handleClose} className="hover-lift px-lg-0 py-2" style={{ color: 'var(--text-primary)' }}>Contact</Nav.Link>
                        </Nav>
                        <Nav className="d-flex flex-column flex-lg-row ms-lg-auto mt-4 mt-lg-0 gap-2 pt-4 pt-lg-0 border-top border-lg-0" style={{ borderColor: 'var(--border-color) !important' }}>
                            <Nav.Link as={Link} to="/login/student" onClick={handleClose} className="btn btn-premium-outline px-3 py-2 text-center d-flex align-items-center justify-content-center m-0" style={{color: 'var(--primary-color)', border: '2px solid var(--primary-color)', fontSize: '0.85rem'}}>Student Access</Nav.Link>
                            <Nav.Link as={Link} to="/login/campus" onClick={handleClose} className="btn btn-premium px-3 py-2 text-center d-flex align-items-center justify-content-center shadow-sm m-0" style={{background: 'var(--dark-gradient)', color: '#fff', border: 'none', fontSize: '0.85rem'}}>Campus Access</Nav.Link>
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    )
}

export default Header