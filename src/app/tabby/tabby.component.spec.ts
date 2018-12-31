import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule, MatPaginatorModule, MatSortModule, MatTableModule} from '@angular/material';

import {TabbyComponent} from './tabby.component';
import {Fight} from '../services/fight.model';
import {Subject} from 'rxjs';

describe('TabbyComponent', () => {
  let component: TabbyComponent;
  let fixture: ComponentFixture<TabbyComponent>;
  let el: any;

  let mockFightDataSubject: Subject<Fight>;
  let fights: Fight[];

  beforeEach(async(() => {
    mockFightDataSubject = new Subject<Fight>();
    fights = [
      new Fight({eventDate: 123456789, eventName: 'King fight', _id: 'fff0000000000', _timestamp: 90909090}),
      new Fight({eventDate: 2233445566, eventBout: 'Bout bout bout v bout', _id: 'bbbbeeeeeeeeffff', eventOrg: 'MooFC'}),
      new Fight({eventDate: 43146546, eventBilling: 'check please', _id: 'ffff000000000dddd', eventOrg: 'The Guild of Iron Chefs'}),
    ];
    return TestBed.configureTestingModule({
      declarations: [TabbyComponent],
      imports: [
        NoopAnimationsModule,
        MatCardModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(TabbyComponent);
      el = fixture.nativeElement;
      component = fixture.componentInstance;
      component.fightData = mockFightDataSubject;
    });
  }));

  afterEach(() => {
    mockFightDataSubject.complete();
  });

  it('should display emitted fights', async(() => {
    fixture.detectChanges();
    mockFightDataSubject.next(fights[0]);
    fixture.detectChanges();

    const table: HTMLTableElement = el.querySelector('table');
    const rows: HTMLCollectionOf<HTMLTableRowElement> = table.tBodies.item(0).rows;

    expect(rows).toHaveLength(1);
    expect(Date.parse(rows.item(0).cells.item(0).textContent)).toEqual(Date.parse('Friday, January 02, 10:17 GMT+0'));
    expect(rows.item(0).textContent).toContain('King fight');

    mockFightDataSubject.next(fights[1]);
    fixture.detectChanges();

    expect(rows).toHaveLength(2);
    expect(Date.parse(rows.item(1).cells.item(0).textContent)).toEqual(Date.parse('Monday, January 26, 2:24 GMT-6'));
    expect(rows.item(1).textContent).toContain('MooFC');

    mockFightDataSubject.next(fights[2]);
    fixture.detectChanges();

    expect(rows).toHaveLength(3);
    expect(Date.parse(rows.item(2).cells.item(0).textContent)).toEqual(Date.parse('Thursday, January 01, 5:59 GMT-6'));
    expect(rows.item(2).textContent).toContain('The Guild of Iron Chefs');
  }));
});
