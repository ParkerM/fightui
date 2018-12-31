import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort} from '@angular/material';
import {FightDataSource} from './fight-data-source';
import {Fight} from '../services/fight.model';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-tabby',
  templateUrl: './tabby.component.html',
  styleUrls: ['./tabby.component.styl'],
})
export class TabbyComponent implements OnInit {

  @Input() fightData: Observable<Fight>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: FightDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['eventDate', 'eventName'];

  ngOnInit() {
    this.dataSource = new FightDataSource(this.paginator, this.sort);
  }
}
