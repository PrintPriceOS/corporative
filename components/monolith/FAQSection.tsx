'use client';

import React, { useState } from 'react';
import { Section } from '../ui/Section';
import { Icon } from '../ui/Icon';
import Link from 'next/link';
import { Button } from '../ui/Button';

interface FAQItem {
    id: string;
    q: string;
    a: string;
}

interface FAQGroup {
    category: string;
    items: FAQItem[];
}

const FAQ_DATA: FAQGroup[] = [
    {
        category: "Getting Started",
        items: [
            { id: "what_is_ppp", q: "What is PrintPrice Pro?", a: "PrintPrice Pro is a tool for book manufacturing. We help you understand print costs, check your files for errors, and connect with trusted printers." },
            { id: "how_it_works", q: "How does it work?", a: "Enter your book specs, our system checks if your files are ready, and we match your project with a high-quality printer from our network." },
            { id: "pre_printer", q: "Can I use PrintPrice Pro before talking to any printer?", a: "Yes. That’s exactly what it’s built for. You can understand your costs, validate your files, and explore options before committing to any supplier." },
            { id: "tech_knowledge", q: "Do I need technical knowledge?", a: "No. Our interface is built for everyone. We guide you through the process, making complex decisions simple and straightforward." }
        ]
    },
    {
        category: "Pricing & Results",
        items: [
            { id: "post_calc", q: "What happens after I calculate my project?", a: "You’ll get an instant cost estimate and file validation results. From there, you can review options, adjust specs, and move forward with the best printer for your project." },
            { id: "price_accuracy", q: "Are the prices accurate?", a: "Very. Our estimates give you a highly precise figure based on the market. However, the exact cost is confirmed once the printer accepts the project." },
            { id: "price_binding", q: "Is the price binding?", a: "No. The result you see is a non-binding estimate. It’s a reliable baseline for your planning before you move to production." }
        ]
    },
    {
        category: "Files & Quality",
        items: [
            { id: "file_format", q: "What file format do I need?", a: "We work with high-resolution PDFs. This is the industry standard for ensuring your layout and images print correctly every time." },
            { id: "file_validation", q: "What is file validation?", a: "Our system automatically checks your PDF for technical errors like resolution or bleed issues before you send it to the printer." },
            { id: "wrong_job", q: "What if something goes wrong with my print job?", a: "We act as a technical layer between you and the printer. If there’s a mismatch in specs or validation, we help identify the issue and support resolution." },
            { id: "responsibility", q: "Do I still need to review my work?", a: "Yes. While we catch technical print errors, you remain responsible for the content and final proofreading of your book." }
        ]
    },
    {
        category: "Printers",
        items: [
            { id: "who_prints", q: "Who prints my book?", a: "Your book is printed by professional, independent print houses. We only work with facilities that pass our strict quality and reliability checks." },
            { id: "are_you_printer", q: "Are you the printer?", a: "No. We provide the technology to manage the process. We don't own the machines; we ensure you get the best result from trusted printers." },
            { id: "existing_printer", q: "Can I use PrintPrice Pro if I already have a printer?", a: "Absolutely. You can use our pricing and file validation tools to prepare your project even if you choose to manufacture elsewhere." }
        ]
    }
];

