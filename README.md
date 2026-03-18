# Gravel Social Local

MVP local de una web estilo Strava pero enfocada en gravel + social rides.

## Qué incluye

- Landing principal con propuesta de valor
- Sección de social rides
- Sección de rutas destacadas
- Sección de clubs/comunidad local
- Mock API local para rides y routes

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4

## Arranque local

```bash
cd gravel-social-local
npm install
npm run dev
```

Abrir en:

```bash
http://localhost:3000
```

## Endpoints mock

- `GET /api/rides`
- `GET /api/routes`

## Siguiente fase recomendada

1. Auth y perfiles
2. Modelo real de datos con Postgres + PostGIS
3. Upload de GPX y fotos
4. Crear rides con RSVP
5. Feed y comentarios
6. Deploy en web con backend persistente
