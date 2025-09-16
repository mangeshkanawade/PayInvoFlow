import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { RouterLinkActive } from '@angular/router';

@Directive({
  selector: '[activeLink]',
  hostDirectives: [RouterLinkActive],
})
export class ActiveLinkDirective {
  constructor(private el: ElementRef, private renderer: Renderer2, private rla: RouterLinkActive) {
    this.rla.isActiveChange.subscribe((isActive: boolean) => {
      if (isActive) {
        this.renderer.addClass(this.el.nativeElement, 'text-primary');
        this.renderer.addClass(this.el.nativeElement, 'font-semibold');
      } else {
        this.renderer.removeClass(this.el.nativeElement, 'text-primary');
        this.renderer.removeClass(this.el.nativeElement, 'font-semibold');
      }
    });
  }
}
