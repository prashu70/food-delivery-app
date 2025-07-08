# Food Delivery App 🍔

A full‑stack food‑ordering web application built with **Next.js 13 App Router**, **TypeScript**, **Tailwind CSS**, and **Prisma/PostgreSQL**.

---

## ✨ Features

* **Authentication** – secure email + password flow with NextAuth & bcrypt
* **Browse restaurants** – landing page carousel, categories & featured sections
* **Dynamic menus** – menu items with images, price & description
* **Shopping cart** – client‑side cart and order summary
* **Responsive UI** – mobile‑first design, dark‑mode support via Radix primitives
* **Developer DX** – ESLint, Prettier, Turborepo, fast refresh

> *Project status: **Work in Progress** – feel free to fork & hack on it!*

---

## 🛠 Tech Stack

| Layer     | Tech                                                         |
| --------- | ------------------------------------------------------------ |
| Front‑end | Next.js 13 · React 18 · TypeScript · Tailwind CSS · Radix UI |
| State     | React‑Hook‑Form · Context API                                |
| Back‑end  | Next.js API Route Handlers (REST)                            |
| ORM / DB  | Prisma ORM · PostgreSQL                                      |
| Auth      | NextAuth.js (Credentials provider)                           |
| Tooling   | pnpm · ESLint · Prettier · Turborepo                         |

---

## 🚀 Getting Started

### 1 · Prerequisites

* **Node.js ≥ 18**
* **pnpm** (or npm / yarn)
* **PostgreSQL** instance

### 2 · Clone & Install

```bash
git clone https://github.com/prashu70/food-delivery-app.git
cd food-delivery-app
pnpm install
```

### 3 · Environment Variables

Create a **`.env`** file at the root:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/fooddash"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="aLongRandomString"
```

### 4 · Database & Prisma

```bash
pnpm prisma migrate dev --name init   # run initial migration
pnpm prisma generate                  # generate client (also runs on install)
```

### 5 · Run the App

```bash
pnpm dev        # http://localhost:3000
pnpm build      # production build
pnpm start      # start production server
```

---

## 📁 Project Structure

```
.
├── app/                 # Next.js App Router routes & pages
│   ├── api/             # REST endpoints (route handlers)
│   └── (ui)             # Route groups / layout
├── components/          # Re‑usable UI components
├── hooks/               # Custom React hooks
├── lib/                 # Helpers (db, auth, utils)
├── prisma/              # Prisma schema & migrations
└── types/               # Shared TS types
```

---

## 🗺️ Roadmap

* [ ] Persist cart & orders table
* [ ] Payment gateway integration (Stripe)
* [ ] Real‑time order tracking with Pusher
* [ ] Admin dashboard for restaurants

---

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feat/awesome-feature`)
3. Commit your changes (`git commit -m 'feat: add awesome feature'`)
4. Push to the branch (`git push origin feat/awesome-feature`)
5. Open a pull request

---

## 📄 License

Distributed under the **PRASHU License**. See `LICENSE` for more information.
