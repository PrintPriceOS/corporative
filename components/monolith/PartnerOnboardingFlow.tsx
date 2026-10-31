'use client';

import React, { useState, useEffect } from 'react';
import { Icon } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { useLocale } from '@/lib/i18n';
import { submitPartnerOnboarding, SubmitPartnerOnboardingResult } from '@/lib/actions';

// STEP DEFINITIONS (ES / EN / DE)
const STEPS = [
  { id: 0, label: { es: 'Legal', en: 'Legal', de: 'Rechtliches' }, icon: 'policy' as const },
  { id: 1, label: { es: 'Empresa', en: 'Company', de: 'Unternehmen' }, icon: 'factory' as const },
  { id: 2, label: { es: 'Capacidades', en: 'Capabilities', de: 'Kapazitäten' }, icon: 'layers' as const },
  { id: 3, label: { es: 'Maquinaria', en: 'Machinery', de: 'Maschinen' }, icon: 'specs' as const },
  { id: 4, label: { es: 'Volumen', en: 'Capacity', de: 'Volumen' }, icon: 'orchestration' as const },
  { id: 5, label: { es: 'Integración', en: 'Integration', de: 'Integration' }, icon: 'pipeline' as const },
  { id: 6, label: { es: 'Calidad', en: 'Compliance', de: 'Qualität' }, icon: 'shield' as const },
];

