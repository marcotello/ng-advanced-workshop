import { Component } from '@angular/core';
import {Observable, switchMap} from 'rxjs';
import {Country} from './types';
import {CountryService} from './country.service';
import {FormControl} from '@angular/forms';
import {State} from "./state.model";

@Component({
  selector: 'app-exercise2',
  templateUrl: './exercise2.component.html',
  styleUrls: ['./exercise2.component.css']
})
export class Exercise2Component {

  countries$: Observable<Country[]> = this.service.getCountries();
  countryDropdown = new FormControl<Country['id']>(null);

  states$: Observable<State[]> = this.countryDropdown.valueChanges
    .pipe(
      switchMap(countryId => this.service.getStatesForCountry(countryId))
    );

  constructor(private service: CountryService) {
  }
}
