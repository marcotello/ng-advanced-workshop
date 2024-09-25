import { Component } from '@angular/core';
import {timer} from 'rxjs';

@Component({
  selector: 'app-exercise6',
  templateUrl: './exercise6.component.html',
  styleUrls: ['./exercise6.component.css']
})
export class Exercise6Component  {

  buttonSaveCompleted: boolean = false;
  linkSaveCompleted: boolean = false;

  action$ = timer(2000);

  saveSomething(): void {
    this.action$.subscribe(() => this.buttonSaveCompleted = true);
  }

  saveSomethingFromLink() {
    this.action$.subscribe(() => this.linkSaveCompleted = true);
  }

  resetValues() {
    this.buttonSaveCompleted = false;
    this.linkSaveCompleted = false;
  }
}

