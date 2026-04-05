# Interview Prep Hub

## Overview

Interview Prep Hub is a frontend pet project designed for structured and practical preparation for technical interviews.

The application helps users study frontend topics, practice interview questions, track weak areas, and switch between different interview levels and languages.

This project is intentionally built as a real-world, scalable frontend application rather than a static learning tool.

---

## Core Concept

The application is centered around two main dimensions:

- Interview level: Junior, Middle, Senior  
- Content language: Russian (RU) and English (EN)

All content, including topics and questions, adapts based on the selected level and language.

---

## MVP Scope

The first version of the application includes:

- Level switcher (Junior / Middle / Senior)
- Language switcher (RU / EN)
- Topics list with filtering and search
- Topic details with explanations and key points
- Topic status tracking (new / learning / strong / weak)
- Quiz mode for practicing questions
- Weak spots tracking (mistakes and difficult topics)
- Local persistence using localStorage

---

## Tech Stack

- React
- TypeScript
- Vite
- React Router
- Tailwind CSS

---

## Data Model

The application is built around the following core entities:

- Category — grouping of topics
- Topic — learning unit with explanations and content
- Question — interview-style questions linked to topics and levels
- TopicProgress — user learning state per topic
- QuizAttempt — user answers history
- UserPreferences — selected level and language

---

## Architecture Principles

- Keep the MVP simple and focused
- Prefer strongly typed models
- Avoid overengineering
- No backend in MVP
- No authentication in MVP
- Use localStorage for persistence
- Use a single source of truth for user preferences
- Keep components small and reusable
- Separate domain logic from UI

---

## AI Collaboration Guidelines

This project is actively developed with AI assistance (e.g., Cursor, ChatGPT).

When generating or modifying code, follow these rules:

- Preserve the existing folder structure
- Do not introduce unnecessary abstractions
- Do not duplicate types or logic
- Keep components focused and readable
- Prefer explicit and simple solutions over clever ones
- Do not add new libraries unless clearly needed
- Follow existing naming and routing conventions
- Respect the MVP scope (no backend, no auth unless explicitly required)

---

## Project Goal

The goal of this project is not only to prepare for interviews, but also to demonstrate:

- solid frontend architecture
- clean TypeScript usage
- scalable component design
- thoughtful state management
- real product thinking

---

## Getting Started

```bash
npm install
npm run dev