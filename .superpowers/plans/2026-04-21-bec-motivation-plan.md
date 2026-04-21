# BEC Motivation Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a single-page React + TypeScript motivation letter website for BEST Engineering Competition 2026 with dark theme, smooth animations, and responsive design.

**Architecture:** React functional components with hooks for state management. Custom hooks for scroll animations and carousel logic. CSS modules for styling. Vite for fast development and production builds.

**Tech Stack:** React 18, TypeScript, Vite, CSS (no external UI libraries)

**Design Spec:** `docs/superpowers/specs/2026-04-21-bec-motivation-design.md`

---

## File Structure

```
bec-motivation/
├── public/
│   └── photos/              # User photos for carousel
│       ├── photo1.jpg
│       ├── photo2.jpg
│       ├── photo3.jpg
│       ├── photo4.jpg
│       └── photo5.jpg
├── src/
│   ├── components/
│   │   ├── Navigation.tsx       # Sidebar + mobile menu
│   │   ├── Carousel.tsx         # Photo carousel with timer
│   │   ├── RoleTabs.tsx         # Logistician/IT tab switcher
│   │   └── SocialLinks.tsx      # Footer social icons
│   ├── sections/
│   │   ├── AboutSection.tsx     # Про мене
│   │   ├── RoleSection.tsx      # Роль (Логіст/ІТшник)
│   │   ├── SummarySection.tsx   # Підсумок
│   │   └── FooterSection.tsx    # Контакти
│   ├── hooks/
│   │   ├── useScrollAnimation.ts
│   │   └── useCarousel.ts
│   ├── styles/
│   │   └── variables.css      # CSS custom properties
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── vite.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## Task 1: Initialize Vite Project

**Files:**
- Create: Entire project structure
- Create: `package.json`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `index.html`

**Prerequisites:** Node.js 18+

- [ ] **Step 1: Create Vite project with React + TypeScript**

```bash
npm create vite@latest bec-motivation -- --template react-ts
cd bec-motivation
```

- [ ] **Step 2: Configure vite.config.ts for GitHub Pages**

Replace `vite.config.ts` with:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/bec-motivation/',  // Adjust for your repo name
  build: {
    outDir: 'dist',
  },
})
```

- [ ] **Step 3: Install dependencies**

```bash
npm install
npm install -D @types/node
```

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "chore: initialize vite react typescript project"
```

---

## Task 2: Setup Global Styles and CSS Variables

**Files:**
- Create: `src/styles/variables.css`
- Modify: `src/index.css`

- [ ] **Step 1: Create CSS variables file**

Create `src/styles/variables.css`:

```css
:root {
  /* Colors */
  --color-bg: #0a0a0a;
  --color-bg-secondary: #121212;
  --color-card: #1a1a1a;
  --color-card-hover: #222;
  --color-accent: #fa8112;
  --color-accent-glow: rgba(250, 129, 18, 0.3);
  --color-border: #252525;
  --color-border-hover: #2a2a2a;
  
  /* Text */
  --color-text-primary: #ffffff;
  --color-text-secondary: #a0a0a0;
  --color-text-muted: #6b6b6b;
  
  /* Typography */
  --font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
  
  /* Spacing */
  --spacing-xs: 8px;
  --spacing-sm: 12px;
  --spacing-md: 20px;
  --spacing-lg: 30px;
  --spacing-xl: 50px;
  --spacing-xxl: 60px;
  
  /* Transitions */
  --transition-fast: 0.2s ease;
  --transition-normal: 0.3s ease;
  --transition-slow: 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  
  /* Border radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
}

/* Responsive breakpoints */
@media (max-width: 900px) {
  :root {
    --spacing-xl: 30px;
    --spacing-xxl: 40px;
  }
}
```

- [ ] **Step 2: Update index.css with base styles**

Replace `src/index.css`:

```css
@import './styles/variables.css';

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-family);
  background: linear-gradient(145deg, var(--color-bg) 0%, var(--color-bg-secondary) 100%);
  color: var(--color-text-primary);
  min-height: 100vh;
  line-height: 1.6;
}

/* Scrollbar styling */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: var(--color-bg);
}

::-webkit-scrollbar-thumb {
  background: var(--color-border);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--color-accent);
}

/* Selection */
::selection {
  background: var(--color-accent);
  color: var(--color-bg);
}
```

- [ ] **Step 3: Commit**

```bash
git add src/styles/variables.css src/index.css
git commit -m "feat: add global styles and css variables"
```

---

## Task 3: Create Custom Hooks

**Files:**
- Create: `src/hooks/useScrollAnimation.ts`
- Create: `src/hooks/useCarousel.ts`

- [ ] **Step 1: Create useScrollAnimation hook**

Create `src/hooks/useScrollAnimation.ts`:

```typescript
import { useEffect, useRef, useState } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  triggerOnce?: boolean;
}

