export type Language = "en" | "es";

export const dictionary = {
  en: {
    nav: {
      home: "Home",
      routes: "Routes",
      lines: "Lines",
      rides: "Rides",
      upload: "Upload GPX",
      builder: "Builder",
      integrations: "Integrations",
      profile: "Profile",
    },
    shell: {
      tagline: "Ride beautiful. Ride together.",
    },
    home: {
      badge: "Costa Brava-first gravel platform",
      heroTitle: "Costa Brava gravel, social rides and local routes in one place.",
      heroText:
        "BRAVA GRAVEL is a Girona and Costa Brava-first cycling platform built for route discovery, social rides, local chapters and GPS-backed uploads — not just activity tracking.",
      ctaPrimary: "Build a Costa Brava route",
      ctaSecondary: "Connect Strava",
      positioningLabel: "Positioning",
      positioningTitle: "Costa Brava and Girona first",
      positioningText:
        "The wedge is simple: make gravel culture easier to discover, join and share around Girona and the Costa Brava. Routes, rides and local community first. Hardcore tracking later.",
    },
    integrations: {
      eyebrow: "Integrations",
      title: "Connect Strava and bring Costa Brava rides into BRAVA",
      description:
        "A clean, low-friction connection flow for bringing real activities, local routes and ride history into BRAVA from Strava and, later, other GPS platforms.",
    },
    builder: {
      eyebrow: "Route Builder",
      title: "Create your own BRAVA route from scratch",
      description:
        "A first builder MVP for planning your own gravel route, exporting it to GPX and preparing it for rides, sharing and device transfer.",
    },
    upload: {
      eyebrow: "GPS Upload",
      title: "Upload GPX routes and extract the core ride data",
      description:
        "This is the first functional bridge into GPS workflows: upload a GPX file, persist it locally, parse the route, and prepare import/export flows with Garmin or bike GPS devices.",
    },
    rides: {
      eyebrow: "Rides",
      title: "Social rides built around route, pace and meetup",
      description:
        "A real MVP list of BRAVA rides with route stats, meetup details and enough structure to start validating the social planning loop.",
    },
    profile: {
      eyebrow: "Profile",
      title: "Profile",
      description:
        "A first local profile view tying routes and imported rides to a rider identity. Next step is proper auth and multi-user separation.",
    },
  },
  es: {
    nav: {
      home: "Inicio",
      routes: "Rutas",
      lines: "Lines",
      rides: "Salidas",
      upload: "Subir GPX",
      builder: "Creador",
      integrations: "Integraciones",
      profile: "Perfil",
    },
    shell: {
      tagline: "Pedalea bonito. Pedalea en grupo.",
    },
    home: {
      badge: "Plataforma gravel centrada en Costa Brava",
      heroTitle: "Gravel de Costa Brava, salidas sociales y rutas locales en un solo sitio.",
      heroText:
        "BRAVA GRAVEL es una plataforma ciclista pensada primero para Girona y la Costa Brava: descubrimiento de rutas, salidas sociales, comunidad local e importación GPS.",
      ctaPrimary: "Crear ruta Costa Brava",
      ctaSecondary: "Conectar Strava",
      positioningLabel: "Posicionamiento",
      positioningTitle: "Primero Costa Brava y Girona",
      positioningText:
        "La idea es simple: hacer más fácil descubrir, compartir y rodar gravel alrededor de Girona y la Costa Brava. Primero rutas, salidas y comunidad local. El tracking hardcore va después.",
    },
    integrations: {
      eyebrow: "Integraciones",
      title: "Conecta Strava y trae tus rutas de Costa Brava a BRAVA",
      description:
        "Un flujo limpio y sin fricción para traer actividades reales, rutas locales e historial de salidas a BRAVA desde Strava y, después, desde otras plataformas GPS.",
    },
    builder: {
      eyebrow: "Creador de Rutas",
      title: "Crea tu propia ruta BRAVA desde cero",
      description:
        "Un primer MVP para planificar tu ruta gravel, exportarla a GPX y dejarla lista para rides, compartirla o enviarla al dispositivo.",
    },
    upload: {
      eyebrow: "Subida GPS",
      title: "Sube rutas GPX y extrae sus datos clave",
      description:
        "Este es el primer puente funcional con los flujos GPS: subir un GPX, guardarlo localmente, parsear la ruta y preparar import/export con Garmin u otros ciclocomputadores.",
    },
    rides: {
      eyebrow: "Salidas",
      title: "Salidas sociales basadas en ruta, ritmo y punto de encuentro",
      description:
        "Un listado MVP real de salidas BRAVA con estadísticas de ruta, meetup y estructura suficiente para validar el loop social.",
    },
    profile: {
      eyebrow: "Perfil",
      title: "Perfil",
      description:
        "Una primera vista de perfil que conecta rutas y salidas importadas con una identidad de rider. El siguiente paso es auth real y multiusuario.",
    },
  },
} as const;

export function t(language: Language) {
  return dictionary[language];
}
