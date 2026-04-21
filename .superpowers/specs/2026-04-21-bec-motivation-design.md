# BEC Motivation Website - Design Document

**Date:** 2026-04-21  
**Purpose:** Single-page motivation letter for BEST Engineering Competition 2026  
**Target Roles:** Logistician (Логіст) or IT Specialist (ІТшник)

---

## 1. Project Overview

A single-page React + TypeScript application presenting a motivational letter for BEST Engineering Competition 2026. The website features smooth animations, responsive design, and a modern dark theme with orange accent.

### Core Features
- Fixed sidebar navigation (desktop) / Burger menu (mobile)
- Photo carousel with 5 images and auto-rotation (8 seconds)
- Separate sections for Logistician and IT Specialist roles
- Smooth scroll navigation and fade-in animations
- Dark theme with orange (#fa8112) accent

---

## 2. Visual Design

### Color Palette

| Role | Color | Usage |
|------|-------|-------|
| **Background Primary** | `#0a0a0a` | Main page background |
| **Background Secondary** | `#1a1a1a` | Cards, sidebar, carousels |
| **Background Gradient** | `linear-gradient(145deg, #0a0a0a 0%, #121212 100%)` | Page depth |
| **Accent** | `#fa8112` | Links, buttons, active states, logo |
| **Accent Glow** | `rgba(250, 129, 18, 0.3)` | Shadows, hover effects |
| **Text Primary** | `#ffffff` | Headings |
| **Text Secondary** | `#a0a0a0` | Body text, descriptions |
| **Text Muted** | `#6b6b6b` | Navigation inactive states |
| **Border** | `#252525` / `#2a2a2a` | Subtle borders |

### Typography

- **Font Family:** `'Segoe UI', system-ui, sans-serif`
- **Logo:** 28px, weight 800, letter-spacing -1px, orange with glow shadow
- **Section Label:** 11px, uppercase, letter-spacing 2px, orange
- **Section Title:** 42px (desktop), 28px (mobile), weight 700
- **Body Text:** 15px, line-height 1.8, secondary gray
- **Navigation:** 14px, weight 500

### Spacing & Layout

- **Page Padding:** 50px desktop, 25px mobile
- **Section Gap:** 50px between text and photo sections
- **Card Border Radius:** 16px for main cards, 12px for smaller elements
- **Button Border Radius:** 4px
- **Sidebar Width:** 220px
- **Max Content Width:** 400px for text sections

---

## 3. Component Structure

### Navigation (Fixed)

**Desktop (≥900px):**
- Fixed sidebar on the left
- Logo "BEC 2026" at top
- Navigation items stacked vertically
- Active item: orange text + left border + subtle gradient background
- Hover: orange text + subtle orange background

**Mobile (<900px):**
- Fixed header at top with logo + hamburger menu
- Full-screen overlay menu when hamburger clicked
- Semi-transparent dark background with blur

**Navigation Items:**
1. Про мене (About Me)
2. Логіст (Logistician)
3. ІТшник (IT Specialist)
4. Підсумок (Summary for MO)
5. Контакти (Contacts)

### Section 1: About Me (Про мене)

**Layout:**
- Two-column layout on desktop: text (left) + photo carousel (right)
- Stacked on mobile: text above carousel

**Content:**
- Section label: "Welcome" (orange, uppercase, small)
- Section title: "Про мене"
- Bio text: 2-3 sentences (marked with `<!-- USER_CONTENT -->` comment)

**Photo Carousel:**
- 5 square photos (1:1 ratio)
- Auto-rotate every 8 seconds
- Manual navigation: left/right arrows + bottom dots
- Visual timer bar showing time until next photo
- Smooth fade transition between photos
- Container: 280x280px with subtle shadow and border

**Carousel Controls:**
- Arrow buttons: circular, glassmorphism style (backdrop blur)
- Hover: orange background, dark text, scale 1.1
- Dots: 5 circular indicators, active dot is orange with glow
- Timer bar: orange gradient at bottom of carousel

### Section 2: Logistician (Логіст)

**Layout:**
- Same two-column layout as About Me
- Text content on left
- Optional: image or icon on right (or centered content)

**Content Structure (marked with comments):**
```
<!-- USER_CONTENT: Логіст - Чому ця роль? -->
<!-- USER_CONTENT: Логіст - Що я принесу? -->
<!-- USER_CONTENT: Логіст - Що я отримаю? -->
```

### Section 3: IT Specialist (ІТшник)

**Layout:**
- Same structure as Logistician section
- Mirror design or consistent with Logistician

**Content Structure (marked with comments):**
```
<!-- USER_CONTENT: ІТшник - Чому ця роль? -->
<!-- USER_CONTENT: ІТшник - Що я принесу? -->
<!-- USER_CONTENT: ІТшник - Що я отримаю? -->
```

### Section 4: Summary for MO (Підсумок)

**Layout:**
- Centered content
- Mixed tone: professional + self-deprecating humor

**Content Structure:**
```
<!-- USER_CONTENT: Звернення до MO -->
```

### Section 5: Footer (Контакти)

**Layout:**
- Social links row
- Icons with text labels

**Links:**
1. GitHub (icon + "GitHub")
2. Telegram (icon + "Telegram")
3. Gmail (icon + "Email")
4. Discord (icon + "Discord")

**Style:**
- Horizontal row on desktop
- 2x2 grid on mobile
- Gray icons, orange on hover
- Subtle hover lift effect

---

## 4. Animations & Interactions

### Scroll Animations

**Fade In Up:**
- Initial: opacity 0, translateY(30px)
- Animate to: opacity 1, translateY(0)
- Duration: 600ms
- Easing: `cubic-bezier(0.4, 0, 0.2, 1)`
- Trigger: when element enters viewport (IntersectionObserver at 20%)

### Carousel Animations

**Photo Transition:**
- Type: Crossfade
- Duration: 500ms
- Easing: ease-in-out

**Timer Bar:**
- Width animation from 0% to 100% over 8 seconds
- Linear timing function
- Resets on manual navigation

**Arrow Hover:**
- Scale: 1 → 1.1
- Shadow: adds orange glow
- Duration: 300ms

### Button/Link Hover Effects

**Navigation Items:**
- Color: gray → orange (300ms)
- Background: transparent → rgba(250, 129, 18, 0.08)
- Border-left appears for active state

**CTA Buttons (if any):**
- Background/color inversion
- Scale: 1.02
- Shadow increase

**Social Links:**
- Color: gray → orange
- Transform: translateY(-2px)

### Smooth Scroll

- Behavior: `scroll-behavior: smooth`
- Duration: browser native (~400-500ms)
- Offset: account for fixed header (60px)

---

## 5. Responsive Design

### Breakpoints

| Breakpoint | Layout Changes |
|------------|----------------|
| **≥1200px** | Full desktop, max spacing |
| **900px - 1199px** | Reduced padding, smaller fonts |
| **<900px** | Mobile layout: stacked, burger menu |

### Mobile Adaptations

**Navigation:**
- Hide sidebar
- Show fixed top header with hamburger
- Full-screen overlay menu

**About Section:**
- Stack: title → bio → carousel
- Carousel: full width (max 320px centered)
- Reduced padding

**Typography:**
- Section title: 42px → 28px
- Body: 15px → 14px
- Reduced line-height

**Spacing:**
- Page padding: 50px → 25px
- Section gaps: 50px → 30px

**Carousel:**
- Square photos maintain aspect ratio
- Arrows: slightly smaller
- Timer bar: same behavior

---

## 6. Technical Specifications

### Stack
- **Framework:** React 18
- **Language:** TypeScript
- **Bundler:** Vite
- **Styling:** CSS Modules or vanilla CSS
- **Deployment:** GitHub Pages

### File Structure
```
/src
  /components
    Navigation.tsx        # Sidebar + mobile menu
    Carousel.tsx          # Photo carousel with timer
    Section.tsx           # Generic section wrapper with animations
    SocialLinks.tsx       # Footer social icons
  /sections
    AboutSection.tsx      # Про мене
    LogisticianSection.tsx # Логіст
    ITSection.tsx         # ІТшник
    SummarySection.tsx    # Підсумок
    FooterSection.tsx     # Контакти
  /hooks
    useScrollAnimation.ts # IntersectionObserver hook
    useCarousel.ts        # Carousel logic with timer
  App.tsx
  main.tsx
  index.css             # Global styles + CSS variables
index.html
vite.config.ts          # Configured for GitHub Pages
```

### Key Implementation Notes

1. **Carousel:** Use `useEffect` with `setInterval` for 8s rotation. Clear on unmount and manual nav.

2. **Scroll Animations:** Use IntersectionObserver with threshold 0.2. Add `.visible` class when in viewport.

3. **Smooth Scroll:** Use `window.scrollTo({ top, behavior: 'smooth' })` with header offset calculation.

4. **Mobile Menu:** Use state `isMenuOpen`. Close on link click or outside click.

5. **CSS Variables:** Define colors in `:root` for easy maintenance:
   ```css
   --color-bg: #0a0a0a;
   --color-accent: #fa8112;
   --color-text: #ffffff;
   ```

6. **Photo Placeholders:** Use placeholder.com or Unsplash URLs initially. User will replace with own photos.

---

## 7. Content Markers

All user-editable content clearly marked with HTML comments:

```html
<!-- USER_CONTENT: Про мене -->
<!-- USER_CONTENT: Логіст - Чому ця роль? -->
<!-- USER_CONTENT: Логіст - Що я принесу? -->
<!-- USER_CONTENT: Логіст - Що я отримаю? -->
<!-- USER_CONTENT: ІТшник - Чому ця роль? -->
<!-- USER_CONTENT: ІТшник - Що я принесу? -->
<!-- USER_CONTENT: ІТшник - Що я отримаю? -->
<!-- USER_CONTENT: Підсумок для MO -->
<!-- USER_CONTENT: Контакти -->
```

---

## 8. Success Criteria

- [ ] Dark theme renders correctly with all color contrasts
- [ ] Sidebar navigation fixed on desktop, hamburger on mobile
- [ ] Smooth scroll to sections works with offset
- [ ] Carousel auto-rotates every 8 seconds
- [ ] Carousel manual controls (arrows + dots) work
- [ ] Timer bar visually shows progress
- [ ] Fade-in animations on scroll
- [ ] All hover effects smooth (300ms transitions)
- [ ] Fully responsive at all breakpoints
- [ ] All user content clearly marked with comments
- [ ] Ready for GitHub Pages deployment

---

## 9. Approved Design

**Final decisions from brainstorming:**
- ✅ Sidebar navigation desktop / burger menu mobile
- ✅ Text + photo side-by-side on desktop
- ✅ Square photos (1:1) in carousel
- ✅ Dark theme #0a0a0a with #fa8112 accent
- ✅ Fade-in scroll animations
- ✅ Color inversion on button hover
- ✅ Separate sections for Logistician and IT Specialist
- ✅ Modern gradients and glassmorphism effects

**Important Note for Implementation:**
- **Role sections (Logistician/IT Specialist) will contain significantly more text than shown in mockups**
- Text blocks must be expandable/scrollable if content exceeds viewport
- Consider max-height with scroll or auto-expanding sections
- Ensure proper spacing and readability for long-form content
- Maintain visual hierarchy even with expanded text

**Browser:** http://localhost:54705 (design mockup v2)
