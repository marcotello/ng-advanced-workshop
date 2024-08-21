import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'boldMatchText'
})
export class BoldMatchTextPipe implements PipeTransform {

  transform(text: string, lettersInBold: string): string {
    if (!lettersInBold) {
      return text;
    }

    const escapedLetters = lettersInBold.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedLetters})`, 'i');
    return text.replace(regex, '<b>$1</b>');
  }
}
