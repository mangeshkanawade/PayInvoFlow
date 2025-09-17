import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Component, Inject, OnInit, Optional, PLATFORM_ID, REQUEST } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Request } from 'express';
import { SharedModule } from '../../modules/shared.module';
@Component({
  selector: 'app-not-found',
  imports: [SharedModule, RouterModule],
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss',
})
export class NotFound implements OnInit {
  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    @Optional() @Inject(REQUEST) private request: Request,
  ) {}

  ngOnInit() {
    const isServer = isPlatformServer(this.platformId);
    const isBrowser = isPlatformBrowser(this.platformId);

    console.log('Platform isBrowser:', isBrowser);
    console.log('Platform isServer:', isServer);

    if (isServer) {
      if (this.request.res) {
        this.request.res.status(404);
      }
    }
  }
}