export function useScrollAnimation<T extends HTMLElement>(
  options: UseScrollAnimationOptions = {}
) {
  const { threshold = 0.2, triggerOnce = true } = options;
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, triggerOnce]);

  return { ref, isVisible };
}
```

- [ ] **Step 2: Create useCarousel hook**

Create `src/hooks/useCarousel.ts`:

```typescript
import { useState, useEffect, useCallback } from 'react';

interface UseCarouselOptions {
  totalSlides: number;
  autoPlayInterval?: number;
}

export function useCarousel({ totalSlides, autoPlayInterval = 8000 }: UseCarouselOptions) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
    setProgress(0);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
    setProgress(0);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    setProgress(0);
  }, [totalSlides]);

  // Auto-play with progress bar
  useEffect(() => {
    if (isPaused) return;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + (100 / (autoPlayInterval / 100));
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, [isPaused, autoPlayInterval, nextSlide]);

  const pause = useCallback(() => setIsPaused(true), []);
  const resume = useCallback(() => setIsPaused(false), []);

  return {
    currentIndex,
    progress,
    goToSlide,
    nextSlide,
    prevSlide,
    pause,
    resume,
  };
}
```

- [ ] **Step 3: Commit**

```bash
git add src/hooks/
git commit -m "feat: add useScrollAnimation and useCarousel hooks"
```

---

## Task 4: Create Navigation Component

**Files:**
- Create: `src/components/Navigation.tsx`
- Create: `src/components/Navigation.css`

- [ ] **Step 1: Create Navigation component**

Create `src/components/Navigation.tsx`:

```typescript
import { useState, useEffect } from 'react';
import './Navigation.css';

interface NavItem {
  id: string;
  label: string;
}

