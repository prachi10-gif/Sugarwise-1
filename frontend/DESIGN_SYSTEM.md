# SugarScan Frontend Design System & UI Components

## Global Design Tokens

### Color Palette

```
Primary Colors:
--bg-primary: #0A0F1E        (Deep midnight background)
--bg-secondary: #0E1628      (Card background)
--accent-teal: #00D4B4       (Primary CTA, success states)
--accent-amber: #FFB347      (Warnings, sugar meter high)
--accent-danger: #FF4757     (Danger, very high sugar)

Text Colors:
--text-primary: #F0F4FF      (Main text)
--text-secondary: #8892A4    (Secondary/muted text)

Glass:
--bg-glass: rgba(14,22,40,0.7)
--glass-border: rgba(0, 212, 180, 0.15)
```

### Shadows & Effects

```
Glow Effects:
  box-shadow: 0 0 30px rgba(0, 212, 180, 0.15);    (teal glow)
  box-shadow: 0 0 15px rgba(255, 179, 71, 0.3);    (amber glow)
  box-shadow: 0 0 20px rgba(255, 71, 87, 0.3);     (danger glow)

Blur:
  backdrop-filter: blur(20px);
  @supports (backdrop-filter: blur(20px)) { ... }
```

---

## Component Library

### 1. GlassCard Component
**File**: `src/components/ui/GlassCard.tsx`

**Props**:
```typescript
interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: 'teal' | 'amber' | 'danger' | 'none';
  interactive?: boolean;
  onClick?: () => void;
}
```

**Usage**:
```tsx
<GlassCard glowColor="teal" interactive>
  <h3>My Card</h3>
  <p>Content goes here</p>
</GlassCard>
```

**Features**:
- Glassmorphism backdrop blur (20px)
- Dynamic glow colors based on `glowColor` prop
- Hover animation when `interactive={true}`
- Smooth transitions with Framer Motion

---

### 2. SugarMeter Component
**File**: `src/components/ui/SugarMeter.tsx`

**Props**:
```typescript
interface SugarMeterProps {
  valueTsp: number;              // Current teaspoons consumed
  maxTsp?: number;               // Default 6 (WHO recommended)
  size?: 'sm' | 'md' | 'lg';    // Display size
  animated?: boolean;            // Spring animation on value change
}
```

**Usage**:
```tsx
<SugarMeter valueTsp={3.5} maxTsp={6} size="md" animated />
```

**Features**:
- Circular SVG arc showing progress
- Color changes: Green (0-3) → Amber (3-5) → Red (5+)
- Animated teaspoon icons (🥄) filled proportionally
- Center text shows current/max values
- Bloom glow effect on arc
- Spring animation on value changes

---

### 3. GlucoseMolecule Component (3D)
**File**: `src/components/3d/GlucoseMolecule.tsx`

**Props**:
```typescript
interface GlucoseMoleculeProps {
  className?: string;
}
```

**Usage**:
```tsx
<GlucoseMolecule className="w-full h-96" />
```

**Technical Stack**:
- React Three Fiber for 3D rendering
- Three.js geometry and materials
- OrbitControls for automatic rotation
- EffectComposer with Bloom post-processing

