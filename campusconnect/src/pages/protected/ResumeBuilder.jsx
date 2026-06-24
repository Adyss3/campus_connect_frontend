import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Accordion, Spinner, Alert } from 'react-bootstrap';
import { FaDownload, FaSave, FaCheck, FaPlus, FaTrash } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { jsPDF } from 'jspdf';

const DRAFT_KEY = 'cc_resume_draft';

const emptyExperience = () => ({ id: Date.now(), role: '', company: '', duration: '', description: '' });
const emptySkill = () => ({ id: Date.now(), value: '' });

const ResumeBuilder = () => {
  const { user } = useAuth();

  const [activeSection, setActiveSection] = useState('0');
  const [draftSaved, setDraftSaved] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [exportError, setExportError] = useState('');

  // Form state — pre-fill from user where possible
  const [personal, setPersonal] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: '',
    linkedin: '',
    summary: '',
  });

  const [education, setEducation] = useState({
    university: user?.university || 'Mountain Top University',
    degree: '',
    graduationYear: '',
    gpa: '',
  });

  const [experiences, setExperiences] = useState([emptyExperience()]);
  const [skills, setSkills] = useState([emptySkill()]);

  // Load saved draft on mount
  useEffect(() => {
    const saved = localStorage.getItem(DRAFT_KEY);
    if (saved) {
      try {
        const draft = JSON.parse(saved);
        if (draft.personal) setPersonal(draft.personal);
        if (draft.education) setEducation(draft.education);
        if (draft.experiences?.length) setExperiences(draft.experiences);
        if (draft.skills?.length) setSkills(draft.skills);
      } catch (e) {
        // ignore corrupt draft
      }
    }
  }, []);

  const handleSaveDraft = () => {
    localStorage.setItem(DRAFT_KEY, JSON.stringify({ personal, education, experiences, skills }));
    setDraftSaved(true);
    setTimeout(() => setDraftSaved(false), 2500);
  };

  // ── Experience helpers ──
  const addExperience = () => setExperiences(prev => [...prev, emptyExperience()]);
  const removeExperience = (id) => setExperiences(prev => prev.filter(e => e.id !== id));
  const updateExperience = (id, field, value) =>
    setExperiences(prev => prev.map(e => (e.id === id ? { ...e, [field]: value } : e)));

  // ── Skills helpers ──
  const addSkill = () => setSkills(prev => [...prev, emptySkill()]);
  const removeSkill = (id) => setSkills(prev => prev.filter(s => s.id !== id));
  const updateSkill = (id, value) =>
    setSkills(prev => prev.map(s => (s.id === id ? { ...s, value } : s)));

  // ── PDF Export ──
  const handleExport = async () => {
    setExporting(true);
    setExportError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 400)); // small delay for UX

      const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const pageW = doc.internal.pageSize.getWidth();
      const margin = 20;
      const contentW = pageW - margin * 2;
      let y = 20;

      const LINE_H = 6;
      const SECTION_GAP = 8;

      // ── Header bar ──
      doc.setFillColor(47, 133, 90); // green
      doc.rect(0, 0, pageW, 36, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(22);
      doc.setFont('helvetica', 'bold');
      const fullName = `${personal.firstName} ${personal.lastName}`.trim() || 'Your Name';
      doc.text(fullName, margin, 16);

      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      const contactParts = [personal.email, personal.phone, personal.linkedin].filter(Boolean);
      doc.text(contactParts.join('  ·  '), margin, 25);

      y = 46;
      doc.setTextColor(30, 30, 30);

      // ── Helper: section heading ──
      const sectionHeading = (title) => {
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(47, 133, 90);
        doc.text(title.toUpperCase(), margin, y);
        y += 1;
        doc.setDrawColor(47, 133, 90);
        doc.setLineWidth(0.5);
        doc.line(margin, y, margin + contentW, y);
        y += LINE_H;
        doc.setTextColor(30, 30, 30);
      };

      // ── Helper: wrapped text block ──
      const wrappedText = (text, fontSize = 9, fontStyle = 'normal', color = [30, 30, 30]) => {
        if (!text) return;
        doc.setFontSize(fontSize);
        doc.setFont('helvetica', fontStyle);
        doc.setTextColor(...color);
        const lines = doc.splitTextToSize(text, contentW);
        lines.forEach(line => {
          if (y > 275) { doc.addPage(); y = 20; }
          doc.text(line, margin, y);
          y += LINE_H;
        });
      };

      // ── Summary ──
      if (personal.summary) {
        sectionHeading('Professional Summary');
        wrappedText(personal.summary);
        y += SECTION_GAP;
      }

      // ── Education ──
      sectionHeading('Education');
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text(education.university || 'University', margin, y);
      y += LINE_H;
      const eduLine = [education.degree, education.graduationYear ? `Grad: ${education.graduationYear}` : '', education.gpa ? `GPA: ${education.gpa}` : ''].filter(Boolean).join('  ·  ');
      wrappedText(eduLine, 9);
      y += SECTION_GAP;

      // ── Experience ──
      const filledExp = experiences.filter(e => e.role || e.company);
      if (filledExp.length) {
        sectionHeading('Experience');
        filledExp.forEach(exp => {
          if (y > 260) { doc.addPage(); y = 20; }
          doc.setFontSize(10);
          doc.setFont('helvetica', 'bold');
          doc.setTextColor(30, 30, 30);
          doc.text(exp.role || 'Role', margin, y);
          if (exp.duration) {
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(9);
            doc.setTextColor(100, 100, 100);
            doc.text(exp.duration, pageW - margin, y, { align: 'right' });
          }
          y += LINE_H;
          if (exp.company) wrappedText(exp.company, 9, 'italic', [80, 80, 80]);
          if (exp.description) wrappedText(exp.description);
          y += 4;
        });
        y += SECTION_GAP - 4;
      }

      // ── Skills ──
      const filledSkills = skills.map(s => s.value).filter(Boolean);
      if (filledSkills.length) {
        sectionHeading('Skills');
        // Render skills as comma-separated wrapped line
        wrappedText(filledSkills.join('   ·   '), 9);
        y += SECTION_GAP;
      }

      // ── Footer ──
      doc.setFontSize(8);
      doc.setTextColor(160, 160, 160);
      doc.setFont('helvetica', 'italic');
      doc.text('Generated via Campus Connect · Mountain Top University', pageW / 2, 290, { align: 'center' });

      const fileName = `${(personal.firstName || 'resume').toLowerCase()}_${(personal.lastName || 'cv').toLowerCase()}_resume.pdf`;
      doc.save(fileName);
    } catch (err) {
      setExportError('Export failed. Please fill in at least your name before exporting.');
    } finally {
      setExporting(false);
    }
  };

  const inputStyle = { background: 'var(--input-bg)', color: 'var(--input-text)', borderColor: 'var(--border-color)' };
  const labelStyle = { color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.9rem' };

  // ── Live preview values ──
  const previewName = `${personal.firstName} ${personal.lastName}`.trim() || 'Your Name';
  const previewEmail = personal.email || 'email@mtu.edu.ng';
  const previewDegree = education.degree || 'Degree';
  const previewUni = education.university || 'University';
  const previewSkillList = skills.map(s => s.value).filter(Boolean).join(' · ') || 'Skills listed here';

  return (
    <Container className="py-5">
      {/* Page Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 pb-3 flex-wrap gap-3" style={{ borderBottom: '1px solid var(--border-color)' }}>
        <div>
          <h2 className="fw-bold mb-1" style={{ color: 'var(--text-primary)' }}>Resume Builder</h2>
          <p className="mb-0" style={{ color: 'var(--text-secondary)' }}>Build, save, and export your professional resume as PDF.</p>
        </div>
        <div className="d-flex align-items-center flex-wrap gap-2">
          {draftSaved && (
            <span className="text-success fw-bold px-2 d-flex align-items-center">
              <FaCheck className="me-1" /> Draft Saved
            </span>
          )}
          <Button
            variant="outline-secondary"
            className="fw-bold d-flex align-items-center"
            onClick={handleSaveDraft}
            style={{ color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
          >
            <FaSave className="me-2" /> Save Draft
          </Button>
          <Button
            variant="success"
            className="fw-bold d-flex align-items-center"
            onClick={handleExport}
            disabled={exporting}
            style={{ background: 'var(--primary-gradient)', border: 'none' }}
          >
            {exporting
              ? <><Spinner animation="border" size="sm" className="me-2" /> Generating...</>
              : <><FaDownload className="me-2" /> Export PDF</>
            }
          </Button>
        </div>
      </div>

      {exportError && (
        <Alert variant="danger" className="rounded-3 mb-4" onClose={() => setExportError('')} dismissible>
          {exportError}
        </Alert>
      )}

      <Row className="g-4">
        {/* Left: Form */}
        <Col lg={8}>
          <Accordion activeKey={activeSection} onSelect={k => setActiveSection(k)} className="shadow-sm">

            {/* ── Personal Information ── */}
            <Accordion.Item eventKey="0" style={{ background: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
              <Accordion.Header>Personal Information</Accordion.Header>
              <Accordion.Body style={{ background: 'var(--card-bg)' }}>
                <Row className="g-3 mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label style={labelStyle}>First Name</Form.Label>
                      <Form.Control style={inputStyle} value={personal.firstName} onChange={e => setPersonal(p => ({ ...p, firstName: e.target.value }))} placeholder="Jane" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label style={labelStyle}>Last Name</Form.Label>
                      <Form.Control style={inputStyle} value={personal.lastName} onChange={e => setPersonal(p => ({ ...p, lastName: e.target.value }))} placeholder="Doe" />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="g-3 mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label style={labelStyle}>Email</Form.Label>
                      <Form.Control type="email" style={inputStyle} value={personal.email} onChange={e => setPersonal(p => ({ ...p, email: e.target.value }))} placeholder="janedoe@mtu.edu.ng" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label style={labelStyle}>Phone</Form.Label>
                      <Form.Control type="tel" style={inputStyle} value={personal.phone} onChange={e => setPersonal(p => ({ ...p, phone: e.target.value }))} placeholder="+234..." />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Label style={labelStyle}>LinkedIn URL</Form.Label>
                  <Form.Control style={inputStyle} value={personal.linkedin} onChange={e => setPersonal(p => ({ ...p, linkedin: e.target.value }))} placeholder="linkedin.com/in/janedoe" />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label style={labelStyle}>Professional Summary</Form.Label>
                  <Form.Control as="textarea" rows={3} style={{ ...inputStyle, resize: 'none' }} value={personal.summary} onChange={e => setPersonal(p => ({ ...p, summary: e.target.value }))} placeholder="A brief 2–3 sentence overview of your background and goals..." />
                </Form.Group>
                <Button variant="success" size="sm" className="px-4 py-2 fw-semibold" onClick={() => setActiveSection('1')}>
                  Next: Education →
                </Button>
              </Accordion.Body>
            </Accordion.Item>

            {/* ── Education ── */}
            <Accordion.Item eventKey="1" style={{ background: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
              <Accordion.Header>Education</Accordion.Header>
              <Accordion.Body style={{ background: 'var(--card-bg)' }}>
                <Form.Group className="mb-3">
                  <Form.Label style={labelStyle}>University / Institution</Form.Label>
                  <Form.Control style={inputStyle} value={education.university} onChange={e => setEducation(ed => ({ ...ed, university: e.target.value }))} placeholder="Mountain Top University" />
                </Form.Group>
                <Row className="g-3 mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label style={labelStyle}>Degree & Major</Form.Label>
                      <Form.Control style={inputStyle} value={education.degree} onChange={e => setEducation(ed => ({ ...ed, degree: e.target.value }))} placeholder="B.Sc Computer Science" />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group>
                      <Form.Label style={labelStyle}>Grad Year</Form.Label>
                      <Form.Control style={inputStyle} value={education.graduationYear} onChange={e => setEducation(ed => ({ ...ed, graduationYear: e.target.value }))} placeholder="2026" />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group>
                      <Form.Label style={labelStyle}>GPA (optional)</Form.Label>
                      <Form.Control style={inputStyle} value={education.gpa} onChange={e => setEducation(ed => ({ ...ed, gpa: e.target.value }))} placeholder="4.5/5.0" />
                    </Form.Group>
                  </Col>
                </Row>
                <Button variant="success" size="sm" className="px-4 py-2 fw-semibold" onClick={() => setActiveSection('2')}>
                  Next: Experience →
                </Button>
              </Accordion.Body>
            </Accordion.Item>

            {/* ── Experience ── */}
            <Accordion.Item eventKey="2" style={{ background: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
              <Accordion.Header>Experience</Accordion.Header>
              <Accordion.Body style={{ background: 'var(--card-bg)' }}>
                {experiences.map((exp, idx) => (
                  <div key={exp.id} className="mb-4 p-3 rounded-3 border" style={{ background: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <span className="fw-bold small" style={{ color: 'var(--text-secondary)' }}>Experience {idx + 1}</span>
                      {experiences.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeExperience(exp.id)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#E53E3E', padding: 0 }}
                          title="Remove"
                        >
                          <FaTrash size={13} />
                        </button>
                      )}
                    </div>
                    <Row className="g-3 mb-3">
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label style={labelStyle}>Job Title / Role</Form.Label>
                          <Form.Control style={inputStyle} value={exp.role} onChange={e => updateExperience(exp.id, 'role', e.target.value)} placeholder="Software Intern" />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label style={labelStyle}>Company / Organization</Form.Label>
                          <Form.Control style={inputStyle} value={exp.company} onChange={e => updateExperience(exp.id, 'company', e.target.value)} placeholder="TechNova Ltd." />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Form.Group className="mb-3">
                      <Form.Label style={labelStyle}>Duration</Form.Label>
                      <Form.Control style={inputStyle} value={exp.duration} onChange={e => updateExperience(exp.id, 'duration', e.target.value)} placeholder="Jan 2024 – May 2024" />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label style={labelStyle}>Description</Form.Label>
                      <Form.Control as="textarea" rows={2} style={{ ...inputStyle, resize: 'none' }} value={exp.description} onChange={e => updateExperience(exp.id, 'description', e.target.value)} placeholder="Briefly describe your key responsibilities and achievements..." />
                    </Form.Group>
                  </div>
                ))}
                <div className="d-flex gap-2 mt-1">
                  <Button variant="outline-success" size="sm" className="fw-semibold" onClick={addExperience}>
                    <FaPlus className="me-1" size={11} /> Add Experience
                  </Button>
                  <Button variant="success" size="sm" className="px-4 py-2 fw-semibold" onClick={() => setActiveSection('3')}>
                    Next: Skills →
                  </Button>
                </div>
              </Accordion.Body>
            </Accordion.Item>

            {/* ── Skills ── */}
            <Accordion.Item eventKey="3" style={{ background: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
              <Accordion.Header>Skills &amp; Technologies</Accordion.Header>
              <Accordion.Body style={{ background: 'var(--card-bg)' }}>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }} className="mb-3">
                  Add each skill, tool, or technology as a separate entry.
                </p>
                <Row className="g-2 mb-3">
                  {skills.map((skill, idx) => (
                    <Col xs={12} sm={6} key={skill.id}>
                      <div className="d-flex gap-2 align-items-center">
                        <Form.Control
                          style={inputStyle}
                          value={skill.value}
                          onChange={e => updateSkill(skill.id, e.target.value)}
                          placeholder={`Skill ${idx + 1} (e.g. React, Python)`}
                        />
                        {skills.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeSkill(skill.id)}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#E53E3E', padding: 0, flexShrink: 0 }}
                          >
                            <FaTrash size={13} />
                          </button>
                        )}
                      </div>
                    </Col>
                  ))}
                </Row>
                <div className="d-flex gap-2">
                  <Button variant="outline-success" size="sm" className="fw-semibold" onClick={addSkill}>
                    <FaPlus className="me-1" size={11} /> Add Skill
                  </Button>
                  <Button
                    variant="success"
                    size="sm"
                    className="px-4 py-2 fw-semibold"
                    style={{ background: 'var(--primary-gradient)', border: 'none' }}
                    onClick={handleExport}
                    disabled={exporting}
                  >
                    {exporting ? <Spinner animation="border" size="sm" /> : <><FaDownload className="me-1" size={11} /> Export PDF</>}
                  </Button>
                </div>
              </Accordion.Body>
            </Accordion.Item>

          </Accordion>
        </Col>

        {/* Right: Live Preview */}
        <Col lg={4} className="d-none d-lg-block">
          <div className="position-sticky" style={{ top: 90 }}>
            <Card className="shadow-sm border-0" style={{ background: 'var(--card-bg)' }}>
              <Card.Body className="p-3">
                <p className="fw-bold text-center mb-3 small text-muted text-uppercase" style={{ letterSpacing: '0.08em' }}>Live Preview</p>
                {/* Paper mock */}
                <div
                  style={{
                    background: '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: 8,
                    overflow: 'hidden',
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontSize: 10,
                    color: '#1a202c',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                    minHeight: 480,
                  }}
                >
                  {/* Green header */}
                  <div style={{ background: '#2F855A', color: '#fff', padding: '14px 16px 10px' }}>
                    <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{previewName}</div>
                    <div style={{ fontSize: 9, opacity: 0.88 }}>{previewEmail}</div>
                  </div>

                  <div style={{ padding: '12px 16px' }}>
                    {/* Summary */}
                    {personal.summary && (
                      <>
                        <div style={{ color: '#2F855A', fontWeight: 700, fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: '1.5px solid #2F855A', paddingBottom: 2, marginBottom: 6 }}>Summary</div>
                        <p style={{ fontSize: 8.5, lineHeight: 1.5, marginBottom: 10, color: '#2d3748' }}>{personal.summary.slice(0, 120)}{personal.summary.length > 120 ? '…' : ''}</p>
                      </>
                    )}

                    {/* Education */}
                    <div style={{ color: '#2F855A', fontWeight: 700, fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: '1.5px solid #2F855A', paddingBottom: 2, marginBottom: 6 }}>Education</div>
                    <div style={{ fontWeight: 700, fontSize: 9.5, marginBottom: 2 }}>{previewUni}</div>
                    <div style={{ fontSize: 8.5, color: '#4a5568', marginBottom: 10 }}>
                      {previewDegree}{education.graduationYear ? ` · ${education.graduationYear}` : ''}
                    </div>

                    {/* Experience preview */}
                    {experiences.filter(e => e.role).length > 0 && (
                      <>
                        <div style={{ color: '#2F855A', fontWeight: 700, fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: '1.5px solid #2F855A', paddingBottom: 2, marginBottom: 6 }}>Experience</div>
                        {experiences.filter(e => e.role).slice(0, 2).map(exp => (
                          <div key={exp.id} style={{ marginBottom: 8 }}>
                            <div style={{ fontWeight: 700, fontSize: 9.5 }}>{exp.role}</div>
                            <div style={{ fontSize: 8.5, color: '#718096', fontStyle: 'italic' }}>{exp.company}{exp.duration ? ` · ${exp.duration}` : ''}</div>
                          </div>
                        ))}
                      </>
                    )}

                    {/* Skills */}
                    {skills.filter(s => s.value).length > 0 && (
                      <>
                        <div style={{ color: '#2F855A', fontWeight: 700, fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: '1.5px solid #2F855A', paddingBottom: 2, marginBottom: 6 }}>Skills</div>
                        <div style={{ fontSize: 8.5, color: '#4a5568', lineHeight: 1.7 }}>{previewSkillList.slice(0, 80)}{previewSkillList.length > 80 ? '…' : ''}</div>
                      </>
                    )}
                  </div>
                </div>

                <p className="text-center mt-3 mb-0 small text-muted">
                  Click <strong>Export PDF</strong> to download this resume.
                </p>
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ResumeBuilder;
