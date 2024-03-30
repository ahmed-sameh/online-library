import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'extractID',
  standalone: true,
})
export class ExtractIdPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value;

    const parts = value.split('/');
    return parts[parts.length - 1];
  }
}
