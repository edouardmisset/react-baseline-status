# React Baseline Status

Re-implementation of the [Baseline Status](https://github.com/web-platform-dx/baseline-status) web component for React 19.

## Installation

```bash
pnpm add react-baseline-status
# or
npm install react-baseline-status
```

## Usage

Import the component and the CSS.

```jsx
import { BaselineStatus } from "react-baseline-status";
import "react-baseline-status/dist/react-baseline-status.css";

function App() {
  return (
    <div>
      <BaselineStatus featureId="anchor-positioning" />
    </div>
  );
}
```

## Features

- **React 19**: Uses `Suspense` and the `use` hook for data fetching.
- **Type Safe**: Includes a generated list of all 1000+ valid feature IDs for autocomplete.
- **Lightweight**: Zero dependencies (besides React).
- **Dual Registry**: Published to NPM and JSR.

## JSR Usage

```bash
pnpm dlx jsr add @baseline/status
```

## Development

1. `pnpm install`
2. `pnpm run generate-ids` (Updates the feature ID list from web-features)
3. `pnpm build`

## Fallow

Fallow is configured at the monorepo root (`.fallowrc.json`).

- `pnpm fallow`: run the full analysis suite
- `pnpm fallow:dead-code`: detect unused files, exports, types, and deps
- `pnpm fallow:dupes`: detect duplicated logic
- `pnpm fallow:health`: detect complexity hotspots
- `pnpm fallow:audit`: gate changes against the `main` base branch
