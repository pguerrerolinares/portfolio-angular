# Portfolio Angular 21

## Stack
- Angular 21 (zoneless)
- Signal Forms
- Angular Aria
- Vitest
- SCSS
- ngx-translate (i18n)

## Estructura
```
src/app/
├── sections/      # hero, about, projects, experience, contact
├── shared/ui/     # componentes reutilizables (button, card, badge, icon, etc.)
├── core/          # servicios (theme, translation)
└── layout/        # header, footer
```

## Best Practices Angular 21

### Componentes
- `standalone: true` es default, NO declararlo
- Siempre usar `changeDetection: ChangeDetectionStrategy.OnPush`
- Usar `inject()` en lugar de constructor injection
- Usar `host: {}` en lugar de `@HostListener`

### Ejemplo
```typescript
@Component({
  selector: 'app-example',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `...`
})
export class ExampleComponent {
  private service = inject(MyService);

  data = input.required<T>();
  action = output<void>();
  state = signal(initial);
  derived = computed(() => this.state());
}
```

## Reglas
- Estado con signals (`signal()`, `computed()`)
- Formularios con Signal Forms
- Estilos solo SCSS con variables (`@use 'styles/variables'`)
- Tests con Vitest
- i18n con ngx-translate (`{{ 'key' | translate }}`)
