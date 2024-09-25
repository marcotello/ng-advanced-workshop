import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: 'button:not([resetButton]), [appAtButton]'
})
export class AtButtonDirective {
  private savingActionText: string = 'Saving...';
  private savedActionText: string = 'Saved!';

  @Input('appAtButton')
  set savedStatus(saved: boolean) {
    if(saved) {
      this.el.nativeElement.innerHTML = this.savedActionText;
    }
  }

  constructor(private el: ElementRef) {}

  @HostListener('click', ['$event.target'])
  onClick() {
    this.el.nativeElement.innerHTML = this.savingActionText;
  }
}
