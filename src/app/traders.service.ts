import {Injectable} from '@angular/core';
import {Trader} from './domain/Trader';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TradersService {
  traders: Trader[] = [];

  constructor(private httpClient: HttpClient) {
    this.traders = this.getMockTraders();

  }

  private getMockTraders(): Trader[] {
    let traders: Trader[] = [];
    traders.push(new Trader('Oleg'));
    traders.push(new Trader('Anna'));
    return traders;
  }

  getAll() {
    return this.traders;
  }

  public add(trader: Trader) {
    this.traders.push(trader);
  }

  getTrader(name: string): Promise<Trader> {
    return new Promise(resolve => {
      setTimeout(() =>
        resolve(Promise.resolve(this.traders.find(t => name === t.getName()))), 0);
    });
  }
}
