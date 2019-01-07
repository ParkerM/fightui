import {AfterViewInit, Component} from '@angular/core';
import {Subject} from 'rxjs';
import {Fight} from './services/fight.model';
import {FightstoreService} from './services/fightstore.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent implements AfterViewInit {

  datarray: Fight[] = [];
  dataSubject: Subject<Fight>;

  constructor(private fightstoreService: FightstoreService) {
    this.dataSubject = new Subject<Fight>();
  }

  ngAfterViewInit(): void {
    this.fightstoreService.fetchData().subscribe((fight: Fight) => {
      this.datarray.push(fight);
      this.dataSubject.next(fight);
    });
  }
}
