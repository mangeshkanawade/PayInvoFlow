import { Component, signal } from '@angular/core';

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
export class App {
  protected readonly title = signal('payinvoflow');
}
