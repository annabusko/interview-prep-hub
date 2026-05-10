# Interview Prep Hub

## Overview

Interview Prep Hub is a frontend-focused application designed for structured and practical preparation for technical interviews.

The app allows users to:

- study core frontend topics
- practice interview-style questions
- track weak areas
- switch between interview levels and languages

This project is intentionally built as a scalable frontend application, not just a static learning tool.

---

## Live Demo

https://annabusko.github.io/interview-prep-hub/

---

## Project Purpose

This project is built not only as an interview preparation app, but also as a reusable frontend foundation for structured content-based applications.

The architecture should allow reusing the same layout, page patterns, UI components, routing structure, and state patterns across different websites by replacing domain content and configuration.

The project should prioritize:

- reusable layout structure
- reusable page modules
- reusable UI components
- clear separation between domain content and UI
- configuration-driven navigation
- scalable component organization
- minimal dependency footprint
- clean TypeScript patterns

---

## MVP Scope

The current version includes:

- Level switcher (Junior / Middle / Senior)
- Language switcher (RU / EN)
- Topics list with filtering and search
- Topic details with explanations and content
- Topic status tracking (new / learning / strong / weak)
- Quiz mode for practicing questions
- Weak spots tracking (mistakes and difficult topics)
- Local persistence using localStorage

### Multilingual Architecture

- UI text is managed via i18n JSON files
- Learning content is stored as typed domain data (ru / en fields)

---

## Tech Stack

- React
- TypeScript
- Vite
- React Router
- Tailwind CSS

---

## Data Model

Core entities:

- Category — grouping of topics
- Topic — learning unit with content and explanations
- Question — interview-style questions linked to topics
- TopicProgress — user learning state per topic
- QuizAttempt — user answer history
- UserPreferences — selected level and language

---

## Architecture Principles

- Keep the MVP simple and focused
- Prefer strongly typed models
- Use semicolons consistently at the end of statements and declarations
- Avoid overengineering
- No backend in MVP
- No authentication in MVP
- Use localStorage for persistence
- Maintain a single source of truth for user preferences
- Separate domain logic from UI

---

## UI and Component Guidelines

- Reuse existing components when possible instead of duplicating markup or styles
- Extract shared components only for clearly repeated patterns (2–3+ usages)
- Avoid premature abstraction
- Keep components simple and focused
- Prefer readability over generic abstractions

---

## UI Philosophy

- Prefer soft neutral palettes with subtle category accents
- Keep layouts clean and spacious
- Reuse shared card and filter patterns
- Avoid visually heavy dashboards
- Maintain consistency across all pages

---

## AI Collaboration Guidelines

This project is actively developed with AI assistance (Cursor, ChatGPT).

When generating or modifying code:

- Preserve the existing folder structure
- Do not introduce unnecessary abstractions
- Do not duplicate types or logic
- Keep components focused and readable
- Prefer simple and explicit solutions
- Do not add new libraries unless clearly needed
- Follow existing naming and routing conventions
- Respect the MVP scope
- Prefer incremental refactoring over large rewrites
- Preserve visual consistency across pages
- Reuse existing UI patterns before introducing new ones
- Do not place raw inline SVG markup inside React components.
- Store reusable icons as SVG files in `src/assets/icons`.
- Reference icons by imported asset names.
- Use the existing mask-based icon rendering pattern when icons need to inherit text color.

---

## Code Style

- Use semicolons consistently at the end of imports, exports, variable declarations, and expressions in all TypeScript and TSX files.

- Do **not** add semicolons after interface or function declarations where TypeScript syntax does not allow them (e.g., after `export interface X { ... }` or `function foo() { ... }`).

- Prefer arrow functions for React components and local functions:

  ```ts
  const MyComponent = () => {};
  ```

- Do not use function declarations for React components.
- Use function only when hoisting is explicitly required.
- Keep function and component definitions consistent across the project.

---

## Component Structure Rules

Use a flat single-file component structure only for very small components.

If a component has any additional complexity, move it into its own folder.

Examples of complexity:

- component-specific types
- constants
- utils
- hooks
- styles
- tests
- subcomponents
- multiple exports
- more than ~100 lines of logic/UI

Recommended structure:

components/
TopicCard/
TopicCard.tsx
TopicCard.types.ts
TopicCard.constants.ts
TopicCard.utils.ts
index.ts

Benefits:

- predictable structure
- easier navigation
- simpler refactoring
- scalable architecture
- cleaner imports

---

## Import Rules

- Prefer absolute imports via `@/` for application code.
- Avoid deep relative imports like `../../../../../`.
- Relative imports are acceptable only for nearby sibling files.
- Shared modules, assets, domain models, routes, and UI components should use absolute imports.

---

## Deployment Notes

The app is deployed on GitHub Pages as a project site:

https://annabusko.github.io/interview-prep-hub/

Routing is implemented using:

- BrowserRouter with basename
- custom 404.html fallback
- path restoration via history.replaceState

This allows clean URLs while supporting static hosting.

---

## Getting Started

npm install  
npm run dev
