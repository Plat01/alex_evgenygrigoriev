# Проверка встроенного Imagegen

28.10.2026 использован официальный встроенный tool image_gen.imagegen и встроенный скилл imagegen. Пакеты не устанавливались, API ключ не понадобился. Референс предварительно открыт view_image.

Исходник: assets/Seven-view stylized character model sheet.png (не изменён).
Результат: src/assets/character-standing-v1.png, PNG 1024×1536 RGBA. Альфа-канал реально существует, значения 0..254. В просмотрщике заметна цветная краевая засветка; это пробный ассет, не финальный matte для всех сред. Для контрастного тёмного фона нужно отдельно проверить края и при необходимости запросить удаление halo через тот же Imagegen.

Сравнение: сохранены вытянутое лицо, длинный нос, высокий лоб, объёмная причёска, щетина, длинная шея, стройная фигура, графитовая одежда и светлые кеды. В будущем проверять все сцены рядом с оригиналом: единичная генерация не гарантирует постоянство серии.

## Использованный промпт

Use case: identity-preserve. Asset type: reusable transparent character cutout for a Russian single-page illustrated website. Input image is the definitive identity and style reference, not an image to overwrite. Generate ONE full-body standing character, three-quarter view, relaxed confident expression, one hand subtly open as in the bottom-right reference, other hand relaxed. Match this exact adult man's elongated narrow face, long prominent nose, high forehead, sculptural swept dark-brown hairstyle, light stubble, long neck, slim long-limbed body; preserve the charcoal T-shirt, dark slim trousers and off-white sneakers. Same polished stylized 3D sculptural rendering, warm natural skin, soft studio light. Full head and both feet visible with margin. Centered single isolated person, genuine transparent background, no floor, no cast shadow, no props, no typography, no model-sheet panels. Do not make the face rounder, nose shorter, neck shorter, body stockier, or hair generic.

Параметры: referenced_image_paths = [абсолютный путь к исходному model sheet], transparent_background = true.

## Задание для будущих окружений

После утверждения сценария: layered stylized 3D environment in the exact sculptural rendering style of the supplied model sheet. Define the approved scene and camera first. Generate separate far/middle/foreground assets with consistent light direction, camera horizon, palette and perspective. Preserve negative space for Russian headline at the approved viewport positions. No text, no logos, no extra people. Render the same character from the definitive model sheet; explicitly repeat all facial/body invariants from the prompt above. Each foreground object on genuine transparent background, no painted glow or backdrop. Не генерировать неопределённые коммерческие сцены до брифа.
