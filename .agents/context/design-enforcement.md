# Design Enforcement Rules

## Core Rule
All UI must comply with the PrintPrice Monolith System (v1.0).

## Forbidden
- **Rounded Corners**: Strictly 0px border-radius globally.
- **Glassmorphism**: No transparency or backdrop-blur (unless explicitly authorized for special system overlays).
- **Gradients**: No decorative axial or radial gradients.
- **Shadows**: No shadows for depth or separation. Use background tonal shifts.
- **Random UI Styles**: No unauthenticated components or external library defaults.

## Layout Enforcement
- **Spatial Discipline**: 8rem+ section padding for primary surfaces.
- **Hierarchy through Spacing**: Proportions define the narrative, not visual noise.
- **Tonal Separation**: Use `surface`, `surface_container_low`, and `surface_dark` backgrounds to define boundaries.

## Typography
- **Manrope**: Display, Headings, Navigation.
- **Space Grotesk**: Technical labels, Data, Sub-labels.
- **Inter**: Long-form body text.
- **Strict Hierarchy**: Weights and sizes must follow the Monolith scale. No decorative typography.

## Product Representation
- **Grouping**: Products must always be presented as an orchestrated suite.
- **Context**: Always link back to the System Platform (PrintPrice OS).

## Workflow Requirement
- Any platform-related page must visualize the workflow or logic flow (e.g., Log lines, Signature Texture).

## Consistency Rule
- If a component breaks the Monolith logic → Reject and redesign.
- No exceptions allowed for Core Pages (Home, Platform, Products).

## Exception Management
- If a future surface requires deviation:
  - Must be documented as an "Extended Module".
  - Must not leak into core layouts.
