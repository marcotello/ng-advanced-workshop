import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {Country} from "./country.model";
import {CountryService} from "./country.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-exercise1',
  templateUrl: './exercise1.component.html',
  styleUrls: ['./exercise1.component.css']
})
export class Exercise1Component {

  countries$: Observable<Country[]> = this.countryService.getCountries();

  countriesSelect = new FormControl();

  constructor(private countryService: CountryService) {}
}
