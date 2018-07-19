import {Stock} from '../domain/Stock';
import {Trade} from '../domain/Trade';
import {MarketService} from '../MarketService';

export class MarketServiceSpy implements MarketService {
  public stocks: Stock[] = [];

  constructor() {
    this.stocks.push(
      new Stock('MMM', '3M', this),
      new Stock('MCD', 'McDonald\'s', this),
      new Stock('MRK', 'Merck', this),
      new Stock('MSFT', 'Microsoft', this));
  }

  getStocks = jasmine.createSpy('getStocks').and.callFake(() => this.getFakeMStocks());
  getPrice = jasmine.createSpy('getPrice').and.callFake(() => 100);
  getUpdatedPrice = jasmine.createSpy('getUpdatedPrice').and.callFake(() => 110);
  getStock = jasmine.createSpy('getStock').and.callFake(() => this.getFakeMStocks()[0]);
  addStock = jasmine.createSpy('addStock').and.callFake((i) => {
    this.stocks.push(i);
  });

  buyStock(symbol: string, count: number): Trade {
    let stock: Stock = new Stock(symbol, '', new MarketServiceSpy());
    return new Trade(stock, count, stock.getPrice());
  }

  private getFakeMStocks(): Stock[] {
    return this.stocks;
  }

  getAll(): Promise<Stock[]> {
    return new Promise(resolve => this.getFakeMStocks());
  }


}
