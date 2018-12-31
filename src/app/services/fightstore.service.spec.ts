import {async, TestBed} from '@angular/core/testing';

import {FightstoreService} from './fightstore.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Fight} from './fight.model';
import {toArray} from 'rxjs/operators';
import {HttpResponse} from '@angular/common/http';

describe('FightstoreService', () => {
  let service: FightstoreService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FightstoreService],
    });
    service = TestBed.get(FightstoreService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('fetches fight data', async(() => {
    const expectedRoute = 'fightstore.apps.internal/api/fights';

    const fight1Data = {
      _id: '5c29cdd760d894000d54e678',
      _timestamp: 1546243543,
      eventBilling: 'Main Card',
      eventBout: 'Balaev vs. Zhamaldaev',
      eventDate: 1552752000000,
      eventName: 'ACA 93',
      eventOrg: 'ACA',
      eventUrlPath: '/place/events/57340-aca-93-st-petersburg',
      geoCountry: 'Ru',
      geoRegion: 'Russia Region',
      geoVenue: 'Sibur Arena',
      geoVenueLocation: 'St. Petersburg, Russia',
    };
    const fight2Data = {
      eventName: 'cool fight',
    };
    const expectedFights = [new Fight(fight1Data), new Fight(fight2Data)];

    service.fetchData()
      .pipe(toArray())
      .subscribe(data => {
        expect(data.length).toEqual(2);
        expect(data).toEqual(expectedFights);
      });

    const fightReq = httpMock.expectOne(expectedRoute);
    expect(fightReq.request.method).toBe('GET');

    fightReq.event(new HttpResponse({body: fight1Data}));
    fightReq.flush(fight2Data);

    httpMock.verify();
  }));
});
