# 🏗 Project State Management Structure (Standard)

## 📂 Folder Structure

```
src/
├── app/
│   ├── store/                     # Global state management
│   │   ├── index.ts                # Barrel file / store initializer
│   │   ├── app.state.ts            # Root AppState interface
│   │   ├── app.reducer.ts          # Root reducer
│   │   ├── feature-a/              # Feature A state management
│   │   │   ├── feature-a.state.ts
│   │   │   ├── feature-a.actions.ts
│   │   │   ├── feature-a.reducer.ts
│   │   │   └── feature-a.selectors.ts
│   │   └── feature-b/              # Feature B state management
│   │       ├── feature-b.state.ts
│   │       ├── feature-b.actions.ts
│   │       ├── feature-b.reducer.ts
│   │       └── feature-b.selectors.ts
│   │
│   ├── components/                 # Dumb/presentational components
│   ├── containers/                 # Smart/components connected to store
│   ├── services/                   # API calls / business logic
│   └── utils/                      # Helpers
└── assets/
```

---

## 📜 File Responsibilities

### 1. **`app.state.ts`**

* Defines the **global AppState interface**.
* Aggregates feature states.

```ts
import { FeatureAState } from './feature-a/feature-a.state';
import { FeatureBState } from './feature-b/feature-b.state';

export interface AppState {
  featureA: FeatureAState;
  featureB: FeatureBState;
}
```

---

### 2. **`app.reducer.ts`**

* Combines all feature reducers into one root reducer.

```ts
import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './app.state';
import { featureAReducer } from './feature-a/feature-a.reducer';
import { featureBReducer } from './feature-b/feature-b.reducer';

export const appReducers: ActionReducerMap<AppState> = {
  featureA: featureAReducer,
  featureB: featureBReducer
};
```

---

### 3. **Feature State Files**

* Each feature has its **own folder** with 4 files:

```ts
// feature-a.state.ts
export interface FeatureAState {
  items: string[];
  loading: boolean;
}
```

```ts
// feature-a.actions.ts
import { createAction, props } from '@ngrx/store';

export const loadItems = createAction('[Feature A] Load Items');
export const loadItemsSuccess = createAction(
  '[Feature A] Load Items Success',
  props<{ items: string[] }>()
);
```

```ts
// feature-a.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as FeatureAActions from './feature-a.actions';
import { FeatureAState } from './feature-a.state';

export const initialState: FeatureAState = {
  items: [],
  loading: false
};

export const featureAReducer = createReducer(
  initialState,
  on(FeatureAActions.loadItems, (state) => ({ ...state, loading: true })),
  on(FeatureAActions.loadItemsSuccess, (state, { items }) => ({
    ...state,
    items,
    loading: false
  }))
);
```

```ts
// feature-a.selectors.ts
import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const selectFeatureA = (state: AppState) => state.featureA;
export const selectItems = createSelector(selectFeatureA, (state) => state.items);
```

---

### 4. **`index.ts`**

Two roles possible (your choice):

#### 🔹 Option A: Barrel file (clean imports)

```ts
// app/store/index.ts
export * from './app.state';
export * from './app.reducer';
export * from './feature-a/feature-a.actions';
export * from './feature-a/feature-a.selectors';
export * from './feature-b/feature-b.actions';
export * from './feature-b/feature-b.selectors';
```

Usage:

```ts
import { AppState, appReducers, loadItems } from '../store';
```

#### 🔹 Option B: Store initialization (NgRx / Redux Toolkit)

Angular (NgRx):

```ts
import { provideStore } from '@ngrx/store';
import { appReducers } from './app.reducer';

export const AppStoreModule = [
  provideStore(appReducers),
];
```

React (Redux Toolkit):

```ts
import { configureStore } from '@reduxjs/toolkit';
import { appReducers } from './app.reducer';

export const store = configureStore({
  reducer: appReducers,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

---

## 🔄 Internal vs Global State

* **Global State (store):**

  * Cross-feature data (user, cart, authentication, settings).
  * Persistent or shared between multiple components.

* **Internal State (component-level):**

  * Temporary, UI-only data (modal open/close, form input before submit).
  * Use `useState` (React) or component properties (Angular).

**Rule of thumb:**
👉 If multiple components need it → **store**
👉 If only one component needs it → **local state**

---

## 📛 Naming Conventions

* **State files:** `*.state.ts`

* **Reducer files:** `*.reducer.ts`

* **Action files:** `*.actions.ts`

* **Selector files:** `*.selectors.ts`

* **Interfaces:**

  * `AppState` (root)
  * `FeatureAState` (feature-specific)

* **Reducers:**

  * `featureAReducer`
  * `featureBReducer`

* **Actions:**

  * `[Feature] ActionName`
    Example: `[Users] Load Users`, `[Cart] Add Item`

* **Selectors:**

  * `selectFeatureA`
  * `selectFeatureAItems`

---

✅ This gives you:

* Clean **folder structure**
* Clear **role for each file**
* Proper **AppState + Reducer setup**
* Good **index.ts usage**
* Strong **naming conventions**
* Guidance on **internal vs global state**


