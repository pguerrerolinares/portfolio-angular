# Portfolio - Paul Guerrero Linares

Portfolio personal desarrollado con Angular 21 y las mejores prácticas modernas.

## Stack Tecnológico

- **Framework:** Angular 21 (zoneless)
- **Estado:** Signals (`signal()`, `computed()`)
- **Estilos:** SCSS con variables y mixins
- **i18n:** ngx-translate (ES/EN)
- **Testing:** Vitest
- **Change Detection:** OnPush en todos los componentes

## Características

- Modo claro/oscuro
- Soporte multiidioma (Español/Inglés)
- Diseño responsive
- Zoneless change detection para máximo rendimiento
- Componentes reutilizables (Button, Card, Badge, Icon, etc.)

## Estructura del Proyecto

```
src/app/
├── sections/          # Secciones principales
│   ├── hero/          # Sección inicial
│   ├── about/         # Sobre mí
│   ├── projects/      # Proyectos
│   ├── experience/    # Experiencia laboral
│   └── contact/       # Contacto
├── shared/ui/         # Componentes reutilizables
│   ├── button/
│   ├── card/
│   ├── badge/
│   ├── icon/
│   ├── section-title/
│   ├── theme-toggle/
│   └── language-switcher/
├── core/              # Servicios
│   └── services/
│       └── theme.service.ts
└── layout/            # Layout
    ├── header/
    └── footer/
```

## Desarrollo

```bash
# Instalar dependencias
bun install

# Servidor de desarrollo
ng serve

# Build de producción
ng build

# Tests
ng test
```

## Deploy a GitHub Pages

El proyecto se despliega automáticamente en GitHub Pages con cada push a `main`.

**URL:** https://pguerrerolinares.github.io/portfolio-angular/

### Build local

```bash
bun run build:ghpages
```

## Best Practices Implementadas

- `ChangeDetectionStrategy.OnPush` en todos los componentes
- `inject()` en lugar de constructor injection
- `host: {}` en lugar de `@HostListener`
- Signals para estado reactivo
- Control flow moderno (`@if`, `@for`, `@switch`)
- `standalone: true` implícito (default en Angular 20+)

## Recursos

- [Angular CLI Documentation](https://angular.dev/tools/cli)
- [Angular Signals](https://angular.dev/guide/signals)
- [ngx-translate](https://github.com/ngx-translate/core)
