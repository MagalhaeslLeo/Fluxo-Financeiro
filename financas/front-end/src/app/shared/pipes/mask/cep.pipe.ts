import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'cep' })
export class CepPipe implements PipeTransform {
    transform(value: string|number): string {
        let formatValue = value +'';
        if(formatValue != 'undefined'){
            formatValue = formatValue
                .padStart(8,'0')
                .substring(0,8)
                .replace(/[^0-9]/, '')
                .replace(/(\d{5})(\d{3})/,
                '$1-$2');

        }else{
            formatValue = '';
        }

        return formatValue;
    }

}