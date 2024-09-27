import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {timer} from "rxjs";

@Component({
  selector: 'app-button-with-states',
  templateUrl: './button-with-states.component.html',
  styleUrls: ['./button-with-states.component.css']
})
export class ButtonWithStatesComponent implements OnInit {

  currentTemp: TemplateRef<any>;

  action$ = timer(2000);

  @Input() initialTemplate: TemplateRef<any>;
  @Input() workingTemplate: TemplateRef<any>;
  @Input() doneTemplate: TemplateRef<any>;

  ngOnInit() {
    this.currentTemp = this.initialTemplate;
  }

  changeState() {
    this.currentTemp = this.workingTemplate;
    this.action$.subscribe(
      () => this.currentTemp = this.doneTemplate
    );
  }
}
