import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Accordion, Spinner } from 'react-bootstrap';
import { FaDownload, FaSave, FaCheck } from 'react-icons/fa';

const ResumeBuilder = () => {
  const [activeSection, setActiveSection] = useState("0");
  const [savings, setSavings] = useState({});
  const [draftSaved, setDraftSaved] = useState(false);
  const [exporting, setExporting] = useState(false);

  const handleSaveSection = (sectionIndex) => {
    setSavings({ ...savings, [sectionIndex]: true });
    setTimeout(() => {
      setSavings({ ...savings, [sectionIndex]: false });
      if (Number(sectionIndex) < 3) setActiveSection(String(Number(sectionIndex) + 1));
    }, 800);
  };

  const handleSaveDraft = () => {
    setDraftSaved(true);
    setTimeout(() => setDraftSaved(false), 2000);
  };

  const handleExport = () => {
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      alert('Resume exported successfully! Download starting...');
    }, 1500);
  };

  const inputStyle = { background: 'var(--input-bg)', color: 'var(--input-text)', borderColor: 'var(--border-color)' };
  const labelStyle = { color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.9rem' };

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4 pb-3 flex-wrap gap-3" style={{ borderBottom: '1px solid var(--border-color)' }}>
        <div>
          <h2 className="fw-bold mb-1" style={{ color: 'var(--text-primary)' }}>Resume Builder</h2>
          <p className="mb-0" style={{ color: 'var(--text-secondary)' }}>Build, save, and export your professional resume.</p>
        </div>
        <div className="d-flex align-items-center flex-wrap gap-2">
          {draftSaved && <span className="text-success fw-bold px-2 d-flex align-items-center"><FaCheck className="me-1"/> Draft Saved</span>}
          <Button variant="outline-secondary" className="fw-bold d-flex align-items-center" onClick={handleSaveDraft} style={{ color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}>
            <FaSave className="me-2"/> Save Draft
          </Button>
          <Button variant="success" className="fw-bold d-flex align-items-center" onClick={handleExport} disabled={exporting}>
            {exporting ? <Spinner animation="border" size="sm" /> : <><FaDownload className="me-2"/> Export PDF</>}
          </Button>
        </div>
      </div>

      <Row className="g-4">
        <Col lg={8}>
          <Accordion activeKey={activeSection} onSelect={(k) => setActiveSection(k)} className="shadow-sm">
            
            <Accordion.Item eventKey="0" style={{ background: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
              <Accordion.Header>Personal Information</Accordion.Header>
              <Accordion.Body style={{ background: 'var(--card-bg)' }}>
                <Form>
                  <Row className="g-3 mb-3">
                    <Col md={6}>
                      <Form.Group><Form.Label style={labelStyle}>First Name</Form.Label><Form.Control style={inputStyle} /></Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group><Form.Label style={labelStyle}>Last Name</Form.Label><Form.Control style={inputStyle} /></Form.Group>
                    </Col>
                  </Row>
                  <Row className="g-3 mb-3">
                    <Col md={6}>
                      <Form.Group><Form.Label style={labelStyle}>Email</Form.Label><Form.Control type="email" style={inputStyle} /></Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group><Form.Label style={labelStyle}>Phone</Form.Label><Form.Control type="tel" style={inputStyle} /></Form.Group>
                    </Col>
                  </Row>
                  <Form.Group className="mb-4"><Form.Label style={labelStyle}>LinkedIn URL</Form.Label><Form.Control style={inputStyle} /></Form.Group>
                  <Button variant="dark" size="sm" className="px-4 py-2 fw-semibold" onClick={() => handleSaveSection("0")} disabled={savings["0"]}>
                    {savings["0"] ? 'Saving...' : 'Save Section'}
                  </Button>
                </Form>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1" style={{ background: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
              <Accordion.Header>Education</Accordion.Header>
              <Accordion.Body style={{ background: 'var(--card-bg)' }}>
                <Form>
                  <Form.Group className="mb-3"><Form.Label style={labelStyle}>University</Form.Label><Form.Control style={inputStyle} /></Form.Group>
                  <Row className="g-3 mb-4">
                    <Col md={6}><Form.Group><Form.Label style={labelStyle}>Degree</Form.Label><Form.Control style={inputStyle} /></Form.Group></Col>
                    <Col md={6}><Form.Group><Form.Label style={labelStyle}>Graduation Year</Form.Label><Form.Control style={inputStyle} /></Form.Group></Col>
                  </Row>
                  <Button variant="dark" size="sm" className="px-4 py-2 fw-semibold" onClick={() => handleSaveSection("1")} disabled={savings["1"]}>
                    {savings["1"] ? 'Saving...' : 'Save Section'}
                  </Button>
                </Form>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2" style={{ background: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
              <Accordion.Header>Experience</Accordion.Header>
              <Accordion.Body style={{ background: 'var(--card-bg)' }}>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Add your past roles and internships.</p>
                <Button variant="outline-success" size="sm" className="mb-4 fw-semibold">+ Add Experience</Button>
                <br />
                <Button variant="dark" size="sm" className="px-4 py-2 fw-semibold" onClick={() => handleSaveSection("2")} disabled={savings["2"]}>
                  {savings["2"] ? 'Saving...' : 'Save Section'}
                </Button>
              </Accordion.Body>
            </Accordion.Item>
            
            <Accordion.Item eventKey="3" style={{ background: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
              <Accordion.Header>Skills & Projects</Accordion.Header>
              <Accordion.Body style={{ background: 'var(--card-bg)' }}>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>List relevant technical and soft skills, plus major projects.</p>
                <Button variant="outline-success" size="sm" className="mb-4 fw-semibold">+ Add Skill/Project</Button>
                <br />
                <Button variant="dark" size="sm" className="px-4 py-2 fw-semibold" onClick={() => handleSaveSection("3")} disabled={savings["3"]}>
                  {savings["3"] ? 'Saving...' : 'Finish Sections'}
                </Button>
              </Accordion.Body>
            </Accordion.Item>

          </Accordion>
        </Col>

        <Col lg={4} className="d-none d-lg-block">
          <Card className="h-100 shadow-sm border-0 position-sticky" style={{ background: 'var(--bg-primary)', top: 90 }}>
            <Card.Body className="p-4 text-center d-flex flex-column align-items-center">
              <h5 className="fw-bold mb-3" style={{ color: 'var(--text-secondary)' }}>Live Preview</h5>
              <div className="w-100 border shadow-sm p-4 rounded-3" style={{ height: '450px', background: '#FFFFFF' /* Always white for physical paper preview */ }}>
                <div style={{ background: '#E2E8F0', width: '50%', height: 12, marginBottom: 12, borderRadius: 2 }}></div>
                <div style={{ background: '#E2E8F0', width: '75%', height: 8, marginBottom: 24, borderRadius: 2 }}></div>
                
                <div style={{ background: '#CBD5E0', width: '100%', height: 2, marginBottom: 16 }}></div>
                
                <div style={{ background: '#E2E8F0', width: '30%', height: 10, marginBottom: 12, borderRadius: 2 }}></div>
                <div style={{ background: '#F7FAFC', width: '100%', height: 8, marginBottom: 8, borderRadius: 2 }}></div>
                <div style={{ background: '#F7FAFC', width: '100%', height: 8, marginBottom: 8, borderRadius: 2 }}></div>
                <div style={{ background: '#F7FAFC', width: '80%', height: 8, marginBottom: 32, borderRadius: 2 }}></div>

                <div style={{ background: '#CBD5E0', width: '100%', height: 2, marginBottom: 16 }}></div>
                
                <div style={{ background: '#E2E8F0', width: '40%', height: 10, marginBottom: 12, borderRadius: 2 }}></div>
                <div style={{ background: '#F7FAFC', width: '90%', height: 8, marginBottom: 8, borderRadius: 2 }}></div>
                <div style={{ background: '#F7FAFC', width: '60%', height: 8, marginBottom: 8, borderRadius: 2 }}></div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ResumeBuilder;
