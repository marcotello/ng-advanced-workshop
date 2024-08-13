import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Country} from './types';
import {State} from "./state.model";

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private BASE_URL = 'http://localhost:3000';
  private countries$: Observable<Country[]>;

  constructor(private http: HttpClient) {
    this.countries$ = http.get<Country[]>(`${this.BASE_URL}/countries`);
  }

  getCountries(): Observable<Country[]> {
    return this.countries$;
  }

  getStatesForCountry(countryId: string): Observable<State[]> {
    const queryParams = new HttpParams().append('countryCode', countryId);
    return this.http.get<State[]>(`${this.BASE_URL}/states`, {params: queryParams});
  }
}
