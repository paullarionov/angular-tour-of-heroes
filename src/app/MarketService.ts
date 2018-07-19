import {Stock} from './domain/Stock';
import {Trade} from './domain/Trade';

export interface MarketService {
  getPrice(symbol: string): number;

  getUpdatedPrice(currentPrice: number): number;

  getStocks(): Stock[];

  addStock(stock: Stock);

  buyStock(symbol: string, count: number): Trade;

  getStock(symbol: string): Stock;

  getAll(): Promise<Stock[]>;

}
