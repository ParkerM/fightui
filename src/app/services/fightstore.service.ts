import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Fight} from './fight.model';
import {mergeAll} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FightstoreService {

  constructor(private http: HttpClient) {
  }

  fetchData(): Observable<Fight> {
    return this.http.get<Fight[]>('/api/fights')
      .pipe(
        mergeAll()
      );
  }
}
