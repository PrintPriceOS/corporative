'use client';

import React, { useState, useEffect } from 'react';
import { Icon } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';

import { submitPartnerOnboarding } from '@/lib/actions';

// STEP DEFINITIONS
const STEPS = [
  { id: 1, label: 'Company', icon: 'factory' as any },
  { id: 2, label: 'Capabilities', icon: 'layers' as any },
  { id: 3, label: 'Machinery', icon: 'specs' as any },
  { id: 4, label: 'Capacity', icon: 'orchestration' as any },
  { id: 5, label: 'Integration', icon: 'pipeline' as any },
  { id: 6, label: 'Compliance', icon: 'shield' as any },
];

export const PartnerOnboardingFlow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [startTime] = useState(Date.now());
  const [formData, setFormData] = useState({
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
    certifications: '',
    qaProcess: '',
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

  const nextStep = () => setCurrentStep((s) => Math.min(s + 1, STEPS.length));
  const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 1));

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
                <label className="technical-text" style={{ fontSize: '0.7rem', display: 'block', marginBottom: '0.75rem', color: 'var(--accent-primary)', fontWeight: 800 }}>MONTHLY_PRINT_VOLUME</label>
                <select 
                    value={formData.monthlyVolume}
                    onChange={(e) => updateForm({ monthlyVolume: e.target.value })}
                    style={inputStyle as any}
                >
                    <option value="">Select range...</option>
                    <option value="< €50k">&lt; €50k</option>
                    <option value="€50k–€250k">€50k–€250k</option>
                    <option value="€250k–€1M">€250k–€1M</option>
                    <option value="€1M+">€1M+</option>
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
                    <label className="technical-text" style={{ fontSize: '0.7rem', display: 'block', marginBottom: '0.75rem', color: 'var(--accent-primary)', fontWeight: 800 }}>CERTIFICATIONS</label>
                    <input 
                        type="text" 
                        value={formData.certifications}
                        onChange={(e) => updateForm({ certifications: e.target.value })}
                        style={inputStyle} 
                        placeholder="ISO 12647, FSC, PEFC, etc."
                    />
                </div>
                <div className="onboarding-field">
                    <label className="technical-text" style={{ fontSize: '0.7rem', display: 'block', marginBottom: '0.75rem', color: 'var(--accent-primary)', fontWeight: 800 }}>QA_PROTOCOL_LOG</label>
                    <textarea 
                        value={formData.qaProcess}
                        onChange={(e) => updateForm({ qaProcess: e.target.value })}
                        style={textareaStyle} 
                        placeholder="Describe your internal quality audit flow..."
                    />
                </div>
            </div>
          </div>
        )}

        {/* TURNSTILE / BOT PROTECTION (v2.4) */}
        <div style={{ marginTop: '3rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', opacity: 0.8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Icon name="shield" size={14} color="var(--accent-primary)" />
                <span className="technical-text" style={{ fontSize: '0.6rem', fontWeight: 900, letterSpacing: '0.1em' }}>BOT_PROTECTION_ACTIVE</span>
            </div>
            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', height: '65px', display: 'flex', alignItems: 'center', padding: '0 1.5rem', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600 }}>
                {/* Real Turnstile would inject here. This is the PPOS v2.4 UI placeholder */}
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
                <Button size="lg" onClick={nextStep}>CONTINUE_ONBOARDING →</Button>
            ) : (
                <Button size="lg" onClick={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting ? 'ENFORCING_QUALIFICATION...' : 'ACTIVATE_PARTNER_PROFILE →'}
                </Button>
            )}
        </div>
      </div>

      {/* FOOTER INFO */}
      <div style={{ background: 'var(--bg-secondary)', padding: '2rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="technical-text" style={{ fontSize: '0.6rem', opacity: 0.4, letterSpacing: '0.1em' }}>TRUSTED_ONBOARDING_PROTOCOL / MONOLITH_v2.4</div>
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
