# CampOrganizer Auth v2 - Architecture Visualization

Interactive visual documentation of CampOrganizer's Authentication v2 architecture built with Nuxt 4 and Vue Flow.

🔗 **Live Demo**: [Deploy on Vercel]

## 🎯 Features

- **6 Interactive Scenarios** exploring different aspects of the auth system
- **Visual Flow Diagrams** showing token lifecycle and data flow  
- **Client vs Server Storage** clear distinction between access and refresh tokens
- **Security Patterns** demonstrating HttpOnly cookies and host isolation
- **Real-time Interactions** zoom, pan, and explore each scenario

## 📊 Scenarios

1. **Login & Storage** - Dual token system (Access + Refresh)
2. **Request Logic** - Smart TTL checks with preventive refresh & queue mechanism
3. **SSR Handling** - Server-side automatic token validation
4. **Host Isolation** - Cookie separation between applications  
5. **Tab Focus** - Auto-refresh on visibilitychange events
6. **Race Condition** - Parallel request queue with single refresh lock

## 🚀 Quick Start

```bash
# Install dependencies
yarn install

# Start development server
yarn dev

# Build for production
yarn build
```

Open [http://localhost:3000](http://localhost:3000) 🎉

## 🛠 Tech Stack

- **Nuxt 4.2.2** - SSR framework with amazing DX
- **Vue 3.5.25** - Composition API  
- **@vue-flow/core** - Interactive node-based diagrams
- **TypeScript** - Type safety

## 📦 Project Structure

```
├── pages/
│   ├── index.vue        # Landing page
│   └── auth-viz.vue     # Main visualization (6 scenarios)
├── public/              # Static assets
├── nuxt.config.ts       # Nuxt configuration
└── package.json         # Dependencies
```

## 🌐 Deploy to Vercel

### Option 1: Via GitHub (Recommended)

1. Push code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com)
3. Click **"Add New" → "Project"**
4. Select your repository
5. Click **"Deploy"** (Vercel auto-detects Nuxt 4)

### Option 2: Via CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

## 📝 Architecture Highlights

- **Dual Token System**: Access Token (client) + Refresh Token (HttpOnly server-only)
- **TTL-Based Refresh**: Preventive refresh when < 1/3 lifetime remains
- **Request Queue**: Prevents race conditions during token refresh
- **SSR-Ready**: Automatic server-side cookie handling
- **Security First**: HttpOnly cookies, host isolation, secure token flow

## 📚 Documentation

Each scenario includes:
- Interactive node diagram with zoom/pan
- Color-coded token flows (green = access, blue = refresh)
- Step-by-step annotations
- Edge cases and error handling

## 📝 License

CampOrganizer © 2025

## 🚀 Быстрый старт

### Установка зависимостей

```bash
yarn install
```

### Запуск dev-сервера

```bash
yarn dev
```

Откроется `http://localhost:3000` 🎉

### Сборка для продакшена

```bash
yarn build
```

### Превью продакшен-сборки

```bash
yarn preview
```

## 📁 Структура проекта

```
nuxt4-tailwind/
├── app/
│   └── app.vue              # Главный компонент
├── assets/
│   └── css/
│       └── main.css         # Tailwind CSS импорты
├── components/              # Vue компоненты
├── layouts/                 # Layouts
├── pages/                   # Страницы (file-based routing)
├── public/                  # Статические файлы
├── nuxt.config.ts           # Конфигурация Nuxt
├── postcss.config.js        # Конфигурация PostCSS для Tailwind v4
├── tsconfig.json            # TypeScript конфигурация
└── package.json             # Зависимости
```

## ⚙️ Важные файлы конфигурации

### postcss.config.js

Tailwind CSS v4 использует новый PostCSS плагин `@tailwindcss/postcss`:

```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

### assets/css/main.css

Импорт Tailwind CSS:

```css
@import "tailwindcss";
```

### nuxt.config.ts

Подключение CSS файла:

```typescript
export default defineNuxtConfig({
  css: ['~/assets/css/main.css']
})
```

## 📚 Полезные ссылки

- 📖 [Nuxt 4 Documentation](https://nuxt.com/docs)
- 🎨 [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- 🔧 [Tailwind PostCSS Plugin](https://tailwindcss.com/docs/installation/using-postcss)
- 💬 [Nuxt Discord](https://discord.com/invite/ps2h6QT)

## 🎯 Что нового в Tailwind v4?

- 🚀 Новый движок для быстрой компиляции
- 📦 Разделенные пакеты (`@tailwindcss/postcss`)
- 🎨 CSS-first конфигурация
- ⚡ Улучшенная производительность

## 📝 Лицензия

MIT
