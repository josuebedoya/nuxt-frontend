---
title: IMedia.vue
description: Componente multimedia con imagen, hover, video y overlay
---

# IMedia.vue

Componente que muestra una imagen o video con soporte para hover, gradientes y overlays.

---

## ✅ Props

| Prop                  | Tipo      | Requerido | Default      | Descripción |
|-----------------------|-----------|-----------|--------------|-------------|
| `baseSrc`             | String    | ✅ Sí     | —            | Ruta base de la imagen o video principal. |
| `hoverSrc`            | String    | No        | —            | Ruta de la imagen que se mostrará al hacer hover. |
| `alt`                 | String    | No        | `''`         | Texto alternativo para accesibilidad. |
| `ratio`               | String    | No        | `'16/9'`     | Aspect ratio del contenedor (`'1/1'`, `'4/3'`, etc.). |
| `object`              | String    | No        | `'cover'`    | Cómo se ajusta la imagen o video: `'cover'`, `'contain'`, etc. |
| `overlayGradient`     | String    | No        | —            | Gradiente CSS que aparece encima del contenido base. |
| `overlayGradientHover`| String    | No        | —            | Gradiente que aparece al hacer hover. Reemplaza al base. |
| `overlayHideOnHover`  | Boolean   | No        | `false`      | Oculta el `overlayGradient` al hacer hover. |
| `rounded`             | String    | No        | `'rounded-none'` | Clase para redondear bordes (ej. `'rounded-lg'`). |
| `width`               | String    | No        | `'w-full'`   | Ancho del contenedor. |
| `height`              | String    | No        | `'h-auto'`   | Alto del contenedor. |
| `isVideo`             | Boolean   | No        | `false`      | Si es `true`, se renderiza un `<video>` en lugar de `<img>`. |
| `videoAttrs`          | Object    | No        | `{}`         | Atributos extra para el `<video>` (`autoplay`, `loop`, etc.). |
| `fetchpriority`       | String    | No        | `'auto'`     | Prioridad de carga de la imagen: `'auto'`, `'high'`, `'low'`. |

---

## 💠 Slots

| Slot       | Descripción                           |
|------------|----------------------------------------|
| `overlay`  | Contenido personalizado que se muestra encima del media. Requiere posicionamiento absoluto. |

---

## 🧪 Ejemplo básico

```vue
<IMedia
  baseSrc="/img/foto1.jpg"
  alt="Imagen de ejemplo"
  ratio="4/3"
  rounded="rounded-xl"
  overlayGradient="linear-gradient(to top, #00000088, transparent)"
/>
