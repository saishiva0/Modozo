# Modozo Project Requirements & Technical Specification

## 1. Project Overview
Modozo is a high-fidelity marketing website for a B2B SaaS platform focused on supply chain and production management. The site aims to communicate a transition from "fragmented chaos" to "unified control" through immersive storytelling and premium interactive UI.

## 2. Technology Stack
- **Framework**: React 19 (Vite-based)
- **Styling**: Tailwind CSS v4 (with PostCSS)
- **Animations**: Framer Motion 12
- **Icons**: Lucide React + Custom SVG/Emoji Animations
- **Fonts**: 
  - `Cormorant Garamond` (Luxury Serif for Headings)
  - `Outfit` (Modern Sans for Body/UI)

## 3. Design System
- **Primary Navy**: `#0E2545` (High-trust, deep professional background)
- **Brand Gold**: `#FFD84D` (Interactive highlights and premium accents)
- **Brand Cream**: `#FFFDE7` (Clean card backgrounds and secondary sections)
- **Muted Silver**: `#B8C7E0` (Hierarchical text and subtle borders)

## 4. Core Features & Sections
- **Hero Hub**: Atmospheric 3D-inspired visualization of the "unified system."
- **Problem Visualization**: Scroll-triggered animation showing misalignment and "silent delays" in traditional workflows.
- **Immersive Breakdown**: Interactive cards that open full-screen glassmorphic overlays with "Majestic" easing.
- **Scrollytelling Workflow**: Six-step card dispersion animation that expands as the user scrolls.
- **Orbital Features**: High-fidelity 3D asset mapping with collision-free orbital spacing.
- **Stakeholder Sync**: Sequential vertical card logic mapping benefits to specific user roles (Designers, Vendors, etc.).
- **Impact Visuals**: Dynamic "Chaos to Order" transition using animated SVG paths and counter logic.

## 5. Interaction Design Principles
- **Majestic Easing**: Global use of `cubic-bezier(0.16, 1, 0.3, 1)` for a "heavy" premium feel.
- **Hover Intent**: 150ms delay logic on interactive overlays to prevent accidental triggers during rapid scrolling.
- **Scroll-Safe UX**: Intelligent state management that prevents UI overlays from blocking navigation during scroll.
- **Mobile Optimized**: Responsive grid systems and simplified animation paths for touch devices.

## 6. Performance Standards
- Zero layout shift during interaction.
- Backdrop-blur optimized for high-density displays.
- Lazy-triggering of heavy SVG/motion components.