export const PartnerOnboardingFlow: React.FC = () => {
  const { locale } = useLocale();
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
  const [submissionResult, setSubmissionResult] = useState<SubmitPartnerOnboardingResult | null>(null);
  const [submissionStatus, setSubmissionStatus] = useState<SubmitPartnerOnboardingResult['status'] | null>(null);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  // Auto-save logic: strictly preserve in localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('ppp_partner_onboarding');
      if (saved) {
        setFormData(prev => ({ ...prev, ...JSON.parse(saved) }));
      }
    } catch {
      // LocalStorage access resilient fallback
    }
  }, []);

  const updateForm = (updates: Partial<typeof formData>) => {
    const newData = { ...formData, ...updates };
    setFormData(newData);
    try {
      localStorage.setItem('ppp_partner_onboarding', JSON.stringify(newData));
    } catch {
      // LocalStorage storage quota fallback
    }
  };

  const nextStep = () => {
    if (currentStep === 0 && !formData.termsAccepted) return;
    setCurrentStep((s) => Math.min(s + 1, STEPS.length - 1));
  };
  const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 0));

  const handleTermsScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    if (formData.termsReviewed) return;
    
    const isAtBottom = target.scrollHeight - target.scrollTop <= target.clientHeight + 25;
    if (isAtBottom) {
      updateForm({ termsReviewed: true });
    }
  };

  const handleSubmit = async () => {
    if (isSubmitting) return; // Prevent duplicate concurrent submissions
    setIsSubmitting(true);
    setSubmissionError(null);
    
    // 1. Prepare FormData strictly
    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (Array.isArray(value)) form.append(key, JSON.stringify(value));
      else form.append(key, value.toString());
    });
    
    // Append real submission timestamp for speed verification
    form.append('_timestamp', startTime.toString());
    
    try {
      const result = await submitPartnerOnboarding(form);
      setSubmissionResult(result);
      setSubmissionStatus(result.status);

      if (result.status === 'INTEGRATION_PENDING') {
        // OPERATIONAL TRUTH:
        // Do NOT remove 'ppp_partner_onboarding' from localStorage!
        // We preserve draft data in browser so the partner can review, export, or retry.
        setSubmissionError(null);
      } else {
        const errorMsg = result.localizedMessage?.[locale] || result.message || (
          locale === 'es' ? 'La comprobación del formulario no superó las validaciones técnicas.' :
          locale === 'de' ? 'Die Formularprüfung hat die technischen Validierungen nicht bestanden.' :
          'Submission did not pass technical validation checks.'
        );
        setSubmissionError(errorMsg);
      }
    } catch {
      setSubmissionError(
        locale === 'es'
          ? 'Error de red o sistema no accesible. Tu borrador se mantiene a salvo.'
          : locale === 'de'
          ? 'Netzwerkfehler oder System nicht erreichbar. Ihr Entwurf bleibt sicher erhalten.'
          : 'Network error or system unreachable. Your draft remains preserved safely.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToDraft = () => {
    setSubmissionStatus(null);
    setSubmissionResult(null);
    setSubmissionError(null);
  };

  const handleExportJson = () => {
    const exportPayload = {
      manifest: {
        application: 'PrintPrice OS Partner Onboarding',
        version: '2.5',
        exportedAt: new Date().toISOString(),
        locale,
        integrationStatus: submissionStatus || 'LOCAL_DRAFT',
      },
      company: {
        companyName: formData.companyName,
        website: formData.website,
        country: formData.country,
        contactName: formData.contactName,
        email: formData.email,
        phone: formData.phone,
      },
      productionCapabilities: {
        productionTypes: formData.productionTypes,
        maxSheetSize: formData.maxSheetSize,
        materials: formData.materials,
      },
      machinery: {
        presses: formData.presses,
        typicalJobs: formData.typicalJobs,
        colorCaps: formData.colorCaps,
      },
      capacity: {
        monthlyVolume: formData.monthlyVolume,
        utilization: formData.utilization,
      },
      integration: {
        integrationLevel: formData.integrationLevel,
      },
      complianceAndQA: {
        standards: formData.standards,
        certifications: formData.certifications,
        qaModules: formData.qaModules,
        qaCustomDetails: formData.qaCustomDetails,
      },
      legalAcceptance: {
        termsAccepted: formData.termsAccepted,
        termsVersion: formData.termsVersion,
        acceptedAt: formData.acceptedAt,
        acceptanceTraceId: formData.acceptanceTraceId,
      }
    };

    const blob = new Blob([JSON.stringify(exportPayload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const sanitizedName = (formData.companyName || 'imprenta').toLowerCase().replace(/[^a-z0-9]/g, '-');
    link.download = `printprice-partner-onboarding-${sanitizedName}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Localized texts dictionary
  const uiTexts = {
    es: {
      badge: 'CANAL DIGITAL · INTEGRACIÓN TÉCNICA PENDIENTE',
      pendingTitle: 'Solicitud técnica validada · No enviada ni persistida en servidor',
      pendingDesc: 'Los datos técnicos y el perfil de tu parque de máquinas han superado la validación sintáctica del servidor. Sin embargo, el canal automatizado de ingesta, calificación directa y persistencia en base de datos de Control Plane se encuentra en fase de desarrollo e integración técnica.',
      pendingNoAccount: 'No se ha creado ninguna cuenta de usuario, no se han guardado datos en base de datos ni se ha notificado a ningún equipo sin evidencia operativa de dicha operación.',
      draftNotice: 'Tu borrador completo se mantiene íntegro y protegido en tu navegador para que no pierdas ningún dato.',
      auditBoxTitle: 'DIAGNÓSTICO TÉCNICO DE LA SOLICITUD',
      auditTarget: 'Destino de integración:',
      auditTargetVal: 'PrintPrice OS Control Plane — Printhouse Ingestion & Review Pipeline',
      auditStatus: 'Estado de conexión:',
      auditStatusVal: '[PENDIENTE DE CONEXIÓN DE BACKEND OPERATIVO]',
      auditTier: 'Perfil preliminar estimado:',
      auditScore: 'Puntuación de idoneidad técnica:',
      auditTimestamp: 'Marca temporal de validación:',
      auditStorage: 'Borrador local:',
      auditStorageVal: 'Almacenado de forma segura en navegador (localStorage: ppp_partner_onboarding)',
      btnBackToDraft: '← Volver a editar el borrador',
      btnExportJson: 'Exportar borrador en JSON ⤓',
      btnGoToControlPlane: 'Registro oficial en Control Plane ➔',
      btnContactTeam: 'Contactar con el equipo de integración',
      upfrontNoticeTitle: 'Aviso de arquitectura:',
      upfrontNoticeBody: 'El registro oficial y aprovisionamiento de imprentas se realiza exclusivamente en la consola de Control Plane. Este formulario preliminar no cuenta con canal de ingesta directa conectado.',
      btnGoToControlPlaneDirect: 'Registro oficial en Control Plane ➔',
      prevStep: '← Paso anterior',
      nextStep: 'Continuar →',
      submitBtn: 'Validar perfil técnico de taller →',
      submittingBtn: 'Validando requisitos de taller...',
      termsHeader: 'CONDICIONES PARA IMPRENTAS Y NODOS DE PRODUCCIÓN',
      termsTitle: 'Condiciones de Adhesión para Imprentas Asociadas',
      termsDesc: 'Antes de vincular tu taller a la red de producción de PrintPrice OS, debes revisar las condiciones comerciales e industriales vigentes.',
      scrollRequired: 'Desplaza el documento hasta el final para habilitar la casilla de aceptación.',
      acceptCheckbox: 'He leído íntegramente y acepto las Condiciones para Imprentas y Nodos de Producción de PrintPrice OS.',
      companyHeader: 'DATOS DE LA EMPRESA',
      companyTitle: 'Identificación y Contacto de Planta',
      companyDesc: 'Introduce los datos de tu empresa gráfica y los datos de contacto del responsable técnico o de producción.',
      companyName: 'Razón Social / Nombre Comercial',
      website: 'Sitio Web Corporativo',
      country: 'País de Producción Principal',
      contactName: 'Persona de Contacto Técnico / Operaciones',
      email: 'Correo Electrónico Corporativo',
      phone: 'Teléfono de Contacto Directo',
      capHeader: 'CAPACIDADES DE IMPRESIÓN',
      capTitle: 'Tecnologías y Formatos de Pliego',
      capDesc: 'Selecciona las líneas de producción instaladas en tu planta y los formatos máximos de pliego con los que operas.',
      prodTypesLabel: 'Tipos de producción disponibles:',
      maxSheetLabel: 'Formato máximo de pliego / bobina (ej. 750 × 1060 mm):',
      materialsLabel: 'Gamas de sustratos principales (ej. Offset 80-120g, Estucado 115-350g, Folding 240-400g):',
      machHeader: 'PARQUE DE MÁQUINAS',
      machTitle: 'Equipamiento de Impresión y Tiradas Típicas',
      machDesc: 'Describe tus prensas principales, número de cuerpos, capacidades de barniz y tipología de pedidos habituales.',
      pressesLabel: 'Modelos de prensas y configuración (ej. Heidelberg Speedmaster XL 106 8-P, HP Indigo 12000):',
      typicalJobsLabel: 'Tipología de trabajos y tiradas habituales (ej. Libros rústica 500-5.000 ej., Packaging microcanal):',
      colorCapsLabel: 'Capacidades de color (ej. 4/4 colores, barniz acrílico en línea, tintas Pantone directas):',
      volHeader: 'CAPACIDAD Y VOLUMEN',
      volTitle: 'Volumen Mensual y Nivel de Ocupación',
      volDesc: 'Indica el volumen medio mensual de facturación de producción y el nivel medio de ocupación de tu planta.',
      monthlyVolLabel: 'Volumen mensual estimado de fabricación:',
      utilizationLabel: 'Porcentaje medio de ocupación de capacidad (%):',
      intHeader: 'NIVEL DE INTEGRACIÓN',
      intTitle: 'Conectividad y Flujo de Trabajo',
      intDesc: 'Selecciona el nivel de integración tecnológica con el que tu planta puede recibir y gestionar pedidos.',
      complianceHeader: 'CALIDAD Y CUMPLIMIENTO',
      complianceTitle: 'Estándares Gráficos y Certificaciones',
      complianceDesc: 'Indica los controles de calidad en máquina y las certificaciones medioambientales o de proceso activas.',
      standardsCheck: 'Trabajamos bajo estándares gráficos normalizados (ISO 12647, Fogra o PSO verificado).',
      certificationsLabel: 'Certificaciones activas de planta:',
      qaModulesLabel: 'Módulos y controles de calidad aplicados en taller:',
      qaCustomLabel: 'Detalles adicionales de calidad o auditorías de clientes:',
      qaCustomPlaceholder: 'Describe controles específicos, espectrofotometría en línea o procedimientos propios...',
    },
    en: {
      badge: 'DIGITAL INTAKE · TECHNICAL INTEGRATION PENDING',
      pendingTitle: 'Technical application validated · Not transmitted or persisted on server',
      pendingDesc: 'The technical specifications and machinery fleet profile have passed server syntax validation. However, the automated intake, direct qualification, and database persistence channel in Control Plane is currently in technical integration.',
      pendingNoAccount: 'No user account has been created, no data has been stored in any server database, and no team has been notified without operational evidence of that operation.',
      draftNotice: 'Your complete draft remains fully intact and secured in your browser so you do not lose any information.',
      auditBoxTitle: 'TECHNICAL APPLICATION AUDIT',
      auditTarget: 'Target integration pipeline:',
      auditTargetVal: 'PrintPrice OS Control Plane — Printhouse Ingestion & Review Pipeline',
      auditStatus: 'Connection status:',
      auditStatusVal: '[PENDING OPERATIONAL BACKEND CONNECTION]',
      auditTier: 'Preliminary qualified tier:',
      auditScore: 'Technical qualification score:',
      auditTimestamp: 'Validation timestamp:',
      auditStorage: 'Local draft storage:',
      auditStorageVal: 'Safely preserved in browser (localStorage: ppp_partner_onboarding)',
      btnBackToDraft: '← Return to edit draft',
      btnExportJson: 'Export draft (JSON) ⤓',
      btnGoToControlPlane: 'Official Control Plane registration ➔',
      btnContactTeam: 'Contact partner integration desk',
      upfrontNoticeTitle: 'Architecture Notice:',
      upfrontNoticeBody: 'Official print house registration and provisioning is managed exclusively in Control Plane. This preliminary intake form does not have an active direct ingestion pipeline.',
      btnGoToControlPlaneDirect: 'Official Control Plane Registration ➔',
      prevStep: '← Previous step',
      nextStep: 'Continue →',
      submitBtn: 'Validate partner technical profile →',
      submittingBtn: 'Validating shop requirements...',
      termsHeader: 'PARTNER TERMS / NETWORK ONBOARDING',
      termsTitle: 'Review the Partner Terms',
      termsDesc: 'Before connecting your facility to the PrintPrice OS network, you must review the applicable commercial and manufacturing terms.',
      scrollRequired: 'Please scroll the document to the bottom to enable acceptance checkbox.',
      acceptCheckbox: 'I have fully reviewed and accept the PrintPrice OS Partner Terms for print houses.',
      companyHeader: 'COMPANY PROFILE',
      companyTitle: 'Plant Identification & Technical Contact',
      companyDesc: 'Enter your corporate printing company details and designated technical operations contact.',
      companyName: 'Company Legal Name / Trading Name',
      website: 'Corporate Website',
      country: 'Primary Manufacturing Country',
      contactName: 'Technical Operations Contact Name',
      email: 'Corporate Email Address',
      phone: 'Direct Phone Number',
      capHeader: 'PRINTING CAPABILITIES',
      capTitle: 'Technologies and Sheet Formats',
      capDesc: 'Select active production lines installed in your facility and maximum sheet sizes.',
      prodTypesLabel: 'Available production lines:',
      maxSheetLabel: 'Maximum sheet / roll format (e.g. 750 × 1060 mm):',
      materialsLabel: 'Primary substrate ranges (e.g. Uncoated 80-120g, Coated 115-350g, Folding boxboard 240-400g):',
      machHeader: 'MACHINERY FLEET',
      machTitle: 'Press Inventory and Typical Runs',
      machDesc: 'Describe your primary presses, color units, coating towers, and routine job profiles.',
      pressesLabel: 'Press models and configuration (e.g. Heidelberg Speedmaster XL 106 8-P, HP Indigo 12000):',
      typicalJobsLabel: 'Typical run formats and lengths (e.g. Softcover books 500-5,000 copies, microflute packaging):',
      colorCapsLabel: 'Color capabilities (e.g. 4/4 colors, in-line aqueous coating, Pantone spot colors):',
      volHeader: 'CAPACITY & VOLUME',
      volTitle: 'Monthly Manufacturing Volume and Utilization',
      volDesc: 'Indicate your facility average monthly production turnover and capacity utilization.',
      monthlyVolLabel: 'Estimated monthly production volume:',
      utilizationLabel: 'Average plant capacity utilization (%):',
      intHeader: 'INTEGRATION READINESS',
      intTitle: 'Connectivity and Job Workflow',
      intDesc: 'Select the technological integration level your facility supports for automated job intake.',
      complianceHeader: 'QUALITY & COMPLIANCE',
      complianceTitle: 'Graphic Arts Standards & Certifications',
      complianceDesc: 'Indicate on-press quality controls and active environmental or process certifications.',
      standardsCheck: 'We operate under standardized graphic arts workflows (ISO 12647, Fogra, or PSO verified).',
      certificationsLabel: 'Active plant certifications:',
      qaModulesLabel: 'Quality control procedures applied on shop floor:',
      qaCustomLabel: 'Additional quality controls or customer audit details:',
      qaCustomPlaceholder: 'Describe proprietary quality procedures, in-line spectrophotometry, or client audits...',
    },
    de: {
      badge: 'DIGITALER KANAL · TECHNISCHE INTEGRATION AUSSTEHEND',
      pendingTitle: 'Technischer Antrag validiert · Nicht übertragen oder auf dem Server gespeichert',
      pendingDesc: 'Ihre technischen Spezifikationen und das Maschinenparkprofil haben die serverseitige Validierung bestanden. Der automatisierte Kanal für Direkterfassung, Qualifizierung und Speicherung im Control Plane befindet sich jedoch in der technischen Entwicklung.',
      pendingNoAccount: 'Es wurde kein Benutzerkonto erstellt, keine Daten in einer Datenbank gespeichert und kein Team ohne operativen Nachweis benachrichtigt.',
      draftNotice: 'Ihr vollständiger Entwurf bleibt sicher und geschützt in Ihrem Browser erhalten, damit keine Daten verloren gehen.',
      auditBoxTitle: 'TECHNISCHE ANTRAGSPRÜFUNG',
      auditTarget: 'Ziel-Integrationspipeline:',
      auditTargetVal: 'PrintPrice OS Control Plane — Printhouse Ingestion & Review Pipeline',
      auditStatus: 'Verbindungsstatus:',
      auditStatusVal: '[AUSSTEHENDE OPERATIVE BACKEND-ANBINDUNG]',
      auditTier: 'Vorläufige Einstufung:',
      auditScore: 'Technische Eignungsbewertung:',
      auditTimestamp: 'Validierungszeitstempel:',
      auditStorage: 'Lokaler Entwurfsspeicher:',
      auditStorageVal: 'Sicher im Browser gespeichert (localStorage: ppp_partner_onboarding)',
      btnBackToDraft: '← Zurück zum Entwurf',
      btnExportJson: 'Entwurf exportieren (JSON) ⤓',
      btnGoToControlPlane: 'Offizielle Control-Plane-Registrierung ➔',
      btnContactTeam: 'Team für Partner-Integration kontaktieren',
      upfrontNoticeTitle: 'Architektur-Hinweis:',
      upfrontNoticeBody: 'Die offizielle Druckerei-Registrierung und Einrichtung erfolgt ausschließlich im Control Plane. Dieses vorläufige Formular verfügt über keinen aktiven Direkterfassungskanal.',
      btnGoToControlPlaneDirect: 'Offizielle Control-Plane-Registrierung ➔',
      prevStep: '← Vorheriger Schritt',
      nextStep: 'Weiter →',
      submitBtn: 'Technisches Betriebsprofil validieren →',
      submittingBtn: 'Anforderungen werden geprüft...',
      termsHeader: 'PARTNERBEDINGUNGEN / NETZWERK-ONBOARDING',
      termsTitle: 'Partnerbedingungen prüfen',
      termsDesc: 'Bevor Sie Ihre Druckerei mit dem PrintPrice OS Netzwerk verbinden, müssen Sie die geltenden kaufmännischen Bedingungen prüfen.',
      scrollRequired: 'Bitte scrollen Sie das Dokument bis zum Ende, um das Kontrollkästchen zu aktivieren.',
      acceptCheckbox: 'Ich habe die Partnerbedingungen für Druckereien gelesen und akzeptiere sie.',
      companyHeader: 'UNTERNEHMENSPROFIL',
      companyTitle: 'Betriebsdaten & Technischer Ansprechpartner',
      companyDesc: 'Geben Sie die Firmendaten Ihrer Druckerei und den verantwortlichen Ansprechpartner für Produktion an.',
      companyName: 'Firmenname / Handelsname',
      website: 'Unternehmens-Website',
      country: 'Hauptproduktionsland',
      contactName: 'Technischer Ansprechpartner / Betriebsleitung',
      email: 'Geschäftliche E-Mail-Adresse',
      phone: 'Direkte Telefonnummer',
      capHeader: 'DRUCKKAPAZITÄTEN',
      capTitle: 'Drucktechnologien und Bogenformate',
      capDesc: 'Wählen Sie die in Ihrem Betrieb installierten Produktionslinien und maximalen Bogenformate aus.',
      prodTypesLabel: 'Verfügbare Produktionslinien:',
      maxSheetLabel: 'Maximales Bogen- / Rollenformat (z. B. 750 × 1060 mm):',
      materialsLabel: 'Hauptsubstrat-Sortimente (z. B. Offset 80-120g, Bilderdruck 115-350g, GC1/GC2 240-400g):',
      machHeader: 'MASCHINENPARK',
      machTitle: 'Druckmaschinen und typische Auftragsstrukturen',
      machDesc: 'Beschreiben Sie Ihre Hauptdruckmaschinen, Farbwerke, Lackierwerke und übliche Auftragsformate.',
      pressesLabel: 'Maschinenmodelle und Konfiguration (z. B. Heidelberg Speedmaster XL 106 8-P, HP Indigo 12000):',
      typicalJobsLabel: 'Typische Auftragsstrukturen und Auflagen (z. B. Softcover-Bücher 500-5.000 Ex., Verpackungen):',
      colorCapsLabel: 'Farb- und Veredelungskapazitäten (z. B. 4/4 Farben, Inline-Dispersionslack, Sonderfarben):',
      volHeader: 'KAPAZITÄT & AUSLASTUNG',
      volTitle: 'Monatliches Produktionsvolumen und Auslastung',
      volDesc: 'Geben Sie den durchschnittlichen monatlichen Fertigungsumsatz und die durchschnittliche Maschinenauslastung an.',
      monthlyVolLabel: 'Geschätztes monatliches Fertigungsvolumen:',
      utilizationLabel: 'Durchschnittliche Betriebsauslastung (%):',
      intHeader: 'SCHNITTSTELLEN-BEREITSCHAFT',
      intTitle: 'Konnektivität und Workflow-Anbindung',
      intDesc: 'Wählen Sie den Integrationsgrad, mit dem Ihre Druckerei Aufträge empfangen und abwickeln kann.',
      complianceHeader: 'QUALITÄT & STANDARDS',
      complianceTitle: 'Grafische Standards & Zertifizierungen',
      complianceDesc: 'Geben Sie die Qualitätskontrollen an der Maschine und aktive Umwelt- oder Prozesszertifikate an.',
      standardsCheck: 'Wir arbeiten nach standardisierten grafischen Standards (ISO 12647, Fogra oder PSO geprüft).',
      certificationsLabel: 'Aktive Betriebszertifizierungen:',
      qaModulesLabel: 'Im Betrieb angewendete Qualitätskontroll-Module:',
      qaCustomLabel: 'Zusätzliche Qualitätssicherungs-Details:',
      qaCustomPlaceholder: 'Beschreiben Sie eigene Prüfverfahren, Inline-Spektralphotometrie oder Kundenaudits...',
    }
  };

  const t = uiTexts[locale] || uiTexts.es;

  // Render Honest Unsubmitted State
  if (submissionStatus === 'INTEGRATION_PENDING') {
    const summary = submissionResult?.summary;
    const tierDisplay = summary?.tier === 'high' ? 'High' : summary?.tier === 'mid' ? 'Medium' : 'Basic';

    return (
      <div 
        className="rounded-card"
        style={{ 
          maxWidth: '900px', 
          margin: '0 auto', 
          padding: 'clamp(2.5rem, 5vw, 4.5rem)', 
          background: 'var(--bg-primary)', 
          border: '1px solid var(--border-color)', 
          borderRadius: 'var(--radius-card-lg, 24px)',
          boxShadow: 'var(--shadow-card)',
          position: 'relative'
        }}
      >
        {/* Status Header Badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', padding: '0.4rem 1rem', background: 'rgba(234, 179, 8, 0.12)', border: '1px solid rgba(234, 179, 8, 0.3)', borderRadius: 'var(--radius-pill)', marginBottom: '2rem' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#eab308', display: 'inline-block' }} />
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#eab308', letterSpacing: '0.08em' }}>
            {t.badge}
          </span>
        </div>

        <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', fontWeight: 800, marginBottom: '1.25rem', letterSpacing: '-0.03em', lineHeight: 1.2 }}>
          {t.pendingTitle}
        </h2>

        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '1rem' }}>
          {t.pendingDesc}
        </p>

        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem' }}>
          {t.pendingNoAccount} <strong style={{ color: 'var(--text-primary)' }}>{t.draftNotice}</strong>
        </p>

        {/* Technical Application Audit Box */}
        <div 
          style={{ 
            background: 'var(--bg-secondary)', 
            border: '1px solid var(--border-color)', 
            borderRadius: 'var(--radius-card, 16px)', 
            padding: '1.75rem', 
            marginBottom: '2.5rem' 
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.85rem', marginBottom: '1.25rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 900, letterSpacing: '0.1em', color: 'var(--accent-primary)' }}>
              {t.auditBoxTitle}
            </span>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-technical)' }}>
              API_VERSION: v2.5 / ARCHITECTURE_CANON
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', fontSize: '0.88rem' }}>
            <div>
              <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.78rem', marginBottom: '0.2rem' }}>{t.auditTarget}</span>
              <strong style={{ color: 'var(--text-primary)' }}>{t.auditTargetVal}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.78rem', marginBottom: '0.2rem' }}>{t.auditStatus}</span>
              <span style={{ color: '#eab308', fontWeight: 700 }}>{t.auditStatusVal}</span>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.78rem', marginBottom: '0.2rem' }}>{t.auditTier}</span>
              <strong style={{ color: 'var(--text-primary)' }}>Tier {tierDisplay} (Score: {summary?.score ?? 0}/100)</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.78rem', marginBottom: '0.2rem' }}>{t.auditStorage}</span>
              <span style={{ color: '#22c55e', fontWeight: 700 }}>✓ {t.auditStorageVal}</span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
          <Button 
            variant="secondary" 
            size="md" 
            onClick={handleBackToDraft}
            style={{ borderRadius: 'var(--radius-btn, 12px)' }}
          >
            {t.btnBackToDraft}
          </Button>

          <Button 
            variant="secondary" 
            size="md" 
            onClick={handleExportJson}
            style={{ borderRadius: 'var(--radius-btn, 12px)' }}
          >
            {t.btnExportJson}
          </Button>

          <a
            href="https://control.printprice.pro/printhouse/register"
            className="btn-primary"
            style={{ 
              padding: '0.75rem 1.5rem', 
              fontSize: '0.95rem', 
              borderRadius: 'var(--radius-btn, 12px)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              fontWeight: 700
            }}
          >
            {t.btnGoToControlPlane}
          </a>

          <Link
            href="/contact"
            style={{ 
              color: 'var(--text-muted)', 
              fontSize: '0.85rem', 
              textDecoration: 'underline', 
              marginLeft: 'auto' 
            }}
          >
            {t.btnContactTeam}
          </Link>
        </div>
      </div>
    );
  }

  // Active Multi-step Onboarding Form
  return (
    <div 
      className="rounded-card"
      style={{ 
        maxWidth: '920px', 
        margin: '0 auto', 
        background: 'var(--bg-primary)', 
        border: '1px solid var(--border-color)', 
        borderRadius: 'var(--radius-card-lg, 24px)',
        position: 'relative', 
        overflow: 'hidden',
        boxShadow: 'var(--shadow-card)'
      }}
    >
      {/* Upfront Architecture Notice & Direct Canonical Route */}
      <div 
        style={{
          background: 'rgba(234, 179, 8, 0.08)',
          borderBottom: '1px solid rgba(234, 179, 8, 0.25)',
          padding: '1.25rem 1.75rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, minWidth: '280px' }}>
          <span style={{ fontSize: '1.1rem' }}>ℹ️</span>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)', lineHeight: 1.45 }}>
            <strong style={{ color: '#eab308' }}>{t.upfrontNoticeTitle}</strong>{' '}
            <span style={{ color: 'var(--text-secondary)' }}>{t.upfrontNoticeBody}</span>
          </div>
        </div>
        <a
          href="https://control.printprice.pro/printhouse/register"
          className="btn-primary"
          style={{
            padding: '0.6rem 1.2rem',
            fontSize: '0.85rem',
            borderRadius: 'var(--radius-btn, 12px)',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            fontWeight: 700
          }}
        >
          {t.btnGoToControlPlaneDirect}
        </a>
      </div>

      {/* Progress Stepper Bar */}
      <div 
        style={{ 
          display: 'flex', 
          borderBottom: '1px solid var(--border-color)', 
          background: 'var(--bg-secondary)',
          overflowX: 'auto'
        }}
      >
        {STEPS.map((step) => {
          const isActive = currentStep === step.id;
          const isDone = currentStep > step.id;
          return (
            <div 
              key={step.id} 
              style={{ 
                flex: 1, 
                minWidth: '95px',
                padding: '1.25rem 0.5rem', 
                textAlign: 'center', 
                position: 'relative',
                borderBottom: isActive ? '3px solid var(--accent-primary)' : 'none',
                opacity: isActive || isDone ? 1 : 0.45,
                transition: 'all 0.25s ease'
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
                <Icon name={step.icon} size={16} color={isActive ? 'var(--accent-primary)' : 'var(--text-secondary)'} />
                <span style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  {step.label[locale] || step.label.es}
                </span>
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

      <div style={{ padding: 'clamp(2rem, 6vw, 4rem)' }}>
        {/* Error Notification Layer */}
        {submissionError && (
          <div 
            style={{ 
              background: 'rgba(220, 0, 0, 0.08)', 
              border: '1px solid var(--accent-primary)', 
              borderRadius: 'var(--radius-card, 16px)',
              padding: '1.25rem 1.5rem', 
              marginBottom: '2.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}
          >
            <Icon name="alert" size={20} color="var(--accent-primary)" />
            <p style={{ fontSize: '0.9rem', color: 'var(--accent-primary)', fontWeight: 700, margin: 0 }}>
              {submissionError}
            </p>
          </div>
        )}

        {/* STEP 0: PARTNER TERMS */}
        {currentStep === 0 && (
          <div>
            <div style={{ marginBottom: '2.25rem' }}>
              <span className="pill-badge" style={{ marginBottom: '1rem', fontSize: '0.7rem' }}>
                {t.termsHeader}
              </span>
              <h3 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.4rem)', fontWeight: 800, marginBottom: '0.75rem', letterSpacing: '-0.03em' }}>
                {t.termsTitle}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6 }}>
                {t.termsDesc}
              </p>
            </div>

            <div 
              onScroll={handleTermsScroll}
              style={{
                height: '400px',
                overflowY: 'auto',
                padding: '2rem',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-card, 16px)',
                marginBottom: '2rem',
                fontSize: '0.9rem',
                lineHeight: '1.65',
                color: 'var(--text-secondary)',
                position: 'relative'
              }}
              className="custom-scrollbar"
            >
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ color: 'var(--text-primary)', fontWeight: 800, marginBottom: '0.35rem', fontSize: '1.05rem' }}>
                  {locale === 'es' ? 'Condiciones de Adhesión para Imprentas y Nodos de Producción' :
                   locale === 'de' ? 'Bedingungen für Partnerdruckereien und Produktionsknoten' :
                   'Print House / Production Node Terms'}
                </h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {locale === 'es' ? 'Última actualización: 25 de octubre de 2026' :
                   locale === 'de' ? 'Stand: 25. Oktober 2026' :
                   'Last updated: October 25, 2026'}
                </p>
              </div>

              <div>
                {[
                  { 
                    title: locale === 'es' ? '1. Objeto y Alcance' : locale === 'de' ? '1. Gegenstand und Geltungsbereich' : '1. Scope and Object', 
                    text: locale === 'es' 
                      ? 'Las presentes condiciones regulan la relación comercial e industrial entre Print Price Pro SIA y la empresa gráfica que solicita su homologación como nodo de fabricación en PrintPrice OS.'
                      : locale === 'de'
                      ? 'Diese Bedingungen regeln das kaufmännische und industrielle Verhältnis zwischen Print Price Pro SIA und der Druckerei, die ihre Zulassung als Produktionsknoten im PrintPrice OS beantragt.'
                      : 'These Partner Terms govern the relationship between Print Price Pro SIA and the printing company applying to join the PrintPrice OS production network.'
                  },
                  { 
                    title: locale === 'es' ? '2. Naturaleza de la Relación' : locale === 'de' ? '2. Art des Verhältnisses' : '2. Nature of the Relationship', 
                    text: locale === 'es' 
                      ? 'PrintPrice Pro opera una plataforma de orquestación, cálculo y preflight. La imprenta asociada actúa en todo momento como fabricante industrial independiente, asumiendo la responsabilidad directa de fabricación, facturación y entrega al cliente.'
                      : locale === 'de'
                      ? 'PrintPrice Pro betreibt eine Plattform für Orchestrierung, Kalkulation und Preflight. Die Partnerdruckerei agiert stets als unabhängiger Hersteller und übernimmt Fertigung, Rechnungsstellung und Lieferung direkt gegenüber dem Kunden.'
                      : 'PrintPrice Pro operates an orchestration and preflight routing platform. The partner printer remains at all times the independent manufacturing entity directly responsible for production and fulfillment.'
                  },
                  { 
                    title: locale === 'es' ? '3. Modelo Comercial y Comisión' : locale === 'de' ? '3. Provisionsmodell' : '3. Commercial Terms & Commission', 
                    text: locale === 'es' 
                      ? 'La comisión del marketplace es del 4 % sobre el importe neto de impresión y acabados, excluyendo expresamente transporte desglosado e impuestos. Se devenga exclusivamente sobre importes efectivamente cobrados por la imprenta, con liquidación mensual posterior.'
                      : locale === 'de'
                      ? 'Die Marketplace-Provision beträgt 4 % auf den Netto-Druck- und Weiterverarbeitungsumsatz (ohne ausgewiesene Fracht und Steuern). Sie fällt nur auf tatsächlich vereinnahmte Zahlungen an und wird monatlich abgerechnet.'
                      : 'The marketplace commission is 4% on net manufacturing and finishing revenue (excluding itemized shipping and taxes). Commission applies solely to amounts actually collected by the printer, billed monthly.'
                  },
                  { 
                    title: locale === 'es' ? '4. Confidencialidad y Propiedad Intelectual' : locale === 'de' ? '4. Vertraulichkeit & Urheberrechte' : '4. Confidentiality and Customer Files', 
                    text: locale === 'es' 
                      ? 'Los archivos de clientes y artes finales recibidos son estrictamente confidenciales y se destinarán con carácter exclusivo a la ejecución del pedido asignado.'
                      : locale === 'de'
                      ? 'Druckdaten und Dokumente des Kunden sind streng vertraulich und dürfen ausschließlich zur Abwicklung des zugewiesenen Auftrags verwendet werden.'
                      : 'Customer print files and job metadata are strictly confidential and must be used solely to manufacture the assigned production order.'
                  }
                ].map((sec, idx) => (
                  <div key={idx} style={{ marginBottom: '1.5rem' }}>
                    <h5 style={{ color: 'var(--text-primary)', fontSize: '0.85rem', fontWeight: 800, marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      {sec.title}
                    </h5>
                    <p style={{ fontSize: '0.88rem', lineHeight: 1.6, opacity: 0.85, margin: 0 }}>
                      {sec.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {!formData.termsReviewed && (
                <p style={{ fontSize: '0.8rem', color: '#eab308', fontWeight: 600 }}>
                  ⚠️ {t.scrollRequired}
                </p>
              )}

              <label 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.75rem', 
                  cursor: formData.termsReviewed ? 'pointer' : 'not-allowed',
                  opacity: formData.termsReviewed ? 1 : 0.45,
                  fontSize: '0.95rem'
                }}
              >
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
                  style={{ width: '18px', height: '18px', accentColor: 'var(--accent-primary)', cursor: 'pointer' }}
                />
                <span>{t.acceptCheckbox}</span>
              </label>
            </div>
          </div>
        )}

        {/* STEP 1: COMPANY */}
        {currentStep === 1 && (
          <div>
            <div style={{ marginBottom: '2.25rem' }}>
              <span className="pill-badge" style={{ marginBottom: '1rem', fontSize: '0.7rem' }}>
                {t.companyHeader}
              </span>
              <h3 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.4rem)', fontWeight: 800, marginBottom: '0.75rem', letterSpacing: '-0.03em' }}>
                {t.companyTitle}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6 }}>
                {t.companyDesc}
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              <div>
                <label style={labelStyle}>{t.companyName} *</label>
                <input 
                  type="text" 
                  value={formData.companyName} 
                  onChange={(e) => updateForm({ companyName: e.target.value })} 
                  style={inputStyle} 
                  placeholder={locale === 'es' ? 'Gráficas Ejemplo S.L.' : 'Sample Print House Ltd.'}
                />
              </div>

              <div>
                <label style={labelStyle}>{t.website}</label>
                <input 
                  type="url" 
                  value={formData.website} 
                  onChange={(e) => updateForm({ website: e.target.value })} 
                  style={inputStyle} 
                  placeholder="https://..."
                />
              </div>

              <div>
                <label style={labelStyle}>{t.country} *</label>
                <input 
                  type="text" 
                  value={formData.country} 
                  onChange={(e) => updateForm({ country: e.target.value })} 
                  style={inputStyle} 
                  placeholder={locale === 'es' ? 'España, Alemania, Francia...' : 'Spain, Germany, France...'}
                />
              </div>

              <div>
                <label style={labelStyle}>{t.contactName} *</label>
                <input 
                  type="text" 
                  value={formData.contactName} 
                  onChange={(e) => updateForm({ contactName: e.target.value })} 
                  style={inputStyle} 
                  placeholder={locale === 'es' ? 'Nombre y apellidos' : 'Full Name'}
                />
              </div>

              <div>
                <label style={labelStyle}>{t.email} *</label>
                <input 
                  type="email" 
                  value={formData.email} 
                  onChange={(e) => updateForm({ email: e.target.value })} 
                  style={inputStyle} 
                  placeholder="produccion@empresa.com"
                />
              </div>

              <div>
                <label style={labelStyle}>{t.phone}</label>
                <input 
                  type="tel" 
                  value={formData.phone} 
                  onChange={(e) => updateForm({ phone: e.target.value })} 
                  style={inputStyle} 
                  placeholder="+34 ..."
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: CAPABILITIES */}
        {currentStep === 2 && (
          <div>
            <div style={{ marginBottom: '2.25rem' }}>
              <span className="pill-badge" style={{ marginBottom: '1rem', fontSize: '0.7rem' }}>
                {t.capHeader}
              </span>
              <h3 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.4rem)', fontWeight: 800, marginBottom: '0.75rem', letterSpacing: '-0.03em' }}>
                {t.capTitle}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6 }}>
                {t.capDesc}
              </p>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <label style={labelStyle}>{t.prodTypesLabel}</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
                {[
                  { id: 'Offset', label: locale === 'es' ? 'Offset Comercial' : locale === 'de' ? 'Bogenoffset' : 'Commercial Sheet-fed Offset' },
                  { id: 'Digital', label: locale === 'es' ? 'Digital Pliego / HP Indigo' : locale === 'de' ? 'Digitaldruck Bogen' : 'Digital Sheet-fed' },
                  { id: 'Large Format', label: locale === 'es' ? 'Gran Formato' : locale === 'de' ? 'Großformatdruck' : 'Large Format' },
                  { id: 'Packaging', label: locale === 'es' ? 'Packaging y Estuches' : locale === 'de' ? 'Verpackungsdruck' : 'Packaging' },
                  { id: 'Hardcover Binding', label: locale === 'es' ? 'Tapa Dura (Cartoné)' : locale === 'de' ? 'Fadenheftung / Hardcover' : 'Hardcover Binding' },
                  { id: 'Softcover Binding', label: locale === 'es' ? 'Rústica PUR / Cosida' : locale === 'de' ? 'Klebebindung PUR / Softcover' : 'Softcover PUR' }
                ].map(item => {
                  const isChecked = formData.productionTypes.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        const types = isChecked 
                          ? formData.productionTypes.filter(t => t !== item.id)
                          : [...formData.productionTypes, item.id];
                        updateForm({ productionTypes: types });
                      }}
                      style={{
                        padding: '1rem',
                        borderRadius: 'var(--radius-input, 12px)',
                        background: isChecked ? 'rgba(220, 0, 0, 0.12)' : 'var(--bg-secondary)',
                        border: isChecked ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)',
                        color: isChecked ? 'var(--text-primary)' : 'var(--text-secondary)',
                        fontWeight: isChecked ? 700 : 500,
                        textAlign: 'left',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {isChecked ? '✓ ' : '+ '} {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              <div>
                <label style={labelStyle}>{t.maxSheetLabel} *</label>
                <input 
                  type="text" 
                  value={formData.maxSheetSize} 
                  onChange={(e) => updateForm({ maxSheetSize: e.target.value })} 
                  style={inputStyle} 
                  placeholder="750 × 1060 mm"
                />
              </div>

              <div>
                <label style={labelStyle}>{t.materialsLabel} *</label>
                <input 
                  type="text" 
                  value={formData.materials} 
                  onChange={(e) => updateForm({ materials: e.target.value })} 
                  style={inputStyle} 
                  placeholder="Offset 80-120g, Estucado 115-350g..."
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: MACHINERY */}
        {currentStep === 3 && (
          <div>
            <div style={{ marginBottom: '2.25rem' }}>
              <span className="pill-badge" style={{ marginBottom: '1rem', fontSize: '0.7rem' }}>
                {t.machHeader}
              </span>
              <h3 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.4rem)', fontWeight: 800, marginBottom: '0.75rem', letterSpacing: '-0.03em' }}>
                {t.machTitle}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6 }}>
                {t.machDesc}
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={labelStyle}>{t.pressesLabel}</label>
                <textarea 
                  value={formData.presses} 
                  onChange={(e) => updateForm({ presses: e.target.value })} 
                  style={textareaStyle} 
                  placeholder="Heidelberg Speedmaster XL 106-8-P, Komori Lithrone G40, HP Indigo 12000..."
                />
              </div>

              <div>
                <label style={labelStyle}>{t.typicalJobsLabel}</label>
                <textarea 
                  value={formData.typicalJobs} 
                  onChange={(e) => updateForm({ typicalJobs: e.target.value })} 
                  style={textareaStyle} 
                  placeholder="Libros rústica PUR (500 - 10.000 ej.), folletos grapados, catálogos..."
                />
              </div>

              <div>
                <label style={labelStyle}>{t.colorCapsLabel}</label>
                <input 
                  type="text" 
                  value={formData.colorCaps} 
                  onChange={(e) => updateForm({ colorCaps: e.target.value })} 
                  style={inputStyle} 
                  placeholder="4/4 colores, barniz acrílico en línea, tintas directas Pantone..."
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: CAPACITY */}
        {currentStep === 4 && (
          <div>
            <div style={{ marginBottom: '2.25rem' }}>
              <span className="pill-badge" style={{ marginBottom: '1rem', fontSize: '0.7rem' }}>
                {t.volHeader}
              </span>
              <h3 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.4rem)', fontWeight: 800, marginBottom: '0.75rem', letterSpacing: '-0.03em' }}>
                {t.volTitle}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6 }}>
                {t.volDesc}
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              <div>
                <label style={labelStyle}>{t.monthlyVolLabel} *</label>
                <select 
                  value={formData.monthlyVolume} 
                  onChange={(e) => updateForm({ monthlyVolume: e.target.value })} 
                  style={selectStyle}
                >
                  <option value="">{locale === 'es' ? 'Selecciona un rango...' : 'Select range...'}</option>
                  <option value="<€100k">&lt; €100.000 / mes</option>
                  <option value="€100k–€250k">€100.000 – €250.000 / mes</option>
                  <option value="€250k–€1M">€250.000 – €1.000.000 / mes</option>
                  <option value="€1M+">&gt; €1.000.000 / mes</option>
                </select>
              </div>

              <div>
                <label style={labelStyle}>{t.utilizationLabel}</label>
                <input 
                  type="text" 
                  value={formData.utilization} 
                  onChange={(e) => updateForm({ utilization: e.target.value })} 
                  style={inputStyle} 
                  placeholder="75%"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: INTEGRATION */}
        {currentStep === 5 && (
          <div>
            <div style={{ marginBottom: '2.25rem' }}>
              <span className="pill-badge" style={{ marginBottom: '1rem', fontSize: '0.7rem' }}>
                {t.intHeader}
              </span>
              <h3 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.4rem)', fontWeight: 800, marginBottom: '0.75rem', letterSpacing: '-0.03em' }}>
                {t.intTitle}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6 }}>
                {t.intDesc}
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { 
                  id: 'Fully automated routing', 
                  title: locale === 'es' ? 'Integración Totalmente Automatizada (API / JDF)' : locale === 'de' ? 'Vollautomatisiert (REST API / JDF)' : 'Fully Automated (REST API / JDF)',
                  desc: locale === 'es' ? 'Recepción de especificaciones y órdenes directas en el MIS/ERP de planta.' : 'Direct order routing into plant MIS/ERP.'
                },
                { 
                  id: 'API-ready', 
                  title: locale === 'es' ? 'Preparado para API' : locale === 'de' ? 'API-bereit' : 'API-ready',
                  desc: locale === 'es' ? 'Equipo técnico disponible para conectar webhooks y endpoints.' : 'Technical team available to connect webhooks and endpoints.'
                },
                { 
                  id: 'Manual Portal', 
                  title: locale === 'es' ? 'Gestión Manual vía Control Plane' : locale === 'de' ? 'Manuelle Verwaltung im Control Plane' : 'Manual Control Plane Workflow',
                  desc: locale === 'es' ? 'Descarga de órdenes y artes finales auditadas desde la consola técnica web.' : 'Download orders and audited print assets from web console.'
                }
              ].map(opt => {
                const isSelected = formData.integrationLevel === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => updateForm({ integrationLevel: opt.id })}
                    style={{
                      padding: '1.25rem 1.5rem',
                      borderRadius: 'var(--radius-card, 16px)',
                      background: isSelected ? 'rgba(220, 0, 0, 0.12)' : 'var(--bg-secondary)',
                      border: isSelected ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <h4 style={{ fontSize: '1rem', fontWeight: 800, color: isSelected ? 'var(--text-primary)' : 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                      {opt.title}
                    </h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
                      {opt.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 6: COMPLIANCE & QA */}
        {currentStep === 6 && (
          <div>
            <div style={{ marginBottom: '2.25rem' }}>
              <span className="pill-badge" style={{ marginBottom: '1rem', fontSize: '0.7rem' }}>
                {t.complianceHeader}
              </span>
              <h3 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.4rem)', fontWeight: 800, marginBottom: '0.75rem', letterSpacing: '-0.03em' }}>
                {t.complianceTitle}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6 }}>
                {t.complianceDesc}
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', fontSize: '0.95rem' }}>
                <input 
                  type="checkbox" 
                  checked={formData.standards}
                  onChange={(e) => updateForm({ standards: e.target.checked })}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--accent-primary)', cursor: 'pointer' }}
                />
                <span style={{ fontWeight: 600 }}>{t.standardsCheck}</span>
              </label>

              <div>
                <label style={labelStyle}>{t.certificationsLabel}</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                  {['FSC / PEFC', 'ISO 9001', 'ISO 14001', 'BRCGS Packaging', 'PSO / FograCert'].map(cert => {
                    const isChecked = formData.certifications.includes(cert);
                    return (
                      <button
                        key={cert}
                        type="button"
                        onClick={() => {
                          const certs = isChecked
                            ? formData.certifications.filter(c => c !== cert)
                            : [...formData.certifications, cert];
                          updateForm({ certifications: certs });
                        }}
                        style={{
                          padding: '0.6rem 1.1rem',
                          borderRadius: 'var(--radius-pill)',
                          background: isChecked ? 'rgba(220, 0, 0, 0.12)' : 'var(--bg-secondary)',
                          border: isChecked ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)',
                          color: isChecked ? 'var(--text-primary)' : 'var(--text-secondary)',
                          fontSize: '0.85rem',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        {isChecked ? '✓ ' : '+ '} {cert}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label style={labelStyle}>{t.qaModulesLabel}</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
                  {[
                    { id: 'densitometry', label: locale === 'es' ? 'Densitometría en Máquina' : 'On-press Densitometry' },
                    { id: 'sampling', label: locale === 'es' ? 'Muestreo Estadístico en Tirada' : 'Statistical In-process Sampling' },
                    { id: 'finishing', label: locale === 'es' ? 'Auditoría Post-prensa / Acabados' : 'Post-press & Bindery Audit' },
                    { id: 'traceability', label: locale === 'es' ? 'Trazabilidad por Lote' : 'Batch Traceability' },
                  ].map(m => {
                    const isChecked = formData.qaModules.includes(m.id);
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => {
                          const mods = isChecked 
                            ? formData.qaModules.filter(id => id !== m.id)
                            : [...formData.qaModules, m.id];
                          updateForm({ qaModules: mods });
                        }}
                        style={{
                          padding: '0.85rem 1rem',
                          borderRadius: 'var(--radius-input, 12px)',
                          background: isChecked ? 'rgba(220, 0, 0, 0.12)' : 'var(--bg-secondary)',
                          border: isChecked ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)',
                          color: isChecked ? 'var(--text-primary)' : 'var(--text-secondary)',
                          textAlign: 'left',
                          cursor: 'pointer',
                          fontSize: '0.85rem',
                          fontWeight: isChecked ? 700 : 500
                        }}
                      >
                        {isChecked ? '✓ ' : '+ '} {m.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label style={labelStyle}>{t.qaCustomLabel}</label>
                <textarea 
                  value={formData.qaCustomDetails} 
                  onChange={(e) => updateForm({ qaCustomDetails: e.target.value })} 
                  style={textareaStyle} 
                  placeholder={t.qaCustomPlaceholder}
                />
              </div>
            </div>
          </div>
        )}

        {/* NAVIGATION CONTROLS */}
        <div 
          style={{ 
            marginTop: '3.5rem', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            borderTop: '1px solid var(--border-color)', 
            paddingTop: '2rem' 
          }}
        >
          <button 
            type="button"
            onClick={prevStep}
            disabled={currentStep === 0 || isSubmitting}
            style={{ 
              visibility: currentStep === 0 ? 'hidden' : 'visible',
              background: 'none', 
              border: 'none', 
              color: 'var(--text-secondary)', 
              fontSize: '0.9rem', 
              fontWeight: 700, 
              cursor: 'pointer' 
            }}
          >
            {t.prevStep}
          </button>

          {currentStep < STEPS.length - 1 ? (
            <Button 
              size="lg" 
              onClick={nextStep} 
              disabled={currentStep === 0 && !formData.termsAccepted}
              style={{ borderRadius: 'var(--radius-btn, 12px)' }}
            >
              {t.nextStep}
            </Button>
          ) : (
            <Button 
              size="lg" 
              onClick={handleSubmit} 
              disabled={isSubmitting}
              style={{ borderRadius: 'var(--radius-btn, 12px)' }}
            >
              {isSubmitting ? t.submittingBtn : t.submitBtn}
            </Button>
          )}
        </div>
      </div>

      {/* FOOTER SYSTEM TRACE */}
      <div 
        style={{ 
          background: 'var(--bg-secondary)', 
          padding: '1.25rem 2rem', 
          borderTop: '1px solid var(--border-color)', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          fontSize: '0.75rem',
          color: 'var(--text-muted)'
        }}
      >
        <span>PRINTPRICE OS · PRINTHOUSE ONBOARDING QUALIFIER</span>
        <span>STRICT LOCAL DRAFT PRESERVATION</span>
      </div>
    </div>
  );
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.8rem',
  fontWeight: 700,
  color: 'var(--text-secondary)',
  marginBottom: '0.5rem',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'var(--bg-secondary)',
  border: '1px solid var(--border-color)',
  borderRadius: 'var(--radius-input, 12px)',
  padding: '0.875rem 1.1rem',
  color: 'var(--text-primary)',
  fontSize: '0.95rem',
  fontFamily: 'var(--font-display)',
  outline: 'none',
  boxSizing: 'border-box',
};

const selectStyle: React.CSSProperties = {
  ...inputStyle,
  cursor: 'pointer',
};

const textareaStyle: React.CSSProperties = {
  ...inputStyle,
  minHeight: '100px',
  resize: 'vertical',
};
