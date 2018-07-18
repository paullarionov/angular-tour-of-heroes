export class Stock {
  constructor(public symbol: string, public company: string, public price: number = 0) {
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
