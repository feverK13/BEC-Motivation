# BEC Motivation - Subagent Task Instructions

## Format Rules for All Tasks:
- Implementer: Create files, run commands, commit with "feat: " or "chore: " prefix
- Spec Reviewer: Output "OK" if compliant, else describe critical error only
- Quality Reviewer: Output "OK" if approved, else describe critical issue only

---

## TASK 2: Setup Global Styles and CSS Variables

**IMPLEMENTER:**
```bash
mkdir -p src/styles
```

Create `src/styles/variables.css`:
```css
:root {
  --color-bg: #0a0a0a;
  --color-bg-secondary: #121212;
  --color-card: #1a1a1a;
  --color-card-hover: #222;
  --color-accent: #fa8112;
  --color-accent-glow: rgba(250, 129, 18, 0.3);
  --color-border: #252525;
  --color-border-hover: #2a2a2a;
  --color-text-primary: #ffffff;
  --color-text-secondary: #a0a0a0;
  --color-text-muted: #6b6b6b;
  --font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
  --spacing-xs: 8px;
  --spacing-sm: 12px;
  --spacing-md: 20px;
  --spacing-lg: 30px;
  --spacing-xl: 50px;
  --spacing-xxl: 60px;
  --transition-fast: 0.2s ease;
  --transition-normal: 0.3s ease;
  --transition-slow: 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
}
@media (max-width: 900px) {
  :root {
    --spacing-xl: 30px;
    --spacing-xxl: 40px;
  }
}
```

Replace `src/index.css`:
```css
@import './styles/variables.css';
* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  font-family: var(--font-family);
  background: linear-gradient(145deg, var(--color-bg) 0%, var(--color-bg-secondary) 100%);
  color: var(--color-text-primary);
  min-height: 100vh;
  line-height: 1.6;
}
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: var(--color-bg); }
::-webkit-scrollbar-thumb { background: var(--color-border); border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: var(--color-accent); }
::selection { background: var(--color-accent); color: var(--color-bg); }
```

```bash
git add src/styles/variables.css src/index.css
git commit -m "feat: add global styles and css variables"
```

**SPEC REVIEWER:** Verify variables.css has all 8 colors, 8 spacing vars, 3 transitions, 4 radius. Verify index.css imports variables. Output "OK" or critical error only.

**QUALITY REVIEWER:** Check CSS syntax valid. Output "OK" or critical error only.

---

## TASK 3: Create Custom Hooks

**IMPLEMENTER:**

Create `src/hooks/useScrollAnimation.ts`:
```typescript
import { useEffect, useRef, useState } from 'react';
export function useScrollAnimation<T extends HTMLElement>(options: { threshold?: number; triggerOnce?: boolean } = {}) {
  const { threshold = 0.2, triggerOnce = true } = options;
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        if (triggerOnce) observer.unobserve(element);
      } else if (!triggerOnce) setIsVisible(false);
    }, { threshold });
    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, triggerOnce]);
  return { ref, isVisible };
}
```

Create `src/hooks/useCarousel.ts`:
```typescript
import { useState, useEffect, useCallback } from 'react';
export function useCarousel({ totalSlides, autoPlayInterval = 8000 }: { totalSlides: number; autoPlayInterval?: number }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const goToSlide = useCallback((index: number) => { setCurrentIndex(index); setProgress(0); }, []);
  const nextSlide = useCallback(() => { setCurrentIndex((prev) => (prev + 1) % totalSlides); setProgress(0); }, [totalSlides]);
  const prevSlide = useCallback(() => { setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides); setProgress(0); }, [totalSlides]);
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) { nextSlide(); return 0; }
        return prev + (100 / (autoPlayInterval / 100));
      });
    }, 100);
    return () => clearInterval(interval);
  }, [isPaused, autoPlayInterval, nextSlide]);
  const pause = useCallback(() => setIsPaused(true), []);
  const resume = useCallback(() => setIsPaused(false), []);
  return { currentIndex, progress, goToSlide, nextSlide, prevSlide, pause, resume };
}
```

```bash
git add src/hooks/
git commit -m "feat: add useScrollAnimation and useCarousel hooks"
```

**SPEC REVIEWER:** Verify hooks use TypeScript generics, return correct types, use proper React hooks. Output "OK" or critical error.

**QUALITY REVIEWER:** Check no memory leaks, proper cleanup. Output "OK" or critical error.

---

## TASK 4: Create Navigation Component

**IMPLEMENTER:**

