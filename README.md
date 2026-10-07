<p align="center">
  <img src="public/ecelllogo.png" alt="E-Cell NIT Silchar Logo" width="120" />
</p>

<h1 align="center">E-Cell NIT Silchar — Official Website</h1>

<p align="center">
  <strong>The digital hub of the Entrepreneurship Cell, NIT Silchar — fostering innovation, leadership, and startup culture on campus.</strong>
</p>

<p align="center">
  <a href="https://ecellnits.org">🌐 Live Website</a> •
  <a href="https://www.linkedin.com/company/ecell-nit-silchar">LinkedIn</a> •
  <a href="https://www.instagram.com/ecell.nitsilchar">Instagram</a> •
  <a href="https://www.facebook.com/ecell.nits">Facebook</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/pnpm-10-F69220?logo=pnpm" alt="pnpm" />
</p>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Performance & SEO](#-performance--seo)
- [Contributing](#-contributing)
- [Developed by Team of E-Cell](#-developed-by-team-of-e-cell)
- [License](#-license)

---

## 🌟 Overview

This is the **official website** of **E-Cell NIT Silchar** — a non-profit, student-run organization dedicated to promoting and nurturing the entrepreneurial spirit among students of the National Institute of Technology, Silchar. The platform serves as the central digital identity for all activities, events, blogs, and initiatives conducted by E-Cell.

Built from the ground up using the latest web technologies, the website features a modern, animated dark-themed UI, content management capabilities, event-specific microsites, secure authentication, and an admin dashboard — all optimized for performance and search engine visibility.

### Recent blog refinements

- The blog cards now behave as a single clickable area that routes to the article detail page while keeping the like action independent.
- The original blog route (`/blog/[id]`) now loads the article directly instead of redirecting to the legacy `/blog2` route.
- The sidebar comment section stays sticky on larger screens for a better reading experience.
- The blog sorting logic now parses dates more reliably across common day-month-year formats.

---

## ✨ Key Features

| Category                  | Highlights                                                                                                                                                                                                                             |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Landing Experience**    | Immersive animated hero section, interactive background effects, dynamic partner marquee, event timeline, testimonials carousel, and FAQ accordion                                                                                     |
| **Event Microsites**      | Dedicated themed pages for flagship events — [EIC](https://ecellnits.org/EIC-2026), [Eminence](https://ecellnits.org/EMINENCE), [Empresario](https://ecellnits.org/EMPRESARIO), [EnGenius](https://ecellnits.org/ENGENIUS), and Srijan |
| **Blog Platform**         | Full-featured blog system with Tiptap WYSIWYG rich-text editor (images, links, text alignment), CRUD operations, and dynamic routing                                                                                                   |
| **Admin Dashboard**       | Protected admin panel for managing blogs, viewing registrations, and exporting data (XLSX)                                                                                                                                             |
| **Authentication**        | Custom JWT-based auth flow with login, signup, forgot/change password, Google OAuth callback, and session management                                                                                                                   |
| **Gallery**               | Responsive image gallery with curated photos from past events and activities                                                                                                                                                           |
| **Team & Alumni**         | Showcase pages for current team members (core team, developers) and notable alumni                                                                                                                                                     |
| **Contact Form**          | Integrated contact form for general inquiries                                                                                                                                                                                          |
| **SEO & Discoverability** | Dynamic sitemap, robots.txt, JSON-LD structured data, Open Graph & Twitter Cards, comprehensive meta tags                                                                                                                              |
| **Performance**           | Turbopack dev server, optimized image formats (AVIF/WebP), tree-shaken imports, aggressive caching, and sharp-based image processing                                                                                                   |

---

## 🛠️ Tech Stack

### Core Framework

- **[Next.js 15](https://nextjs.org/)** — React meta-framework with App Router, Server Components, and Turbopack
- **[React 19](https://react.dev/)** — Latest React with concurrent features
- **[TypeScript 5.8](https://www.typescriptlang.org/)** — End-to-end type safety

### Styling & UI

- **[Tailwind CSS 4](https://tailwindcss.com/)** — Utility-first CSS framework with PostCSS integration
- **[Framer Motion](https://www.framer.com/motion/)** — Production-grade animation library for React
- **[Radix UI](https://www.radix-ui.com/)** — Accessible, unstyled UI primitives (Dialog, Slot)
- **[Lucide React](https://lucide.dev/)** — Beautiful, consistent icon library
- **[SASS/SCSS](https://sass-lang.com/)** — Advanced stylesheets for event-specific theming
- **[Class Variance Authority](https://cva.style/)** — Type-safe component variant management

### Content & Editing

- **[Tiptap](https://tiptap.dev/)** — Headless, extendable rich-text editor (images, links, text alignment, placeholders)

### Data & Networking

- **[Axios](https://axios-http.com/)** — Promise-based HTTP client with custom interceptors
- **[Zod](https://zod.dev/)** — TypeScript-first schema validation for environment variables and form data
- **[@t3-oss/env-nextjs](https://env.t3.gg/)** — Type-safe environment variable validation
- **[SheetJS (xlsx)](https://sheetjs.com/)** — Excel file generation for data exports

### Auth & Security

- Custom **JWT-based authentication** with token management
- **Google OAuth** integration
- Security headers (HSTS, X-Frame-Options, CSP directives, Referrer-Policy)

### Developer Experience

- **[ESLint 9](https://eslint.org/)** — Flat config with `eslint-config-next` and `typescript-eslint`
- **[Prettier](https://prettier.io/)** — Opinionated code formatter with Tailwind CSS plugin
- **[Husky](https://typicode.github.io/husky/)** — Git hooks for pre-commit quality gates
- **[lint-staged](https://github.com/lint-staged/lint-staged)** — Run linters on staged files only
- **[Sharp](https://sharp.pixelplumbing.com/)** — High-performance image processing for Next.js

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────┐
│                   Client (Browser)               │
│   Next.js App Router · React 19 · Framer Motion │
└──────────────────────┬──────────────────────────┘
                       │
         ┌─────────────┼─────────────┐
         ▼             ▼             ▼
   ┌──────────┐  ┌──────────┐  ┌──────────┐
   │  Server  │  │  Static  │  │   Auth   │
   │Components│  │   Pages  │  │ Context  │
   │ (SSR/SSG)│  │ (ISR)    │  │ (JWT)    │
   └────┬─────┘  └──────────┘  └────┬─────┘
        │                           │
        ▼                           ▼
   ┌──────────────────────────────────────────────────────────────┐
   │          Backend REST API                                    │
   │   (E-Cell API · Events Registration API · Recruitments API)  │
   └──────────────────────────────────────────────────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **pnpm** ≥ 10.x (specified in `packageManager` field)

### Installation

```bash
# Clone the repository
git clone https://github.com/Ecell-NITS/ecell-website-2026.git
cd ecell-website-2026

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration
```

### Environment Variables

| Variable              | Description                        |
| --------------------- | ---------------------------------- |
| `NEXT_PUBLIC_API_URL` | Base URL of the E-Cell backend API |

> Refer to `.env.example` for the full list. Environment variables are validated at build time using **Zod** via `@t3-oss/env-nextjs`.

### Development

```bash
# Start dev server with Turbopack
pnpm dev

# Lint the codebase
pnpm lint

# Format code with Prettier
pnpm format:write

# Type-check without emitting
pnpm typecheck

# Run all checks (lint + typecheck)
pnpm check
```

### Production

```bash
# Build for production
pnpm build

# Start production server
pnpm start

# Preview production build locally
pnpm preview
```

---

## 📁 Project Structure

```
ecell-website-2026/
├── public/                     # Static assets (images, fonts, OpenGraph images)
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx            # Landing page
│   │   ├── layout.tsx          # Root layout with SEO metadata & structured data
│   │   ├── sitemap.ts          # Dynamic XML sitemap generation
│   │   ├── robots.ts           # Robots.txt configuration
│   │   ├── not-found.tsx       # Custom 404 page
│   │   ├── EIC-2026/           # EIC event microsite & registration
│   │   ├── EMINENCE/           # Eminence event page
│   │   ├── EMPRESARIO/         # Empresario event page
│   │   ├── ENGENIUS/           # EnGenius event page
│   │   ├── about/              # About E-Cell
│   │   ├── admin/              # Admin dashboard
│   │   ├── blog/               # Blog post viewer
│   │   ├── blogs/              # Blog listing & editor
│   │   ├── gallery/            # Photo gallery
│   │   ├── team/               # Current team showcase
│   │   ├── alumni/             # Alumni network
│   │   ├── initiatives/        # E-Cell initiatives
│   │   ├── dashboard/          # User dashboard
│   │   ├── login/              # Login page
│   │   ├── signup/             # Registration page
│   │   ├── auth/               # Auth utilities
│   │   ├── forgot-password/    # Password recovery
│   │   └── change-password/    # Password change
│   ├── components/             # Feature-grouped React components
│   │   ├── Landing/            # Hero, Navbar, Partners, Events, Timeline, etc.
│   │   ├── About/              # About page components
│   │   ├── Auth/               # Authentication forms
│   │   ├── Blogs/              # Blog cards and listing
│   │   ├── Dashboard/          # Dashboard UI components
│   │   ├── EMINENCE/           # Eminence-specific components
│   │   ├── EMPRESARIO/         # Empresario-specific components
│   │   ├── ENGENIUS/           # EnGenius-specific components
│   │   ├── Events/             # Shared event UI
│   │   ├── Gallery/            # Gallery grid & lightbox
│   │   ├── Preloader/          # App loading animation
│   │   ├── Teampage/           # Team member cards
│   │   ├── tiptap-ui/          # Rich-text editor components
│   │   └── ui/                 # Shared UI primitives (Button, Dialog)
│   ├── content/                # Structured content definitions
│   ├── context/                # React Context providers
│   ├── data/                   # Static data (team, alumni, gallery)
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Utilities, API client, auth helpers
│   └── styles/                 # Global CSS, SCSS, event themes
├── .husky/                     # Git hooks
├── next.config.js              # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
├── eslint.config.js            # ESLint flat config
└── package.json                # Dependencies & scripts
```

---

## ⚡ Performance & SEO

### Performance Optimizations

- **Turbopack** — Blazing-fast development builds
- **Image Optimization** — Automatic AVIF/WebP conversion with responsive `srcset` via `next/image` and Sharp
- **Tree Shaking** — Optimized package imports for `lucide-react` and `framer-motion`
- **Static Asset Caching** — 1-year immutable cache headers for fonts, images, and JS/CSS chunks
- **Code Splitting** — Automatic route-based and component-level code splitting

### SEO Implementation

- **Dynamic Sitemap** — Auto-generated XML sitemap including blog posts fetched from the API
- **Robots.txt** — Properly configured crawl directives (blocks admin, auth, and dashboard routes)
- **JSON-LD Structured Data** — Organization schema for rich search results
- **Open Graph & Twitter Cards** — Social media preview optimization with custom images
- **Meta Tags** — Comprehensive title templates, descriptions, and keyword targeting
- **Semantic HTML** — Proper heading hierarchy and landmark elements

---

## 🤝 Contributing

We welcome contributions from all students and developers! Here's how to get started:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'feat: add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Code Quality Standards

- All code must pass **ESLint** and **TypeScript** checks
- **Prettier** formatting is enforced via pre-commit hooks (Husky + lint-staged)
- Follow the existing component structure and naming conventions
- Write meaningful commit messages following [Conventional Commits](https://www.conventionalcommits.org/)

---

## 👥 Developed by Technical Team of E-Cell (Batch 2025-26)

This project is built and maintained by the **Technical Team** of the **Entrepreneurship Cell, NIT Silchar**.

### 🎖️ Technical Heads (Senior Developers)

| Name               | Role                                  | Links                                                                                                                                                                                                                                                                                            |
| ------------------ | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Bishal Das**     | Technical Head (Senior Web Developer) | [![LinkedIn](https://img.shields.io/badge/-LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/bishal-das-babbb02a3) [![GitHub](https://img.shields.io/badge/-GitHub-181717?style=flat&logo=github&logoColor=white)](https://github.com/Bishal-NITS-2003)     |
| **Muskan Bharti**  | Technical Head (Senior Web Developer) | [![LinkedIn](https://img.shields.io/badge/-LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/muskan-bharti-a7440b28b/) [![GitHub](https://img.shields.io/badge/-GitHub-181717?style=flat&logo=github&logoColor=white)](https://github.com/muskan170604)     |
| **Gulista Khatun** | Senior Web Associate                  | [![LinkedIn](https://img.shields.io/badge/-LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/gulista-khatun-9414b6314/) [![GitHub](https://img.shields.io/badge/-GitHub-181717?style=flat&logo=github&logoColor=white)](https://github.com/GulistaKhatun06) |
| **Ayush Singh**    | Senior UI/UX Developer                | [![LinkedIn](https://img.shields.io/badge/-LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ayush-singh-1b0a8827b)                                                                                                                                         |

### 🚀 Junior Members (Junior Developers)

| Name                  | Role                   | Links                                                                                                                                                                                                                                                                                                    |
| --------------------- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Anusna Pradhan**    | Junior UI/UX Developer | [![LinkedIn](https://img.shields.io/badge/-LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/anusna-pradhan) [![GitHub](https://img.shields.io/badge/-GitHub-181717?style=flat&logo=github&logoColor=white)](https://github.com/iz4nam1)                            |
| **Ayushman Swain**    | Junior Web Developer   | [![LinkedIn](https://img.shields.io/badge/-LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ayushman-swain-as) [![GitHub](https://img.shields.io/badge/-GitHub-181717?style=flat&logo=github&logoColor=white)](https://github.com/Ayushman-Swain)                  |
| **Dhruba Agarwalla**  | Junior Web Developer   | [![LinkedIn](https://img.shields.io/badge/-LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/dhruba-kumar-agarwalla-7a5346270/) [![GitHub](https://img.shields.io/badge/-GitHub-181717?style=flat&logo=github&logoColor=white)](https://github.com/DhrubaAgarwalla) |
| **Harshit Agarwal**   | Junior Web Developer   | [![LinkedIn](https://img.shields.io/badge/-LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/harshit-agarwal-a119a4332/) [![GitHub](https://img.shields.io/badge/-GitHub-181717?style=flat&logo=github&logoColor=white)](https://github.com/agarwal-harshit00)      |
| **Madhurjya Kaushik** | Junior Web Developer   | [![LinkedIn](https://img.shields.io/badge/-LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/madhurjya-kaushik-752a53323) [![GitHub](https://img.shields.io/badge/-GitHub-181717?style=flat&logo=github&logoColor=white)](https://github.com/xanthate8)             |
| **Md. Iqbal**         | Junior Web Developer   | [![LinkedIn](https://img.shields.io/badge/-LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/mr-iqbal-khan-30b818307) [![GitHub](https://img.shields.io/badge/-GitHub-181717?style=flat&logo=github&logoColor=white)](https://github.com/Md-Iqbal786)               |
| **Muskan Agarwala**   | Junior Web Developer   | [![LinkedIn](https://img.shields.io/badge/-LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/muskanagarwala01) [![GitHub](https://img.shields.io/badge/-GitHub-181717?style=flat&logo=github&logoColor=white)](https://github.com/Muskan596)                        |
| **Nabonit Paul**      | Junior Web Developer   | [![LinkedIn](https://img.shields.io/badge/-LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/nabonit-paul-869050320) [![GitHub](https://img.shields.io/badge/-GitHub-181717?style=flat&logo=github&logoColor=white)](https://github.com/studen-bot)                 |
| **Swarup Das**        | Junior Web Developer   | [![LinkedIn](https://img.shields.io/badge/-LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/swarup81/) [![GitHub](https://img.shields.io/badge/-GitHub-181717?style=flat&logo=github&logoColor=white)](https://github.com/swarup081)                               |
| **Swastika Paul**     | Junior Web Developer   | [![LinkedIn](https://img.shields.io/badge/-LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/swastika-paul-05186a381) [![GitHub](https://img.shields.io/badge/-GitHub-181717?style=flat&logo=github&logoColor=white)](https://github.com/swastika-paul)             |

---

## 📜 License

This project is developed and maintained by **E-Cell, NIT Silchar**. All rights reserved.

---

<p align="center">
  Made with ❤️ by the Tech Team at <strong>E-Cell, NIT Silchar</strong>
</p>
