import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Country} from "./cointry.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private BASE_URL = 'http://localhost:3000/countries';

  constructor(private http: HttpClient) {}

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(this.BASE_URL);
  }
}
