import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {TabbyComponent} from './tabby/tabby.component';
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatListModule,
  MatPaginatorModule,
  MatSidenavModule,
  MatSortModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {FightstoreService} from './services/fightstore.service';
import {Subject} from 'rxjs';
import {Fight} from './services/fight.model';
import {LayoutModule} from '@angular/cdk/layout';

describe('AppComponent', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let el: any;

  let mockFightSubject: Subject<Fight>;
  const mockFightstoreService = {
    fetchData: jest.fn(() => mockFightSubject),
  };
  let fights: Fight[];

  beforeEach(async(() => {
    mockFightSubject = new Subject();
    fights = [
      new Fight({eventDate: 123456789, eventName: 'King fight', _id: 'fff0000000000', _timestamp: 90909090}),
      new Fight({eventDate: 2233445566, eventBout: 'Bout bout bout v bout', _id: 'bbbbeeeeeeeeffff', eventOrg: 'MooFC'}),
      new Fight({eventDate: 43146546, eventBilling: 'check please', _id: 'ffff000000000dddd', eventOrg: 'The Guild of Iron Chefs'}),
    ];
    return TestBed.configureTestingModule({
      declarations: [AppComponent, TabbyComponent],
      imports: [
        LayoutModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatListModule,
        MatPaginatorModule,
        MatSidenavModule,
        MatSortModule,
        MatTableModule,
        MatToolbarModule,
        NoopAnimationsModule,
      ],
      providers: [
        {provide: FightstoreService, useValue: mockFightstoreService},
      ],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(AppComponent);
      component = fixture.componentInstance;
      el = fixture.nativeElement;
    });
  }));

  afterEach(() => {
    mockFightSubject.complete();
  });

  it('should fetch fights on init', async(() => {
    const fetchedFights: Fight[] = [];

    fixture.detectChanges();
    component.dataSubject
      .subscribe(fRay => {
          fetchedFights.push(fRay);
        }, err => fail(err),
        () => {
          expect(fetchedFights).toHaveLength(3);
          expect(fetchedFights).toEqual(fights);
        });

    mockFightSubject.next(fights[0]);
    mockFightSubject.next(fights[1]);
    mockFightSubject.next(fights[2]);
    fixture.detectChanges();
  }));

  describe('time-based stuff', () => {
    let myDate: Date;
    let timeyFights: Fight[];

    beforeEach(() => {
      myDate = new Date(2018, 7, 19, 14, 18, 25);
      jest.spyOn(Date, 'now').mockImplementation(() => myDate);

      timeyFights = [
        // 13 days and 16 or so hours ahead (2018-8-2 08:05:05)
        new Fight({eventDate: 1533197105000, eventName: 'King fight', _id: 'fff0000000000', _timestamp: 90909090}),

        // 2 days, 2 hours and 10 minutes ahead (2018-7-21 16:28:25)
        new Fight({eventDate: 1532190505000, eventBout: 'Bout bout bout v bout', _id: 'bbbbeeeeeeeeffff', eventOrg: 'MooFC'}),

        // 4 days past (2018-7-15 14:18:25)
        new Fight({eventDate: 1531664305000, eventBilling: 'check please', _id: 'ffff000000000dddd', eventOrg: 'The Guild of Iron Chefs'}),
      ];
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('displays time remaining on soonest future event', async(() => {
      const nextFightTimeMs = 1532190505000;
      const nextFightDate = new Date(nextFightTimeMs);
      const nextFightTimeDiff = nextFightDate.getUTCMilliseconds() - myDate.getUTCMilliseconds();

      fixture.detectChanges();
      mockFightSubject.next(timeyFights[0]);
      mockFightSubject.next(timeyFights[1]);
      mockFightSubject.next(timeyFights[2]);
      fixture.detectChanges();

      expect(el.textContent).toContain('2d 02h 10m 00s');
    }));
  });
});
