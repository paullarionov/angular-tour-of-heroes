import {MarketService} from '../MarketService';
import {Stock} from './Stock';
import {Trade} from './Trade';
import {inject} from '@angular/core/testing';

describe('Stock Isolated Tests with MarketService spy', () => {
  let marketServiceSpy: MarketService;

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

    spyOn(marketServiceSpy, 'getPrice');
    spyOn(marketServiceSpy, 'getUpdatedPrice');
  });


  it('TEST: Check Stock object creation. Use toHaveBeenCalledTimes() method to make sure you call getPrice exactly one time', inject([], () => {
    new Stock('XX', 'Test', marketServiceSpy);
    expect(marketServiceSpy.getPrice).toHaveBeenCalledTimes(1);
  }));

  it('TEST: Check Stock object creation. Use toHaveBeenCalledWith() method to make sure you call getPrice exact symbol you pass as constructor parameter.', inject([], () => {
    new Stock('XX', 'Test', marketServiceSpy);
    expect(marketServiceSpy.getPrice).toHaveBeenCalledWith('XX');
  }));

  it('TEST: Check that you call getUpdatedPrice every second from Stock object creation.', function (done) {
    new Stock('XX', 'Test', marketServiceSpy);
    setTimeout(() => {
      expect(marketServiceSpy.getUpdatedPrice).toHaveBeenCalled();
      done();
    }, 1000);
  }, 2000);

});
