import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FightstoreService} from '../services/fightstore.service';
import {Fight} from '../services/fight.model';
import {Subject, Subscription} from 'rxjs';

@Component({
  selector: 'app-gator',
  templateUrl: './gator.component.html',
  styleUrls: ['./gator.component.styl'],
})
export class GatorComponent implements OnInit, AfterViewInit {

  // private data: Observable<Fight>;
  datarray: Fight[] = [];
  dataSubject: Subject<Fight>;
  private fightSubscription: Subscription;

  constructor(private fightstoreService: FightstoreService) {
    this.dataSubject = new Subject<Fight>();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.fightSubscription = this.fightstoreService.fetchData().subscribe((fight: Fight) => {
      this.datarray.push(fight);
      this.dataSubject.next(fight);
    });
  }
}
