# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Artifacts

### Al-Yamen Business Dashboard (`artifacts/al-yamen/`)
- **Kind**: React + Vite SPA (frontend only, no backend)
- **Port**: 25716
- **Preview path**: `/`
- **Design**: Dark glassmorphism (deep navy, sky-400 accents, `glass-panel` / `glass-sidebar` / `glass-card` CSS classes)
- **Language**: Bengali/English/Arabic trilingual UI with RTL support for Arabic
- **i18n**: Custom LanguageContext at `src/contexts/LanguageContext.tsx` — persists in localStorage, updates `dir` attribute on `<html>`
- **Data**: All sample data in `src/data/sampleData.ts`
- **Pages** (17 routes):
  - Dashboard (`/`)
  - Transactions: Add (`/transactions/add`), All (`/transactions/all`), Recent (`/transactions/recent`)
  - Sales & Orders: New Order (`/sales/new-order`), Order History (`/sales/order-history`), Customers (`/sales/customers`)
  - Inventory: Add Product (`/inventory/add-product`), Add Company (`/inventory/add-company`), Stock List (`/inventory/stock-list`), Categories (`/inventory/categories`)
  - HR: Employees (`/hr/employees`), Payroll (`/hr/payroll`), Attendance (`/hr/attendance`)
  - Accounting: Daily Ledger (`/accounting/daily-ledger`), Expense Report (`/accounting/expense-report`)
  - Settings: System Config (`/settings/system`), User Roles (`/settings/user-roles`)
- **Key dependencies**: recharts, framer-motion, wouter, lucide-react
- **Firebase hosting**: `firebase.json` + `.firebaserc` included; build output → `dist/public/`
- **Build command**: `BASE_PATH="/" PORT=25716 pnpm run build` (from artifact dir)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