export const FAQSection: React.FC = () => {
    // Open the first item of the first category by default
    const [openId, setOpenId] = useState<string | null>("0-0");

    const toggleItem = (id: string, faqId: string) => {
        setOpenId(openId === id ? null : id);
        // Telemetry hook placeholder
        if (openId !== id) {
            console.log(`[Telemetry] FAQ Opened: ${faqId}`);
        }
    };

    return (
        <Section variant="primary" style={{ padding: 'clamp(5rem, 15vw, 10rem) 1.5rem', ...({} as any) }} data-monolith-action="faq_engaged">
            <div style={{ maxWidth: '960px', margin: '0 auto', ...({} as any) }}>
                <div style={{ textAlign: 'center', marginBottom: 'clamp(4.5rem, 10vw, 7rem)', ...({} as any) }}>
                    <h4 className="technical-text" style={{
                        fontSize: '0.75rem',
                        color: 'var(--accent-primary)',
                        marginBottom: '1.25rem',
                        letterSpacing: '0.2em',
                        fontWeight: 800,
                        ...({} as any)
                    }}>QUESTIONS, ANSWERED</h4>
                    <h2 style={{ fontSize: 'clamp(2.5rem, 8vw, 3.5rem)', letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: '1.5rem', color: 'var(--text-primary)', ...({} as any) }}>
                        Everything you need to know.
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '500px', marginInline: 'auto' }}>
                        Direct answers about print costs, files, and printers.
                    </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0', ...({} as any) }}>
                    {FAQ_DATA.map((group, gIdx) => (
                        <div key={group.category} style={{
                            borderTop: '1px solid var(--border-color)',
                            paddingTop: '3rem',
                            marginTop: gIdx === 0 ? 0 : '3rem'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
                                <span style={{
                                    fontSize: '0.6rem',
                                    fontWeight: 800,
                                    letterSpacing: '0.25em',
                                    padding: '0.25rem 0.5rem',
                                    background: 'var(--bg-secondary)',
                                    color: 'var(--text-secondary)',
                                    borderRadius: '2px',
                                    textTransform: 'uppercase'
                                }}>{group.category}</span>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', ...({} as any) }}>
                                {group.items.map((item, iIdx) => {
                                    const id = `${gIdx}-${iIdx}`;
                                    const isOpen = openId === id;
                                    return (
                                        <div
                                            key={item.q}
                                            style={{
                                                background: isOpen ? 'var(--bg-secondary)' : 'transparent',
                                                border: '1px solid',
                                                borderColor: isOpen ? 'var(--border-color)' : 'transparent',
                                                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                                                borderRadius: '2px',
                                                ...({} as any)
                                            }}
                                            data-monolith-action="faq_item_view"
                                            data-faq-id={item.id}
                                        >
                                            <button
                                                onClick={() => toggleItem(id, item.id)}
                                                style={{
                                                    width: '100%',
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    padding: '1.5rem 1.75rem',
                                                    textAlign: 'left',
                                                    background: 'none',
                                                    border: 'none',
                                                    color: 'var(--text-primary)',
                                                    cursor: 'pointer',
                                                    fontSize: 'clamp(1.1rem, 2vw, 1.2rem)',
                                                    fontWeight: 600,
                                                    letterSpacing: '-0.01em',
                                                    ...({} as any)
                                                }}
                                                data-monolith-action="faq_open"
                                                data-faq-question={item.id}
                                            >
                                                <span style={{ flex: 1, paddingRight: '2rem' }}>{item.q}</span>
                                                <div style={{
                                                    transform: isOpen ? 'rotate(180deg)' : 'none',
                                                    transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                                                    color: isOpen ? 'var(--accent-primary)' : 'var(--text-secondary)',
                                                    display: 'flex',
                                                    alignItems: 'center'
                                                }}>
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                                </div>
                                            </button>
                                            <div style={{
                                                maxHeight: isOpen ? '300px' : '0',
                                                overflow: 'hidden',
                                                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                                                opacity: isOpen ? 1 : 0
                                            }}>
                                                <div style={{
                                                    padding: '0 1.75rem 2rem',
                                                    color: 'var(--text-secondary)',
                                                    fontSize: '1.05rem',
                                                    lineHeight: 1.6,
                                                    maxWidth: '80ch',
                                                    ...({} as any)
                                                }}>
                                                    {item.a}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{
                    marginTop: '8rem',
                    padding: '4rem',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    textAlign: 'center',
                    borderRadius: '2px',
                    ...({} as any)
                }}>
                    <h3 style={{ fontSize: '1.75rem', marginBottom: '2.5rem', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>Still unsure? Try a simple project.</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
                        <Link href="https://budget.printprice.pro/">
                            <Button size="lg">Calculate your print cost</Button>
                        </Link>
                        <Link href="/contact" className="nav-link-technical" style={{ fontSize: '0.85rem', fontWeight: 800, opacity: 0.5, color: 'var(--text-secondary)', display: 'inline-block' }}>
                            OR CONSULT AN ARCHITECT →
                        </Link>
                    </div>
                </div>
            </div>
        </Section>
    );
};