**Features**:
- 3D glucose molecule (6 carbons + oxygen atoms)
- Slow Y-axis rotation (0.003 rad/frame)
- Color-coded atoms: Carbon (teal #00D4B4), Oxygen (amber #FFB347), Hydrogen (white)
- Bloom glow effect on atoms
- Scroll-triggered dissolution animation
- Particle system for dissolving sugar particles

---

### 4. PageTransition Component
**File**: `src/components/layout/PageTransition.tsx`

**Props**:
```typescript
interface PageTransitionProps {
  children: ReactNode;
  isDashboard?: boolean;
}
```

**Usage**:
```tsx
<PageTransition isDashboard={false}>
  <YourPageContent />
</PageTransition>
```

**Animations**:
- **Entry**: Fade in from bottom (y: 20 → 0, opacity: 0 → 1, duration: 0.4s)
- **Exit**: Fade out upward (y: 0 → -20, opacity: 1 → 0, duration: 0.25s)
- **Dashboard**: Adds scan ripple effect from bottom-center

---

### 5. Navbar Component (Enhanced)
**File**: `src/components/Navbar.tsx`

**Features**:
- Fixed positioning with scroll detection
- Transparent on hero, solidifies on scroll
- Sugar crystal SVG logo with teal glow
- Desktop navigation with active link highlighting
- Mobile hamburger menu with full-screen glass drawer
- Optional sugar progress meter (when logged in)
- Smooth transitions and animations

**Key Methods**:
```typescript
// Scroll detection
useEffect(() => {
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 50);
  };
  window.addEventListener('scroll', handleScroll);
  // ...
});
```

---

### 6. HomePage Layout
**File**: `src/pages/Home.tsx`

**Sections** (in scroll order):
1. **Hero Section**
   - 3D Glucose Molecule (hidden on mobile)
   - Main heading with gradient text
   - Subheading with value proposition
   - CTA buttons (Scan Now, Learn More)
   - Feature list

2. **How It Works**
   - 3 animated steps: Scan → Calculate → Know
   - Each step in interactive GlassCard
   - Icon + description

3. **Indian Food Gallery**
   - Horizontal scrollable product cards
   - Emoji + product name + sugar content
   - Staggered animation on scroll
   - Touch-friendly on mobile

4. **Testimonials**
   - 3 glassmorphism quote cards
   - Star ratings
   - Author and role

5. **Free Trial CTA**
   - "3 Free Scans" banner
   - Large GlassCard with animated background orbs
   - Primary and secondary buttons

6. **Footer**
   - Copyright text
   - Subtle border

---

## Animation Variants Library

**File**: `src/lib/animations.ts`

### Available Variants:

```typescript
// Basic animations
fadeUpVariants         // Fade in from bottom
fadeInVariants         // Simple fade
slideInLeftVariants    // Slide from left
slideInRightVariants   // Slide from right
scaleInVariants        // Scale zoom in

// Container animations
staggerContainer       // For staggering children
containerVariants      // General container animation

// Page-specific
pageEnterVariants      // Page transition (enter/exit)
scanRippleVariants     // Dashboard ripple effect
heroHeadingVariants    // Hero heading with delay
heroSubtitleVariants   // Hero subtitle with delay

// Component-specific
glassCardHoverVariants // Card hover effect
buttonVariants         // Button interactions
horizontalScrollVariants // Scroll reveal

// Pattern
export const fadeUpVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};
```

---

## Tailwind Configuration Overrides

**File**: `tailwind.config.js`

### Extended Theme:

```javascript
colors: {
  midnight: '#0A0F1E',
  'midnight-secondary': '#0E1628',
  tealAccent: '#00D4B4',
  amberAccent: '#FFB347',
  dangerAccent: '#FF4757',
  glassBg: 'rgba(10, 15, 30, 0.6)',
  glassBorder: 'rgba(255, 255, 255, 0.08)',
  'glass-border-teal': 'rgba(0, 212, 180, 0.15)',
}

boxShadow: {
  'glow-teal': '0 0 30px rgba(0, 212, 180, 0.15)',
  'glow-teal-bright': '0 0 40px rgba(0, 212, 180, 0.3)',
  'glow-amber': '0 0 15px rgba(255, 179, 71, 0.3)',
  'glow-danger': '0 0 20px rgba(255, 71, 87, 0.3)',
}

animation: {
  float: 'float 3s ease-in-out infinite',
  glow: 'glow 2s ease-in-out infinite',
  'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
  dissolve: 'dissolve 2s ease-out forwards',
  'particle-float': 'particle-float 2s ease-out forwards',
  scan: 'scan 3s linear infinite',
}
```

---

## Global CSS Animations

**File**: `src/index.css`

### Keyframe Definitions:

```css
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

@keyframes glow {
  0%, 100% { box-shadow: 0 0 20px rgba(0, 212, 180, 0.3); }
  50% { box-shadow: 0 0 40px rgba(0, 212, 180, 0.6); }
}

@keyframes pulse-glow {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}

@keyframes dissolve {
  0% { opacity: 1; scale: 1; }
  100% { opacity: 0; scale: 0.5; }
}

@keyframes particle-float {
  0% { opacity: 1; transform: translateY(0) translateX(0); }
  100% { opacity: 0; transform: translateY(-100px) translateX(var(--tx, 0)); }
}
```

---

## Responsive Design Breakpoints

Using Tailwind's default breakpoints:
- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px
- **2xl**: 1536px

Key responsive behavior:
- Hero section: Single column on mobile, 2 columns on desktop
- Navigation: Hamburger menu on mobile, horizontal nav on desktop
- Product gallery: Horizontal scroll on mobile, grid on desktop
- Testimonials: Single column mobile, 3 columns desktop

---

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Requires CSS Grid, Flexbox, CSS custom properties
- Backdrop filter support required for glassmorphism

---

## Performance Optimizations

1. **Lazy Loading**: Images and heavy components
2. **Code Splitting**: Route-based splitting with React Router
3. **Animation Performance**: GPU-accelerated transforms (scale, rotate, opacity)
4. **Three.js**: OrbitControls with auto-rotate speed limited
5. **Scroll Listeners**: Debounced or using IntersectionObserver

---

## Installation & Setup

```bash
cd frontend
npm install
npm run dev
```

### Required Dependencies:
- React 18.3.1
- Framer Motion 11.2.10
- Three.js 0.165.0
- React Three Fiber 8.16.8
- React Three Drei 9.106.0
- React Three Postprocessing 2.16.0
- Tailwind CSS 3.4.3
- Lucide React (icons)

---

## File Structure

```
frontend/src/
├── components/
│   ├── ui/
│   │   ├── GlassCard.tsx
│   │   └── SugarMeter.tsx
│   ├── layout/
│   │   └── PageTransition.tsx
│   ├── 3d/
│   │   └── GlucoseMolecule.tsx
│   └── Navbar.tsx
├── pages/
│   └── Home.tsx
├── lib/
│   └── animations.ts
├── index.css
└── main.tsx
```

---

## Design Philosophy

**SugarScan Frontend Design Principles**:

1. **Glassmorphism**: Frosted glass effect for modern, premium feel
2. **Color Psychology**: 
   - Teal (trust, health, calmness)
   - Amber (caution, warning)
   - Red (danger, urgent action)
3. **Motion**: Purposeful animations that guide user attention
4. **Accessibility**: Focus states, semantic HTML, sufficient contrast
5. **Performance**: Smooth 60fps animations, optimized 3D rendering

---

## Version History

- **v1.0** (June 14, 2026): Initial design system with 6 core components
  - GlassCard with glow effects
  - SugarMeter circular arc visualization
  - 3D GlucoseMolecule with bloom
  - Page transitions with variants
  - Enhanced Navbar with mobile menu
  - Complete Home page with all sections

---

*Design System Documentation*  
*Created: 2026-06-14*  
*Components: 6 UI + 3D*  
*Animation Variants: 15+*  
*Tailwind Extensions: 30+*