Create `src/components/Navigation.tsx`:
```tsx
import { useState, useEffect } from 'react';
import './Navigation.css';
const navItems = [
  { id: 'about', label: 'Про мене' },
  { id: 'role', label: 'Роль' },
  { id: 'summary', label: 'Підсумок' },
  { id: 'contacts', label: 'Контакти' },
];
export function Navigation() {
  const [activeSection, setActiveSection] = useState('about');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({ top: element.offsetTop - 60, behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };
  return (
    <>
      <nav className="navigation-desktop">
        <div className="nav-logo">BEC 2026</div>
        <div className="nav-items">
          {navItems.map((item) => (
            <button key={item.id} className={`nav-item ${activeSection === item.id ? 'active' : ''}`} onClick={() => scrollToSection(item.id)}>
              {item.label}
            </button>
          ))}
        </div>
      </nav>
      <header className="navigation-mobile">
        <div className="mobile-logo">BEC 2026</div>
        <button className="burger-menu" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle menu">
          <span></span><span></span><span></span>
        </button>
      </header>
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
            <button className="mobile-close" onClick={() => setIsMobileMenuOpen(false)} aria-label="Close menu">×</button>
            {navItems.map((item) => (
              <button key={item.id} className={`mobile-nav-item ${activeSection === item.id ? 'active' : ''}`} onClick={() => scrollToSection(item.id)}>
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
```

