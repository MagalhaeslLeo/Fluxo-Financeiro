import { Component, Output, EventEmitter, Input } from "@angular/core";
import { Location } from '@angular/common'

import { FormGroup } from "@angular/forms";

@Component({
    selector: 'rodape-cad',
    templateUrl: './rodapeCad.component.html',
    styleUrls: ['./rodapeCad.component.css']
})
export class RodapeCadComponent {
    @Output() confirmar = new EventEmitter();
    @Output() cancelar = new EventEmitter();
    @Output() cancelarRoute = new EventEmitter();
    @Input() cadForm:FormGroup|undefined;
    @Input() registro:any|undefined;
    @Input() isRoute: boolean = false;
    

    constructor(private location: Location) { }

    confirmarClick() {
        this.confirmar.emit();
    }

    cancelarClick() {
        this.location.back();
    }
    cancelarRouteClick() {
        this.cancelarRoute.emit();
    }

}