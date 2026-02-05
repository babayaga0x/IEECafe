# МВЕКафе

## Запуск проекта

### Разработка (Development)

Сначала запустите сервер разработки:

```bash
npm run dev
# или
yarn dev
# или
pnpm dev
# или
bun dev
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере, чтобы увидеть результат.

---

### Продакшн-билд (Production Build)

1. Сборка приложения:

```bash
npm run build
# или
yarn build
# или
pnpm build
```

2. Запуск собранного приложения:

**На Windows (PowerShell):**

```powershell
$env:PORT=5000; npm start
```

**На Linux/macOS:**

```bash
PORT=5000 npm start
```

3. Откройте [http://localhost:5000](http://localhost:5000) в браузере, чтобы проверить продакшн-версию.

---

### Проверка

* Статические страницы (`/`, `/about`, `/menu` и т.д.)
* Динамические API роуты (`/api/products`, `/api/users/login` и т.д.)
* Картинки и медиа-файлы, например `.webp`
* Логи ошибок в терминале

---

### Линтинг и форматирование (Biome)

Для проверки кода и автоформатирования используется **Biome**.

1. Проверка линтинга:

```bash
npm run lint
# или
yarn lint
# или
pnpm lint
```

2. Автоформатирование кода:

```bash
npm run format
# или
yarn format
# или
pnpm format
```

**Файл конфигурации:** `biome.json`

* Включает форматирование, линтинг, организацию импортов
* Поддерживает Next.js и React
* Учитывает `.gitignore` и исключает папки сборки (`.next`, `node_modules`, `dist`, `build`)

---

### Рекомендации

* Убедитесь, что у вас **только один lockfile** (`package-lock.json` или `yarn.lock`) в проекте.
* При необходимости обновите пакет для браузерных данных:

```bash
npm i baseline-browser-mapping@latest -D
```

* Всегда проверяйте билд перед деплоем, чтобы убедиться, что:

  * Все страницы рендерятся корректно
  * API роуты работают
  * Медиа-файлы (например `.webp`) загружаются правильно

