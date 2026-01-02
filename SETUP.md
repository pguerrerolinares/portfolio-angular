# Setup Claude Code - Portfolio Angular 21

Configuracion completa para el proyecto. Todo va dentro de la carpeta del proyecto.

---

## Estructura a Crear

```
mi-portfolio/
├── CLAUDE.md
└── .claude/
    ├── skills/
    │   └── angular21/
    │       └── SKILL.md
    ├── agents/
    │   ├── angular-dev.md
    │   └── a11y-reviewer.md
    └── commands/
        └── new-component.md
```

---

## Paso 1: Crear directorios

```bash
mkdir -p .claude/skills/angular21
mkdir -p .claude/agents
mkdir -p .claude/commands
```

---

## Paso 2: CLAUDE.md

**Archivo:** `CLAUDE.md` (raiz del proyecto)

```markdown
# Portfolio Angular 21

## Stack
- Angular 21 (zoneless)
- Signal Forms
- Angular Aria
- Vitest
- Tailwind CSS

## Estructura
src/app/
├── sections/      # hero, about, projects, skills, contact
├── shared/        # componentes reutilizables
├── core/          # servicios
└── layout/        # header, footer

## Reglas
- Componentes siempre standalone
- Estado con signals
- Formularios con Signal Forms
- Estilos solo Tailwind
- Tests con Vitest
```

---

## Paso 3: Skill Angular 21

**Archivo:** `.claude/skills/angular21/SKILL.md`

```markdown
---
name: angular21
description: |
  Angular 21 con zoneless, Signal Forms, Angular Aria, Vitest.
  Usar para cualquier desarrollo en este proyecto.
---

# Angular 21

## Zoneless
```typescript
count = signal(0);
double = computed(() => this.count() * 2);
this.count.update(c => c + 1);
```

## Signal Forms
```typescript
form = inject(SignalFormBuilder).group({
  name: ['', Validators.required],
  email: ['', [Validators.required, Validators.email]]
});

form.value();   // Signal
form.valid();   // Signal
```

## Angular Aria
```typescript
import { AriaMenu, AriaDialog, AriaTabs } from '@angular/aria';
```

## Componente Base
```typescript
@Component({
  selector: 'app-example',
  standalone: true,
  imports: [],
  template: ``
})
export class ExampleComponent {
  data = input.required<T>();
  action = output<void>();
  state = signal(initial);
  derived = computed(() => this.state());
}
```
```

---

## Paso 4: Agent angular-dev

**Archivo:** `.claude/agents/angular-dev.md`

```markdown
---
name: angular-dev
description: |
  Desarrollo Angular 21. Crear componentes, features, tests.
tools: Read, Write, Edit, Bash, Glob, Grep
---

Desarrollador Angular 21.

## Reglas
- standalone: true siempre
- Estado con signals
- Signal Forms para formularios
- Tailwind para estilos
- Vitest para tests

## Template
```typescript
@Component({
  selector: 'app-[name]',
  standalone: true,
  imports: [],
  template: ``
})
export class [Name]Component {
  data = input.required<T>();
  state = signal(initial);
}
```
```

---

## Paso 5: Agent a11y-reviewer

**Archivo:** `.claude/agents/a11y-reviewer.md`

```markdown
---
name: a11y-reviewer
description: |
  Auditar accesibilidad. Solo lectura.
tools: Read, Grep, Glob
---

Auditor WCAG 2.1 AA.

## Checklist
- img con alt
- labels en inputs
- headings jerarquicos
- focus visible
- Angular Aria usado correctamente
```

---

## Paso 6: Command new-component

**Archivo:** `.claude/commands/new-component.md`

```markdown
---
description: Crear componente Angular 21
allowed-tools: Bash, Write
---

Crear componente: $ARGUMENTS

```bash
ng generate component $ARGUMENTS --standalone
```

Asegurar que use signals y tenga test.
```

---

## Paso 7: MCP Server (opcional)

En settings de Claude Code agregar:

```json
{
  "mcpServers": {
    "angular": {
      "command": "npx",
      "args": ["-y", "@angular/cli", "mcp"]
    }
  }
}
```

---

## Uso

```
"Crea la seccion hero"
→ Claude usa skill angular21 + agent angular-dev

"Revisa accesibilidad del proyecto"
→ Claude usa agent a11y-reviewer

/new-component sections/contact
→ Ejecuta el command
```
