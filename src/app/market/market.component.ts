import {Component, OnInit, ViewChild} from '@angular/core';
import {Stock} from '../domain/Stock';
import {MatSort, MatTableDataSource} from '@angular/material';
import {MarketServiceImpl} from '../market.service';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements OnInit {

  dataSourceStock: MatTableDataSource<Stock>;
  displayedColumnsStock: string[] = ['symbol', 'company', 'price'];
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  loading: boolean = false;

  constructor(public marketService: MarketServiceImpl) {
  }

  ngOnInit() {
    this.getAll();
  }


  public add(symbol: string, company: string) {
    this.marketService.addStock(new Stock(symbol, company, this.marketService));
    this.getAll();
  }

  private getAll() {
    this.loading = true;
    this.marketService.getAll().then(d => {
        this.loading = false;
        this.refresh(d);
      },
      i => this.loading = false
    );
  }

  public refresh(all: any) {
    this.dataSourceStock = new MatTableDataSource<Stock>(all);
    this.dataSourceStock.sort = this.sort;
    this.dataSourceStock.sortingDataAccessor = (item, property) => {
      console.log(`Sorting ${item} ${property}`);
      switch (property) {
        default:
          return item[property];
      }
    };
  }

}
