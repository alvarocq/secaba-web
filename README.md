# SECABA · web del proyecto

Web del proyecto de investigación **SECABA** (PID2023-151264NB-I00, Universidad de Jaén): *Sucesión de episodios de cambio ambiental acelerado en el Barremiense superior y Aptiense inferior*. Tiene dos públicos:

- **`index.html`**: versión divulgativa para el público general.
- **`tecnica.html`**: versión técnica para especialistas e investigadores.

Las dos están en español e inglés y tienen modo claro y oscuro.

## Ver la web

Publicada con GitHub Pages: <https://alvarocq.github.io/secaba-web/>

Para verla en local basta con abrir `index.html` en el navegador o, mejor, servir la carpeta:

```
python3 -m http.server 8000
```

y abrir <http://localhost:8000>.

## Estructura

| Archivo | Qué contiene |
|---|---|
| `index.html` | Web divulgativa (diseño «Invernadero») |
| `tecnica.html` | Web técnica: antecedentes, objetivos, metodología, plan de trabajo, laboratorios y bibliografía |
| `content.js` | Contenido compartido en ES/EN: textos, equipo, lugares, cronograma, figuras y logos |
| `js/cocolito.js` | Cocolito 3D de la portada (Three.js) |
| `js/testigo3d.js` | Sección del testigo de Cau en 3D (Three.js) |
| `js/oae3d.js` | Modelo 3D del evento anóxico oceánico, a partir de Jenkyns (2010), en 9 pasos |
| `img/` | Figuras de la memoria, logos de financiación y fotos de ejemplo de los lugares |

Para cambiar un texto común a las dos webs se edita `content.js`; los textos propios de la web técnica están dentro de `tecnica.html`.

## Cómo se trabaja

- Una rama por cambio (`feat/…`, `fix/…`, `docs/…`, `chore/…`) y un Pull Request para entrar en `main`.
- Al fusionar en `main`, GitHub Pages publica la web automáticamente.
- Las versiones se marcan con tags semver y se anotan en `CHANGELOG.md`.
