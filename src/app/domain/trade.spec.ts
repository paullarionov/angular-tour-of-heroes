import {MarketService} from '../MarketService';
import {Stock} from './Stock';
import {Trade} from './Trade';
import {inject} from '@angular/core/testing';

describe('Trade', () => {
  let marketServiceSpy: MarketService;
  let t: Trade;

  beforeEach(() => {
    marketServiceSpy =
      <MarketService>{
        getPrice(symbol: string): number {
          return 0;
        },
        getUpdatedPrice(currentPrice: number): number {
          return 0;
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

    t = new Trade(new Stock('XX', 'Test', marketServiceSpy), 100, 1000);

    spyOn(marketServiceSpy, 'getPrice');
    spyOn(marketServiceSpy, 'getUpdatedPrice');
  });

  it('Creating new trade: count', inject([], () => {
    expect(t.getCount()).toEqual(100);
  }));

  it('Creating new trade: mark', inject([], () => {
    expect(t.getMark()).toEqual(1000);
  }));

  it('Creating new trade: closePrice', inject([], () => {
    expect(t.getClosePrice()).toEqual(0);
  }));

  it('Creating new trade: PnL', inject([], () => {
    expect(t.getPnL()).toBeNaN();
  }));

  it('Creating new trade: StockInfo', inject([], () => {
    expect(t.getStockInfo()).toEqual('XX Test');
  }));

  it('Creating new trade: Stock', inject([], () => {
    expect(t.getStock().getSymbol()).toEqual('XX');
    expect(t.getStock().getCompany()).toEqual('Test');
  }));

  it('Creating new trade: isOpen', inject([], () => {
    expect(t.isOpen()).toEqual(true);
  }));

  it('Creating new trade: getReleasedPnL', inject([], () => {
    expect(t.getReleasedPnL()).toEqual(0);
  }));

  it('Close: count', inject([], () => {
    t.close(500);
    expect(t.getCount()).toEqual(100);
  }));

  it('Close: mark', inject([], () => {
    t.close(500);
    expect(t.getMark()).toEqual(1000);
  }));

  it('Close: closePrice', inject([], () => {
    t.close(500);
    expect(t.getClosePrice()).toEqual(500);
  }));

  it('Close: PnL', inject([], () => {
    t.close(500);
    expect(t.getPnL()).toEqual(-50000);
  }));

  it('Close: isOpen', inject([], () => {
    t.close(500);
    expect(t.isOpen()).toEqual(false);
  }));

  it('Close: getReleasedPnL', inject([], () => {
    t.close(500);
    expect(t.getReleasedPnL()).toEqual(-50000);
  }));


});
