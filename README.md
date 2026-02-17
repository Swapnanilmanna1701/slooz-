# Slooz - Commodities Management System

A full-stack commodities management system with role-based access control, built with NestJS (GraphQL) and Next.js.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | NestJS, GraphQL (Apollo Server), Prisma ORM |
| Frontend | Next.js 16, TypeScript, Tailwind CSS v4, Apollo Client v4 |
| Database | SQLite (via Prisma) |
| Auth | JWT-based authentication with RBAC |

## Project Structure

```
slooz/
  backend/          # NestJS GraphQL API (port 4000)
    prisma/         # Schema & migrations
    src/
      auth/         # Login, JWT strategy, guards, decorators
      prisma/       # Prisma service (global)
      products/     # CRUD resolvers & service, dashboard stats
      users/        # User model & Role enum
  frontend/         # Next.js App Router (port 3001)
    src/
      app/          # Pages: login, dashboard, products, products/new, products/[id]/edit
      components/   # Layout (Sidebar, Header, AppLayout), guards (RoleGuard), forms
      context/      # AuthContext, ThemeContext
      lib/          # Apollo client, GraphQL queries, types
```

## Quick Start

### Prerequisites
- Node.js >= 20
- npm

### 1. Backend Setup

```bash
cd backend
npm install
npx prisma migrate dev --name init   # Creates SQLite DB & seeds data
npm run start:dev                     # Runs on http://localhost:4000/graphql
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev                           # Runs on http://localhost:3001
```

## Sample Login Credentials

| Role | Email | Password |
|------|-------|----------|
| Manager | manager@slooz.com | password123 |
| Store Keeper | keeper@slooz.com | password123 |

## Role-Based Access Control

| Feature | Manager | Store Keeper |
|---------|---------|--------------|
| Login | Yes | Yes |
| Dashboard (stats & analytics) | Yes | No |
| View All Products | Yes | Yes |
| Add Product | Yes | Yes |
| Edit Product | Yes | Yes |
| Delete Product | Yes | No |
| Light/Dark Mode | Yes | Yes |
| Role-Based Menu | Yes | Yes |

## Feature Details

### Authentication (5 pts)
- Login page with client-side validation (email format, min 6 char password)
- JWT token stored in cookies, auto-attached to GraphQL requests
- `me` query to verify session

### Dashboard (30 pts) - Manager Only
- Total products, total quantity, inventory value, low stock count, categories count
- Category breakdown table with percentage bars
- Protected by `RoleGuard` and server-side `@Roles(MANAGER)` guard

### View All Products (10 pts)
- Sortable product table with search and category filter
- Low-stock items highlighted in red
- Accessible to both roles

### Add/Edit Products (15 pts)
- Shared `ProductForm` component for create/update
- Fields: name, description, SKU, category, price, quantity, unit
- Client-side validation

### Light/Dark Mode (15 pts)
- Toggle in header and login page
- Persisted in `localStorage`
- Respects system `prefers-color-scheme` on first visit
- Uses Tailwind CSS `dark:` variant with class strategy

### Role-Based Menu Restrictions (25 pts bonus)
- Sidebar dynamically shows/hides items based on role
- Dashboard link visible only to Managers
- Delete button visible only to Managers
- `RoleGuard` component prevents unauthorized page access
- Server-side guards (`JwtAuthGuard`, `RolesGuard`) enforce access on API level
- Router redirects: Manager -> Dashboard, Store Keeper -> Products

## Assumptions & Decisions

1. **Database**: SQLite chosen for zero-config local development (no external DB needed)
2. **Sample Data**: 12 commodities seeded across 5 categories (Beverages, Grains, Oils, Spices, Sweeteners)
3. **Auth Storage**: JWT stored in cookies (1-day expiry), user data also cached in cookies for fast client hydration
4. **Product Images**: `imageUrl` field exists in schema but image upload is not implemented (would need cloud storage)
5. **Dark Mode**: Class-based strategy (`html.dark`) rather than media query, stored in localStorage
6. **Ports**: Backend runs on 4000, Frontend on 3001 (CORS configured accordingly)
7. **Prisma Version**: v6.x used for CommonJS compatibility with NestJS (v7 requires ESM)
8. **Apollo Client**: v4 used; React hooks imported from `@apollo/client/react`
9. **Delete**: Only Managers can delete products (enforced on both frontend and backend)
10. **Categories**: Predefined list in the form dropdown (Beverages, Grains, Oils, Spices, Sweeteners, Dairy, Produce, Other)

## GraphQL API

Available at `http://localhost:4000/graphql` (with GraphQL Playground).

### Queries
- `me` - Get current user (auth required)
- `products` - List all products (auth required)
- `product(id)` - Get single product (auth required)
- `dashboardStats` - Get dashboard statistics (Manager only)

### Mutations
- `login(loginInput)` - Authenticate and receive JWT
- `createProduct(input)` - Add new product (auth required)
- `updateProduct(input)` - Update product (auth required)
- `deleteProduct(id)` - Delete product (Manager only)
