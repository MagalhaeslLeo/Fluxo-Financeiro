import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/core/user'; 
 
@Component({
  templateUrl: './balanceteFinanceiroDet.page.html',
  styleUrls: ['./balanceteFinanceiroDet.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BalanceteFinanceiroDetPage implements OnDestroy {
 
  desabilitaAba: boolean = true;
  //parametro idPessoa para ser passado para o endereço
  public lElemento: any | undefined;
  //Atributo que contem o registro a ser exibido pelo formulario.
  private _registro: any | undefined;
  constructor(protected user: User, protected route: ActivatedRoute) {
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
 
 