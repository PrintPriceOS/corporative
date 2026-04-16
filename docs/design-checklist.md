# Design Checklist (Monolith v1.0)

Before shipping or approving any page or component, verify these criteria:

### [ ] Architectural Integrity
- **Radius**: All elements must have `0px` border-radius.
- **Borders**: No 1px solid borders for separation. Use background tonal shifts (`surface_low` vs `surface`).
- **Separation**: Boundaries defined by spacing or background color changes only.

### [ ] Technical Narrative
- **Typography**: Display headings in Manrope (Bold/Black). Technical labels in Space Grotesk.
- **Tone**: Professional, enterprise, technical. No playful UI or startup-style gradients.
- **Accents**: Only one primary accent color (`#dc0000`) used sparingly for critical actions or system status.

### [ ] Spatial Discipline
- **Padding**: Large section paddings (8rem - 12rem) for primary layouts.
- **Hierarchy**: Spacing and scale convey importance, not decorative elements.
- **Clutter**: All unnecessary components or visual noise must be removed.

### [ ] System Connectivity
- **Workflow**: Platform-level pages must show a workflow visualize (Logs, Path, logic flow).
- **Products**: Shown as an orchestrated suite, not isolated tools.
- **Call-to-Action**: Clear, authoritative, and aligned with Monolith Button style.

### [ ] Performance & Consistency
- **Transitions**: Use the defined `var(--transition-monolith)` for all interactive states.
- **Visual Drift**: Confirm the page doesn't introduce a "new" style or deviation.
- **Asset Fit**: Images and diagrams must follow the dark, technical, structured aesthetic.

---
**Status**: Certified System (v2.5)
**Repository**: PrintPrice Pro (f:\PPP_Website)
