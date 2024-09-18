import {Component} from '@angular/core';
import {Observable, startWith} from 'rxjs';
import {Country, State} from './types';
import {FormControl} from '@angular/forms';
import {CountryService} from './country.service';
import {map, tap, withLatestFrom} from 'rxjs/operators';

@Component({
  selector: 'app-exercise4',
  templateUrl: './exercise4.component.html',
  styleUrls: ['./exercise4.component.css']
})
export class Exercise4Component {

  countries$: Observable<Country[]>;
  states$!: Observable<State[]>;
  state!: State;
  countryControl = new FormControl<string>('');
  stateControl = new FormControl<string>('');
  showStates = false;


  constructor(private service: CountryService) {
    this.countries$ = this.countryControl.valueChanges.pipe(
      withLatestFrom(this.service.getCountries()),
      map(([userInput, countries]) =>
        countries.filter(c => c.description.toLowerCase().indexOf((userInput ?? "").toLowerCase()) !== -1))
    );
  }

  updateStates(country: Country) {
    this.countryControl.setValue(country.description);
    this.showStates = true;

    this.states$ = this.stateControl.valueChanges
      .pipe(
        startWith(''),
        withLatestFrom(this.service.getStatesFor(country.id)),
        map(([userInput, states]) =>
          states.filter(s => s.description.toLowerCase().indexOf((userInput?? "").toLowerCase())!== -1)
        )
      );
  }
}
