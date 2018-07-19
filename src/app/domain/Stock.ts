import {MarketService} from '../MarketService';

export class Stock {

  public price: number = 0;

  constructor(public symbol: string, public company: string, private marketService: MarketService) {
    this.price = marketService.getPrice(this.symbol);

    setInterval(() => {
      this.price = marketService.getUpdatedPrice(this.price);
      if (this.price <= 0) {
        this.price = marketService.getPrice(this.symbol);
      }
    }, 500);
  }

  getSymbol(): string {
    return this.symbol;
  }

  getCompany(): string {
    return this.company;
  }

  getPrice(): number {
    return this.price;
  }
}
