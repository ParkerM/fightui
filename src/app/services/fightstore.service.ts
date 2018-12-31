import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Fight} from './fight.model';
import {map, toArray} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FightstoreService {

  private baseUrl = 'fightstore.apps.internal';

  constructor(private http: HttpClient) {
  }

  fetchData(): Observable<Fight[]> {
    return this.http.get<Fight>(`${this.baseUrl}/api/fights`)
      .pipe(
        map(data => new Fight(data)),
        toArray(),
      );
  }
}
