# Saldo de alimentación

PWA instalable para registrar cuánto llevás comido de cada grupo del plan de Mimo Nutrición, hoy y en la semana, en unidades de cocina (porciones, tazas, cucharadas), sin balanza.

Sin backend: todo corre en el navegador y el saldo se guarda en el localStorage del celular (no se sincroniza entre dispositivos).

## Archivos (todos en la raíz del repo, sin subcarpetas)

```
index.html      → la app
manifest.json   → metadata PWA
sw.js           → service worker (offline)
icon-192.png
icon-512.png
```

## Publicar en GitHub Pages

1. Repo público `plan-alimentacion` → subir los 5 archivos a la raíz de `main`.
2. Settings → Pages → Source: Deploy from a branch → `main` / `/ (root)`.
3. URL: `https://federicojnapoli-ctrl.github.io/plan-alimentacion/`

## Instalar en el celular

- **Android (Chrome):** abrir la URL → menú ⋮ → **Instalar app**. Si solo aparece "Agregar a pantalla de inicio", el manifest o los íconos no cargaron (probar `…/manifest.json` y `…/icon-192.png` en el navegador: si dan 404, falta subir el archivo).
- **iPhone (Safari):** Compartir → **Agregar a inicio**. Safari no muestra "Instalar app".
- Otros navegadores (Samsung Internet, Firefox) o links abiertos desde WhatsApp/Instagram pueden no ofrecer la instalación: abrir en Chrome.

## Actualizar

- Topes y grupos del saldo: listas `DAILY` y `WEEKLY` dentro de `index.html`.
- Después de cualquier cambio en `index.html`: subir el número de `CACHE_NAME` en `sw.js` (`v2` → `v3`). El cambio se ve recién en la segunda apertura.

## Notas técnicas

- `github.io` es un único origen compartido por todas las apps. Por eso las keys de localStorage llevan prefijo y versión (`plan-alim:v1:...`) y el `activate` del SW solo borra caches que empiecen con `plan-alimentacion-`.
- La semana es ISO, de lunes a domingo.
