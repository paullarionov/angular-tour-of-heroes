import {Injectable} from '@angular/core';
import {MarketService} from './MarketService';
import {Stock} from './domain/Stock';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {MarketData} from './domain/MarketData';
import {Trade} from './domain/Trade';

@Injectable({
  providedIn: 'root'
})
export class MarkerServiceImpl implements MarketService {
  private counter: number;
  stocks: Stock[] = [];

  constructor(private httpClient: HttpClient) {
    this.getStockData().subscribe(
      data => {
        for (let md of data) {
          this.stocks.push(new Stock(md.symbol, md.company));
        }
      },
      error => {
        console.log('Cannot get market data from the server!!!');
      }
    );

    this.stocks.forEach(i => i.price = this.getPrice(i.symbol));
    setInterval(() => {
      this.stocks.forEach(i => {
        i.price = this.getUpdatedPrice(i.price);
        if (i.price <= 0) {
          i.price = this.getPrice(i.symbol);
        }
      });
    }, 500);
  }


  private getStockData(): Observable<MarketData[]> {
    return this.httpClient.get<MarketData[]>('assets/market-data.json');
  }

  private getMockStocks(): Stock[] {
    let stocks: Stock[] = [];
    stocks.push(new Stock('BA', 'Boeing'));
    stocks.push(new Stock('CAT', 'Caterpillar'));
    stocks.push(new Stock('KO', 'Coca-Cola'));
    return stocks;
  }

  addStock(stock: Stock) {
    this.stocks.push(stock);
  }

  getAll(): Promise<Stock[]> {
    return new Promise(resolve =>
      setTimeout(() => resolve(Promise.resolve(this.stocks)), 1000));
  }

  getPrice(symbol: string): number {
    return Math.round((Math.random() * 1000 * symbol.length) * 100 + Number.EPSILON) / 100;
  }

  getUpdatedPrice(currentPrice: number): number {
    let multiplier = 1;
    this.counter++;
    if (this.counter % 2 == 0) {
      multiplier = -1;
    }
    return Math.round((currentPrice + (Math.random() * multiplier))
      * 100 + Number.EPSILON) / 100;
  }


  buyStock(symbol: string, count: number): Trade {
    let stock: Stock = this.getStock(symbol);
    if (stock) {
      return new Trade(stock, count, stock.getPrice());
    }
    return null;
  }

  getStock(symbol: string): Stock {
    return this.stocks.find(stock => stock.getSymbol() == symbol);
  }
}
