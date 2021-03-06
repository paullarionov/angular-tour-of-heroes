import {Stock} from './Stock';

export class Trade {

  private mark: number;
  private last: number;
  private _isOpen: boolean;
  private closePrice: number;

  constructor(private stock: Stock, private count: number,
              priceToBuy: number) {
    this._isOpen = true;
    this.mark = priceToBuy;
  }

  getStockInfo(): string {
    return `${this.stock.getSymbol()} ${this.stock.getCompany()}`;
  }

  getMark(): number {
    return this.mark;
  }

  isOpen(): boolean {
    return this._isOpen;
  }

  getClosePrice(): number {
    return !this._isOpen ? this.closePrice : 0;
  }

  getCount(): number {
    return this.count;
  }

  getStock(): Stock {
    return this.stock;
  }

  getUnreleasedPnL(): number {
    if (!this._isOpen) {
      return 0;
    }
    this.last = this.stock.getPrice();
    let tradePnL = (this.last - this.mark) * this.count;
    return this.getRoundedNumber(tradePnL);
  }

  getReleasedPnL(): number {
    if (!this.closePrice) {
      return 0;
    }
    let tradePnL = (this.getClosePrice() - this.mark) * this.count;
    return this.getRoundedNumber(tradePnL);
  }

  getPnL(): number {
    let tradePnL = (this.closePrice - this.mark) * this.count;
    return this.getRoundedNumber(tradePnL);
  }

  private getRoundedNumber(num: number): number {
    return Math.round(num * 100 + Number.EPSILON) / 100;
  }

  close(price: number) {
    this.closePrice = price;
    this._isOpen = false;
  }

}