Create `src/components/Navigation.css` (use design spec for exact styles, dark theme, orange accent #fa8112):
- Desktop: fixed sidebar 220px, logo "BEC 2026", nav items vertical
- Mobile: fixed header, burger menu, full-screen overlay
- Active state: orange color, left border, gradient bg
- Hover: orange text, subtle orange bg

```bash
git add src/components/Navigation.tsx src/components/Navigation.css
git commit -m "feat: add Navigation component with desktop and mobile variants"
```

**SPEC REVIEWER:** Verify 4 nav items, smooth scroll, active state tracking, mobile overlay. Output "OK" or critical error.

**QUALITY REVIEWER:** Check event listeners cleaned up, no scroll jank. Output "OK" or critical error.

---

## TASK 5: Create Carousel Component

**IMPLEMENTER:**

Create `src/components/Carousel.tsx`:
```tsx
import { useCarousel } from '../hooks/useCarousel';
import './Carousel.css';
export function Carousel({ photos, altPrefix = 'Photo' }: { photos: string[]; altPrefix?: string }) {
  const { currentIndex, progress, goToSlide, nextSlide, prevSlide, pause, resume } = useCarousel({ totalSlides: photos.length, autoPlayInterval: 8000 });
  return (
    <div className="carousel" onMouseEnter={pause} onMouseLeave={resume}>
      <div className="carousel-arrows">
        <button className="carousel-arrow" onClick={prevSlide} aria-label="Previous photo">◀</button>
        <button className="carousel-arrow" onClick={nextSlide} aria-label="Next photo">▶</button>
      </div>
      <div className="carousel-images">
        {photos.map((photo, index) => (
          <img key={index} src={photo} alt={`${altPrefix} ${index + 1}`} className={`carousel-image ${index === currentIndex ? 'active' : ''}`} />
        ))}
      </div>
      <div className="carousel-dots">
        {photos.map((_, index) => (
          <button key={index} className={`carousel-dot ${index === currentIndex ? 'active' : ''}`} onClick={() => goToSlide(index)} aria-label={`Go to photo ${index + 1}`} />
        ))}
      </div>
      <div className="carousel-timer" style={{ width: `${progress}%` }} />
    </div>
  );
}
```

Create `src/components/Carousel.css`:
- 380x380px container, dark bg, rounded corners, shadow
- 300x300px images with crossfade animation
- Arrow buttons: circular, glassmorphism, hover orange
- Dots: 10px circles, active orange with glow
- Timer bar: 4px height, orange gradient

```bash
git add src/components/Carousel.tsx src/components/Carousel.css
git commit -m "feat: add Carousel component with auto-play and manual controls"
```

**SPEC REVIEWER:** Verify 8s auto-play, pause on hover, arrows/dots work, timer bar. Output "OK" or critical error.

**QUALITY REVIEWER:** Check image transitions smooth, timer accurate. Output "OK" or critical error.

---

## TASK 6: Create RoleTabs Component

**IMPLEMENTER:**

Create `src/components/RoleTabs.tsx`:
```tsx
import { useState } from 'react';
import './RoleTabs.css';
export function RoleTabs({ logistician, itSpecialist }: { logistician: { why: string; bring: string; get: string }; itSpecialist: { why: string; bring: string; get: string } }) {
  const [activeRole, setActiveRole] = useState<'logistician' | 'it'>('logistician');
  const currentContent = activeRole === 'logistician' ? logistician : itSpecialist;
  return (
    <div className="role-tabs">
      <div className="role-tabs-header">
        <button className={`role-tab ${activeRole === 'logistician' ? 'active' : ''}`} onClick={() => setActiveRole('logistician')}>Логіст</button>
        <button className={`role-tab ${activeRole === 'it' ? 'active' : ''}`} onClick={() => setActiveRole('it')}>ІТшник</button>
      </div>
      <div className="role-content">
        <div className="role-block"><h3>🎯 Чому ця роль?</h3><p>{currentContent.why}</p></div>
        <div className="role-block"><h3>💪 Що я принесу?</h3><p>{currentContent.bring}</p></div>
        <div className="role-block"><h3>🌟 Що я отримаю?</h3><p>{currentContent.get}</p></div>
      </div>
    </div>
  );
}
```

Create `src/components/RoleTabs.css`:
- Tabs: horizontal, orange active state, shadow on active
- Blocks: dark bg, border, hover effect, max-height 400px with scroll
- Headers: orange color, 18px

```bash
git add src/components/RoleTabs.tsx src/components/RoleTabs.css
git commit -m "feat: add RoleTabs component with expandable content blocks"
```

**SPEC REVIEWER:** Verify 2 tabs, 3 blocks, switching works, scrollable for long text. Output "OK" or critical error.

**QUALITY REVIEWER:** Check tab switching instant, blocks render correctly. Output "OK" or critical error.

---

## TASK 7: Create SocialLinks Component

**IMPLEMENTER:**

Create `src/components/SocialLinks.tsx` (use real SVG icons from design spec):
- GitHub icon
- Telegram icon  
- Gmail icon
- Discord icon

Create `src/components/SocialLinks.css`:
- Horizontal on desktop: flex row
- Grid 2x2 on mobile
- Hover: orange color, lift effect

```bash
git add src/components/SocialLinks.tsx src/components/SocialLinks.css
git commit -m "feat: add SocialLinks component with real icons"
```

**SPEC REVIEWER:** Verify 4 social links, real SVG icons, responsive layout. Output "OK" or critical error.

**QUALITY REVIEWER:** Check links clickable, hover effects work. Output "OK" or critical error.

---

## TASK 8: Create Section Components

**IMPLEMENTER:**

Create `src/sections/AboutSection.tsx` - uses Carousel, 2-column layout, scroll animation
Create `src/sections/RoleSection.tsx` - uses RoleTabs, scroll animation  
Create `src/sections/SummarySection.tsx` - centered summary box, scroll animation
Create `src/sections/FooterSection.tsx` - uses SocialLinks, scroll animation
Create `src/sections/Sections.css` - shared styles, fade-in animation class

Mark content blocks with `{/* USER_CONTENT */}` comments.

```bash
git add src/sections/
git commit -m "feat: add all section components with animations"
```

**SPEC REVIEWER:** Verify 4 sections, all use scroll animation, proper content markers. Output "OK" or critical error.

**QUALITY REVIEWER:** Check animations trigger correctly. Output "OK" or critical error.

---

## TASK 9: Create Main App Component

**IMPLEMENTER:**

Replace `src/App.tsx`:
```tsx
import { Navigation } from './components/Navigation';
import { AboutSection } from './sections/AboutSection';
import { RoleSection } from './sections/RoleSection';
import { SummarySection } from './sections/SummarySection';
import { FooterSection } from './sections/FooterSection';
import './App.css';
function App() {
  return (
    <div className="app">
      <Navigation />
      <main className="main-content">
        <AboutSection />
        <RoleSection />
        <SummarySection />
        <FooterSection />
      </main>
    </div>
  );
}
export default App;
```

Replace `src/App.css`:
```css
.app { min-height: 100vh; }
.main-content { margin-left: 220px; }
@media (max-width: 900px) {
  .main-content { margin-left: 0; padding-top: 60px; }
}
```

```bash
git add src/App.tsx src/App.css
git commit -m "feat: wire up all components in App"
```

**SPEC REVIEWER:** Verify all components imported, layout correct. Output "OK" or critical error.

**QUALITY REVIEWER:** Check app compiles, no console errors. Output "OK" or critical error.

---

## TASK 10: Add Photos and Assets

**IMPLEMENTER:**

```bash
mkdir -p public/photos
```

Add 5 square placeholder images (300x300px minimum) to public/photos/:
- photo1.jpg
- photo2.jpg
- photo3.jpg
- photo4.jpg
- photo5.jpg

```bash
git add public/photos/
git commit -m "chore: add photo placeholders"
```

**SPEC REVIEWER:** Verify 5 photos exist. Output "OK" or critical error.

**QUALITY REVIEWER:** Check images load, no broken links. Output "OK" or critical error.

---

## TASK 11: Test and Build

**IMPLEMENTER:**

```bash
npm run dev
# Test: navigation, carousel, tabs, scroll animations, responsive
npm run build
```

Verify dist/ has index.html and assets/

```bash
git add .
git commit -m "chore: verify build and production ready"
```

**SPEC REVIEWER:** Verify build succeeds, dist/ created. Output "OK" or critical error.

**QUALITY REVIEWER:** Check no build warnings, bundle size reasonable. Output "OK" or critical error.

---

## TASK 12: Create README

**IMPLEMENTER:**

Create `README.md` with:
- Project description
- Quick start commands
- Content editing guide (USER_CONTENT markers)
- Photo setup instructions
- GitHub Pages deployment steps
- Color scheme reference

```bash
git add README.md
git commit -m "docs: add README with deployment instructions"
```

**SPEC REVIEWER:** Verify README has all required sections. Output "OK" or critical error.

**QUALITY REVIEWER:** Check formatting valid. Output "OK" or critical error.

---

## Reviewer Instructions Summary

**Spec Reviewer Rules:**
1. Check file exists
2. Check required functionality present
3. If all good → output "OK"
4. If critical error → describe briefly

**Quality Reviewer Rules:**
1. Check for syntax errors
2. Check for memory leaks
3. If all good → output "OK"  
4. If critical issue → describe briefly

**No verbose explanations. Single word "OK" for approval.**
