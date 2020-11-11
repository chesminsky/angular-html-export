import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CoinHistory } from './crypto.model';

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  private baseUrl = `https://api.coingecko.com/api/v3/coins`;
  constructor(private http: HttpClient) {}

  getData(ticket, date): Observable<CoinHistory> {
    return this.http.get<CoinHistory>(
      `${this.baseUrl}/${ticket}/history?date=${date}`
    );
  }
}
