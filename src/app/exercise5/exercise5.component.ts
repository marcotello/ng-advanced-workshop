import { Component } from '@angular/core';
import {combineLatest, Observable, of, Subject} from 'rxjs';
import {Country, State} from './types';
import {FormControl} from '@angular/forms';
import {CountryService} from './country.service';
import {map, switchMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-exercise5',
  templateUrl: './exercise5.component.html',
  styleUrls: ['./exercise5.component.css']
})
export class Exercise5Component {

  countries$: Observable<Country[]>;
  currentCountry$ = new Subject<Country>();
  states$: Observable<State[]>;
  statesForCountry$: Observable<State[]> =  of([]);
  state: State;
  countryControl = new FormControl('');
  stateControl = new FormControl('');

  constructor(private service: CountryService) {
    this.countries$ = this.service.getCountries();

    this.statesForCountry$ = this.currentCountry$.asObservable().pipe(
      tap(console.log),
      switchMap(cntry => this.service.getStatesFor(cntry.id))
    );
    this.states$ = combineLatest([this.stateControl.valueChanges, this.statesForCountry$]).pipe(
      map(([userInput, states]) => states.filter(c => c.description.toLowerCase().indexOf(userInput.toLowerCase()) !== -1))
    );
  }

  updateStates(country: Country) {
    this.countryControl.setValue(country.description);
    this.stateControl.setValue('');
    this.currentCountry$.next(country);
  }

}
