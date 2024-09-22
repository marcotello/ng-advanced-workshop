import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormControl} from "@angular/forms";
import {combineLatest, Observable, startWith, Subject} from "rxjs";
import {map} from "rxjs/operators";
import {Descriptionwise} from "./descriptionwise";

@Component({
  selector: 'app-generic-auto-complete-dropdown',
  templateUrl: './generic-auto-complete-dropdown.component.html',
  styleUrls: ['./generic-auto-complete-dropdown.component.css']
})
export class GenericAutoCompleteDropdownComponent<T extends Descriptionwise> implements OnChanges {

  genericAutoCompleteDropdownControl = new FormControl<string>('')

  items$ = new Subject<T[]>();
  itemsObservable$: Observable<T[]>;
  itemControlFilter$ = this.genericAutoCompleteDropdownControl.valueChanges.pipe(startWith(''));

  @Input() inputPlaceHolder: string;
  @Input() items: T[];

  @Output() selectedItem = new EventEmitter<T>();

  constructor() {
    this.itemsObservable$ = combineLatest([this.itemControlFilter$, this.items$.asObservable()])
      .pipe(
        map(([userInput, items]) =>
          items.filter(i => i.description.toLowerCase().indexOf(userInput.toLowerCase()) !== -1))
      );
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (propName === 'items' && this.items !== null) {
        this.items$.next(this.items);
      }
    }
  }

  protected itemSelected(item: T): void {
    this.genericAutoCompleteDropdownControl.setValue(item.description);
    this.selectedItem.emit(item);
  }

  reset(): void {
    this.genericAutoCompleteDropdownControl.setValue('');
  }
}
