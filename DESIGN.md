---
name: Евгений Григорьев — От направления к системе
description: Тёплая скульптурная архитектура и человеческий масштаб персонального лендинга.
colors:
  paper: "#f5f1ea"
  ink: "#252c2c"
  accent: "#a4432b"
  pale: "#e8e6df"
  dark: "#263332"
  white: "#fff"
  hero-ground: "#f8eee2"
  orbit: "#9d7860"
  foreground: "#a8b9ba"
  portrait-ground: "#e7e3dc"
  portal-stroke: "#d7906f"
typography:
  display:
    fontFamily: "'Manrope Variable', sans-serif"
    fontSize: "clamp(64px, 7.1vw, 102px)"
    fontWeight: 500
    lineHeight: 1.03
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "'Manrope Variable', sans-serif"
    fontSize: "clamp(42px, 4.6vw, 72px)"
    fontWeight: 500
    lineHeight: 1.03
    letterSpacing: "-0.04em"
  body:
    fontFamily: "'Manrope Variable', sans-serif"
    fontSize: "18px"
    lineHeight: 1.65
  topic-title:
    fontFamily: "'Manrope Variable', sans-serif"
    fontSize: "27px"
    fontWeight: 500
    letterSpacing: "-0.025em"
  button:
    fontFamily: "'Manrope Variable', sans-serif"
    fontSize: "14px"
    fontWeight: 650
    lineHeight: 1.5
  evidence:
    fontFamily: "'Manrope Variable', sans-serif"
    fontSize: "clamp(72px, 7vw, 110px)"
    fontWeight: 450
    lineHeight: 0.9
    letterSpacing: "-0.04em"
rounded:
  square: "0"
  dot: "50%"
spacing:
  section: "128px"
  section-tablet: "100px"
  section-mobile: "80px"
  mobile-gutter: "22px"
  button-gap: "32px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.white}"
    typography: "{typography.button}"
    rounded: "{rounded.square}"
    padding: "21px 25px"
  button-primary-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
  button-light:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.square}"
    padding: "21px 25px"
  button-light-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
  experience-surface:
    backgroundColor: "{colors.dark}"
    textColor: "{colors.paper}"
  meeting-surface:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.paper}"
---

# Design System: Евгений Григорьев

## Overview

**Creative North Star: «Архитектурная скульптура маршрута».** Тёплый свет, терракотовый путь и авторский персонаж превращают переход от замысла к работающей системе в пространственное путешествие. Матовый гипс, дымчатое стекло и спокойные текстовые главы удерживают человеческий масштаб рядом с крупной архитектурой.

Это документация финальной реализации по брифу от 28.10.2026. Пользователь поручил полный редизайн без промежуточного подтверждения; отдельного утверждённого макета нет, концепция реализована в коде. Taste сохранил pinned-poster, seed **2056948075**. Impeccable concept-seed действительно вызван (`eaf3ff8375db28cca40683483d026d43`); явный бриф переопределил случайные стилевые предложения, шрифты и фотографии. iCapital — референс глубины и темпа, без переноса чужих материалов.

**Key Characteristics:**

- Авторский 3D персонаж и архитектурные сцены вместо стоковой фотографии.
- Терракота, слоновая кость и тёмный сланец; крупная кириллическая типографика.
- Асимметричные пары текста и сцены, открытые поверхности без карточной сетки.
- Естественная прокрутка; движение дополняет доступный HTML.

## Colors

Тёплая нейтральная основа поддерживает терракотовый маршрут; холодноватый сланец отделяет главу об опыте.

### Primary

- **Терракота — accent:** основной CTA, активный заголовок раскрытого направления, финальная секция, точка имени и выделение текста.

### Neutral

- **Слоновая кость — paper:** основной фон, текст тёмной главы, светлая кнопка финала.
- **Угольный сланец — ink:** основной текст и фон CTA при наведении.
- **Глубокий сланец — dark:** сплошная поверхность секции опыта.
- **Гипс — pale:** фон многослойной сцены и её непрерывная подложка.
- **Белый — white:** текст основной кнопки и выделения.
- **hero-ground / portrait-ground:** подложки первого экрана и портрета.
- **orbit / foreground / portal-stroke:** линия орбиты, геометрия переднего плана и контур портала; значения заданы в frontmatter.

