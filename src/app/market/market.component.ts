import {Component, OnInit} from '@angular/core';
import {Stock} from '../domain/Stock';
import {MatTableDataSource} from '@angular/material';
import {MarkerServiceImpl} from '../marker.service';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements OnInit {

  dataSource: MatTableDataSource<Stock>;
  displayedColumns: string[] = ['symbol', 'company', 'price'];

  constructor(private markerService: MarkerServiceImpl) {
  }

  ngOnInit() {
    this.getAll();
  }

  public add(symbol: string, company: string) {
    this.markerService.addStock(new Stock(symbol, company));
    this.getAll();
  }

  private getAll() {
    this.markerService.getAll().then(d => this.refresh(d));
  }

  public refresh(all: any) {
    this.dataSource = new MatTableDataSource<Stock>(all);
  }

}
