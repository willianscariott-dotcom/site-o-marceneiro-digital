# Design System Document: Technical Craftsmanship & Engineering Precision

## 1. Overview & Creative North Star
**Creative North Star: "The Digital Architect"**

This design system moves beyond the standard SaaS "SaaS-y" aesthetic into a realm of **Engineering Brutalism meets High-End Editorial**. For 'O Marceneiro Digital', we are not just building software; we are providing the digital equivalent of a precision-calibrated CNC machine. 

To break the "template" look, we utilize:
*   **Intentional Asymmetry:** Grid layouts that lean into heavy left-aligned typography contrasted against expansive, "breathing" negative space.
*   **Technical Overlays:** Using technical drawing schematics as low-opacity background textures to bridge the gap between digital tech and physical carpentry.
*   **High-Contrast Scale:** Dramatically oversized display type paired with micro-labels to create an authoritative, architectural hierarchy.

## 2. Colors & Surface Philosophy
The palette is rooted in a "Deep Tech" foundation—dark, immersive, and punctuated by high-visibility accents that mirror industrial safety and precision tools.

### The Surface Hierarchy
We reject the flat UI. Depth is achieved through **Tonal Layering**, mimicking the stacking of high-grade materials in a workshop.
*   **Surface (`#121317`):** The base "floor" of the application.
*   **Surface-Container-Low (`#1a1b20`):** Used for large sectioning to create a soft distinction from the base.
*   **Surface-Container-Highest (`#343439`):** Reserved for interactive cards or floating panels to create a "lift" effect.

### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders to define sections. Boundaries must be established through color shifts. For example, a `surface-container-low` section should sit flush against the `surface` background. If you feel the need for a line, increase the vertical padding instead.

### Glass & Gradients
To avoid a static feel, use **Glassmorphism** for navigation bars and floating modals.
*   **Effect:** Apply `surface-container` at 70% opacity with a `20px` backdrop-blur.
*   **Signature Texture:** Primary CTAs should use a subtle linear gradient from `primary` (#ffd39b) to `primary-container` (#fbb03b) at a 135-degree angle to give the button a "machined" metallic sheen.

## 3. Typography
The type system balances the technical rigidity of **Space Grotesk** with the utilitarian readability of **Inter**.

*   **Display (Space Grotesk):** Oversized, tight tracking (-2%), and bold. This is our "Architectural Voice." It should feel like it was stamped onto the page.
*   **Body (Inter):** High legibility, generous line-height (1.6) for editorial comfort.
*   **Labels (Space Grotesk):** All-caps, tracked out (+5% to +10%) to mimic the look of technical blueprints and engineering callouts.

| Role | Font | Size | Intent |
| :--- | :--- | :--- | :--- |
| **Display-LG** | Space Grotesk | 3.5rem | Hero headlines; maximum impact. |
| **Headline-MD** | Space Grotesk | 1.75rem | Section headers; authoritative. |
| **Body-LG** | Inter | 1rem | Primary narrative text. |
| **Label-MD** | Space Grotesk | 0.75rem | Metadata, technical specs, small caps. |

## 4. Elevation & Depth
In this system, light is a tool. We avoid generic shadows in favor of **Ambient Glows** and **Tonal Stacking**.

*   **The Layering Principle:** Place a `surface-container-lowest` card on a `surface-container-low` section to create "recessed" depth (like a routed groove in wood).
*   **Ambient Shadows:** Use `0px 24px 48px rgba(0, 0, 0, 0.4)`. The shadow is not a border; it is an atmospheric presence.
*   **The "Ghost Border" Fallback:** If a container requires a boundary (e.g., inside a complex form), use the `outline-variant` token at **15% opacity**. It should be felt, not seen.
*   **Technical Accents:** Use 1px "glow lines" (Primary Blue at 30% opacity) as subtle highlights on the top edge of containers to simulate overhead lighting in a precision lab.

## 5. Components

### Buttons (The "Precision Tools")
*   **Primary:** `primary-container` (#fbb03b). Solid, no border, `sm` roundedness (0.125rem). The sharp corners reflect engineering precision.
*   **Secondary:** `secondary-container` (#04509a) with `on-secondary` text. Used for secondary actions that require brand presence.
*   **Tertiary (Ghost):** No background. Use `label-md` styling for the text with a Brand Blue (#004E98) underline that expands on hover.

### Cards & Content Modules
*   **Strict Rule:** No dividers. Separate content using the Spacing Scale (typically 32px or 48px gaps). 
*   **Visuals:** Every card should ideally feature a "Technical Detail"—a small coordinate (e.g., 45.00° / 12.0mm) in the corner using `label-sm` to reinforce the engineering theme.

### Input Fields
*   **Style:** Underlined or fully enclosed in `surface-container-high`.
*   **Focus State:** A 2px bottom border of `primary` (#ffd39b) with a subtle outer glow. Avoid the standard "blue ring" focus state.

### Specialized Components: "The Blueprint Overlay"
*   **Contextual Tooltips:** Use a dark background (`surface-container-highest`) with `tertiary` (#ace2ff) mono-spaced text to display technical dimensions or "woodworking specs" of a feature.

## 6. Do's and Don'ts

### Do:
*   **Embrace Negative Space:** Allow headlines to breathe. A 128px top margin is not too much for a major section.
*   **Use High-Resolution Micro-Photography:** Show the grain of the wood and the glint of the blade.
*   **Apply Intentional Asymmetry:** Offset images from their text containers to create a dynamic, editorial flow.

### Don't:
*   **Don't Use Circles:** This system is built on rectangles and slight `sm/md` radii. Circular buttons or avatars will break the "Engineering" language.
*   **Don't Use Pure Black:** Always use `surface` (#121317) to allow for depth layering.
*   **Don't Use Default Icons:** Use thin-stroke (1px or 1.5px) technical icons. Avoid "filled" or bubbly icon sets.

### Accessibility Note:
While the theme is dark, ensure all `on-surface` text meets a minimum contrast ratio of 4.5:1. Use the `primary-fixed` and `secondary-fixed` variants for text that must remain legible over varying dark backgrounds.