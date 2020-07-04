import { Pipe, PipeTransform } from '@angular/core';

// pipe decorator
@Pipe({
    name: 'convertToSpaces'
})
export class ConvertToSpacesPipe implements PipeTransform {
    
    transform(value: string, character: string): string {
        return value.replace(character, ' ');
    }
}