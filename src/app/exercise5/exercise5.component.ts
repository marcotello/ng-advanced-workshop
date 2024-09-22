import {Component, ViewChild} from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {Country, State} from './types';
import {CountryService} from './country.service';
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-exercise5',
  templateUrl: './exercise5.component.html',
  styleUrls: ['./exercise5.component.css']
})
export class Exercise5Component {

  selectedCountry: Country;
  selectedState: State;

  countries$: Observable<Country[]>;
  currentCountry$ = new Subject<Country>();

  states$: Observable<State[]> = of([]);

  @ViewChild('stateAutocomplete') stateAutocompleteInputRef:any;

  constructor(private service: CountryService) {
    this.countries$ = this.service.getCountries();
    this.states$ = this.currentCountry$.asObservable().pipe(
      switchMap(country => this.service.getStatesFor(country.id))
    );
  }

  updateStates(country: Country): void {
    this.currentCountry$.next(country);
    this.selectedCountry = country;
    this.selectedState = undefined;
  }

  getSelectedState(state: State): void {
    this.selectedState = state;
  }
}
