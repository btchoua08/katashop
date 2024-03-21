import {Pipe , PipeTransform} from '@angular/core';

@Pipe({
    name:'shroten'
})

export class ShrotenPipe implements PipeTransform{

    transform(value:string, maxLength=50): string{
        if (value.length <=maxLength){
            return  value;
        }
        return value.substring(0,maxLength) +'...';
    }
}