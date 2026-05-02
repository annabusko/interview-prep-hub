import type { Question } from '../domain/models';

export const questions: Question[] = [
  {
    id: 'js-type-coercion-q01',
    topicId: 'js-type-coercion',
    level: 'junior',
    type: 'single',
    prompt: {
      en: 'What does the expression `[] == ![]` evaluate to in JavaScript?',
      ru: 'К чему приводится выражение `[] == ![]` в JavaScript?',
    },
    explanation: {
      en: '`![]` is `false` (array is truthy). `[]` is coerced to a number (`0`) and `false` to `0`, so `0 == 0` is `true`.',
      ru: '`![]` даёт `false` (массив truthy). `[]` и `false` при численном приведении дают `0`, поэтому `0 == 0` — `true`.',
    },
    options: [
      {
        id: 'a',
        text: { en: '`true`', ru: '`true`' },
      },
      {
        id: 'b',
        text: { en: '`false`', ru: '`false`' },
      },
      {
        id: 'c',
        text: { en: '`undefined`', ru: '`undefined`' },
      },
      {
        id: 'd',
        text: { en: 'A `TypeError` is thrown', ru: 'Выбрасывается `TypeError`' },
      },
    ],
    correctAnswerIds: ['a'],
  },
  {
    id: 'js-closures-scope-q01',
    topicId: 'js-closures-scope',
    level: 'middle',
    type: 'single',
    prompt: {
      en: 'In a classic `for (var i = 0; i < 3; i++) { setTimeout(() => console.log(i), 0); }`, what is the usual fix so each timeout logs 0, 1, 2?',
      ru: 'В цикле `for (var i = 0; i < 3; i++) { setTimeout(() => console.log(i), 0); }` как обычно исправляют поведение, чтобы выводились 0, 1, 2?',
    },
    explanation: {
      en: '`var` is function-scoped, so closures share one `i`. Using `let` gives a new binding per iteration, or use an IIFE/param to capture the value.',
      ru: '`var` объявляет одну переменную на функцию, поэтому замыкания видят одно `i`. `let` даёт новую привязку на итерацию; альтернатива — IIFE или параметр.',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Add `"use strict";` at the top of the file only',
          ru: 'Добавить только `"use strict";` в начале файла',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Replace `var` with `let` in the `for` loop header',
          ru: 'Заменить `var` на `let` в заголовке цикла `for`',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Change `setTimeout` delay from `0` to `i`',
          ru: 'Заменить задержку `setTimeout` с `0` на `i`',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Replace `console.log` with `console.info`',
          ru: 'Заменить `console.log` на `console.info`',
        },
      },
    ],
    correctAnswerIds: ['b'],
  },
  {
    id: 'js-event-loop-q01',
    topicId: 'js-event-loop',
    level: 'senior',
    type: 'single',
    prompt: {
      en: 'Given synchronous code, then `setTimeout(() => console.log("A"), 0)`, then `Promise.resolve().then(() => console.log("B"))`, what is a correct log order?',
      ru: 'После синхронного кода идут `setTimeout(() => console.log("A"), 0)` и `Promise.resolve().then(() => console.log("B"))`. Какой порядок логов возможен?',
    },
    explanation: {
      en: 'Sync runs first. After the stack clears, microtasks run before the next macrotask, so promise callbacks (`B`) run before the timeout (`A`).',
      ru: 'Сначала синхронный код. После опустошения стека выполняются микрозадачи раньше следующей макрозадачи, поэтому `B` раньше `A`.',
    },
    options: [
      {
        id: 'a',
        text: { en: '`A` then `B`', ru: 'Сначала `A`, затем `B`' },
      },
      {
        id: 'b',
        text: { en: 'Order is unspecified', ru: 'Порядок не определён' },
      },
      {
        id: 'c',
        text: { en: '`B` then `A` (microtask before macrotask)', ru: 'Сначала `B`, затем `A` (микрозадача раньше макрозадачи)' },
      },
      {
        id: 'd',
        text: { en: 'Both run in the same synchronous turn', ru: 'Оба выполняются в одном синхронном такте' },
      },
    ],
    correctAnswerIds: ['c'],
  },
  {
    id: 'ts-primitive-typing-q01',
    topicId: 'ts-primitive-typing',
    level: 'junior',
    type: 'single',
    prompt: {
      en: 'Which statement best describes `unknown` compared to `any`?',
      ru: 'Какое утверждение лучше всего описывает `unknown` по сравнению с `any`?',
    },
    explanation: {
      en: '`any` disables checking. `unknown` is type-safe: you must narrow (e.g. `typeof`, guards) before using the value.',
      ru: '`any` отключает проверки. `unknown` безопаснее: перед использованием значение нужно сузить (`typeof`, type guards).',
    },
    options: [
      {
        id: 'a',
        text: {
          en: '`unknown` and `any` behave identically at compile time',
          ru: '`unknown` и `any` ведут себя одинаково на этапе компиляции',
        },
      },
      {
        id: 'b',
        text: {
          en: '`unknown` can only be assigned from `string`',
          ru: '`unknown` можно присвоить только из `string`',
        },
      },
      {
        id: 'c',
        text: {
          en: '`any` is stricter than `unknown`',
          ru: '`any` строже, чем `unknown`',
        },
      },
      {
        id: 'd',
        text: {
          en: '`unknown` forces narrowing before use; `any` opts out of type checking',
          ru: '`unknown` требует сужения перед использованием; `any` отключает проверку типов',
        },
      },
    ],
    correctAnswerIds: ['d'],
  },
  {
    id: 'ts-generics-q01',
    topicId: 'ts-generics',
    level: 'middle',
    type: 'single',
    prompt: {
      en: 'What does `<T extends { id: string }>(value: T) => T` guarantee about `value`?',
      ru: 'Что гарантирует сигнатура `<T extends { id: string }>(value: T) => T` для `value`?',
    },
    explanation: {
      en: '`T` must be assignable to `{ id: string }`, so `value` has at least an `id: string` property; `T` may carry more fields.',
      ru: '`T` должен быть присваиваем к `{ id: string }`, то есть у `value` как минимум есть `id: string`; у `T` могут быть и другие поля.',
    },
    options: [
      {
        id: 'a',
        text: {
          en: '`T` can be any type, including primitives without `id`',
          ru: '`T` может быть любым типом, включая примитивы без `id`',
        },
      },
      {
        id: 'b',
        text: {
          en: '`value` must have an `id` property of type `string` (and possibly more)',
          ru: 'У `value` есть поле `id` типа `string` (и, возможно, другие поля)',
        },
      },
      {
        id: 'c',
        text: {
          en: '`value` is narrowed to exactly `{ id: string }` with no extra keys',
          ru: '`value` сужается ровно до `{ id: string }` без дополнительных ключей',
        },
      },
      {
        id: 'd',
        text: {
          en: '`extends` here refers to class inheritance at runtime',
          ru: '`extends` здесь означает наследование классов во время выполнения',
        },
      },
    ],
    correctAnswerIds: ['b'],
  },
  {
    id: 'ts-conditional-mapped-q01',
    topicId: 'ts-conditional-mapped',
    level: 'senior',
    type: 'single',
    prompt: {
      en: 'In `type ElementType<T> = T extends (infer U)[] ? U : never`, what does `infer U` do?',
      ru: 'В типе `type ElementType<T> = T extends (infer U)[] ? U : never` что делает `infer U`?',
    },
    explanation: {
      en: '`infer` introduces a type variable: if `T` matches an array pattern, `U` becomes the element type; otherwise `never`.',
      ru: '`infer` вводит тип-переменную: если `T` совпадает с массивом, `U` — тип элемента; иначе `never`.',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'It captures the array element type when `T` is an array type',
          ru: 'Захватывает тип элемента массива, если `T` — тип массива',
        },
      },
      {
        id: 'b',
        text: {
          en: 'It forces `T` to be `never`',
          ru: 'Принудительно делает `T` типом `never`',
        },
      },
      {
        id: 'c',
        text: {
          en: 'It only works for tuples, not `Array<T>`',
          ru: 'Работает только для кортежей, но не для `Array<T>`',
        },
      },
      {
        id: 'd',
        text: {
          en: 'It is invalid syntax in TypeScript',
          ru: 'Это недопустимый синтаксис в TypeScript',
        },
      },
    ],
    correctAnswerIds: ['a'],
  },
  {
    id: 'react-components-jsx-q01',
    topicId: 'react-components-jsx',
    level: 'junior',
    type: 'single',
    prompt: {
      en: 'What is the primary purpose of the `key` prop when rendering a list of elements?',
      ru: 'Какова основная роль пропа `key` при рендере списка элементов?',
    },
    explanation: {
      en: '`key` helps React identify which items changed, were added, or removed across renders to reconcile efficiently.',
      ru: '`key` помогает React сопоставлять элементы между рендерами для эффективного согласования дерева.',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Set the HTML `id` attribute on the DOM node',
          ru: 'Задать HTML-атрибут `id` на DOM-узле',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Control CSS ordering only',
          ru: 'Управлять только порядком в CSS',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Give React a stable identity for each item in the list',
          ru: 'Дать React стабильную идентичность для каждого элемента списка',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Replace the need for `props` on list items',
          ru: 'Заменить необходимость в `props` у элементов списка',
        },
      },
    ],
    correctAnswerIds: ['c'],
  },
  {
    id: 'react-hooks-data-q01',
    topicId: 'react-hooks-data',
    level: 'middle',
    type: 'single',
    prompt: {
      en: 'What does an empty dependency array `[]` mean in `useEffect(() => { ... }, [])`?',
      ru: 'Что означает пустой массив зависимостей `[]` в `useEffect(() => { ... }, [])`?',
    },
    explanation: {
      en: 'The effect runs after the first paint (mount) and the cleanup runs on unmount; it does not re-run on ordinary prop/state updates.',
      ru: 'Эффект выполняется после первого рендера (монтирования), очистка — при размонтировании; при обычных обновлениях props/state не перезапускается.',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Run the effect after every render',
          ru: 'Выполнять эффект после каждого рендера',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Disable the effect entirely',
          ru: 'Полностью отключить эффект',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Run only in development mode',
          ru: 'Выполнять только в режиме разработки',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Run the effect once after mount; cleanup on unmount',
          ru: 'Выполнить эффект один раз после монтирования; очистка при размонтировании',
        },
      },
    ],
    correctAnswerIds: ['d'],
  },
  {
    id: 'react-concurrent-q01',
    topicId: 'react-concurrent',
    level: 'senior',
    type: 'single',
    prompt: {
      en: 'What is the main goal of wrapping a state update in `startTransition`?',
      ru: 'Какова основная цель обёртки обновления состояния в `startTransition`?',
    },
    explanation: {
      en: 'It marks the update as non-urgent so React can keep the UI responsive and interrupt or defer that work if needed.',
      ru: 'Помечает обновление как некритичное, чтобы React мог сохранять отзывчивость UI и при необходимости откладывать работу.',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Force synchronous flushing before paint',
          ru: 'Принудительно синхронно сбросить состояние до отрисовки',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Mark the update as a lower-priority, interruptible transition',
          ru: 'Пометить обновление как менее приоритетный, прерываемый transition',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Replace `useEffect` for data fetching',
          ru: 'Заменить `useEffect` для загрузки данных',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Disable concurrent features for that update',
          ru: 'Отключить concurrent-режим для этого обновления',
        },
      },
    ],
    correctAnswerIds: ['b'],
  },
]
