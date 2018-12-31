import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {Fight} from '../services/fight.model';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-tabby',
  templateUrl: './tabby.component.html',
  styleUrls: ['./tabby.component.styl'],
})
// export class TabbyComponent implements OnInit {
export class TabbyComponent implements AfterViewInit {

  private readonly MAX_PAGES = 25;

  @Input() fightData: Observable<Fight>;
  displayedColumns = ['eventDate', 'eventName', 'eventOrg'];
  dataSource: MatTableDataSource<Fight>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() {
    this.dataSource = new MatTableDataSource<Fight>();
  }

  ngAfterViewInit(): void {
    this.fightData.subscribe((fight: Fight) => {
      this.dataSource.data.push(fight);
      this.paginator.length = this.dataSource.data.length;
      // this.paginator.length = Math.max(this.dataSource.data.length, this.MAX_PAGES);
      this.dataSource.paginator = this.paginator;
    });
  }
}
