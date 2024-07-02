import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';
import { TradeComponent } from './app/trade/trade.component';
import { provideHttpClient } from '@angular/common/http'; //
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TradeComponent],
  template: `
  <h3>Chart</h3>
  <app-trade></app-trade>
  `,
})
export class App {
  name = 'Angular';
}

bootstrapApplication(App);
