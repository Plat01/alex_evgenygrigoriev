# Основа лендинга

Astro static + TypeScript + CSS/SVG + GSAP/ScrollTrigger. Этот коммит содержит подготовку окружения и проверочный стенд. Содержание будущего лендинга определяется отдельно.

## Запуск

```bash
npm ci
npm run dev -- --host 0.0.0.0
npm run check
npm run build
npm run preview -- --host 0.0.0.0
```

Node 22.23.4+; проектный Node также присутствует в devDependencies. Пакеты фиксирует package-lock.json.

## Структура и инструменты

- assets/ — неизменяемые оригиналы, src/assets/ — производные и генерации.
- src/pages/, src/layouts/, src/styles/, src/scripts/ — страница, layout, CSS и GSAP.
- .agents/skills/ — проектные Codex skills: Impeccable, Taste, пять GSAP skills.
- .codex/config.toml — проектный Context7; MCP HTTP реально проверен. После перезапуска сессии сервер появляется в списке инструментов.
- .codex/hooks.json — hook Impeccable, доверие проверяется в /hooks. Ручные команды context/detect работают.
- Playwright MCP и официальный встроенный Imagegen уже доступны; дубли не устанавливаются.
- docs/research/ — наблюдения iCapital, промпт, источники и ответы Context7.
- docs/qa/ — проверки подготовленного стенда и скриншоты.

```bash
npm run docs:check
npm run design:check
```

Ключи в репозиторий не записывать. Context7 проверен без ключа; при необходимости скрипт принимает CONTEXT7_API_KEY через окружение.

## GitHub Pages

CI при push/PR проверяет TypeScript и статическую сборку с вложенным base. pages.yml публикует автоматически после отдельного ручного workflow_dispatch. Обычный push не публикует сайт. Настройка GitHub: Settings → Pages → Source: GitHub Actions.

Origin и base_path поступают от actions/configure-pages через PAGES_SITE/PAGES_BASE. Ручная локальная проверка:

```bash
PAGES_SITE=https://example.github.io PAGES_BASE=/landing-check/ npm run build
PAGES_SITE=https://example.github.io PAGES_BASE=/landing-check/ npm run preview -- --host 0.0.0.0
```

Открыть http://localhost:4321/landing-check/. После смены base перезапустить preview. Стенд содержит noindex. Публикация требует отдельного поручения.