Терракота может занимать целую финальную секцию: не вводить несуществующее ограничение процента акцента. Цвета интерфейса остаются согласованными с изображениями, но не заменяют их палитру.

## Typography

**Display / Body Font:** локальный `Manrope Variable`, fallback `sans-serif`, с кириллицей. Источник подключения — `@fontsource-variable/manrope` в BaseLayout; отдельного serif или mono нет.

### Hierarchy

- **Display:** `clamp(64px, 7.1vw, 102px)`, 500, 1.03, tracking −0.04em. Верхний предел **102px** — фактическое выразительное решение брифа, заменяющее прежнюю запись 96px. В диапазоне 761–1100px имя имеет 76px; до 760px — `clamp(50px, 13.5vw, 78px)`.
- **Headline:** `clamp(42px, 4.6vw, 72px)`, 500, 1.03, −0.04em. На телефоне — `clamp(36px, 10vw, 54px)`. Авторские переносы сохраняют две строки. Финальный заголовок отдельно: `clamp(60px, 6.6vw, 96px)`, на телефоне 60px, до 360px 53px.
- **Body:** 18px / 1.65, на телефоне 16px; максимальная длина абзаца 60ch. Локальные текстовые колонки дополнительно ограничены 290–650px.
- **Hero role / message:** 18px / 20px с line-height 1.5; на телефоне 15px / 17px; от 1900px 20px / 22px.
- **Topic title:** 27px, 500, −0.025em; 23px на планшете, 22px на телефоне, 20px до 360px. Описание 16px, на телефоне 15px.
- **Evidence:** числа `clamp(72px, 7vw, 110px)`, 450, 0.9, −0.04em, tabular-nums; на телефоне 68px, до 360px 58px. Знак `+` — 0.55em.
- **Label / utility:** навигация 14px; финальные переопределения CSS дают контакту шапки, футеру, подписи источника и нижней строке hero **13px на всех размерах**. Wordmark 17px / 750 / 1.2, на телефоне 14px.

## Layout

Шесть глав: имя → направления → опыт → подход → человек → встреча. Основной контейнер `width:min(90%,1760px)`; до 760px `calc(100% - 44px)`, то есть поля 22px. `.section` имеет вертикальные отступы 128px, в 761–1100px 100px, до 760px 80px. Минимальная ширина body 320px. Breakpoints: ≤360, ≤760, 761–1100 и ≥1900px.

На desktop вступление — сетка 1.1fr/1fr с gap 10%; направления — 1.15fr/.85fr с gap 8%; опыт — три колонки 1fr/1fr/1.15fr с gap 9%; человек — 1fr/1.1fr с gap 12%; встреча — 1.2fr/1fr с gap 10%. От 1900px сцены растут, а контейнер сохраняет предел 1760px.

Hero: 100svh, min-height 820px, max-height 1200px; планшетный минимум 760px. На телефоне высота естественная с минимумом 960px, имя начинается на 133px, сцена сдвинута ниже текста (`top:390px; bottom:36px; left:-53%; right:-3%`), изображение кадрируется на 75% по горизонтали. До 360px минимум 970px, текст начинается на 125px, сцена на 410px.

На телефоне композиция направлений и блока человека перестраивается: текст читается последовательно, иллюстрация направлений предшествует списку, личный текст предшествует портрету. Высоты иллюстраций 245px и 450px. Опыт превращается в двухколоночные цифры с вводным блоком на всю ширину. Меню доступно через нативный `details`; финальная сцена становится небольшим фрагментом портала. При 390px контейнер равен 346px, имя 52.65px, обычный h2 39px.

## Elevation & Depth

Основные поверхности плоские, без теней карточек. Глубину создают растровая архитектура, перекрытия, масштаб персонажа, тональные поверхности и отдельные слои сцены подхода. Единственная интерфейсная тень — мобильное меню: `0 18px 30px #252c2c1a`.

Сцена подхода: desktop 850px и min-height 90svh; 820px на планшете, 1050px от 1900px. Текст на z-index 2, система на z-index 1, непрерывный pale-фон под слоями. На телефоне высота 900px; система занимает 116% ширины и 49% высоты, стоит на 105px выше низа. Передний блок имеет `skewY(-16deg)` и opacity .7.

