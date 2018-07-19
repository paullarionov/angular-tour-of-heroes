import {MarketService} from '../MarketService';
import {Stock} from './Stock';
import {Trade} from './Trade';
import {inject} from '@angular/core/testing';
import {Trader} from './Trader';

describe('Trader', () => {
  let marketServiceSpy: MarketService;
  let t: Trader;

  beforeEach(() => {
    marketServiceSpy =
      <MarketService>{
        getPrice(symbol: string): number {
          return 400;
        },
        getUpdatedPrice(currentPrice: number): number {
          return 400;
        },
        getStocks(): Stock[] {
          return [];
        },
        addStock(stock: Stock) {
        },
        buyStock(symbol: string, count: number): Trade {
          return null;
        },
        getStock(symbol: string): Stock {
          return null;
        }
      };

    t = new Trader('Oleg');

    spyOn(marketServiceSpy, 'getPrice');
    spyOn(marketServiceSpy, 'getUpdatedPrice');
  });

  it('Creating new trader: count', inject([], () => {
    expect(t.getName()).toEqual('Oleg');
  }));

  it('Creating new trader: getOpenTrades', inject([], () => {
    expect(t.getOpenTrades()).toEqual([]);
  }));

  it('Creating new trader, add trade: getOpenTrades', inject([], () => {
    t.addToPortfolio(new Trade(new Stock('X', 'X', marketServiceSpy), 1, 500));
    expect(t.getOpenTrades().length).toEqual(1);
    expect(t.getClosedTrades().length).toEqual(0);
  }));

  it('Creating new trader: getClosedTrades', inject([], () => {
    expect(t.getClosedTrades().length).toEqual(0);
    expect(t.getOpenTrades().length).toEqual(0);
  }));

  it('Creating new trader, add trade, close: getClosedTrades', inject([], () => {
    let trade = new Trade(new Stock('X', 'X', marketServiceSpy), 1, 500);
    trade.close(900);
    t.addToPortfolio(trade);
    expect(t.getClosedTrades().length).toEqual(1);
  }));

  it('Creating new trader, add trade, close: getReleasedPnL', inject([], () => {
    let trade = new Trade(new Stock('X', 'X', marketServiceSpy), 1, 500);
    trade.close(900);
    t.addToPortfolio(trade);
    expect(t.getReleasedPnL()).toEqual(400);
  }));

  it('Creating new trader, add trade: getUnreleasedPnL', inject([], () => {
    let trade = new Trade(new Stock('X', 'X', marketServiceSpy), 1, 500);
    t.addToPortfolio(trade);
    expect(t.getReleasedPnL()).toEqual(0);
  }));

  it('Creating new trader, add trade: getTotalPnL', inject([], () => {
    let trade = new Trade(new Stock('X', 'X', marketServiceSpy), 1, 500);
    t.addToPortfolio(trade);
    trade.close(900);
    expect(t.getReleasedPnL()).toEqual(400);
  }));

});
