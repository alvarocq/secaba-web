# SECABA · web del proyecto

<!-- Contexto para Claude Code. Mantenerlo corto y al día: solo lo que no se deduce del código. -->

## Objetivo
Web estática del proyecto de investigación SECABA (PID2023-151264NB-I00, Universidad de Jaén). Dos versiones: divulgativa (`index.html`) y técnica para especialistas (`tecnica.html`). Bilingüe ES/EN, modo claro por defecto con opción de oscuro (el visitante elige; no sigue al sistema). Financiada con la partida de difusión del proyecto.

## Comandos
Sin build ni dependencias. Para verla en local: `python3 -m http.server 8000`.
Al publicar cambios en JS, subir el `?v=` de los `<script src>` en `index.html` y `tecnica.html` (GitHub Pages cachea 10 min).
Publicación: GitHub Pages desde `main` (raíz). El repo es público porque Pages no funciona en privados con cuenta gratuita.

## Arquitectura
- `content.js` define `window.SECABA` con todo el contenido compartido (textos ES/EN, equipo, lugares, cronograma, figuras, logos) y utilidades (idioma, escape, figuras).
- 3D con Three.js 0.160.0 desde jsDelivr (módulos en `js/`). `index.html` emite el evento `secaba:render` cada vez que se repinta (p. ej. al cambiar de idioma) y los módulos reenganchan su lienzo sin reconstruir la escena. Ambos se pausan fuera de pantalla, respetan `prefers-reduced-motion` y sin WebGL caen a contenido estático.
- Cada página pinta su HTML desde JS a partir de ese contenido. El idioma (`secaba-lang`) y el tema (`secaba-theme`) se guardan en localStorage y los comparten las dos páginas.
- Fuente del contenido: memoria científico-técnica y solicitud del proyecto (los .docx NO se suben: contienen datos personales).

## Pendiente / supuestos
- Fechas de inicio y fin del proyecto y fórmula exacta de financiación (¿incluye FEDER/UE?): marcadas como pendientes en la web.
- Logos en alta resolución (los actuales salen de los Word y son pequeños).
- Figuras 1 y 2 (Jenkyns 2010, Föllmi 2012) tienen derechos de editorial: pedir permiso o redibujar.
- Fotos de lugares: son de ejemplo (web del proyecto PY20_00783) y van marcadas así; posiciones del mapa aproximadas.
- Modelo 3D del evento anóxico (`js/oae3d.js`): recreación propia del esquema de Jenkyns (2010); la figura 1 original sigue solo en la web técnica. Textos de los pasos pendientes de revisión por el equipo. Usa import map (`three` y `three/addons/`) definido en `index.html`.
- Testigo de Cau en 3D: capas, posiciones de los hitos y curva de δ13C son un ESQUEMA (`KEYS` y bucle de capas en `js/testigo3d.js`). Sustituir por los datos reales del sondeo (CSV de δ13C/Os y litología) cuando el equipo los pase.
- El Carniense (CPE) que aparece en la memoria se ha dejado fuera a propósito.
- No mostrar el correo del proyecto ni etiquetas de "IP" (decisión del cliente).
- Crédito «Desarrollado por PXS» en el pie: el correo de PXS va codificado en `content.js` (`_k`, códigos +7 invertidos) y solo se monta al pulsar «mostrar correo». No escribirlo nunca en texto plano.

## Convenciones
Las generales están en `~/.claude/CLAUDE.md`.
