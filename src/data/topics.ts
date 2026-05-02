import type { Topic } from '../domain/models';

export const topics: Topic[] = [
  {
    id: 'js-type-coercion',
    categoryId: 'javascript',
    level: 'junior',
    title: {
      ru: 'Приведение типов и сравнение',
      en: 'Type coercion and comparison',
    },
    summary: {
      ru: 'Как работают `==` и `===`, truthy/falsy и типичные ловушки на собеседованиях.',
      en: 'How `==` vs `===` behave, truthy/falsy, and common interview gotchas.',
    },
    content: {
      ru: 'В JavaScript сравнение с нестрогим равенством (`==`) запускает алгоритм Abstract Equality Comparison: операнды приводятся к общему типу. Строгое равенство (`===`) сравнивает без приведения. Пустой массив в логическом контексте истинен, а `![]` даёт `false`, после чего сравнение снова идёт через приведение. На собеседованиях часто спрашивают про таблицу falsy-значений и разницу между `null` и `undefined`.',
      en: 'In JavaScript, loose equality (`==`) runs the Abstract Equality Comparison algorithm, coercing operands to a common type. Strict equality (`===`) compares without coercion. An empty array is truthy, while `![]` is `false`, and comparing `[]` to `false` triggers numeric coercion. Interviewers often probe falsy values and the distinction between `null` and `undefined`.',
    },
  },
  {
    id: 'js-closures-scope',
    categoryId: 'javascript',
    level: 'middle',
    title: {
      ru: 'Замыкания и область видимости',
      en: 'Closures and scope',
    },
    summary: {
      ru: 'Лексическое окружение, замыкания, `var`/`let`/`const`, вложенные функции.',
      en: 'Lexical environment, closures, `var`/`let`/`const`, and nested functions.',
    },
    content: {
      ru: 'Замыкание — это функция вместе с окружением, в котором она была создана: она «запоминает» внешние переменные. У каждого вызова функции своё лексическое окружение. `let` и `const` блочно-областные, `var` — функционально или глобально. Типичный вопрос: почему `var` в цикле с асинхронными колбэками даёт один и тот же индекс, и как исправить это через `let` или IIFE.',
      en: 'A closure is a function plus the lexical environment where it was created, so it retains variables from outer scopes. Each invocation gets its own environment. `let` and `const` are block-scoped; `var` is function- or globally scoped. A classic interview topic is why `var` inside a loop with async callbacks captures the same index, and how `let` or an IIFE fixes it.',
    },
  },
  {
    id: 'js-event-loop',
    categoryId: 'javascript',
    level: 'senior',
    title: {
      ru: 'Event loop, микро- и макрозадачи',
      en: 'Event loop, microtasks, and macrotasks',
    },
    summary: {
      ru: 'Очереди задач, `queueMicrotask`, `Promise`, порядок выполнения и отладка.',
      en: 'Task queues, `queueMicrotask`, `Promise`, execution order, and debugging.',
    },
    content: {
      ru: 'В браузере один поток для JS на вкладке: стек вызовов опустошается, затем обрабатываются микрозадачи (Promise, `queueMicrotask`), и только потом следующая макрозадача (`setTimeout`, I/O). Долгие синхронные вычисления блокируют рендер. На senior-уровне ждут объяснения порядка логов при смеси sync-кода, `Promise.then` и `setTimeout`, а также влияния на UX.',
      en: 'In the browser, JavaScript runs on a single thread per tab: the call stack runs to completion, then microtasks (promises, `queueMicrotask`) drain, then the next macrotask (`setTimeout`, I/O). Long synchronous work blocks painting. Senior interviews expect you to predict log order with mixed sync code, `Promise.then`, and `setTimeout`, and to discuss impact on responsiveness.',
    },
  },
  {
    id: 'ts-primitive-typing',
    categoryId: 'typescript',
    level: 'junior',
    title: {
      ru: 'Базовые типы и интерфейсы',
      en: 'Primitive types and interfaces',
    },
    summary: {
      ru: 'Примитивы, объекты, интерфейсы vs type, опциональные поля и readonly.',
      en: 'Primitives, objects, interface vs type, optional fields, and readonly.',
    },
    content: {
      ru: 'TypeScript добавляет статическую типизацию поверх JavaScript: объявляйте формы объектов через `interface` или `type`. `unknown` безопаснее `any`: перед использованием нужно сузить тип. `readonly` и опциональные поля делают намерения явными. На интервью часто сравнивают `interface` и `type` для объектов и обсуждают структурную типизацию.',
      en: 'TypeScript layers static types on JavaScript: describe object shapes with `interface` or `type`. `unknown` is safer than `any` because you must narrow before use. `readonly` and optional properties document intent. Interviews often compare `interface` vs `type` for objects and touch on structural typing.',
    },
  },
  {
    id: 'ts-generics',
    categoryId: 'typescript',
    level: 'middle',
    title: {
      ru: 'Дженерики и ограничения',
      en: 'Generics and constraints',
    },
    summary: {
      ru: 'Параметры типа, `extends`, вывод типов, типичные паттерны API.',
      en: 'Type parameters, `extends`, inference, and common API patterns.',
    },
    content: {
      ru: 'Дженерики позволяют писать функции и типы, которые работают с несколькими конкретными типами, сохраняя связь между входом и выходом. Ограничение `T extends U` даёт доступ к членам `U`. Вывод типов срабатывает на аргументах вызова. Типичные вопросы: как типизировать `Array.map`, обёртки API и фабрики с ограничениями.',
      en: 'Generics let you write functions and types that work across many concrete types while preserving relationships between inputs and outputs. Constraints `T extends U` unlock members of `U`. Type inference often flows from call arguments. Interviewers may ask how to type `Array.map`, API wrappers, and factories with constraints.',
    },
  },
  {
    id: 'ts-conditional-mapped',
    categoryId: 'typescript',
    level: 'senior',
    title: {
      ru: 'Условные и отображаемые типы',
      en: 'Conditional and mapped types',
    },
    summary: {
      ru: '`infer`, распределение условных типов, mapped types и utility types.',
      en: '`infer`, distributive conditionals, mapped types, and utility types.',
    },
    content: {
      ru: 'Условные типы `T extends U ? X : Y` вычисляются на уровне типов; при дженериках T может распределяться по union. `infer` извлекает типы из позиций внутри шаблона. Mapped types `{ [K in keyof T]: ... }` преобразуют свойства; `Partial`, `Pick`, `Readonly` строятся на этом. Senior-собеседования проверяют умение читать и писать такие типы без запуска кода.',
      en: 'Conditional types `T extends U ? X : Y` compute at the type level; when `T` is a union, the conditional may distribute. `infer` extracts types from positions inside a pattern. Mapped types `{ [K in keyof T]: ... }` transform keys; utilities like `Partial`, `Pick`, and `Readonly` build on this. Senior interviews test reading and authoring these types without executing code.',
    },
  },
  {
    id: 'react-components-jsx',
    categoryId: 'react',
    level: 'junior',
    title: {
      ru: 'Компоненты и JSX',
      en: 'Components and JSX',
    },
    summary: {
      ru: 'Функциональные компоненты, props, children, условный рендер.',
      en: 'Function components, props, children, and conditional rendering.',
    },
    content: {
      ru: 'Компонент — функция, возвращающая дерево React-элементов. JSX компилируется в вызовы `createElement`. Props неизменяемы на уровне соглашения. `key` в списках помогает согласовать идентичность элементов между рендерами. Условный рендер обычно делают через `&&`, тернарник или ранний `return`.',
      en: 'A component is a function that returns a tree of React elements. JSX compiles to `createElement` calls. Props are treated as immutable. `key` in lists helps React match element identity across renders. Conditional rendering typically uses `&&`, ternaries, or early `return`.',
    },
  },
  {
    id: 'react-hooks-data',
    categoryId: 'react',
    level: 'middle',
    title: {
      ru: 'Хуки и побочные эффекты',
      en: 'Hooks and side effects',
    },
    summary: {
      ru: '`useState`, `useEffect`, зависимости, загрузка данных и типичные баги.',
      en: '`useState`, `useEffect`, dependency arrays, data fetching, and common bugs.',
    },
    content: {
      ru: 'Хуки привязаны к порядку вызовов в каждом рендере — поэтому их нельзя вызывать в условиях и циклах. `useEffect` планирует побочный эффект после коммита; массив зависимостей определяет, когда эффект перезапускается. Пустой массив — один раз при монтировании; отсутствие массива — после каждого рендера. Загрузка данных требует аккуратности с отменой запросов и гонками.',
      en: 'Hooks rely on call order on every render, so they must not run inside conditions or loops. `useEffect` schedules work after paint; the dependency array controls when it re-runs. `[]` runs on mount; omitting the array runs after every render. Data fetching needs care around cancellation and race conditions.',
    },
  },
  {
    id: 'react-concurrent',
    categoryId: 'react',
    level: 'senior',
    title: {
      ru: 'Concurrent React и Suspense',
      en: 'Concurrent React and Suspense',
    },
    summary: {
      ru: 'Concurrent features, transitions, Suspense boundaries и UX.',
      en: 'Concurrent features, transitions, Suspense boundaries, and UX implications.',
    },
    content: {
      ru: 'Concurrent React позволяет прерывать и возобновлять рендер низкоприоритетной работы. `startTransition` помечает обновления как некритичные. `<Suspense>` показывает fallback, пока дочерний компонент «ждёт» данные или код. На senior-собеседованиях обсуждают разницу между срочными и отложенными обновлениями и влияние на отзывчивость интерфейса.',
      en: 'Concurrent React can interrupt and resume rendering of lower-priority work. `startTransition` marks updates as non-urgent. `<Suspense>` shows a fallback while children wait for data or code. Senior interviews explore urgent vs deferred updates and perceived performance.',
    },
  },
];
