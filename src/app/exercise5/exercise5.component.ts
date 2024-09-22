import {Component, ViewChild} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Country, State} from './types';
import {CountryService} from './country.service';

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
  states$: Observable<State[]>;

  @ViewChild('stateAutocomplete') stateAutocompleteInputRef:any;

  constructor(private service: CountryService) {
    this.countries$ = this.service.getCountries();
  }

  updateStates(country: Country): void {
    this.stateAutocompleteInputRef.reset();
    this.states$ = this.service.getStatesFor(country.id);
    this.selectedCountry = country;
    this.selectedState = undefined;
  }

  getSelectedState(state: State): void {
    this.selectedState = state;
  }
}
