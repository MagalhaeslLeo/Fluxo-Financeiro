import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/core/user';
import { ReceitaService } from 'src/app/services/receita.service';
 
 
@Component({
  templateUrl: './receitaDet.page.html',
  styleUrls: ['./receitaDet.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReceitaDetPage implements OnDestroy {
 
  desabilitaAba: boolean = true;
  //parametro idPessoa para ser passado para o endereço
  public lElemento: any | undefined;
  //Atributo que contem o registro a ser exibido pelo formulario.
  private _registro: any | undefined;
  constructor(protected user: User, protected service: ReceitaService, protected route: ActivatedRoute) {
    const lIdStr: any = this.route.snapshot.paramMap.get('idRegistro');
    if (lIdStr) {
      this.desabilitaAba = false;
    }
  }
  ngOnDestroy(){
    sessionStorage.removeItem("objAux");
    sessionStorage.removeItem("idAux");
  }
}
 
 