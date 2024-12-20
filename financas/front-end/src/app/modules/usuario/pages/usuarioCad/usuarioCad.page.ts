import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
    templateUrl: './usuarioCad.page.html',
    styleUrls: ['./usuarioCad.page.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class UsuarioCadPage{
      // desabilitaAba: boolean = true;
  // existePrograma: boolean = false;
 
  //parametro idPessoa para ser passado para o endereço
  //public lElemento: any | undefined;
 
  //Atributo que contem o registro a ser exibido pelo formulario.
  private _registro: any | undefined;
 
  constructor(
    protected route: ActivatedRoute)
  {
 
    const lIdStr: any = this.route.snapshot.paramMap.get('idRegistro');
 
    if (lIdStr) {
      //this.desabilitaAba = false;
 
    }
 
  }
 
 
}
