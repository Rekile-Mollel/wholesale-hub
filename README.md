# Wholesale Hub

Mobile-first inventory, sales, and receipt management system for wholesale shops.

## Overview

Wholesale Hub is designed to help wholesale shops manage products, stock, sales, and receipts from a clean, responsive web app. The project is currently focused on building the core user interface and database foundation before connecting full business workflows.

## Problem It Solves

- Manual stock tracking
- Difficulty knowing low-stock items
- Poor sales visibility
- Lack of organized receipts

## Current Features

- Responsive dashboard layout
- Products page UI
- Add product form UI
- Sales page UI
- Receipts page UI
- Prisma setup with Product model

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- Prisma
- SQLite

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Run Prisma migrations:

```bash
npx prisma migrate dev
```

## Project Structure

```text
src/app/(app)          App routes for the dashboard, products, sales, and receipts
src/components         Shared React components and shadcn/ui components
src/lib                Shared utilities and Prisma client setup
prisma/schema.prisma   Prisma database schema
```

## Roadmap

- Connect product form to database
- Display real products
- Add edit/delete products
- Add sales logic
- Auto-reduce stock after sale
- Generate real receipts
- Dashboard analytics
- Authentication and user roles
- PostgreSQL deployment later

## Status

In development.

## Developer Note

This project is being built step-by-step as a real-world full-stack learning project.
