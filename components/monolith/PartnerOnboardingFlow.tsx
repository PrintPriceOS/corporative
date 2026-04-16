'use client';

import React, { useState, useEffect } from 'react';
import { Icon } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

import { submitPartnerOnboarding } from '@/lib/actions';

// STEP DEFINITIONS
const STEPS = [
  { id: 0, label: 'Legal', icon: 'policy' as any },
  { id: 1, label: 'Company', icon: 'factory' as any },
  { id: 2, label: 'Capabilities', icon: 'layers' as any },
  { id: 3, label: 'Machinery', icon: 'specs' as any },
  { id: 4, label: 'Capacity', icon: 'orchestration' as any },
  { id: 5, label: 'Integration', icon: 'pipeline' as any },
  { id: 6, label: 'Compliance', icon: 'shield' as any },
];

export const PartnerOnboardingFlow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [startTime] = useState(Date.now());
  const [formData, setFormData] = useState({
    // Step 0: Legal
    termsAccepted: false,
    termsReviewed: false,
    acceptedAt: '',
    termsVersion: '1.0',
    acceptanceTraceId: '',
    // Step 1: Company
    companyName: '',
    website: '',
    country: '',
    contactName: '',
    email: '',
    phone: '',
    // Step 2: Capabilities
    productionTypes: [] as string[],
    maxSheetSize: '',
    materials: '',
    // Step 3: Machinery
    presses: '',
    typicalJobs: '',
    colorCaps: '',
    // Step 4: Capacity
    monthlyVolume: '',
    utilization: '',
    // Step 5: Integration
    integrationLevel: '',
    // Step 6: Compliance
    standards: false,
    certifications: [] as string[],
    qaModules: [] as string[],
    qaCustomDetails: '',
    // Anti-Spam
    _honeypot: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<'high' | 'mid' | 'low' | null>(null);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  // Auto-save logic
  useEffect(() => {
    const saved = localStorage.getItem('ppp_partner_onboarding');
    if (saved) {
      setFormData(prev => ({ ...prev, ...JSON.parse(saved) }));
    }
  }, []);

  const updateForm = (updates: Partial<typeof formData>) => {
    const newData = { ...formData, ...updates };
    setFormData(newData);
    localStorage.setItem('ppp_partner_onboarding', JSON.stringify(newData));
  };

  const nextStep = () => {
    if (currentStep === 0 && !formData.termsAccepted) return;
    setCurrentStep((s) => Math.min(s + 1, STEPS.length - 1));
  };
  const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 0));

  const handleTermsScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    if (formData.termsReviewed) return;
    
    const isAtBottom = target.scrollHeight - target.scrollTop <= target.clientHeight + 20;
    if (isAtBottom) {
      updateForm({ termsReviewed: true });
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmissionError(null);
    
    // 1. Prepare FormData (Strictly)
    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (Array.isArray(value)) form.append(key, JSON.stringify(value));
      else form.append(key, value.toString());
    });
    
    // Add real timestamp
    form.append('_timestamp', startTime.toString());
    
    try {
        const result = await submitPartnerOnboarding(form);
        
        if (result.success && result.tier) {
            setSubmissionResult(result.tier);
            localStorage.removeItem('ppp_partner_onboarding');
        } else {
            setSubmissionError(result.message || "Submission rejected by system audit.");
        }
    } catch (err) {
        setSubmissionError("Network error or system unreachable. Contact support.");
    } finally {
        setIsSubmitting(false);
    }
  };

  if (submissionResult) {
    return (
        <div style={{ padding: '6rem 2rem', textAlign: 'center', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', minHeight: '500px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ width: '4rem', height: '4rem', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2.5rem', color: 'var(--accent-primary)', border: '1px solid var(--accent-primary)', boxShadow: '0 0 30px rgba(255, 0, 0, 0.1)' }}>
                <Icon name="shield" size={32} />
            </div>
            {submissionResult === 'high' && (
                <>
                    <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1.5rem', letterSpacing: '-0.05em' }}>Direct Onboarding Applied</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '3rem', maxWidth: '45ch' }}>
                        Your machine profile and volume qualify for direct API integration. Our onboarding team has been notified for node activation.
                    </p>
                    <Button size="lg" onClick={() => window.location.href = '/docs/api/overview'}>Continue to integration →</Button>
                </>
            )}
            {submissionResult === 'mid' && (
                <>
                    <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1.5rem', letterSpacing: '-0.05em' }}>Review Submission</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '3rem', maxWidth: '45ch' }}>
                        We have received your capability profile. A platform architect will review your machine specs and contact you for onboarding.
                    </p>
                    <Button size="lg" onClick={() => window.location.href = '/contact'}>Schedule onboarding call →</Button>
                </>
            )}
            {submissionResult === 'low' && (
                <>
                    <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1.5rem', letterSpacing: '-0.05em' }}>System Intake</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '3rem', maxWidth: '45ch' }}>
                        Your application has been added to our supply chain registry. We will contact you when demand matches your production region and machine profile.
                    </p>
                    <Button size="lg" onClick={() => window.location.href = '/'}>Return to Home</Button>
                </>
            )}
        </div>
    );
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', position: 'relative', overflow: 'hidden' }}>
      
      {/* Progress Indicator */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)' }}>
        {STEPS.map((step) => {
          const isActive = currentStep === step.id;
          const isDone = currentStep > step.id;
          return (
            <div key={step.id} style={{ 
                flex: 1, 
                padding: '1.5rem 0.5rem', 
                textAlign: 'center', 
                position: 'relative',
                borderBottom: isActive ? '2px solid var(--accent-primary)' : 'none',
                opacity: isActive || isDone ? 1 : 0.3,
                transition: 'all 0.3s ease'
              }}>
               <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                    <Icon name={step.icon} size={16} color={isActive ? 'var(--accent-primary)' : 'var(--text-secondary)'} />
                    <span className="technical-text" style={{ fontSize: '0.55rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{step.label}</span>
               </div>
            </div>
          );
        })}
      </div>

      {/* Honeypot for bots (strictly hidden) */}
      <div style={{ display: 'none' }} aria-hidden="true">
        <input 
          type="text" 
          value={formData._honeypot} 
          onChange={(e) => updateForm({ _honeypot: e.target.value })} 
          tabIndex={-1} 
          autoComplete="off" 
        />
      </div>

      <div style={{ padding: 'clamp(2rem, 10vw, 5rem)' }}>
        {/* Error Notification Layer */}
        {submissionError && (
          <div style={{ 
              background: 'rgba(220, 0, 0, 0.1)', 
              border: '1px solid var(--accent-primary)', 
              padding: '1.5rem', 
              marginBottom: '3rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
          }}>
            <Icon name="alert" size={20} color="var(--accent-primary)" />
            <p className="technical-text" style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', fontWeight: 800 }}>
              {submissionError}
            </p>
          </div>
        )}

        {/* STEP 0: PARTNER TERMS */}
        {currentStep === 0 && (
          <div style={{ animation: 'fade-in 0.4s ease' }}>
            <div style={{ marginBottom: '2.5rem' }}>
              <h4 className="technical-text" style={{ fontSize: '0.7rem', color: 'var(--accent-primary)', letterSpacing: '0.2em', marginBottom: '1rem', fontWeight: 900 }}>PARTNER TERMS / NETWORK ONBOARDING</h4>
              <h3 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-0.04em' }}>Review the Partner Terms</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                Before joining the PrintPrice OS network, you must review and accept the Partner Terms for production partners.
              </p>
            </div>

            <div 
              onScroll={handleTermsScroll}
              style={{
                height: '420px',
                overflowY: 'auto',
                padding: '2rem',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border-color)',
                marginBottom: '2.5rem',
                fontSize: '0.9rem',
                lineHeight: '1.6',
                color: 'var(--text-secondary)',
                position: 'relative'
              }}
              className="terms-container custom-scrollbar"
            >
              <div style={{ marginBottom: '2rem' }}>
                <h4 style={{ color: 'var(--text-primary)', fontWeight: 800, marginBottom: '0.5rem' }}>Print House / Production Node Terms</h4>
                <p className="technical-text" style={{ fontSize: '0.7rem', opacity: 0.5 }}>Last updated: 2026-03-25</p>
              </div>

              <div style={{ fontFamily: 'var(--font-main)', color: 'var(--text-secondary)' }}>
                {[
                  { title: "1. Scope", text: "These Partner Terms govern the commercial relationship between Print Price Pro SIA (“PrintPrice Pro”, “we”, “us”) and the printing company or production partner applying to join the PrintPrice OS network as a Print House / Production Node (“Partner”, “you”)." },
                  { title: "2. Nature of the Relationship", text: "PrintPrice Pro operates a production intelligence and orchestration system that connects validated demand with qualified production partners.\n\nThe Partner acknowledges that:\n1. PrintPrice Pro is not the manufacturer of any printed product.\n2. The Partner remains the independent production entity responsible for manufacturing.\n3. PrintPrice Pro acts as an intermediary orchestration layer.\n4. No joint venture or employment relationship is created." },
                  { title: "3. Partner Admission and Qualification", text: "Admission is subject to PrintPrice Pro’s internal qualification criteria. The Partner must provide accurate and complete information regarding legal entity details, production capabilities, machine and finishing equipment, quality controls, certifications, geographic coverage, capacity, and lead times." },
                  { title: "4. Partner Obligations", text: "The Partner shall:\n1. maintain accurate capability, capacity, and production information at all times;\n2. manufacture jobs in accordance with accepted specifications;\n3. process only jobs routed through approved PrintPrice Pro workflows;\n4. comply with all applicable laws and environmental standards;\n5. protect all files and commercial information received;\n6. refrain from bypassing PrintPrice Pro for platform-sourced jobs;\n7. cooperate in audits and dispute handling." },
                  { title: "5. PrintPrice Pro Obligations", text: "PrintPrice Pro shall operate the system with reasonable care and provide the Partner with job specifications and files necessary for execution." },
                  { title: "6. No Volume Guarantee", text: "Admission to the network does not guarantee any minimum number of jobs or exclusivity." },
                  { title: "7. Job Acceptance and Execution", text: "A routed job becomes binding only when accepted through the designated workflow. Once accepted, the Partner is responsible for timely and compliant execution." },
                  { title: "8. Quality and Non-Conformity", text: "The Partner is responsible for ensuring production conforms to approved specifications. Defective jobs may require reprint or remediation contribution." },
                  { title: "9. Pricing, Fees, and Commercial Terms", text: "Commercial terms include routed job pricing, commissions, and platform fees as communicated during onboarding." },
                  { title: "10. Non-Circumvention", text: "The Partner shall not circumvent PrintPrice Pro to avoid fees or governance obligations." },
                  { title: "11. Confidentiality", text: "The Partner shall keep confidential all non-public information received from PrintPrice Pro." },
                  { title: "12. Intellectual Property", text: "Customer files and metadata remain the property of their respective owners. The Partner receives only a limited right to use materials for job fulfillment." },
                  { title: "13. Data Protection", text: "Each party shall comply with applicable data protection laws, including GDPR." },
                  { title: "14. Technical Integration and System Use", text: "The Partner shall use authorized credentials and not interfere with platform security or integrity." },
                  { title: "15. Audit and Monitoring", text: "PrintPrice Pro may retain logs and execution states for dispute resolution and quality review." },
                  { title: "16. Suspension and Termination", text: "Access may be suspended for breach of terms, quality failure, or circumvention attempts." },
                  { title: "17. Governing Law and Jurisdiction", text: "These Terms are governed by the laws of Latvia. Disputes are subject to the exclusive jurisdiction of the courts of Riga." }
                ].map((section, idx) => (
                  <div key={idx} style={{ marginBottom: '2rem' }}>
                    <h4 style={{ color: 'var(--text-primary)', fontSize: '0.8rem', fontWeight: 900, marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{section.title}</h4>
                    <p style={{ fontSize: '0.9rem', lineHeight: '1.6', opacity: 0.8, whiteSpace: 'pre-wrap' }}>{section.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <label style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1rem', 
                cursor: formData.termsReviewed ? 'pointer' : 'not-allowed',
                opacity: formData.termsReviewed ? 1 : 0.5,
                transition: 'all 0.3s ease'
              }}>
                <input 
                  type="checkbox" 
                  disabled={!formData.termsReviewed}
                  checked={formData.termsAccepted}
                  onChange={(e) => {
                    if (e.target.checked) {
                      updateForm({ 
                        termsAccepted: true, 
                        acceptedAt: new Date().toISOString(),
                        acceptanceTraceId: Math.random().toString(36).substring(7).toUpperCase()
                      });
                    } else {
                      updateForm({ termsAccepted: false });
                    }
                  }}
                  style={{ width: '22px', height: '22px', accentColor: 'var(--accent-primary)' }}
                />
                <span style={{ fontWeight: 700, fontSize: '1rem' }}>I have read and accept the Partner Terms</span>
              </label>
              <div className="technical-text" style={{ fontSize: '0.65rem', opacity: 0.5, marginLeft: '2.4rem' }}>
                {!formData.termsReviewed ? "Scroll to the bottom of the terms to enable acceptance." : "Acceptance is required to proceed with partner onboarding."}
              </div>
              <div className="technical-text" style={{ fontSize: '0.65rem', opacity: 0.3, marginLeft: '2.4rem' }}>
                Your acceptance will be recorded with timestamp and session trace for audit purposes.
              </div>
              
              <div style={{ marginTop: '1rem', marginLeft: '2.4rem' }}>
                <Link href="/legal/partner-terms" target="_blank" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textDecoration: 'underline', fontWeight: 800 }}>View or Save Terms (PDF/Print)</Link>
              </div>
            </div>
          </div>
        )}

        {/* STEP 1: COMPANY */}
        {currentStep === 1 && (
          <div style={{ animation: 'fade-in 0.4s ease' }}>
            <h3 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '2.5rem', letterSpacing: '-0.04em' }}>[01] Company Identity</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
              <div className="onboarding-field">
                <label className="technical-text" style={{ fontSize: '0.7rem', display: 'block', marginBottom: '0.75rem', color: 'var(--accent-primary)', fontWeight: 800 }}>COMPANY_NAME</label>
                <input 
                  type="text" 
                  value={formData.companyName}
                  onChange={(e) => updateForm({ companyName: e.target.value })}
                  style={inputStyle} 
                  placeholder="Full Entity name"
                />
              </div>
              <div className="onboarding-field">
                <label className="technical-text" style={{ fontSize: '0.7rem', display: 'block', marginBottom: '0.75rem', color: 'var(--accent-primary)', fontWeight: 800 }}>WEBSITE_URL</label>
                <input 
                  type="text" 
                  value={formData.website}
                  onChange={(e) => updateForm({ website: e.target.value })}
                  style={inputStyle} 
                  placeholder="https://company.pro"
                />
              </div>
              <div className="onboarding-field">
                <label className="technical-text" style={{ fontSize: '0.7rem', display: 'block', marginBottom: '0.75rem', color: 'var(--accent-primary)', fontWeight: 800 }}>HQ_COUNTRY</label>
                <input 
                  type="text" 
                  value={formData.country}
                  onChange={(e) => updateForm({ country: e.target.value })}
                  style={inputStyle} 
                  placeholder="Primary manufacturing region"
                />
              </div>
              <div className="onboarding-field">
                <label className="technical-text" style={{ fontSize: '0.7rem', display: 'block', marginBottom: '0.75rem', color: 'var(--accent-primary)', fontWeight: 800 }}>CONTACT_EMAIL</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => updateForm({ email: e.target.value })}
                  style={inputStyle} 
                  placeholder="production-head@company.pro"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: CAPABILITIES */}
        {currentStep === 2 && (
          <div style={{ animation: 'fade-in 0.4s ease' }}>
            <h3 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '2.5rem', letterSpacing: '-0.04em' }}>[02] Production Nodes</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem' }}>Your machines define your routing profile. Select all that apply.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '3rem' }}>
              {['Offset', 'Digital', 'Large Format', 'Packaging', 'Hardcover Binding', 'Softcover Binding', 'Spiral/Wire-O'].map(type => (
                <button 
                  key={type}
                  onClick={() => {
                    const types = formData.productionTypes.includes(type) 
                        ? formData.productionTypes.filter(t => t !== type)
                        : [...formData.productionTypes, type];
                    updateForm({ productionTypes: types });
                  }}
                  style={{
                    padding: '1.25rem',
                    background: formData.productionTypes.includes(type) ? 'rgba(255,0,0,0.1)' : 'var(--bg-secondary)',
                    border: formData.productionTypes.includes(type) ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)',
                    color: formData.productionTypes.includes(type) ? 'var(--text-primary)' : 'var(--text-secondary)',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {type}
                </button>
              ))}
            </div>
            <div className="onboarding-field">
                <label className="technical-text" style={{ fontSize: '0.7rem', display: 'block', marginBottom: '0.75rem', color: 'var(--accent-primary)', fontWeight: 800 }}>MAX_SHEET_SIZE</label>
                <input 
                  type="text" 
                  value={formData.maxSheetSize}
                  onChange={(e) => updateForm({ maxSheetSize: e.target.value })}
                  style={inputStyle} 
                  placeholder="e.g. 720 x 1020 mm"
                />
            </div>
          </div>
        )}

        {/* STEP 3: MACHINERY */}
        {currentStep === 3 && (
          <div style={{ animation: 'fade-in 0.4s ease' }}>
            <h3 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '2.5rem', letterSpacing: '-0.04em' }}>[03] Machine Profile</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              <div className="onboarding-field">
                <label className="technical-text" style={{ fontSize: '0.7rem', display: 'block', marginBottom: '0.75rem', color: 'var(--accent-primary)', fontWeight: 800 }}>PRIMARY_PRESSES</label>
                <textarea 
                  value={formData.presses}
                  onChange={(e) => updateForm({ presses: e.target.value })}
                  style={textareaStyle} 
                  placeholder="Heidelberg Speedmaster XL 106, HP Indigo 12000..."
                />
              </div>
              <div className="onboarding-field">
                <label className="technical-text" style={{ fontSize: '0.7rem', display: 'block', marginBottom: '0.75rem', color: 'var(--accent-primary)', fontWeight: 800 }}>CORE_SPECIALIZATION</label>
                <textarea 
                  value={formData.typicalJobs}
                  onChange={(e) => updateForm({ typicalJobs: e.target.value })}
                  style={textareaStyle} 
                  placeholder="Premium Hardcover Books, Folding Carton, High-volume Marketing..."
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: CAPACITY */}
        {currentStep === 4 && (
          <div style={{ animation: 'fade-in 0.4s ease' }}>
            <h3 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '2.5rem', letterSpacing: '-0.04em' }}>[04] Capacity Audit</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
              <div className="onboarding-field">
                <label className="technical-text" style={{ fontSize: '0.7rem', display: 'block', marginBottom: '0.75rem', color: 'var(--accent-primary)', fontWeight: 800 }}>MONTHLY_FINISHED_COPIES</label>
                <select 
                    value={formData.monthlyVolume}
                    onChange={(e) => updateForm({ monthlyVolume: e.target.value })}
                    style={inputStyle as any}
                >
                    <option value="">Range of monthly production...</option>
                    <option value="< 10k copies">&lt; 10,000 copies</option>
                    <option value="10k – 50k copies">10,000 – 50,000 copies</option>
                    <option value="50k – 200k copies">50,000 – 200,000 copies</option>
                    <option value="200k+ copies">200,000+ copies</option>
                </select>
              </div>
              <div className="onboarding-field">
                <label className="technical-text" style={{ fontSize: '0.7rem', display: 'block', marginBottom: '0.75rem', color: 'var(--accent-primary)', fontWeight: 800 }}>SYSTEM_UTILIZATION</label>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    {['Low', 'Medium', 'High'].map(u => (
                        <button 
                            key={u}
                            onClick={() => updateForm({ utilization: u })}
                            style={{
                                flex: 1, padding: '1rem',
                                background: formData.utilization === u ? 'var(--accent-primary)' : 'var(--bg-secondary)',
                                border: '1px solid var(--border-color)',
                                color: formData.utilization === u ? '#fff' : 'var(--text-secondary)',
                                fontWeight: 800, fontSize: '0.7rem', textTransform: 'uppercase', cursor: 'pointer'
                            }}
                        >
                            {u}
                        </button>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: INTEGRATION */}
        {currentStep === 5 && (
          <div style={{ animation: 'fade-in 0.4s ease' }}>
            <h3 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '2.5rem', letterSpacing: '-0.04em' }}>[05] Integration Protocol</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem' }}>Select the technical standard you wish to implement.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {[
                    { title: 'Dashboard only', badge: 'MANUAL', desc: 'Manage jobs via the PrintPrice OS portal. Best for starting out.' },
                    { title: 'API-ready', badge: 'INTEGRATED', desc: 'Connect your ERP/MIS (JDF/JMF) for direct order processing.' },
                    { title: 'Fully automated routing', badge: 'ORCHESTRATED', desc: 'Zero manual touch. Files routed directly to your DFE.' },
                ].map(opt => (
                    <button 
                        key={opt.title}
                        onClick={() => updateForm({ integrationLevel: opt.title })}
                        style={{
                            padding: '2rem', textAlign: 'left',
                            background: formData.integrationLevel === opt.title ? 'rgba(255,0,0,0.05)' : 'var(--bg-secondary)',
                            border: formData.integrationLevel === opt.title ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)',
                            cursor: 'pointer', transition: 'all 0.2s ease'
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', alignItems: 'center' }}>
                            <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: formData.integrationLevel === opt.title ? 'var(--text-primary)' : 'var(--text-secondary)' }}>{opt.title}</h4>
                            <span className="technical-text" style={{ fontSize: '0.6rem', color: 'var(--accent-primary)', fontWeight: 900 }}>{opt.badge}</span>
                        </div>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', opacity: 0.7 }}>{opt.desc}</p>
                    </button>
                ))}
            </div>
          </div>
        )}

        {/* STEP 6: COMPLIANCE */}
        {currentStep === 6 && (
          <div style={{ animation: 'fade-in 0.4s ease' }}>
            <h3 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '2.5rem', letterSpacing: '-0.04em' }}>[06] Quality Enforcement</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}>
                    <input 
                        type="checkbox" 
                        checked={formData.standards}
                        onChange={(e) => updateForm({ standards: e.target.checked })}
                        style={{ width: '20px', height: '20px', accentColor: 'var(--accent-primary)' }}
                    />
                    <span style={{ fontWeight: 700 }}>We follow ISO print standards and FOGRA/GRACoL certifications.</span>
                </label>
                <div className="onboarding-field">
                    <label className="technical-text" style={{ fontSize: '0.7rem', display: 'block', marginBottom: '1.25rem', color: 'var(--accent-primary)', fontWeight: 800 }}>CERTIFICATIONS_REGISTRY</label>
                    
                    {[
                        { group: "Color Quality", certs: ['ISO 12647 (PSO)', 'FOGRA Cert', 'GRACoL / G7'] },
                        { group: "Management & Processes", certs: ['ISO 9001', 'ISO 14001', 'BRC Packaging'] },
                        { group: "Sustainability", certs: ['FSC Certified', 'PEFC', 'SGP Partnership', 'EMAS'] }
                    ].map((group) => (
                        <div key={group.group} style={{ marginBottom: '2.5rem' }}>
                            <h5 className="technical-text" style={{ fontSize: '0.6rem', opacity: 0.6, marginBottom: '1rem', letterSpacing: '0.1em' }}>{group.group.toUpperCase()}</h5>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
                                {group.certs.map(cert => {
                                    const isSelected = formData.certifications.includes(cert);
                                    return (
                                        <button 
                                            key={cert}
                                            onClick={() => {
                                                const certs = isSelected 
                                                    ? formData.certifications.filter(c => c !== cert)
                                                    : [...formData.certifications, cert];
                                                updateForm({ certifications: certs });
                                            }}
                                            style={{
                                                padding: '1rem',
                                                background: isSelected ? 'rgba(255,0,0,0.1)' : 'var(--bg-secondary)',
                                                border: isSelected ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)',
                                                color: isSelected ? 'var(--text-primary)' : 'var(--text-secondary)',
                                                fontSize: '0.75rem',
                                                fontWeight: 800,
                                                textAlign: 'left',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s ease',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center'
                                            }}
                                        >
                                            {cert}
                                            {isSelected && <span style={{ color: 'var(--accent-primary)', fontSize: '0.6rem' }}>●</span>}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="onboarding-field">
                    <label className="technical-text" style={{ fontSize: '0.7rem', display: 'block', marginBottom: '1.25rem', color: 'var(--accent-primary)', fontWeight: 800 }}>QA_PROTOCOL_MODULES</label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
                        {[
                            { id: 'preflight', label: 'File Validation / Preflight Audit', desc: 'Pre-production verification of digital assets and trapping.' },
                            { id: 'densitometry', label: 'On-press Densitometry', desc: 'Real-time monitoring of color density and registration.' },
                            { id: 'sampling', label: 'In-process Random Sampling', desc: 'Periodic quality checks during high-volume production.' },
                            { id: 'finishing', label: 'Post-press / Finishing Audit', desc: 'Verification of binding, cutting, and lamination tolerances.' },
                            { id: 'traceability', label: 'Traceability / Batch Logging', desc: 'Detailed event logging for every production node state.' },
                            { id: 'packaging', label: 'Final Packaging QC', desc: 'Automated weight and quantity audit before dispatch.' }
                        ].map(module => {
                            const isSelected = formData.qaModules.includes(module.id);
                            return (
                                <button 
                                    key={module.id}
                                    onClick={() => {
                                        const modules = isSelected 
                                            ? formData.qaModules.filter(m => m !== module.id)
                                            : [...formData.qaModules, module.id];
                                        updateForm({ qaModules: modules });
                                    }}
                                    style={{
                                        padding: '1.25rem',
                                        background: isSelected ? 'rgba(255,0,0,0.05)' : 'var(--bg-secondary)',
                                        border: isSelected ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)',
                                        textAlign: 'left',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: isSelected ? 'var(--text-primary)' : 'var(--text-secondary)', marginBottom: '0.5rem' }}>{module.label}</h4>
                                    <p style={{ fontSize: '0.75rem', opacity: 0.6, lineHeight: 1.4, color: 'var(--text-secondary)' }}>{module.desc}</p>
                                </button>
                            );
                        })}
                    </div>

                    <label className="technical-text" style={{ fontSize: '0.7rem', display: 'block', marginBottom: '0.75rem', color: 'var(--text-muted)', fontWeight: 800 }}>ADDITIONAL_QA_DETAILS</label>
                    <textarea 
                        value={formData.qaCustomDetails}
                        onChange={(e) => updateForm({ qaCustomDetails: e.target.value })}
                        style={textareaStyle} 
                        placeholder="Describe any proprietary quality controls or specific client audit procedures..."
                    />
                </div>
            </div>
          </div>
        )}

        {/* TURNSTILE / BOT PROTECTION (v2.5) */}
        <div style={{ marginTop: '3rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', opacity: 0.8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Icon name="shield" size={14} color="var(--accent-primary)" />
                <span className="technical-text" style={{ fontSize: '0.6rem', fontWeight: 900, letterSpacing: '0.1em' }}>BOT_PROTECTION_ACTIVE</span>
            </div>
            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', height: '65px', display: 'flex', alignItems: 'center', padding: '0 1.5rem', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600 }}>
                {/* Real Turnstile would inject here. This is the PPOS v2.5 UI placeholder */}
                <span style={{ flex: 1 }}>Cloudflare Turnstile Verified</span>
                <Icon name="shield" size={18} color="var(--accent-primary)" />
            </div>
        </div>

        {/* NAVIGATION BUTTONS */}
        <div style={{ marginTop: '5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '3rem' }}>
            <button 
                onClick={prevStep}
                disabled={currentStep === 1 || isSubmitting}
                style={{ 
                    visibility: currentStep === 1 ? 'hidden' : 'visible',
                    background: 'none', border: 'none', color: 'var(--text-secondary)', 
                    fontFamily: 'var(--font-technical)', fontSize: '0.8rem', fontWeight: 800, cursor: 'pointer' 
                }}
            >
                ← PREVIOUS_STEP
            </button>
            {currentStep < 6 ? (
                <Button size="lg" onClick={nextStep} disabled={currentStep === 0 && !formData.termsAccepted}>
                    {currentStep === 0 ? 'CONTINUE_ONBOARDING →' : 'NEXT_STEP →'}
                </Button>
            ) : (
                <Button size="lg" onClick={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting ? 'ENFORCING_QUALIFICATION...' : 'ACTIVATE_PARTNER_PROFILE →'}
                </Button>
            )}
        </div>
      </div>

      {/* FOOTER INFO */}
      <div style={{ background: 'var(--bg-secondary)', padding: '2rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="technical-text" style={{ fontSize: '0.6rem', opacity: 0.4, letterSpacing: '0.1em' }}>TRUSTED_ONBOARDING_PROTOCOL / MONOLITH_v2.5</div>
          <div className="technical-text" style={{ fontSize: '0.6rem', opacity: 0.4 }}>NO_MARKETING_LEADS_ALLOWED</div>
      </div>
      
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  background: 'var(--bg-secondary)',
  border: '1px solid var(--border-color)',
  padding: '1.25rem',
  color: 'var(--text-primary)',
  fontSize: '1rem',
  fontFamily: 'var(--font-display)',
  fontWeight: 500,
  outline: 'none',
  borderRadius: '0'
};

const textareaStyle = {
  ...inputStyle,
  minHeight: '120px',
  resize: 'vertical' as any
};
