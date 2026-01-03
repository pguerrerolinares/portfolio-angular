import { Component, input, output, signal, inject, DestroyRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { IconComponent, IconName } from '../../shared/ui/icon/icon.component';

@Component({
  selector: 'app-contact-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IconComponent],
  templateUrl: './contact-card.component.html',
  styleUrl: './contact-card.component.scss',
})
export class ContactCardComponent {
  private destroyRef = inject(DestroyRef);
  private liveAnnouncer = inject(LiveAnnouncer);

  icon = input.required<IconName>();
  label = input.required<string>();
  value = input.required<string>();
  href = input<string>();
  external = input<boolean>(true);
  copyable = input<boolean>(false);
  accentColor = input<string>();

  copied = signal(false);
  onCopy = output<string>();

  async copyToClipboard(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.value());
      this.copied.set(true);
      this.onCopy.emit(this.value());
      this.liveAnnouncer.announce('Copiado al portapapeles', 'polite');

      const timeoutId = setTimeout(() => {
        this.copied.set(false);
      }, 2000);

      this.destroyRef.onDestroy(() => clearTimeout(timeoutId));
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }
}
