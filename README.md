# 365Scores Quiz — SPA Architecture (POC: Question Page)

This repository is a **proof-of-concept SPA architecture** for a “365Scores-Quiz” with 2 routes planned:
- Welcome
- Question (implemented here)

The POC implements only the **Question page** and demonstrates:
- **Parent → child communication** via props
- **Global state** via a state management library
- **Minimal, modular component design**
- **Feature-based file organization**

## Tech choices (and why)

### Next.js (App Router) + React 19
- **Performance**: route-level code splitting by default, optimized bundling, and the ability to keep most UI as **Server Components** (zero client JS) and isolate interactivity behind small **Client Components** (`"use client"`)
- **UX**: built-in routing, streaming/server rendering options, and production optimizations
- **Scalability**: clean routing + conventions; easy to scale from SPA-like flows to more complex apps

### Zustand (state management)
Chosen for this quiz architecture because it is:
- **Bundle-efficient** (small dependency footprint)
- **Selector-based**: components can subscribe to *just the slice they need* → fewer unnecessary re-renders
- **Low boilerplate**: store + actions in one place, easy to reason about data flow

If the quiz data were remote and required caching/retries, we would typically add **TanStack Query** for server-state, while keeping Zustand for UI/quiz session state

## Architecture & file organization (recommended for a SPA)

Use a **feature-based (vertical slice)** structure, where each domain feature owns:
- types
- data/services
- store
- page-level components

In this POC:

```
src/
  app/
    quiz/
      question/
        page.tsx                # Route entry (Server Component)
  features/
    quiz/
      types.ts                  # Domain types
      data/
        questions.ts            # POC data (would become API/service)
      store/
        quizStore.ts            # Zustand store (global quiz state)
      question/
        QuestionCard.tsx        # Client container (uses store)
        OptionButton.tsx        # Child component (memoized)
        question.module.scss
```

### Separation of concerns
- **Route (`page.tsx`)**: thin server boundary, renders the interactive widget
- **Container (`QuestionCard`)**: orchestrates state + renders children
- **Presentational children (`OptionButton`)**: reusable UI, receives props and triggers actions
- **Store (`quizStore.ts`)**: single source of truth for question-page state transitions

## Data flow (explicit and scalable)

**Store state (POC):**
- `questions[]`
- `currentIndex`
- `status`: `idle | in_progress | answered`
- `selectedOptionId`
- `isCorrect`

**Flow:**
1. `QuestionCard` initializes quiz with `start(questions)` (POC uses local data)
2. `QuestionCard` selects current question from store and renders 4 `OptionButton`s
3. `OptionButton` receives `{ optionId, label }` and calls `selectOption(optionId)`
4. Store transitions `in_progress → answered`, sets `selectedOptionId` and `isCorrect`
5. `Next` calls `next()` to advance the question index

### Preventing unnecessary re-renders
- Components subscribe via **selectors** (not the whole store)
- `OptionButton` is wrapped in `React.memo`
- Event handler is stable via `useCallback`
- When returning objects, we use `useShallow` to avoid re-rendering due to referential changes

## “Ideal” Next.js performance practices for this SPA

These are the defaults we follow in the architecture:
- **Server Components by default**: only interactive parts should be `"use client"`
- **Small client boundary**: keep store usage inside the smallest possible subtree
- **Route-level splitting**: organize by route/feature so unused code doesn’t ship
- **Avoid heavy UI libs for POC**: reduce bundle size; add a design system only if needed
- **Memoization sparingly**: only where it prevents real re-renders (child option buttons, lists)
- **Measure**: use React Profiler + bundle analysis before “micro-optimizing”

## Implementation plan (what to build next)

### 1) Improve UX
- Show modal with explanation if answer is wrong
- Tooltip for percentages and counters
- Back button to check previous answer

### 2) Add real services
- Collect and display how user responses compare to those of others. Show the percentage of correct answers and the total number of selected options
- Load questions from an API (or static JSON) with caching
- Persist in-progress session (optional product decision)

### 3) Add quality gates
- Unit tests for store transitions
- E2E smoke test for the main quiz flow

### 4) Improve DX (tooling)
- Add **Prettier** with a shared config for consistent formatting
- Wire **Husky + lint-staged** to run ESLint/Prettier on pre-commit
- Setup **CI/CD** with github actions or other solution
- Optionally introduce commit message linting (Conventional Commits) for clearer history

## Running locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000` (or the port shown in the console).

## Deployment

This app is ready for deployment on **Vercel**:

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Import the project in [Vercel](https://vercel.com)
3. Vercel will auto-detect Next.js and configure build settings
4. Deploy!

The app uses Next.js App Router and will be automatically optimized for production with:
- Static page generation where possible
- Route-based code splitting
- Optimized asset bundling via Turbopack

### Build commands

- `npm run build` - Create production build
- `npm run start` - Start production server locally
- `npm run type-check` - TypeScript type checking
- `npm run lint` - ESLint code quality checks

