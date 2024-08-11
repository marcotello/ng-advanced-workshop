import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Country} from "./cointry.model";
import {CountryService} from "./country.service";
import {tap} from "rxjs/operators";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-exercise1',
  templateUrl: './exercise1.component.html',
  styleUrls: ['./exercise1.component.css']
})
export class Exercise1Component implements OnInit {

  numberOfCountries: number;
  countryId: string;

  countries$: Observable<Country[]>;

  countriesSelect = new FormControl();

  constructor(private countryService: CountryService) {}

  ngOnInit(): void {
    this.countries$ = this.countryService.getCountries()
      .pipe(
        tap(countries => {
          this.numberOfCountries = countries.length
        })
      );
  }

  onSelected(value: string) {
    this.countryId = value;
  }
}
