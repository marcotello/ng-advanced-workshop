import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Country} from "../types";
import {FormControl} from "@angular/forms";
import {combineLatest, Observable, Subject} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-generic-auto-complete-dropdown',
  templateUrl: './generic-auto-complete-dropdown.component.html',
  styleUrls: ['./generic-auto-complete-dropdown.component.css']
})
export class GenericAutoCompleteDropdownComponent implements OnChanges {

  genericAutoCompleteDropdownControl = new FormControl<string>('')

  countries$ = new Subject<Country[]>();
  countriesObservable$: Observable<Country[]>;

  @Input() inputPlaceHolder: string;
  @Input() countries: Country[];

  @Output() selectedCountry = new EventEmitter<Country>();

  constructor() {
    this.countriesObservable$ = combineLatest([this.genericAutoCompleteDropdownControl.valueChanges, this.countries$.asObservable()])
      .pipe(
        map(([userInput, countries]) =>
          countries.filter(c => c.description.toLowerCase().indexOf(userInput.toLowerCase()) !== -1))
      );
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (propName === 'countries' && this.countries !== null) {
        this.countries$.next(this.countries);
      }
    }
  }

  itemSelected(country: Country): void {
    this.genericAutoCompleteDropdownControl.setValue(country.description);
    this.selectedCountry.emit(country);
  }

  countCountries() {
    console.log(this.countries);
    this.countries$.next(this.countries);
  }
}
