# AENZBi ERP System

## Overview

AENZBi is a comprehensive Enterprise Resource Planning (ERP) and Point of Sale (POS) system designed for business management. The application provides real-time sales invoice transactions, stock movement tracking, customer relationship management (CRM), expense tracking, task management, and reporting capabilities.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

- **Jan 26, 2026**: Added edit functionality to Customers and Products modules
- **Jan 26, 2026**: Added Point of Sale (POS) module for quick transactions with cart system
- **Jan 26, 2026**: Added sample data (8 products, 5 customers) for testing
- **Jan 25, 2026**: Added user authentication with Replit Auth (supports Google, GitHub, email login)
- **Jan 25, 2026**: Implemented subscription tiers (Free, Starter, Professional, Enterprise)
- **Jan 25, 2026**: Created landing page for unauthenticated users with pricing display
- **Jan 25, 2026**: Added user profile display and logout functionality in sidebar

## System Architecture

### Frontend Architecture

**Web Application:**
- Built with React 18 and TypeScript
- Uses Vite as the build tool and development server
- State management via TanStack React Query for server state
- Routing handled through client-side page state
- UI components built with Radix UI primitives for accessibility
- Styling with Tailwind CSS and class-variance-authority
- Data visualization using Recharts library

### Backend Architecture

**Server Framework:**
- Express.js server running on Node.js
- TypeScript for type safety
- Development server integrated with Vite for hot module replacement
- API routes prefixed with `/api/`

**API Design:**
- RESTful API structure
- JSON request/response format
- Storage abstraction layer (`storage.ts`) that interfaces with the database
- Routes organized by resource type (customers, products, sales orders, leads, expenses, tasks, subscriptions)

### Data Storage

**Database:**
- PostgreSQL database (configured via DATABASE_URL environment variable)
- Drizzle ORM for database operations and type-safe queries
- Schema defined in `shared/schema.ts` with tables for:
  - Auth users and sessions (Replit Auth)
  - Users and roles (internal users)
  - Customers and suppliers
  - Products and categories
  - Sales orders and order items
  - Leads (CRM)
  - Expenses
  - Tasks
  - Invoices and accounts

### Authentication

- **Replit Auth** via OpenID Connect (OIDC)
- Supports login via Google, GitHub, X, Apple, and email/password
- Express sessions stored in PostgreSQL
- Session management with connect-pg-simple
- Auth routes: `/api/login`, `/api/logout`, `/api/callback`, `/api/auth/user`

### Subscription System

**Tiers:**
- **Free**: 5 customers, 10 products, basic dashboard
- **Starter** ($29/mo): 50 customers, 100 products, reports
- **Professional** ($79/mo): Unlimited customers/products, advanced analytics, API access
- **Enterprise** ($199/mo): Everything + dedicated support, custom development

**Routes:**
- `GET /api/subscription/tiers` - List all available tiers
- `GET /api/subscription/current` - Get user's current subscription
- `POST /api/subscription/upgrade` - Upgrade/change subscription tier

### Module Structure

The ERP system includes these functional modules:
1. **Dashboard** - Overview statistics and charts
2. **Customers** - Customer management with segmentation
3. **Products** - Product catalog with inventory tracking
4. **Sales Orders** - Order processing workflow
5. **Leads/CRM** - Sales pipeline management
6. **Expenses** - Expense tracking and approval workflow
7. **Tasks** - Task management with priorities
8. **Inventory** - Stock level monitoring
9. **Reports** - Business analytics and reporting
10. **Subscription** - Plan management and upgrades

### Key Files

- `server/index.ts` - Main server entry point with auth setup
- `server/routes.ts` - API route definitions
- `server/subscriptionRoutes.ts` - Subscription management API
- `server/replit_integrations/auth/` - Replit Auth integration
- `shared/schema.ts` - Database schema definitions
- `shared/models/auth.ts` - Auth-specific schema (users, sessions)
- `client/App.tsx` - Main React application with auth state
- `client/pages/Landing.tsx` - Public landing page
- `client/pages/Subscription.tsx` - Subscription management UI
- `client/hooks/use-auth.ts` - Auth hook for React components

## External Dependencies

### Database
- **PostgreSQL** - Primary database
- **@neondatabase/serverless** - Neon database driver
- **Drizzle ORM** - Database toolkit and query builder

### Authentication
- **openid-client** - OpenID Connect client
- **passport** - Authentication middleware
- **express-session** - Session middleware
- **connect-pg-simple** - PostgreSQL session store

### UI Component Libraries
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library
- **Recharts** - Charting library

### Form Handling
- **React Hook Form** - Form state management
- **Zod** - Schema validation

### Styling
- **Tailwind CSS** - Utility-first CSS framework
- **tailwind-merge** - Merge Tailwind classes
- **class-variance-authority** - Component variant management

### Development
- **Vite** - Build tool and development server
- **TypeScript** - Type checking
- **drizzle-kit** - Database migration tooling
