import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Fight} from './fight.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FightstoreService {

  private baseUrl = 'fightstore.apps.internal';

  constructor(private http: HttpClient) {
  }

  fetchData(): Observable<Fight> {
    return this.http.get(`${this.baseUrl}/api/fights`)
      .pipe(
        map(fight => new Fight(fight)),
      );
  }
}
