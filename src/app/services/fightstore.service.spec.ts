import {async, getTestBed, TestBed} from '@angular/core/testing';

import {FightstoreService} from './fightstore.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Fight} from './fight.model';

describe('FightstoreService', () => {
  let injector: TestBed;
  let service: FightstoreService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FightstoreService],
    });
    injector = getTestBed();
    service = injector.get(FightstoreService);
    httpMock = injector.get(HttpTestingController);
  });

  it('fetches fight data', async(() => {
    const expectedRoute = 'fightstore.apps.internal/api/fights';

    const fight1Data = {
      eventBilling: 'asdf',
      eventBout: 'asdf',
      eventDate: 'asdf',
      eventName: 'asdf',
      eventOrg: 'asdf',
      geoCountry: '',
      geoRegion: '',
      geoVenue: '',
      geoVenueLocation: '',
    };
    const fight2Data = {
      eventName: 'cool fight',
    };
    const expectedFights = [new Fight(fight1Data), new Fight(fight2Data)];

    service.fetchData()
      .subscribe(data => {
        // expect(data.length).toEqual(2);
        expect(data).toEqual(expectedFights);
      });

    const fightReq = httpMock.expectOne(expectedRoute);
    expect(fightReq.request.method).toBe('GET');
    expect(fightReq.request.url).toBe(expectedRoute);

    fightReq.flush([fight1Data, fight2Data]);

    httpMock.verify();
  }));
});
