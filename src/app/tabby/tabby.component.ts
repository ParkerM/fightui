import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { TabbyDataSource } from './tabby-datasource';

@Component({
  selector: 'app-tabby',
  templateUrl: './tabby.component.html',
  styleUrls: ['./tabby.component.styl'],
})
export class TabbyComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: TabbyDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  ngOnInit() {
    this.dataSource = new TabbyDataSource(this.paginator, this.sort);
  }
}
