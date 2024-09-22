import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from "@angular/forms";
import {combineLatest, Observable, startWith} from "rxjs";
import {map} from "rxjs/operators";
import {Descriptionwise} from "./descriptionwise";

@Component({
  selector: 'app-generic-auto-complete-dropdown',
  templateUrl: './generic-auto-complete-dropdown.component.html',
  styleUrls: ['./generic-auto-complete-dropdown.component.css']
})
export class GenericAutoCompleteDropdownComponent<T extends Descriptionwise> implements OnInit{

  genericAutoCompleteDropdownControl = new FormControl<string>('')

  combinedItems$: Observable<T[]>;
  itemControlFilter$ = this.genericAutoCompleteDropdownControl.valueChanges.pipe(startWith(''));

  @Input() inputPlaceHolder: string;
  @Input() items$: Observable<T[]>;

  @Input()
  set selection(entry: T) {
    if (entry) {
      this.genericAutoCompleteDropdownControl.setValue(entry.description);
    } else {
      this.genericAutoCompleteDropdownControl.setValue('');
    }
  }

  @Output()
  selectionChange = new EventEmitter<T>();

  ngOnInit() {
    this.combinedItems$ = combineLatest([this.itemControlFilter$, this.items$])
      .pipe(
        map(([userInput, items]) =>
          items.filter(i => i.description.toLowerCase().indexOf(userInput.toLowerCase()) !== -1))
      );
  }

  protected itemSelected(item: T): void {
    this.genericAutoCompleteDropdownControl.setValue(item.description);
    this.selectionChange.emit(item);
  }
}
