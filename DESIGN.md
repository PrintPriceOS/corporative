```markdown
# Design System Specification: Technical Precision & Editorial Depth

## 1. Overview & Creative North Star: "The Monolith"
This design system is built for the high-stakes world of enterprise print procurement. It rejects the cluttered, "noisy" aesthetic of traditional SaaS in favor of a **Creative North Star** we call **"The Monolith."**

The Monolith represents absolute structural integrity and silent authority. It is characterized by deep, cinematic blacks, high-contrast editorial typography, and extreme spatial discipline. By utilizing an aggressive 8rem (128px) section padding and a total absence of standard decorative borders, we create a "Gallery" feel for technical data. The interface does not compete for attention; it commands it through intentional asymmetry and raw, typographic power.

---

## 2. Colors: High-Contrast Noir
The palette is rooted in the absence of light, using a unified red accent (`#dc0000`) to signal critical action paths and system vitality.

### Color Tokens
- **Background (Deep Black):** `#131314` (The Canvas)
- **Primary (Accent):** `#ffb4a8` / **Primary Container:** `#dc0000` (The Signal)
- **Surface (Neutral):** From `surface_container_lowest` (`#0e0e0f`) to `surface_bright` (`#3a393a`)
- **On-Surface (High Contrast):** `#e5e2e3` (The Information)

### The "No-Line" Rule
Traditional 1px solid borders are strictly prohibited for sectioning. Boundaries must be defined through **Background Color Shifts** only. A `surface_container_low` section sitting on a `surface` background provides all the separation required. If a visual break is needed, use the **Spacing Scale (Token 20 or 24)** to create a void.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. 
- **The Base:** Always `surface` (`#131314`).
- **The Workplane:** Use `surface_container_low` for primary content areas.
- **The Technical Inset:** Use `surface_container_lowest` (`#0e0e0f`) for code blocks or data tables to create a "recessed" look, suggesting the data is etched into the screen.

### The "Glass & Glow" Rule
To elevate the "Enterprise" feel, use **Glassmorphism** for floating utility panels (e.g., sidebars or filter drawers). Use `surface_container_high` at 60% opacity with a `20px` backdrop-blur. 
- **Signature Texture:** Technical visualizations (charts/graphs) should utilize a subtle outer glow (0 0 12px) using the `primary_container` (`#dc0000`) token at 30% opacity to simulate high-end hardware interfaces.

---

## 3. Typography: The Editorial Engine
The system pairs the humanist structuralism of **Manrope** for storytelling with the brutal precision of **Space Grotesk** and **Inter** for data.

- **Display (Manrope, Bold):** Used for "The Big Truths"—pricing totals and high-level KPIs. (`display-lg`: 3.5rem).
- **Headline (Manrope, Bold):** For section entry points. Always high-contrast (`on_surface`).
- **Labels (Space Grotesk, Medium):** Specifically for technical metadata, unit measurements (e.g., "GSM", "PPI"), and status indicators. The monospace-adjacent feel of Space Grotesk reinforces "Precision."
- **Body (Inter, Regular):** For long-form descriptions and help text. Set to `body-md` (0.875rem) with generous line-height (1.6) to ensure the deep background doesn't cause eye fatigue.

---

## 4. Elevation & Depth: Tonal Layering
We do not use drop shadows to indicate height; we use light.

- **The Layering Principle:** Depth is achieved by "stacking" surface-container tiers. Place a `surface_container_highest` modal on a `surface_dim` backdrop. The contrast in value creates the lift.
- **Ambient Shadows:** Only for elements that "float" above the logic of the grid (e.g., Context Menus). Use a large blur (32px) at 8% opacity using the `on_surface` color tinted with a hint of Red.
- **The Ghost Border Fallback:** If a border is required for accessibility in input fields, use `outline_variant` (`#5e3f3a`) at **15% opacity**. It should be felt, not seen.

---

## 5. Components: Precision Primitives

### Buttons
- **Primary:** Background: `primary_container` (`#dc0000`), Text: `on_primary_container`. **0px Border Radius**.
- **Secondary/Ghost:** No background. Text: `primary`. 1px Ghost Border (15% opacity).
- **Interactions:** On hover, the `primary_container` should trigger a 4px "inner glow" rather than a color change.

### Input Fields
- **Style:** Underline-only or recessed (`surface_container_lowest`). No rounded corners.
- **States:** Active state utilizes a 1px `primary` bottom border and a subtle `#dc0000` text-shadow on the label to indicate "Focus."

### Cards & Lists
- **The Divider Ban:** Lists must never use horizontal lines. Use **Spacing Token 4 (1.4rem)** between items.
- **Visual Separation:** Use alternating background tones (`surface_container_low` vs `surface_container_lowest`) for row-based data to maintain a clean, architectural look.

### Technical Visualization Nodes
- Active state nodes in a graph or print-workflow must use the `primary_container` with a high-intensity glow to signal "System Active."

---

## 6. Do’s and Don’ts

### Do:
- **Use the Grid:** Align every element to the pixel. In a minimalist system, a 2px misalignment is a catastrophic failure.
- **Embrace the Void:** If a page feels empty, add *more* whitespace (8.5rem). Do not fill it with icons or decorative elements.
- **Typography as Graphic:** Let the size and weight of the numbers be the primary "visual" of the dashboard.

### Don’t:
- **No Rounded Corners:** `0px` radius is the law. Any curve breaks the "Monolith" precision.
- **No Generic Icons:** Avoid "bubbly" or filled icon sets. Use thin-stroke (1px) linear icons only.
- **No High-Opacity Borders:** If you see a hard grey line, delete it. Use a background tone shift instead.
- **No Color Bloat:** Stick strictly to the Red/Black/White hierarchy. Do not introduce "Success Green" or "Warning Orange" unless absolutely critical for safety—even then, use the `error` tokens provided.

---
**Director's Final Note:** This design system is about the "Space between the notes." By removing the standard scaffolding of UI design (borders, shadows, bright colors), we force the user to focus on the data. Be brave with the black.```