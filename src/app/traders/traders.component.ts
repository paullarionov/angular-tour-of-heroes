import {Component, OnInit} from '@angular/core';
import {Trader} from '../domain/Trader';
import {MatTableDataSource} from '@angular/material';
import {TradersService} from '../traders.service';

@Component({
  selector: 'app-traders',
  templateUrl: './traders.component.html',
  styleUrls: ['./traders.component.css']
})
export class TradersComponent implements OnInit {

  constructor(private tradersService: TradersService) {
    this.refresh(this.tradersService.getAll());
  }

  dataSource: MatTableDataSource<Trader>;
  displayedColumns: string[] = ['name', 'unreleasedpnl', 'releasedpnl', 'totalpnl'];

  ngOnInit() {
  }

  public refresh(traders: Trader[]) {
    this.dataSource = new MatTableDataSource<Trader>(traders);
  }

  public add(symbol: string) {
    this.tradersService.add(new Trader(symbol));
    this.refresh(this.tradersService.getAll());
  }

}
