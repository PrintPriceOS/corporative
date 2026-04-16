'use client';

/**
 * REFINED v1.5: Final Global Telemetry + Result Persistence (v1.8 Alpha Core)
 * 
 * v1.5: Final, industrial-grade telemetry with integrated 'Result Storage' 
 *       for the Product Loop Engine.
 */

type UserType = "dev" | "business" | "unknown";

export interface TelemetryEvent {
    event: string;
    system_version: string;
    path: string;
    referrer: string;
    session_id: string;
    user_type: UserType;
    latency_ms?: number;
    timestamp: string;
    [key: string]: any;
}

// Result Persistence Schema (v1.8 Alpha)
export interface ProjectResult {
    id: string;
    specs: Record<string, any>;
    quote: {
        cost: number;
        savings: number;
        node: string;
    };
    timestamp: string;
}

// Latency & Session Management
let pageLoadStartTime = 0;
if (typeof window !== 'undefined') {
    pageLoadStartTime = performance.now();
    (window as any)._ppos_load = pageLoadStartTime;
    (window as any)._ppos_v = "v1.5-final";
}

function getSessionId(): string {
  if (typeof window === 'undefined') return "ssr-node";
  let id = sessionStorage.getItem('ppos_session_id');
  if (!id) {
    id = `sid_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('ppos_session_id', id);
  }
  return id;
}

function getInferredUserType(): UserType {
  if (typeof window === 'undefined') return "unknown";
  const path = window.location.pathname;
  if (path.includes("/developers") || path.includes("/docs")) return "dev";
  if (path.includes("/products") || path.includes("/solutions") || path.includes("/platform")) return "business";
  return "unknown";
}

export const events = {
  HERO_VIEW: "hero_view",
  HERO_PRIMARY_CLICK: "hero_primary_click",
  HERO_SECONDARY_CLICK: "hero_secondary_click",
  WORKFLOW_STEP_CLICK: "workflow_step_click",
  PRODUCT_CARD_CLICK: "product_card_click",
  DEVELOPER_QUICKSTART_CLICK: "developer_quickstart_click",
  IDLE_5S: "idle_5s",
  IDLE_10S: "idle_10s",
  SCROLL_25: "scroll_25",
  SCROLL_50: "scroll_50",
  SCROLL_75: "scroll_75",
  DECISION_MADE: "decision_made",
  PAGE_VIEW: "page_view",
  RESULT_SAVED: "result_saved", // v1.8 New Event
  CONSULT_VIEW: "consult_view",
  INTENT_INFERRED: "intent_inferred",
  INTENT_RECOMMENDED_ACCEPTED: "intent_recommended_accepted",
  INTENT_OVERRIDE_CLICKED: "intent_override_clicked",
  INTENT_SELECTED: "intent_selected",
  INTENT_FORM_STARTED: "intent_form_started",
  INTENT_FORM_COMPLETED: "intent_form_completed",
};

// PERSISTENCE ENGINES
const MAX_HISTORY = 100;
const MAX_RESULTS = 20;

function persistEvent(event: TelemetryEvent) {
    if (typeof window === 'undefined') return;
    const historyRaw = localStorage.getItem('ppos_telemetry_history') || '[]';
    const history = JSON.parse(historyRaw);
    history.unshift(event);
    if (history.length > MAX_HISTORY) history.pop();
    localStorage.setItem('ppos_telemetry_history', JSON.stringify(history));
}

/** 
 * v1.8 CORE: Result Storage for the User Loop
 */
export function saveProjectResult(result: Omit<ProjectResult, 'id' | 'timestamp'>) {
    if (typeof window === 'undefined') return;
    
    const fullResult: ProjectResult = {
        id: `res_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: new Date().toISOString(),
        ...result,
    };

    const resultsRaw = localStorage.getItem('ppos_project_results') || '[]';
    const results = JSON.parse(resultsRaw);
    results.unshift(fullResult);
    if (results.length > MAX_RESULTS) results.pop();
    localStorage.setItem('ppos_project_results', JSON.stringify(results));
    
    trackEvent(events.RESULT_SAVED, { result_id: fullResult.id });
    return fullResult;
}

export function getProjectHistory(): ProjectResult[] {
    if (typeof window === 'undefined') return [];
    const resultsRaw = localStorage.getItem('ppos_project_results') || '[]';
    return JSON.parse(resultsRaw);
}

// MAIN TRACKING ENGINE
export function trackEvent(eventName: string, payload: Record<string, any> = {}) {
  if (typeof window === 'undefined') return;

  const latency = Math.round(performance.now() - ( (window as any)._ppos_load || pageLoadStartTime));

  const telemetryData: TelemetryEvent = {
    event: eventName,
    system_version: "v2.5-certified-monolith",
    path: window.location.pathname,
    referrer: document.referrer,
    session_id: getSessionId(),
    user_type: getInferredUserType(),
    timestamp: new Date().toISOString(),
    ...payload,
  };

  if (eventName === events.DECISION_MADE || eventName.includes('click')) {
      telemetryData.latency_ms = latency;
  }

  persistEvent(telemetryData);
  console.log(`[MONOLITH_TELEMETRY]`, telemetryData);
}

if (typeof window !== 'undefined') {
    (window as any).trackEvent = trackEvent;
    (window as any).events = events;
    (window as any).saveProjectResult = saveProjectResult;
    (window as any).getProjectHistory = getProjectHistory;
}

function initGlobalObserver() {
    if (typeof window === 'undefined') return;
    document.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const action = target.closest('[data-monolith-action]')?.getAttribute('data-monolith-action');
        if (action) {
            trackEvent(events.DECISION_MADE, { action_intent: action });
        }
    });
}

/**
 * INITIALIZATION
 */
let scroll25 = false, scroll50 = false, scroll75 = false;

export function initTelemetry() {
  if (typeof window === 'undefined') return;

  scroll25 = false; scroll50 = false; scroll75 = false;
  (window as any)._ppos_load = performance.now();

  initGlobalObserver();
  setTimeout(() => trackEvent(events.IDLE_5S), 5000);
  setTimeout(() => trackEvent(events.IDLE_10S), 10000);

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const height = document.body.scrollHeight - window.innerHeight;
    const percent = Math.round((scrollY / height) * 100);

    if (percent > 25 && !scroll25) { trackEvent(events.SCROLL_25); scroll25 = true; }
    if (percent > 50 && !scroll50) { trackEvent(events.SCROLL_50); scroll50 = true; }
    if (percent > 75 && !scroll75) { trackEvent(events.SCROLL_75); scroll75 = true; }
  }, { passive: true });

  trackEvent(events.PAGE_VIEW);
  
  if (window.location.pathname === '/') {
      trackEvent(events.HERO_VIEW);
  }
}
