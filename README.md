# Interview Prep Hub

## Code Style

- Use semicolons consistently at the end of imports, exports, variable declarations, and expressions in all TypeScript and TSX files.
- Do **not** add semicolons after interface or function declarations where TypeScript syntax does not allow them (e.g., after `export interface X { ... }` or `function foo() { ... }`).
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

## Core Concept

The application is built around two key dimensions:

- Interview level: Junior, Middle, Senior  
- Content language: Russian (RU) and English (EN)

All content dynamically adapts based on selected level and language.

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

## Project Goal

The goal of this project is to demonstrate:

- scalable frontend architecture  
- clean TypeScript usage  
- structured state management  
- reusable component design  
- real product-oriented thinking  

---

## Getting Started

npm install  
npm run dev  