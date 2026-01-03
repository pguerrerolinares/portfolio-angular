import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
  state,
  keyframes,
  AnimationTriggerMetadata,
} from '@angular/animations';

// ======================
// TIMING CONSTANTS
// ======================

export const TIMING = {
  fast: '150ms ease',
  base: '200ms ease',
  slow: '300ms ease',
  slower: '500ms ease',
  easeOutExpo: '500ms cubic-bezier(0.16, 1, 0.3, 1)',
  easeOutQuart: '400ms cubic-bezier(0.25, 1, 0.5, 1)',
};

// ======================
// FADE ANIMATIONS
// ======================

export const fadeIn = trigger('fadeIn', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate(TIMING.slow, style({ opacity: 1 })),
  ]),
  transition(':leave', [animate(TIMING.slow, style({ opacity: 0 }))]),
]);

export const fadeInUp = trigger('fadeInUp', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(20px)' }),
    animate(
      TIMING.easeOutQuart,
      style({ opacity: 1, transform: 'translateY(0)' })
    ),
  ]),
  transition(':leave', [
    animate(
      TIMING.slow,
      style({ opacity: 0, transform: 'translateY(-10px)' })
    ),
  ]),
]);

export const fadeInDown = trigger('fadeInDown', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(-20px)' }),
    animate(
      TIMING.easeOutQuart,
      style({ opacity: 1, transform: 'translateY(0)' })
    ),
  ]),
]);

export const fadeInLeft = trigger('fadeInLeft', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateX(-30px)' }),
    animate(
      TIMING.easeOutQuart,
      style({ opacity: 1, transform: 'translateX(0)' })
    ),
  ]),
]);

export const fadeInRight = trigger('fadeInRight', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateX(30px)' }),
    animate(
      TIMING.easeOutQuart,
      style({ opacity: 1, transform: 'translateX(0)' })
    ),
  ]),
]);

// ======================
// SCALE ANIMATIONS
// ======================

export const scaleIn = trigger('scaleIn', [
  transition(':enter', [
    style({ opacity: 0, transform: 'scale(0.95)' }),
    animate(
      TIMING.easeOutQuart,
      style({ opacity: 1, transform: 'scale(1)' })
    ),
  ]),
  transition(':leave', [
    animate(TIMING.fast, style({ opacity: 0, transform: 'scale(0.95)' })),
  ]),
]);

// ======================
// STAGGER ANIMATIONS
// ======================

export const staggerFadeIn = trigger('staggerFadeIn', [
  transition(':enter', [
    query(
      ':enter',
      [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        stagger('100ms', [
          animate(
            TIMING.easeOutQuart,
            style({ opacity: 1, transform: 'translateY(0)' })
          ),
        ]),
      ],
      { optional: true }
    ),
  ]),
]);

export const staggerList = trigger('staggerList', [
  transition('* => *', [
    query(
      ':enter',
      [
        style({ opacity: 0, transform: 'translateY(15px)' }),
        stagger('80ms', [
          animate(
            TIMING.easeOutQuart,
            style({ opacity: 1, transform: 'translateY(0)' })
          ),
        ]),
      ],
      { optional: true }
    ),
  ]),
]);

// ======================
// SLIDE ANIMATIONS
// ======================

export const slideInFromRight = trigger('slideInFromRight', [
  transition(':enter', [
    style({ transform: 'translateX(100%)', opacity: 0 }),
    animate(
      TIMING.easeOutExpo,
      style({ transform: 'translateX(0)', opacity: 1 })
    ),
  ]),
  transition(':leave', [
    animate(
      TIMING.slow,
      style({ transform: 'translateX(100%)', opacity: 0 })
    ),
  ]),
]);

export const slideInFromLeft = trigger('slideInFromLeft', [
  transition(':enter', [
    style({ transform: 'translateX(-100%)', opacity: 0 }),
    animate(
      TIMING.easeOutExpo,
      style({ transform: 'translateX(0)', opacity: 1 })
    ),
  ]),
  transition(':leave', [
    animate(
      TIMING.slow,
      style({ transform: 'translateX(-100%)', opacity: 0 })
    ),
  ]),
]);

export const slideUp = trigger('slideUp', [
  transition(':enter', [
    style({ transform: 'translateY(100%)' }),
    animate(TIMING.slow, style({ transform: 'translateY(0)' })),
  ]),
  transition(':leave', [
    animate(TIMING.base, style({ transform: 'translateY(100%)' })),
  ]),
]);

// ======================
// EXPAND/COLLAPSE
// ======================

export const expandCollapse = trigger('expandCollapse', [
  state('collapsed', style({ height: '0', overflow: 'hidden', opacity: 0 })),
  state('expanded', style({ height: '*', overflow: 'visible', opacity: 1 })),
  transition('collapsed <=> expanded', [animate(TIMING.slow)]),
]);

// ======================
// SPECIAL EFFECTS
// ======================

export const bounce = trigger('bounce', [
  transition(':enter', [
    animate(
      '600ms ease-out',
      keyframes([
        style({ transform: 'translateY(0)', offset: 0 }),
        style({ transform: 'translateY(-10px)', offset: 0.5 }),
        style({ transform: 'translateY(0)', offset: 0.7 }),
        style({ transform: 'translateY(-5px)', offset: 0.85 }),
        style({ transform: 'translateY(0)', offset: 1 }),
      ])
    ),
  ]),
]);

export const pulse = trigger('pulse', [
  state('inactive', style({ transform: 'scale(1)' })),
  state('active', style({ transform: 'scale(1.05)' })),
  transition('inactive <=> active', [animate(TIMING.fast)]),
]);

// ======================
// HOVER ANIMATIONS (State-based)
// ======================

export const hoverLift = trigger('hoverLift', [
  state('default', style({ transform: 'translateY(0)', boxShadow: 'var(--shadow-md)' })),
  state('hovered', style({ transform: 'translateY(-4px)', boxShadow: 'var(--shadow-lg)' })),
  transition('default <=> hovered', [animate(TIMING.base)]),
]);

export const hoverScale = trigger('hoverScale', [
  state('default', style({ transform: 'scale(1)' })),
  state('hovered', style({ transform: 'scale(1.05)' })),
  transition('default <=> hovered', [animate(TIMING.fast)]),
]);

// ======================
// MASK REVEAL (for hero text)
// ======================

export const maskReveal = trigger('maskReveal', [
  transition(':enter', [
    style({ clipPath: 'inset(0 100% 0 0)' }),
    animate(
      '800ms cubic-bezier(0.16, 1, 0.3, 1)',
      style({ clipPath: 'inset(0 0% 0 0)' })
    ),
  ]),
]);

// ======================
// SCROLL REVEAL (with delay parameter)
// ======================

export function createScrollReveal(delay: number = 0): AnimationTriggerMetadata {
  return trigger('scrollReveal', [
    transition(':enter', [
      style({ opacity: 0, transform: 'translateY(30px)' }),
      animate(
        `500ms ${delay}ms cubic-bezier(0.25, 1, 0.5, 1)`,
        style({ opacity: 1, transform: 'translateY(0)' })
      ),
    ]),
  ]);
}

// ======================
// EXPORT ALL
// ======================

export const ANIMATIONS = [
  fadeIn,
  fadeInUp,
  fadeInDown,
  fadeInLeft,
  fadeInRight,
  scaleIn,
  staggerFadeIn,
  staggerList,
  slideInFromRight,
  slideInFromLeft,
  slideUp,
  expandCollapse,
  bounce,
  pulse,
  hoverLift,
  hoverScale,
  maskReveal,
];
