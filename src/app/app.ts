import { Component, HostListener, Inject, OnInit, PLATFORM_ID, signal } from '@angular/core';

import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Header } from './components/layout/header/header';
import { SharedModule } from './modules/shared.module';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SharedModule, Header],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  providers: [MessageService],
})
export class App implements OnInit {
  protected readonly title = signal('payinvoflow');

  toastPosition: 'top-right' | 'bottom-center' = 'top-right';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.setToastPosition(window.innerWidth);
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.setToastPosition(event.target.innerWidth);
  }

  private setToastPosition(width: number) {
    this.toastPosition = width < 640 ? 'bottom-center' : 'top-right';
  }
}
