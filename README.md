# Nombre del proyecto

Una frase: qué es y para quién.

## Empezar

```
npm install
npm run dev
```

## Comandos

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm test` | Tests |
| `npm run build` | Build de producción |

## Configuración

Copia `.env.example` a `.env` y rellena los valores. `.env` nunca se sube.

## Cómo se trabaja

- Una rama por cambio (`feat/…`, `fix/…`, `docs/…`, `chore/…`) y un Pull Request para entrar en `main`.
- El CI pasa tests, typecheck y build en cada PR; `main` solo acepta PR en verde.
- Las versiones se marcan con tags semver y se anotan en `CHANGELOG.md`.
