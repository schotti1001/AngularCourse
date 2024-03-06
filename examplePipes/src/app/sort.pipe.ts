import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: any, propertyName: string) {
    if(value.length === 0 ) {
        return value;
    }
    return value.sort((a,b) => {
        var x = a[propertyName]; var y = b[propertyName];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    })
  }

}
