# Евгений Григорьев

Готовый русскоязычный персональный лендинг. Astro static, TypeScript strict, Manrope Variable, CSS/SVG, GSAP и ScrollTrigger. Шесть секций, оригинальные 3D-иллюстрации, отдельные слои пространственной сцены, переход в Telegram.

## Посмотреть локально

Зависимости уже установлены. Переустановка для запуска не требуется.

```bash
npm run dev -- --host 0.0.0.0
```

Адрес выводится в терминале (обычно http://localhost:4321/). Если порт занят production preview, остановить его: `npm exec astro preview stop`.

```bash
npm run check
npm run build
npm run preview -- --host 0.0.0.0
```

Node 22.23.4+, проектный Node также присутствует в devDependencies. Для чистого checkout: `npm ci`.

## GitHub Pages

CI при push/PR выполняет check и сборку с вложенным base. Публикация — отдельный ручной workflow `Publish to GitHub Pages (manual)`, только после поручения. В этом задании не выполнялись commit, push или deploy.

`actions/configure-pages` передаёт origin/base_path через PAGES_SITE/PAGES_BASE; поддерживаются project Pages, user Pages и custom domain. Для публикации выбрать Settings → Pages → Source: GitHub Actions.

Проверенный production preview с вложенным путём:

```bash
PAGES_SITE=https://example.github.io PAGES_BASE=/alex_evgenygrigoriev/ npm run build
PAGES_SITE=https://example.github.io PAGES_BASE=/alex_evgenygrigoriev/ npm run preview -- --host 0.0.0.0
```

Открыть http://localhost:4321/alex_evgenygrigoriev/. После смены base нужно перезапустить preview. При возвращении к корневой сборке убрать PAGES_*.

## Материалы и проверки

- `src/pages/index.astro` — контент и семантическая разметка.
- `src/styles/global.css`, `src/scripts/motion.ts` — адаптация и движение.
- `assets/` — неизменённые оригиналы, `src/assets/` — производные и генерации.
- `docs/research/landing-art.md` — точные промпты и происхождение изображений.
- `docs/research/verification/` — production screenshots и отчёт браузера.
- `PRODUCT.md`, `DESIGN.md` — продукт и визуальная система.

Нативные details работают без JS. В режиме reduced motion нет закрепления и пространственного движения. Изображения импортированы через Astro и оптимизируются в адаптивные WebP, вторичные загружаются лениво. Формы, аналитики, фиктивной отправки нет.

Источник биографических сведений — https://evgenygrigoriev.ru/. Это заявления автора, независимо не проверялись. Telegram @GrigorievEvgene сверён с видимым контактом источника. Политика открывается на исходном домене.

Playwright MCP зарегистрирован и реально вызван, но вернул ошибку занятого профиля. Проверки выполнены тем же установленным Playwright/Chromium через отдельный процесс без изменения MCP. `scripts/verify-landing.mjs` принимает PLAYWRIGHT_MODULE (путь к уже установленному Playwright) и CHECK_URL; не устанавливает браузеры или пакеты.
