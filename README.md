# Plan de Alimentación

PWA instalable con dos pestañas:
- **Comidas**: objetivos, equivalencias diarias (con marcas de referencia), menú semanal de ejemplo y categorías de preparación — todo transcripto del plan de Mimo Nutrición.
- **Saldo**: registro rápido de cuánto llevás comido de cada grupo hoy (y en la semana, para lo que no es diario), en unidades de cocina, sin balanza.

Sin backend: todo corre en el navegador. Los datos del plan están en `data/plan.json` y el saldo se guarda en el localStorage del celular/navegador (no se sincroniza entre dispositivos).

## Estructura

```
plan-alimentacion/
├── index.html        → la app (dos pestañas, Comidas y Saldo)
├── manifest.json     → metadata PWA (nombre, ícono, colores)
├── sw.js             → service worker (funciona offline una vez instalada)
├── data/
│   └── plan.json     → el contenido del plan (equivalencias, menú, marcas)
└── icons/
    ├── icon-192.png
    └── icon-512.png
```

## Cómo publicarla en GitHub Pages

1. github.com → **New repository**. Nombre: `plan-alimentacion`. Público.
2. Subí estos archivos manteniendo las carpetas (`data/` e `icons/` tienen que quedar como subcarpetas, no sueltos en la raíz). Por la web de GitHub (arrastrando) o por consola:
   ```bash
   cd plan-alimentacion
   git init
   git add .
   git commit -m "Primera version"
   git branch -M main
   git remote add origin https://github.com/federicojnapoli-ctrl/plan-alimentacion.git
   git push -u origin main
   ```
3. En el repo: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, elegí `main` y carpeta `/ (root)`. Guardar.
4. Esperá 1-2 minutos. La app queda en:
   `https://federicojnapoli-ctrl.github.io/plan-alimentacion/`
5. Abrila desde el celular (Chrome o Safari) y usá "Agregar a pantalla de inicio" / "Instalar app".

## Cómo actualizar

- **Contenido de Comidas** (recetas, cantidades, marcas): editá `data/plan.json` y volvé a subirlo. La pestaña se arma sola a partir del JSON.
- **Topes del Saldo**: están en `index.html`, en las listas `DAILY` y `WEEKLY` (no salen de `plan.json`). Si cambia el plan, hay que actualizar los dos lados.
- **Después de cualquier cambio en `index.html` o `plan.json`**: subí el número de `CACHE_NAME` en `sw.js` (`plan-alimentacion-v1` → `v2`, etc.). Si no, el celular puede seguir mostrando la versión vieja. Como el SW responde primero desde el cache, el cambio se ve recién en la segunda apertura.

## Notas técnicas

- `github.io` es un único origen compartido por todas las apps del usuario. Por eso las keys de localStorage llevan prefijo y versión (`plan-alim:v1:...`) y el `activate` del SW solo borra caches que empiecen con `plan-alimentacion-`. Si cambia el modelo de datos del saldo, subir la versión de las keys (`v2`).
- El saldo semanal (carbohidrato cocido, palta, comidas libres) usa semana ISO, lunes a domingo.
- Los íconos son un placeholder (cuadrado redondeado verde con "PA"). Se pueden reemplazar por un diseño propio con los mismos nombres y tamaños (192 y 512); el texto tiene que quedar dentro del 80% central para que funcione como maskable.
- Si en algún momento querés sincronizar el saldo entre dispositivos, hace falta un backend (Apps Script + Sheets, como en varios-app).
