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
      ],
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

  // TODO: it('should display and sort emitted fights by descending event date', async(() => {
  it('should display emitted fights', async(() => {
    fixture.detectChanges();
    mockFightDataSubject.next(fights[0]);
    fixture.detectChanges();

    const table: HTMLTableElement = el.querySelector('table');
    const rows: HTMLCollectionOf<HTMLTableRowElement> = table.tBodies.item(0).rows;

    expect(rows).toHaveLength(1);
    expect(Date.parse(rows.item(0).cells.item(0).textContent)).toEqual(Date.parse('Friday, January 02 1970, 10:17 GMT+0'));
    expect(rows.item(0).textContent).toContain('King fight');

    mockFightDataSubject.next(fights[1]);
    fixture.detectChanges();

    expect(rows).toHaveLength(2);
    expect(Date.parse(rows.item(1).cells.item(0).textContent)).toEqual(Date.parse('Monday, January 26 1970, 14:24 GMT-6'));
    expect(rows.item(1).textContent).toContain('MooFC');

    mockFightDataSubject.next(fights[2]);
    fixture.detectChanges();

    expect(rows).toHaveLength(3);
    expect(Date.parse(rows.item(2).cells.item(0).textContent)).toEqual(Date.parse('Thursday, January 01 1970, 5:59 GMT-6'));
    expect(rows.item(2).textContent).toContain('The Guild of Iron Chefs');
  }));

  describe('should display local timezone abbr in date header', () => {
    const dstDate = new Date(2019, 4, 1, 1, 15, 30);
    const stdDate = new Date(2019, 0, 1, 1, 15, 30);

    let _intlDtf;
    let mockResolvedOptions;

    beforeEach(() => {
      _intlDtf = Intl.DateTimeFormat;

      mockResolvedOptions = Intl.DateTimeFormat().resolvedOptions();
      Intl.DateTimeFormat.prototype.resolvedOptions = () => mockResolvedOptions;
    });

    afterEach(() => {
      Intl.DateTimeFormat = _intlDtf;
    });

    describe.each(getTzAbbrMap())('during %s', (dstAdj, localDate, localTzName, expectedTzAbbr) => {
      it(`${localTzName} displays ${expectedTzAbbr}`, () => {
        jest.spyOn(Date, 'now').mockReturnValue(localDate);
        mockResolvedOptions.timeZone = localTzName;

        fixture.detectChanges();
        const table: HTMLTableElement = el.querySelector('table');
        const headerCells: HTMLCollectionOf<HTMLTableHeaderCellElement> = table.tHead.rows.item(0).cells;

        expect(headerCells.namedItem('table-date-header').textContent).toContain(expectedTzAbbr);
      });
    });

    function getTzAbbrMap(): [string, Date, string, string][] {
      const getDstAndStdTuple = (tzName, tzDstAbbr, tzStdAbbr): [string, Date, string, string][] =>
        [['daylight savings time', dstDate, tzName, tzDstAbbr], ['standard time', stdDate, tzName, tzStdAbbr]];

      return [].concat(
        getDstAndStdTuple('America/New_York', 'EDT', 'EST'),
        getDstAndStdTuple('America/Chicago', 'CDT', 'CST'),
        getDstAndStdTuple('America/Los_Angeles', 'PDT', 'PST'),
        getDstAndStdTuple('America/Phoenix', 'MST', 'MST'),
        getDstAndStdTuple('Asia/Hong_Kong', 'GMT+8', 'GMT+8'),
        getDstAndStdTuple('Europe/Brussels', 'GMT+2', 'GMT+1'),
      );
    }
  });

  describe('should produce data for the countdowner', () => {
    let myDate: Date;
    let timeyFights: Fight[];

    beforeEach(() => {
      myDate = new Date(1970, 1, 1, 15, 18, 25);
      jest.spyOn(Date, 'now').mockImplementation(() => myDate);

      timeyFights = [
        new Fight({eventDate: 2855105000, eventName: 'Next up fight'}),
        new Fight({eventDate: 1855105000, eventName: 'Past fight'}),
        new Fight({eventDate: 3855105000, eventName: 'Future fight'}),
      ];
    });

    it('nextEvent returns nearest upcoming event', async(() => {
      console.log(Date.now());
      const expectedEvent = timeyFights[0];
      const priorEvent = timeyFights[1];
      const distantFutureEvent = timeyFights[2];

      fixture.detectChanges();
      processEvents(distantFutureEvent, priorEvent, expectedEvent);

      const actualEvent = component.nextEvent;
      expect(actualEvent).toEqual(expectedEvent);
    }));

    function processEvents(...events) {
      events.forEach(event => mockFightDataSubject.next(event));
      fixture.detectChanges();
    }
  });
});
