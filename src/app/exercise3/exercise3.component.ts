import { Component } from '@angular/core';
import {combineLatest, Observable, startWith} from 'rxjs';
import {Country, State} from './types';
import {CountryService} from './country.service';
import {FormControl} from "@angular/forms";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-exercise3',
  templateUrl: './exercise3.component.html',
  styleUrls: ['./exercise3.component.css']
})
export class Exercise3Component {

  countries$: Observable<Country[]> = this.service.getCountries();
  countryControl = new FormControl('');
  countryFilter$ = this.countryControl.valueChanges.pipe(startWith(''));
  filteredCountries$ = combineLatest([this.countries$, this.countryFilter$])
    .pipe(
      map(([countries, countryFilter]) =>
        countries.filter(c => c.description.toLowerCase().indexOf(countryFilter.toLowerCase())!== -1))
    );

  states$: Observable<State[]>;
  country!: Country;
  state!: State;

  constructor(private service: CountryService) {}

  updateStates(country: Country) {
    this.country = country;
    this.states$ = this.service.getStatesFor(country.id);
  }
}