При `prefers-reduced-motion:no-preference` GSAP добавляет вступление `expo.out`, hero parallax, поворот орбиты, расхождение трёх слоёв и движение портала. Только desktop ≥761px фиксирует `.approach-stage`, добавляя `+=45%` (45vh) прокрутки. Scrub .6/.7/.8; прокрутка остаётся браузерной. `gsap.matchMedia` очищает эффекты через revert; ScrollTrigger обновляется после шрифтов, decode и загрузок изображений. При reduced motion движения и CSS transitions отключены. Без JS текст, ссылки и нативные раскрытия остаются доступны; элементы не спрятаны opacity-анимацией.

## Shapes

Кнопки и поверхности прямоугольные, radius 0. Единственный круглый UI-акцент — точка 7×7px с radius 50% рядом с именем. Крупные арки и орбита принадлежат пространственной метафоре: контур финального портала имеет stroke 26 в SVG 400×400; орбита — stroke 1. Иконки ссылок — линейные SVG 24×24, stroke 1.5; в контакте шапки 18×18, на телефоне ширина 16px.

## Components

### Buttons

Уверенные прямоугольные ссылки. Основная: accent/white, padding 21px 25px, gap 32px, min-height 64px, 14px / 650 / 1.5. Светлая: paper/ink. Обе при hover становятся ink/white; transition цвета и фона .2s. Active смещает на 2px вниз только без reduced motion. До 760px: padding 17px 20px, gap 24px, min-height 60px, текст 13px; до 360px gap 18px и разрешён перенос перед «встречу-знакомство». Единственное основное действие ведёт в Telegram.

### Navigation

Абсолютная шапка, z-index 5, padding-block 28px, desktop gap ссылок 38px (20px на планшете). Ссылки имеют минимум 44px по высоте и terracotta-hover. До 760px — нативное меню «Меню» без JS: панель от top 80px, paper-фон, padding 18px 24px; ссылки 17px и min-height 48px. Контакт «Познакомиться» остаётся в шапке.

### Topic disclosure

Нативные `details/summary`, первое раскрыто при загрузке. Финальный CSS убирает разделители: каждый topic имеет padding-block 27px, соседние получают margin-top 5px, у первого padding-top 0. Индикатор 20px, линии 18×1px: плюс складывается в минус. Раскрытый заголовок accent. Body padding 20px 45px 6px 0; на телефоне padding-right 0. Раскрытие показывает текст; иллюстрация общая для списка, переключения сцены нет.

### Evidence and editorial surfaces

Свободные типографические блоки на dark-фоне, без карточной оболочки. Ссылка компании `clamp(35px,3.5vw,54px)`, на телефоне 29px. Цифры имеют собственную иерархию; подпись не превращается в badge. Форм, полей, chips и диалогов в системе нет.

### Focus and skip link

Все ссылки и summary: `outline:3px solid currentColor; outline-offset:6px`. Skip link закреплён на top/left 12px, z-index 20, ink/paper и padding 16px; при фокусе выходит из `translateY(-150%)`. SVG-декор скрыт от assistive technology; смысловые изображения имеют alt, декоративная система — пустой alt.

## Do's and Don'ts

### Do:

- **Do** сохранять узкое вытянутое лицо, длинный нос, высокий лоб, скульптурную причёску, щетину, длинную шею и стройное тело исходного персонажа; сравнивать новые сцены с model sheet.
- **Do** хранить исходник отдельно, производные в src/assets, происхождение и промпты в docs/research.
- **Do** сохранять видимый HTML, нативные раскрытия, keyboard focus, отдельную мобильную композицию и reduced motion.
- **Do** проверять 390×844, 1366×768, 1920×1080 и вложенный Pages base после изменений.

### Don't:

- **Don't** заменять персонажа стоковой фотографией, размывать его пропорции или переносить материалы iCapital.
- **Don't** добавлять вымышленные достижения, цены, отзывы, контакты или альтернативные основные CTA.
- **Don't** превращать открытые редакционные главы в повторяющуюся сетку карточек.
- **Don't** добавлять scroll hijacking, мобильный pin или скрывать смысловой контент до исполнения JS.
