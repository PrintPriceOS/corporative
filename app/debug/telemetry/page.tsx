'use client';

import React, { useEffect, useState } from 'react';
import { TelemetryEvent, events } from '@/lib/telemetry';
import { Section } from '@/components/ui/Section';

export default function GrowthDashboard() {
  const [history, setHistory] = useState<TelemetryEvent[]>([]);
  const [activeTab, setActiveTab] = useState<'kpis' | 'funnel' | 'raw'>('kpis');

  useEffect(() => {
    const updateHistory = () => {
      const storedRaw = localStorage.getItem('ppos_telemetry_history') || '[]';
      setHistory(JSON.parse(storedRaw));
    };

    updateHistory();
    const interval = setInterval(updateHistory, 2000);
    return () => clearInterval(interval);
  }, []);

  // AGGREGATION LOGIC (v1.6 Growth Architecture)
  const views = history.filter(e => e.event === events.PAGE_VIEW && e.path === '/').length;
  const heroViews = history.filter(e => e.event === events.HERO_VIEW).length;
  const heroClicks = history.filter(e => e.event === events.HERO_PRIMARY_CLICK || e.event === events.HERO_SECONDARY_CLICK).length;
  const decisions = history.filter(e => e.event === events.DECISION_MADE).length;
  
  const heroCTR = heroViews > 0 ? (heroClicks / heroViews) * 100 : 0;
  
  const avgLatency = history
    .filter(e => e.latency_ms)
    .reduce((acc, e, _, arr) => acc + (e.latency_ms || 0) / arr.length, 0);

  const businessUsers = history.filter(e => e.user_type === 'business').length;
  const devUsers = history.filter(e => e.user_type === 'dev').length;
  const totalInferred = businessUsers + devUsers;
  const businessRate = totalInferred > 0 ? (businessUsers / totalInferred) * 100 : 0;
  const devRate = totalInferred > 0 ? (devUsers / totalInferred) * 100 : 0;

  const idleRate = views > 0 ? (history.filter(e => e.event === events.IDLE_10S).length / views) * 100 : 0;

  // AUTOMATED INSIGHTS GENERATOR (v1.7 Alpha)
  const generateInsight = () => {
    if (idleRate > 30) return "HIGH FRICTION: Global users hesitate on the Hero for > 10s. Consider simplifying the subheadline further.";
    if (heroCTR < 5 && heroViews > 5) return "LOW CTR: Hero clicks are below industrial benchmarks. Test a more provocative primary CTA.";
    if (devRate > 40) return "MARKET SIGNAL: Large influx of technical users detected. Prioritize API-first onboarding.";
    if (avgLatency > 8000) return "DECISION LAG: Users take too long to click. Simplify choice hierarchy.";
    return "SYSTEM NOMINAL: Performance is within industrial thresholds. Observe for 48h.";
  };

  return (
    <div className="telemetry-dashboard" style={{ background: 'var(--bg-primary)', minHeight: '100vh', padding: '10rem 2rem 5rem' }}>
      <Section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
          <div>
            <h4 className="technical-text" style={{ color: 'var(--accent-primary)', marginBottom: '1rem', letterSpacing: '0.2em' }}>OPERATIONAL ANALYTICS v2.5</h4>
            <h1 style={{ fontSize: '3rem', letterSpacing: '-0.04em' }}>Growth Control Plane</h1>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            {['kpis', 'funnel', 'raw'].map(tab => (
              <button 
                key={tab} 
                onClick={() => setActiveTab(tab as any)}
                style={{ 
                  background: activeTab === tab ? 'var(--accent-primary)' : 'var(--bg-secondary)', 
                  border: 'none', 
                  color: 'var(--text-primary)', 
                  padding: '1rem 2rem', 
                  fontSize: '0.8rem',
                  letterSpacing: '0.1em',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  cursor: 'pointer' 
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* INSIGHTS BAR (v1.7 Prototype) */}
        <div style={{ 
          background: 'var(--bg-secondary)', 
          padding: '2rem', 
          borderLeft: '4px solid var(--accent-primary)', 
          marginBottom: '4rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span className="technical-text" style={{ opacity: 0.6 }}>AI INSIGHT:</span>
          <span style={{ fontSize: '1.2rem', fontWeight: 600 }}>{generateInsight()}</span>
        </div>

        {activeTab === 'kpis' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            <div className="kpi-card" style={{ background: 'var(--bg-secondary)', padding: '3rem' }}>
              <span className="technical-text" style={{ opacity: 0.5, fontSize: '0.7rem' }}>HERO CTR</span>
              <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--accent-primary)', margin: '1rem 0' }}>{heroCTR.toFixed(1)}%</div>
              <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>Bench: 8.5%</div>
            </div>
            <div className="kpi-card" style={{ background: 'var(--bg-secondary)', padding: '3rem' }}>
              <span className="technical-text" style={{ opacity: 0.5, fontSize: '0.7rem' }}>AVG DECISION LATENCY</span>
              <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--accent-primary)', margin: '1rem 0' }}>{(avgLatency / 1000).toFixed(1)}s</div>
              <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>Target: &lt; 3.0s</div>
            </div>
            <div className="kpi-card" style={{ background: 'var(--bg-secondary)', padding: '3rem' }}>
              <span className="technical-text" style={{ opacity: 0.5, fontSize: '0.7rem' }}>MARKET SIGNAL (DEV)</span>
              <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--accent-primary)', margin: '1rem 0' }}>{devRate.toFixed(0)}%</div>
              <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>Signal Power: STRONG</div>
            </div>
            <div className="kpi-card" style={{ background: 'var(--bg-secondary)', padding: '3rem' }}>
              <span className="technical-text" style={{ opacity: 0.5, fontSize: '0.7rem' }}>IDLE FRICTION @ HERO</span>
              <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--accent-primary)', margin: '1rem 0' }}>{idleRate.toFixed(1)}%</div>
              <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>Threshold: 20%</div>
            </div>
          </div>
        )}

        {activeTab === 'funnel' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <FunnelStep label="Page Views" value={views} total={views} />
            <FunnelStep label="Hero Views" value={heroViews} total={views} />
            <FunnelStep label="Hero Clicks" value={heroClicks} total={heroViews} />
            <FunnelStep label="Intent Decisions" value={decisions} total={heroClicks} />
          </div>
        )}

        {activeTab === 'raw' && (
          <div style={{ background: 'var(--bg-secondary)', padding: '2rem', overflowX: 'auto' }}>
            <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <th className="technical-text" style={{ padding: '1rem', fontSize: '0.7rem', opacity: 0.5 }}>EVENT</th>
                  <th className="technical-text" style={{ padding: '1rem', fontSize: '0.7rem', opacity: 0.5 }}>PATH</th>
                  <th className="technical-text" style={{ padding: '1rem', fontSize: '0.7rem', opacity: 0.5 }}>USER_TYPE</th>
                  <th className="technical-text" style={{ padding: '1rem', fontSize: '0.7rem', opacity: 0.5 }}>LATENCY</th>
                  <th className="technical-text" style={{ padding: '1rem', fontSize: '0.7rem', opacity: 0.5 }}>TIMESTAMP</th>
                </tr>
              </thead>
              <tbody>
                {history.map((e, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '1rem', fontSize: '0.85rem', fontWeight: 700 }}>{e.event}</td>
                    <td style={{ padding: '1rem', fontSize: '0.85rem' }}>{e.path}</td>
                    <td style={{ padding: '1rem', fontSize: '0.85rem' }}>{e.user_type}</td>
                    <td style={{ padding: '1rem', fontSize: '0.85rem' }}>{e.latency_ms ? (e.latency_ms / 1000).toFixed(1) + 's' : '-'}</td>
                    <td style={{ padding: '1rem', fontSize: '0.75rem', opacity: 0.5 }}>{new Date(e.timestamp).toLocaleTimeString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Section>
    </div>
  );
}

function FunnelStep({ label, value, total }: { label: string, value: number, total: number }) {
  const percent = total > 0 ? (value / total) * 100 : 0;
  return (
    <div style={{ background: 'var(--bg-secondary)', padding: '2rem', position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 1 }}>
        <span className="technical-text" style={{ opacity: 0.6 }}>{label}</span>
        <span style={{ fontSize: '1.5rem', fontWeight: 800 }}>{value} <span style={{ opacity: 0.5, fontSize: '1rem' }}>({percent.toFixed(0)}%)</span></span>
      </div>
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${percent}%`, background: 'var(--accent-primary)', opacity: 0.1 }} />
    </div>
  );
}