const navItems: NavItem[] = [
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
      const offset = 60;
      const top = element.offsetTop - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <nav className="navigation-desktop">
        <div className="nav-logo">BEC 2026</div>
        <div className="nav-items">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => scrollToSection(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Mobile Header */}
      <header className="navigation-mobile">
        <div className="mobile-logo">BEC 2026</div>
        <button
          className="burger-menu"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
            <button
              className="mobile-close"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              ×
            </button>
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`mobile-nav-item ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => scrollToSection(item.id)}
              >
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

- [ ] **Step 2: Create Navigation styles**

Create `src/components/Navigation.css`:

```css
/* Desktop Navigation */
.navigation-desktop {
  position: fixed;
  left: 0;
  top: 0;
  width: 220px;
  height: 100vh;
  background: linear-gradient(180deg, #151515 0%, #1a1a1a 100%);
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #252525;
  z-index: 100;
}

.nav-logo {
  color: #fa8112;
  font-size: 28px;
  font-weight: 800;
  margin-bottom: 40px;
  letter-spacing: -1px;
  text-shadow: 0 0 20px rgba(250, 129, 18, 0.3);
}

.nav-items {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.nav-item {
  color: #6b6b6b;
  padding: 12px 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  background: transparent;
  border: none;
  text-align: left;
}

.nav-item:hover {
  color: #fa8112;
  background: rgba(250, 129, 18, 0.08);
}

.nav-item.active {
  color: #fa8112;
  background: linear-gradient(90deg, rgba(250, 129, 18, 0.15) 0%, transparent 100%);
  border-left: 3px solid #fa8112;
  margin-left: -3px;
}

/* Mobile Navigation */
.navigation-mobile {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: linear-gradient(180deg, #1a1a1a 0%, #151515 100%);
  padding: 20px;
  border-bottom: 1px solid #252525;
  z-index: 100;
  justify-content: space-between;
  align-items: center;
}

.mobile-logo {
  color: #fa8112;
  font-size: 22px;
  font-weight: 800;
  letter-spacing: -1px;
}

.burger-menu {
  width: 24px;
  height: 18px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  background: transparent;
  border: none;
  padding: 0;
}

.burger-menu span {
  height: 2px;
  background: #fa8112;
  border-radius: 2px;
}

.mobile-menu-overlay {
  display: none;
}

/* Responsive */
@media (max-width: 900px) {
  .navigation-desktop {
    display: none;
  }

  .navigation-mobile {
    display: flex;
  }

  .mobile-menu-overlay {
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(10, 10, 10, 0.98);
    z-index: 200;
    justify-content: center;
    align-items: center;
  }

  .mobile-menu {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 40px;
    position: relative;
  }

  .mobile-close {
    position: absolute;
    top: -60px;
    right: 0;
    color: #fa8112;
    font-size: 40px;
    background: transparent;
    border: none;
    cursor: pointer;
  }

  .mobile-nav-item {
    color: #fff;
    font-size: 28px;
    font-weight: 600;
    background: transparent;
    border: none;
    cursor: pointer;
    text-align: center;
    padding: 10px;
  }

  .mobile-nav-item.active {
    color: #fa8112;
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Navigation.tsx src/components/Navigation.css
git commit -m "feat: add Navigation component with desktop and mobile variants"
```

---

## Task 5: Create Carousel Component

**Files:**
- Create: `src/components/Carousel.tsx`
- Create: `src/components/Carousel.css`

- [ ] **Step 1: Create Carousel component**

Create `src/components/Carousel.tsx`:

```typescript
import { useCarousel } from '../hooks/useCarousel';
import './Carousel.css';

interface CarouselProps {
  photos: string[];
  altPrefix?: string;
}

export function Carousel({ photos, altPrefix = 'Photo' }: CarouselProps) {
  const {
    currentIndex,
    progress,
    goToSlide,
    nextSlide,
    prevSlide,
    pause,
    resume,
  } = useCarousel({ totalSlides: photos.length, autoPlayInterval: 8000 });

  return (
    <div
      className="carousel"
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      <div className="carousel-arrows">
        <button
          className="carousel-arrow"
          onClick={prevSlide}
          aria-label="Previous photo"
        >
          ◀
        </button>
        <button
          className="carousel-arrow"
          onClick={nextSlide}
          aria-label="Next photo"
        >
          ▶
        </button>
      </div>

      <div className="carousel-images">
        {photos.map((photo, index) => (
          <img
            key={index}
            src={photo}
            alt={`${altPrefix} ${index + 1}`}
            className={`carousel-image ${index === currentIndex ? 'active' : ''}`}
          />
        ))}
      </div>

      <div className="carousel-dots">
        {photos.map((_, index) => (
          <button
            key={index}
            className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to photo ${index + 1}`}
          />
        ))}
      </div>

      <div
        className="carousel-timer"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
```

- [ ] **Step 2: Create Carousel styles**

Create `src/components/Carousel.css`:

```css
.carousel {
  width: 380px;
  height: 380px;
  background: linear-gradient(145deg, #1a1a1a 0%, #222 100%);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow:
    0 25px 50px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(250, 129, 18, 0.15);
  overflow: hidden;
}

.carousel-images {
  width: 300px;
  height: 300px;
  position: relative;
}

.carousel-image {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
}

.carousel-image.active {
  opacity: 1;
}

.carousel-arrows {
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  box-sizing: border-box;
  z-index: 10;
}

.carousel-arrow {
  width: 44px;
  height: 44px;
  background: rgba(10, 10, 10, 0.9);
  border: 1px solid rgba(250, 129, 18, 0.4);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fa8112;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.carousel-arrow:hover {
  background: #fa8112;
  color: #0a0a0a;
  transform: scale(1.1);
  box-shadow: 0 0 20px rgba(250, 129, 18, 0.5);
}

.carousel-dots {
  position: absolute;
  bottom: 20px;
  display: flex;
  gap: 12px;
  z-index: 10;
}

.carousel-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  cursor: pointer;
  transition: all 0.3s;
}

.carousel-dot.active {
  background: #fa8112;
  box-shadow: 0 0 12px rgba(250, 129, 18, 0.6);
}

.carousel-timer {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 4px;
  background: linear-gradient(90deg, #fa8112, #ff9a3c);
  transition: width 0.1s linear;
}

/* Mobile */
@media (max-width: 900px) {
  .carousel {
    width: 100%;
    max-width: 320px;
    height: 320px;
    margin: 0 auto;
  }

  .carousel-images {
    width: 260px;
    height: 260px;
  }

  .carousel-arrow {
    width: 36px;
    height: 36px;
    font-size: 12px;
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Carousel.tsx src/components/Carousel.css
git commit -m "feat: add Carousel component with auto-play and manual controls"
```

---

## Task 6: Create RoleTabs Component

**Files:**
- Create: `src/components/RoleTabs.tsx`
- Create: `src/components/RoleTabs.css`

- [ ] **Step 1: Create RoleTabs component**

Create `src/components/RoleTabs.tsx`:

```typescript
import { useState } from 'react';
import './RoleTabs.css';

interface RoleContent {
  why: string;
  bring: string;
  get: string;
}

interface RoleTabsProps {
  logistician: RoleContent;
  itSpecialist: RoleContent;
}

type Role = 'logistician' | 'it';

export function RoleTabs({ logistician, itSpecialist }: RoleTabsProps) {
  const [activeRole, setActiveRole] = useState<Role>('logistician');

  const currentContent = activeRole === 'logistician' ? logistician : itSpecialist;

  return (
    <div className="role-tabs">
      <div className="role-tabs-header">
        <button
          className={`role-tab ${activeRole === 'logistician' ? 'active' : ''}`}
          onClick={() => setActiveRole('logistician')}
        >
          Логіст
        </button>
        <button
          className={`role-tab ${activeRole === 'it' ? 'active' : ''}`}
          onClick={() => setActiveRole('it')}
        >
          ІТшник
        </button>
      </div>

      <div className="role-content">
        <div className="role-block">
          <h3>🎯 Чому ця роль?</h3>
          <p>{currentContent.why}</p>
        </div>

        <div className="role-block">
          <h3>💪 Що я принесу?</h3>
          <p>{currentContent.bring}</p>
        </div>

        <div className="role-block">
          <h3>🌟 Що я отримаю?</h3>
          <p>{currentContent.get}</p>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create RoleTabs styles**

Create `src/components/RoleTabs.css`:

```css
.role-tabs {
  width: 100%;
}

.role-tabs-header {
  display: flex;
  gap: 20px;
  margin-bottom: 40px;
  border-bottom: 1px solid #2a2a2a;
  padding-bottom: 20px;
}

.role-tab {
  padding: 12px 30px;
  border: 2px solid #2a2a2a;
  border-radius: 8px;
  color: #6b6b6b;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  background: transparent;
}

.role-tab:hover {
  border-color: rgba(250, 129, 18, 0.5);
  color: #fa8112;
}

.role-tab.active {
  background: linear-gradient(145deg, rgba(250, 129, 18, 0.2) 0%, rgba(250, 129, 18, 0.1) 100%);
  border-color: #fa8112;
  color: #fa8112;
  box-shadow: 0 0 20px rgba(250, 129, 18, 0.2);
}

.role-content {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.role-block {
  background: linear-gradient(145deg, #1a1a1a 0%, #222 100%);
  padding: 30px 35px;
  border-radius: 12px;
  border: 1px solid #2a2a2a;
  transition: all 0.3s;
  max-height: 400px;
  overflow-y: auto;
}

.role-block:hover {
  border-color: rgba(250, 129, 18, 0.3);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.role-block h3 {
  color: #fa8112;
  font-size: 18px;
  margin-bottom: 15px;
  font-weight: 600;
}

.role-block p {
  color: #888;
  font-size: 15px;
  line-height: 1.8;
}

/* Scrollbar for long content */
.role-block::-webkit-scrollbar {
  width: 6px;
}

.role-block::-webkit-scrollbar-track {
  background: transparent;
}

.role-block::-webkit-scrollbar-thumb {
  background: #3a3a3a;
  border-radius: 3px;
}

.role-block::-webkit-scrollbar-thumb:hover {
  background: #fa8112;
}

/* Mobile */
@media (max-width: 900px) {
  .role-tabs-header {
    gap: 10px;
    margin-bottom: 25px;
  }

  .role-tab {
    flex: 1;
    padding: 12px;
    font-size: 14px;
  }

  .role-block {
    padding: 20px;
    max-height: none; /* Allow full expansion on mobile */
  }

  .role-block h3 {
    font-size: 16px;
  }

  .role-block p {
    font-size: 13px;
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/RoleTabs.tsx src/components/RoleTabs.css
git commit -m "feat: add RoleTabs component with expandable content blocks"
```

---

## Task 7: Create SocialLinks Component

**Files:**
- Create: `src/components/SocialLinks.tsx`
- Create: `src/components/SocialLinks.css`

- [ ] **Step 1: Create SocialLinks component**

Create `src/components/SocialLinks.tsx`:

```typescript
import './SocialLinks.css';

interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
}

const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/YOUR_USERNAME',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
  },
  {
    name: 'Telegram',
    url: 'https://t.me/YOUR_USERNAME',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.004.465.027a.473.473 0 0 1 .314.17c.08.097.109 1.104.109 1.104s-.041 2.11-.047 2.377c-.01.267-.006.533-.006.8c0 .267.015.267.015.267s.023.267.023.533c0 .267-.015.533-.015.533s-.015.267-.015.533c0 .267.015.533.015.533s.015.267.015.533c0 .267-.015.533-.015.533s-.015.267-.015.533c0 .267.015.533.015.533s.015.267.015.533c0 .267-.015.533-.015.533s-.015.267-.015.533c0 .267.015.533.015.533s.015.267.015.533c0 .267-.015.533-.015.533s-.015.267-.015.533c0 .267.015.533.015.533s.015.267.015.533c0 .267-.015.533-.015.533l-.015.267-.015.533c-.003.04-.003.08 0 .12l.015.267.015.533c0 .004 0 .007-.015.01a.47.47 0 0 1-.147.014c-.2.006-.4-.014-.6-.03a.475.475 0 0 1-.293-.186c-.16-.187-.267-.4-.347-.626c-.16-.426-.24-.867-.24-1.314c0-.267.015-.533.015-.533s.015-.267.015-.533c0-.267-.015-.533-.015-.533s-.015-.267-.015-.533c0-.267.015-.533.015-.533s.015-.267.015-.533c0-.267-.015-.533-.015-.533s-.015-.267-.015-.533c0-.267.015-.533.015-.533s.015-.267.015-.533c0-.267-.015-.533-.015-.533s-.015-.267-.015-.533c0-.267.015-.533.015-.533s.015-.267.015-.533c0-.267-.015-.533-.015-.533s-.015-.267-.015-.533c0-.267.015-.533.015-.533s.015-.267.015-.533c0-.267-.015-.533-.015-.533s-.015-.267-.015-.533c0-.267.015-.533.015-.533s.015-.267.015-.533c0-.267-.015-.533-.015-.533s-.015-.267-.015-.533c0-.267.015-.533.015-.533s.015-.267.015-.533c0-.267-.015-.533-.015-.533s-.015-.267-.015-.533c0-.267.015-.533.015-.533s.015-.267.015-.533c0-.267-.015-.533-.015-.533l-.015-.267v-.533c0-.267.015-.267.015-.267s.015-.267.015-.533c0-.267-.015-.533-.015-.533l-.015-.267v-.533c0-.267.015-.267.015-.267s.015-.267.015-.533c0-.267-.015-.533-.015-.533l-.015-.267v-.533c0-.267.015-.267.015-.267s.015-.267.015-.533c0-.267-.015-.533-.015-.533l-.015-.267v-.533c0-.267.015-.267.015-.267s.015-.267.015-.533c0-.267-.015-.533-.015-.533l-.015-.267v-.533c0-.267.015-.267.015-.267s.015-.267.015-.533c0-.267-.015-.533-.015-.533l-.015-.267v-.533c0-.267.015-.267.015-.267s.015-.267.015-.533c0-.267-.015-.533-.015-.533l-.015-.267v-.533c0-.267.015-.267.015-.267s.015-.267.015-.533c0-.267-.015-.533-.015-.533l-.015-.267v-.533c0-.267.015-.267.015-.267s.015-.267.015-.533c0-.267-.015-.533-.015-.533s-.02-.266-.053-.532c-.04-.267-.08-.533-.12-.8a.474.474 0 0 1 .347-.546c.253-.08.506-.107.76-.133a.473.473 0 0 1 .413.266c.053.133.053.267.053.267v2.133c0 .267-.015.267-.015.267s-.015.267-.015.533c0 .267.015.533.015.533s.015.267.015.533c0 .267-.015.533-.015.533s-.015.267-.015.533c0 .267.015.533.015.533s.015.267.015.533c0 .267-.015.533-.015.533l-.015.267v.533c0 .267.015.267.015.267s.015.267.015.533c0 .267-.015.533-.015.533l-.015.267v.533c0 .267.015.267.015.267s.015.267.015.533c0 .267-.015.533-.015.533l-.015.267v.533c0 .267.015.267.015.267s.015.267.015.533c0 .267-.015.533-.015.533l-.015.267v.533c0 .267.015.267.015.267s.015.267.015.533c0 .267-.015.533-.015.533s-.015.267-.015.533c0 .267.015.533.015.533s.015.267.015.533c0 .267-.015.533-.015.533l-.015.267v.533c0 .267.015.267.015.267s.015.267.015.533c0 .267-.015.533-.015.533s-.015.267-.015.533c0 .267.015.533.015.533s.015.267.015.533c0 .267-.015.533-.015.533l-.015.267v.533c0 .267.015.267.015.267s.015.267.015.533c0 .267-.015.533-.015.533s-.015.267-.015.533c0 .267.015.533.015.533s.015.267.015.533c0 .267-.015.533-.015.533z"/>
      </svg>
    ),
  },
  {
    name: 'Gmail',
    url: 'mailto:your.email@gmail.com',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h.545L12 10.91l9.818-7.09h.546c.904 0 1.636.732 1.636 1.636z"/>
      </svg>
    ),
  },
  {
    name: 'Discord',
    url: 'https://discord.gg/YOUR_INVITE',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106a13.71 13.71 0 0 1-1.872-.892.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c1.942.925 4.048 1.427 6.194 1.427c2.146 0 4.251-.502 6.194-1.427a.074.074 0 0 1 .078.01c.12.098.246.198.372.292a.077.077 0 0 1-.006.127a12.3 12.3 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.994a.076.076 0 0 0 .084.028a19.84 19.84 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
      </svg>
    ),
  },
];

export function SocialLinks() {
  return (
    <div className="social-links">
      {socialLinks.map((link) => (
        <a
          key={link.name}
          href={link.url}
          className="social-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="social-icon">{link.icon}</span>
          <span className="social-name">{link.name}</span>
        </a>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Create SocialLinks styles**

Create `src/components/SocialLinks.css`:

```css
.social-links {
  display: flex;
  gap: 30px;
  justify-content: center;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #6b6b6b;
  text-decoration: none;
  transition: all 0.3s;
  padding: 10px 20px;
  border-radius: 8px;
}

.social-link:hover {
  color: #fa8112;
  background: rgba(250, 129, 18, 0.1);
  transform: translateY(-3px);
}

.social-icon {
  width: 24px;
  height: 24px;
}

.social-icon svg {
  width: 100%;
  height: 100%;
  fill: currentColor;
}

.social-name {
  font-size: 15px;
  font-weight: 500;
}

/* Mobile */
@media (max-width: 900px) {
  .social-links {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  .social-link {
    flex-direction: column;
    padding: 15px;
    gap: 8px;
  }

  .social-icon {
    width: 28px;
    height: 28px;
  }

  .social-name {
    font-size: 13px;
  }
}
```

- [ ] **Step 3: Update URLs in component**

Replace `YOUR_USERNAME` and email placeholders with actual values in the component.

- [ ] **Step 4: Commit**

```bash
git add src/components/SocialLinks.tsx src/components/SocialLinks.css
git commit -m "feat: add SocialLinks component with real icons"
```

---

## Task 8: Create Section Components

**Files:**
- Create: `src/sections/AboutSection.tsx`
- Create: `src/sections/RoleSection.tsx`
- Create: `src/sections/SummarySection.tsx`
- Create: `src/sections/FooterSection.tsx`
- Create: `src/sections/Sections.css`

- [ ] **Step 1: Create AboutSection**

Create `src/sections/AboutSection.tsx`:

```typescript
import { Carousel } from '../components/Carousel';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import './Sections.css';

const photos = [
  '/photos/photo1.jpg',
  '/photos/photo2.jpg',
  '/photos/photo3.jpg',
  '/photos/photo4.jpg',
  '/photos/photo5.jpg',
];

export function AboutSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <section id="about" className="section" ref={ref}>
      <div className={`section-content ${isVisible ? 'visible' : ''}`}>
        <div className="two-column">
          <div className="text-column">
            <div className="section-label">Welcome</div>
            <h2 className="section-title">Про мене</h2>
            <p className="section-text">
              <strong>{/* USER_CONTENT: Your bio introduction */}</strong>
              <br /><br />
              Привіт! Я — [Ім'я], ентузіаст інженерії та технологій. Моя пристрасть до організації подій та розробки IT-рішень привела мене до BEST Engineering Competition 2026.
            </p>
            <p className="section-text" style={{ marginTop: '20px' }}>
              За час навчання я реалізував кілька власних проєктів, від веб-додатків до систем автоматизації. Але найбільше задоволення мені приносить робота в команді та вирішення складних логістичних завдань.
              {/* USER_CONTENT: Additional bio text */}
            </p>
          </div>
          <div className="photo-column">
            <Carousel photos={photos} altPrefix="Photo" />
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create RoleSection**

Create `src/sections/RoleSection.tsx`:

```typescript
import { RoleTabs } from '../components/RoleTabs';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import './Sections.css';

const roleContent = {
  logistician: {
    why: `Логістика — це серце будь-якого івенту. Мені подобається бачити, як безліч деталей складаються в єдиний механізм. Організація процесів, робота з постачальниками, координація команд — це те, що дає мені енергію. У BEST Engineering Competition я бачу можливість застосувати свої навички в масштабному міжнародному проєкті.

    {/* USER_CONTENT: Extended text for "Why this role" as Logistician */}`,
    bring: `• Досвід організації 10+ технічних івентів різного масштабу
    • Навички роботи з постачальниками та переговорів
    • Вміння працювати під тиском і адаптуватися до змін
    • Знання базових IT-інструментів для оптимізації процесів
    • Креативний підхід до вирішення проблем

    {/* USER_CONTENT: Extended text for "What I bring" as Logistician */}`,
    get: `BEST — це не просто конкурс, це платформа для зростання. Я хочу отримати міжнародний досвід роботи в команді, познайомитися з однодумцями з усієї Європи, і навчитися організовувати події світового рівня. Це крок до моєї мети — створювати інноваційні проєкти, які змінюють світ.

    {/* USER_CONTENT: Extended text for "What I get" as Logistician */}`,
  },
  itSpecialist: {
    why: `IT — це моє покликання. Розробка рішень, які автоматизують процеси та покращують досвід користувачів — це те, що мене захоплює. У BEST Engineering Competition я бачу можливість застосувати свої технічні навички для створення найкращого можливого досвіду для учасників.

    {/* USER_CONTENT: Extended text for "Why this role" as IT Specialist */}`,
    bring: `• Досвід розробки веб-додатків на React та TypeScript
    • Знання баз даних та API інтеграцій
    • Розуміння UX/UI принципів
    • Вміння швидко навчатися новим технологіям
    • Досвід роботи в Agile командах

    {/* USER_CONTENT: Extended text for "What I bring" as IT Specialist */}`,
    get: `BEST — це можливість працювати з передовими технологіями в міжнародному середовищі. Я хочу отримати досвід розробки реальних проєктів, навчитися працювати в розподілених командах, і створити щось круте разом з однодумцями.

    {/* USER_CONTENT: Extended text for "What I get" as IT Specialist */}`,
  },
};

export function RoleSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <section id="role" className="section" ref={ref}>
      <div className={`section-content ${isVisible ? 'visible' : ''}`}>
        <div className="section-label">Оберіть роль</div>
        <h2 className="section-title">Моя позиція</h2>
        <RoleTabs
          logistician={roleContent.logistician}
          itSpecialist={roleContent.itSpecialist}
        />
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create SummarySection**

Create `src/sections/SummarySection.tsx`:

```typescript
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import './Sections.css';

export function SummarySection() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <section id="summary" className="section" ref={ref}>
      <div className={`section-content ${isVisible ? 'visible' : ''}`}>
        <div className="section-label">Для організаторів</div>
        <h2 className="section-title">Підсумок</h2>
        <div className="summary-box">
          <p className="section-text">
            <strong>Шановний Main Organizer!</strong>
            <br /><br />
            Якщо ви шукаєте людину, яка працюватиме 24/7, забуде про сон, але не забуде замовити каву для команди — я тут 🎯
            <br /><br />
            Мої навички: можу одночасно вирішувати 5 кризових ситуацій і зберігати спокійну посмішку. Моя суперсила — перетворювати хаос на систему (або хоча б упорядкований хаос).
            <br /><br />
            Але серйозно: я готовий вкласти всю свою енергію в BEST Engineering Competition 2026. Це не просто "ще одна заявка" — це можливість стати частиною чогось значущого. Давайте разом зробимо цей івент незабутнім! 🚀
            {/* USER_CONTENT: Additional personal message to MO */}
          </p>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Create FooterSection**

Create `src/sections/FooterSection.tsx`:

```typescript
import { SocialLinks } from '../components/SocialLinks';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import './Sections.css';

export function FooterSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <footer id="contacts" className="section footer-section" ref={ref}>
      <div className={`section-content ${isVisible ? 'visible' : ''}`} style={{ textAlign: 'center' }}>
        <div className="footer-label">Зв'язок</div>
        <h2 className="section-title" style={{ fontSize: '32px' }}>Контакти</h2>
        <SocialLinks />
      </div>
    </footer>
  );
}
```

- [ ] **Step 5: Create shared Sections styles**

Create `src/sections/Sections.css`:

```css
/* Section base styles */
.section {
  min-height: 100vh;
  padding: 80px 60px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #1f1f1f;
}

.section-content {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1),
              transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.section-content.visible {
  opacity: 1;
  transform: translateY(0);
}

.section-label {
  color: #fa8112;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 15px;
}

.section-title {
  color: #ffffff;
  font-size: 42px;
  font-weight: 700;
  margin-bottom: 25px;
  line-height: 1.1;
}

.section-text {
  color: #a0a0a0;
  line-height: 1.8;
  font-size: 15px;
}

.section-text strong {
  color: #e0e0e0;
}

/* Two column layout */
.two-column {
  display: flex;
  gap: 80px;
  align-items: center;
}

.text-column {
  flex: 1;
}

.photo-column {
  width: 420px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
}

/* Summary box */
.summary-box {
  background: linear-gradient(145deg, rgba(250, 129, 18, 0.08) 0%, rgba(250, 129, 18, 0.03) 100%);
  border: 1px solid rgba(250, 129, 18, 0.2);
  border-radius: 16px;
  padding: 50px;
}

.summary-box .section-text {
  color: #b0b0b0;
  font-size: 16px;
  line-height: 1.9;
}

/* Footer section */
.footer-section {
  min-height: auto;
  padding: 60px;
}

.footer-label {
  color: #fa8112;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 20px;
}

/* Responsive */
@media (max-width: 900px) {
  .section {
    padding: 40px 25px;
    min-height: auto;
  }

  .two-column {
    flex-direction: column;
    gap: 40px;
  }

  .photo-column {
    width: 100%;
    order: -1;
  }

  .section-title {
    font-size: 28px;
  }

  .section-text {
    font-size: 14px;
  }

  .summary-box {
    padding: 25px;
  }

  .footer-section {
    padding: 40px 25px;
  }
}
```

- [ ] **Step 6: Commit**

```bash
git add src/sections/
git commit -m "feat: add all section components with animations"
```

---

## Task 9: Create Main App Component

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/App.css` (delete if empty)

- [ ] **Step 1: Update App.tsx**

Replace `src/App.tsx`:

```typescript
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

- [ ] **Step 2: Create App styles**

Replace `src/App.css`:

```css
.app {
  min-height: 100vh;
}

.main-content {
  margin-left: 220px; /* Width of sidebar */
}

/* Mobile */
@media (max-width: 900px) {
  .main-content {
    margin-left: 0;
    padding-top: 60px; /* Height of mobile header */
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add src/App.tsx src/App.css
git commit -m "feat: wire up all components in App"
```

---

## Task 10: Add Photos and Assets

**Files:**
- Create: `public/photos/` directory
- Add: 5 placeholder photos

- [ ] **Step 1: Create photos directory**

```bash
mkdir -p public/photos
```

- [ ] **Step 2: Add placeholder photos**

Add 5 photos to `public/photos/`:
- photo1.jpg
- photo2.jpg
- photo3.jpg
- photo4.jpg
- photo5.jpg

(These can be any square images, user will replace with actual photos)

- [ ] **Step 3: Commit**

```bash
git add public/photos/
git commit -m "chore: add photo placeholders"
```

---

## Task 11: Test and Build

**Files:**
- Verify: All files compile

- [ ] **Step 1: Run dev server and verify**

```bash
npm run dev
```

Open http://localhost:5173 and verify:
- [ ] Navigation works (desktop sidebar + mobile burger)
- [ ] Smooth scroll to sections
- [ ] Carousel auto-plays every 8s
- [ ] Carousel manual controls work
- [ ] Role tabs switch correctly
- [ ] Scroll animations trigger
- [ ] Responsive layout at different widths

- [ ] **Step 2: Build for production**

```bash
npm run build
```

- [ ] **Step 3: Verify build output**

```bash
dir dist\
```

Should contain:
- index.html
- assets/ folder with bundled JS/CSS

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "chore: verify build and production ready"
```

---

## Task 12: Create README with Deployment Instructions

**Files:**
- Create: `README.md`

- [ ] **Step 1: Create comprehensive README**

Create `README.md`:

```markdown
# BEC Motivation Website

Мотиваційний лист для BEST Engineering Competition 2026

## 🚀 Швидкий старт

```bash
# Встановлення залежностей
npm install

# Запуск dev сервера
npm run dev

# Production build
npm run build
```

## 📝 Редагування контенту

Всі редаговані блоки позначені коментарями `<!-- USER_CONTENT -->`:

1. **src/sections/AboutSection.tsx** - Біографія та фото
2. **src/sections/RoleSection.tsx** - Текст для Логіста та ІТшника
3. **src/sections/SummarySection.tsx** - Звернення до MO
4. **src/components/SocialLinks.tsx** - Посилання на соцмережі

## 🖼️ Фото

Додайте свої фото (квадратні, 1:1) в `public/photos/`:
- photo1.jpg
- photo2.jpg
- photo3.jpg
- photo4.jpg
- photo5.jpg

## 🌐 Деплой на GitHub Pages

1. Створіть репозиторій на GitHub
2. Оновіть `vite.config.ts` - замініть `/bec-motivation/` на назву вашого репозиторію
3. Встановіть `gh-pages`:
   ```bash
   npm install -D gh-pages
   ```
4. Додайте scripts в `package.json`:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
5. Деплой:
   ```bash
   npm run deploy
   ```

## 🎨 Кольорова схема

- **Background:** #0a0a0a
- **Accent:** #fa8112 (помаранчевий)
- **Text:** #ffffff / #a0a0a0

## 📱 Адаптивність

- Desktop: ≥900px (sidebar navigation)
- Mobile: <900px (burger menu)

## ⚡ Технології

- React 18
- TypeScript
- Vite
- CSS Custom Properties
```

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs: add README with deployment instructions"
```

---

## Verification Checklist

**Before declaring complete:**

- [ ] All components render without errors
- [ ] Navigation scrolls smoothly to sections
- [ ] Carousel auto-rotates every 8 seconds
- [ ] Carousel manual controls (arrows/dots) work
- [ ] Timer bar shows progress
- [ ] Role tabs switch content correctly
- [ ] Scroll animations fade in elements
- [ ] Responsive design works at all breakpoints
- [ ] Mobile menu opens/closes correctly
- [ ] Social links have correct URLs
- [ ] All USER_CONTENT comments are present
- [ ] Production build succeeds
- [ ] README has clear deployment instructions

---

## Spec Coverage Check

**From design spec - all covered:**
- ✅ Fixed sidebar navigation (desktop)
- ✅ Burger menu (mobile)
- ✅ Photo carousel with 5 images
- ✅ Auto-rotation 8 seconds
- ✅ Manual controls (arrows + dots)
- ✅ Timer bar
- ✅ Tabbed role section (Logistician/IT)
- ✅ Expandable text blocks for long content
- ✅ Smooth scroll navigation
- ✅ Fade-in scroll animations
- ✅ Dark theme with orange accent
- ✅ Responsive at all breakpoints
- ✅ GitHub Pages ready
