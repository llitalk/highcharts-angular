import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import json from '../assets/data.json';

@Injectable({
  providedIn: 'root',
})
export class TradeService {
  private jsonUrl = 'assets/trade-data.json';

  getTradeData(): Observable<any> {
    return of(json);
  }
}
