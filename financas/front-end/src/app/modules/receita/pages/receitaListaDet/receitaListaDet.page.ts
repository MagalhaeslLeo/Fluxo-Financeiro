import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/core/user';
import { ReceitaService } from 'src/app/services/receita.service';
import { FonteRendaService } from 'src/app/services/fonteRenda.service';
 
 
@Component({
  templateUrl: './receitaListaDet.page.html',
  styleUrls: ['./receitaListaDet.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReceitaListaDetPage implements OnDestroy {
 
  desabilitaAba: boolean = true;
  //parametro idPessoa para ser passado para o endereço
  public lElemento: any | undefined;
  //Atributo que contem o registro a ser exibido pelo formulario.
  private _registro: any | undefined;
  constructor(
    protected user: User, 
    protected serviceReceita: ReceitaService,
    protected serviceFonteRenda: FonteRendaService, 
    protected route: ActivatedRoute) {
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
 
 