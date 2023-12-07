import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myCapitalizePipe'
})
export class MyCapitalizePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return value.toUpperCase();
  }

}
