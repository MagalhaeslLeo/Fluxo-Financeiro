import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'arrayFilter'
})

export class ArrayFilterPipe implements PipeTransform{
    transform(value: Array<any>, field: any, filter: any):any {

        if(filter){
            filter = filter.toUpperCase();
            return value.filter(a => 
                a.field.toUperCase().indexOf(filter)>= 0);
        }else{
            return value;
        }
        
    }

}