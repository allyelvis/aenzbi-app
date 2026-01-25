# AENZBi ERP System

## Overview

AENZBi is a comprehensive Enterprise Resource Planning (ERP) and Point of Sale (POS) system designed for business management. The application provides real-time sales invoice transactions, stock movement tracking, customer relationship management (CRM), expense tracking, task management, and reporting capabilities. The system features both a web-based interface built with React and a mobile component using React Native.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Web Application:**
- Built with React 18 and TypeScript
- Uses Vite as the build tool and development server
- State management via TanStack React Query for server state
- Routing handled through client-side page state (not using a router library for navigation)
- UI components built with Radix UI primitives for accessibility
- Styling with Tailwind CSS and class-variance-authority for component variants
- Data visualization using Recharts library

**Mobile Application (AENZBiApp):**
- React Native application for mobile POS functionality
- Uses React Navigation for screen navigation
- Separate package with its own dependencies

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
- Routes organized by resource type (customers, products, sales orders, leads, expenses, tasks)

### Data Storage

**Database:**
- PostgreSQL database (configured via DATABASE_URL environment variable)
- Drizzle ORM for database operations and type-safe queries
- Schema defined in `shared/schema.ts` with tables for:
  - Users and roles (authentication)
  - Customers and suppliers
  - Products and categories
  - Sales orders and order items
  - Leads (CRM)
  - Expenses
  - Tasks
  - Invoices and accounts

**Schema Design Decisions:**
- Decimal types used for financial fields (prices, amounts) for precision
- Timestamps for audit trails
- JSONB for flexible permissions storage
- Relations defined using Drizzle's relation helpers

### Authentication

- Passport.js with local strategy for authentication
- Express sessions with memorystore for session management
- Role-based access control with permissions stored as JSONB

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

## External Dependencies

### Database
- **PostgreSQL** - Primary database (requires DATABASE_URL environment variable)
- **@neondatabase/serverless** - Neon database driver for serverless PostgreSQL
- **Drizzle ORM** - Database toolkit and query builder

### UI Component Libraries
- **Radix UI** - Accessible component primitives (dialog, dropdown, select, tabs, toast, etc.)
- **Lucide React** - Icon library
- **Recharts** - Charting library for data visualization

### Form Handling
- **React Hook Form** - Form state management
- **Zod** - Schema validation
- **@hookform/resolvers** - Zod integration with React Hook Form

### Styling
- **Tailwind CSS** - Utility-first CSS framework
- **tailwind-merge** - Merge Tailwind classes intelligently
- **class-variance-authority** - Component variant management

### Server
- **Express.js** - Web server framework
- **express-session** - Session middleware
- **Passport.js** - Authentication middleware
- **passport-local** - Local authentication strategy

### Development
- **Vite** - Build tool and development server
- **TypeScript** - Type checking
- **drizzle-kit** - Database migration tooling