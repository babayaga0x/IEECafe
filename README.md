# ☕ MVEKafe

Cafe web application built with [Next.js](https://nextjs.org/).

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)
![Biome](https://img.shields.io/badge/Biome-1.9-60A5FA?style=flat-square)

## ✨ Features

- 🖼️ **Static Pages** — home, about, menu, etc.
- 🔄 **API Routes** — `/api/products`, `/api/users/login`, etc.
- 🖼️ **Media Files** — image support (.webp and more)
- 📝 **Linting & Formatting** — automatic code checks with Biome

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js 15 | Framework |
| React 19 | UI Library |
| TypeScript | Type Safety |
| Biome | Linting & Formatting |

## 🚀 Quick Start

### Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### Development Mode

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

### Production Build

1. Build the application:

```bash
npm run build
# or
yarn build
# or
pnpm build
# or
bun build
```

2. Run the production server:

**Windows (PowerShell):**

```powershell
$env:PORT=5000; npm start
```

**Linux / macOS:**

```bash
PORT=5000 npm start
```

Open [http://localhost:5000](http://localhost:5000).

---

## 📋 Available Scripts

| Command | Description |
|---------|-------------|
| `dev` | Start development server |
| `build` | Create production build |
| `start` | Run production server |
| `lint` | Check code for errors |
| `format` | Auto-format code |

---

## 🔧 Configuration

This project uses [Biome](https://biomejs.dev/) for:

- Code formatting
- Linting
- Import organization

Config file: [`biome.json`](biome.json)

---

## 📌 Recommendations

> ⚠️ Keep **only one lockfile** in the project (`package-lock.json` or `yarn.lock`).

If needed, update the browser data package:

```bash
npm i baseline-browser-mapping@latest -D
```

---

## 📄 License

MIT
