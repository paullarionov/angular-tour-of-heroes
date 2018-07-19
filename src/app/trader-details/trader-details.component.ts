import {Component, OnInit} from '@angular/core';
import {TradersService} from '../traders.service';
import {Trader} from '../domain/Trader';
import {Trade} from '../domain/Trade';
import {MarketServiceImpl} from '../market.service';
import {Stock} from '../domain/Stock';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {MatTableDataSource} from '@angular/material';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-trader-details',
  templateUrl: './trader-details.component.html',
  styleUrls: ['./trader-details.component.css']
})
export class TraderDetailsComponent implements OnInit {
  trader: Trader;
  selected: Stock;
  symbolInput: FormControl = new FormControl();
  countInput: FormControl = new FormControl();
  filteredStocks: Observable<Stock[]>;
  stocks: Stock[] = [];

  dataSourceTrade: MatTableDataSource<Trade>;
  displayedColumnsTrade: string[] = ['stockinfo', 'mark', 'count', 'unreleasedpnl', 'close'];

  dataSourceTradeClosed: MatTableDataSource<Trade>;
  displayedColumnsTradeClosed: string[] = ['stockinfo', 'mark', 'closeprice', 'count', 'close'];

  constructor(private tradersService: TradersService, private marketService: MarketServiceImpl, private location: Location, private activatedRoute: ActivatedRoute) {
  }

  goBack(): void {
    this.location.back();
  }

  ngOnInit() {

    this.tradersService.getTrader(this.activatedRoute.snapshot.paramMap.get('name')).then(trader => {
      this.trader = trader;
      this.refreshTrades();
    });

    this.marketService.getAll().then(t => this.stocks = t);

    this.filteredStocks = this.symbolInput.valueChanges
      .pipe(
        startWith(null),
        map(val => {

          // TODO: This search is not nice
          let stock = this.findStock(val);
          if (stock != null) {
            this.selected = stock;
          }

          return val ? this.filter(val) : this.stocks.slice();
        })
      );
  }

  findStock(symbol: string): Stock {
    return this.stocks.find(stock => symbol === stock.getSymbol());
  }

  private refreshTrades() {
    this.dataSourceTrade = new MatTableDataSource<Trade>(this.trader.getOpenTrades());
    this.dataSourceTradeClosed = new MatTableDataSource<Trade>(this.trader.getClosedTrades());
  }

  filter(val: string): Stock[] {
    return this.stocks.filter(stock => new RegExp(`^${val}`, 'gi')
      .test(stock.getSymbol()));
  }

  buyStock() {
    let trade: Trade = this.marketService.buyStock(this.symbolInput.value, this.countInput.value);
    if (!trade) {
      alert(`Symbol ${this.symbolInput.value} not found`);
      return;
    }
    this.trader.addToPortfolio(trade);
    this.symbolInput.setValue(null);
    this.countInput.setValue(null);
    this.selected = null;
    this.refreshTrades();
  }

  closeTrade(trade: Trade): void {
    let stock: Stock = trade.getStock();
    trade.close(stock.getPrice());
    this.refreshTrades();
  }

}
