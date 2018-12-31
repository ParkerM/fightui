import {Component, OnInit} from '@angular/core';
import {FightstoreService} from '../services/fightstore.service';
import {Fight} from '../services/fight.model';
import {mergeAll} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-gator',
  templateUrl: './gator.component.html',
  styleUrls: ['./gator.component.styl'],
})
export class GatorComponent implements OnInit {

  // private data: Observable<Fight>;
  datarray: Fight[] = [];

  constructor(private fightstoreService: FightstoreService) {
  }

  ngOnInit(): void {
    this.fightstoreService.fetchData().subscribe((fight: Fight) => {
      this.datarray.push(fight);
    });
  }
}
