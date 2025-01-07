import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Utils } from 'src/app/core/utils';
import { ElementoOrganizacionalService } from 'src/app/services/elementoOrganizacional.service';
 
@Component({
    selector: 'menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss']
})
export class MenuPage {
  mostraMenu = false;
 
  idElemento: any = undefined;
  elemento: any = undefined;
  public elementos: any[] = [undefined];
 
  public elementosFiltradosTodos: any[] = [];
  public elementosFiltrados: any[] = [];
 
  form:  FormGroup
  formControl = new FormControl();
  administrador: boolean = false;
  private _registro: any;
 
  user: any = {
    firstName: 'Dev',
    lastName: 'Full Stack',
    email: 'dev@teste.com',
    username: 'dev full'
  };
 
 
 
  constructor(/*protected user:User,*/ protected service: ElementoOrganizacionalService, protected utils: Utils, protected formBuilder: FormBuilder) {
 
    this.form = this.criarForm();
 
    this.administrador = this.user.administrador;
 
    // carrega co combo com elementos
    if(this.administrador){
      this.carregaElementoPorFiltro(" ");
    }else{
      this.getElementos();
    }
     
    if(this.user.logado && this.user.idElementoOrganizacional){
      this.idElemento = this.user.idElementoOrganizacional;
      this.elemento = this.user.elementoOrganizacional;
      this.form.controls['idElementoOrganizacional'].setValue(this.idElemento);
      this.form.controls['elementoOrganizacional'].setValue(this.elemento);
    }else{
      this.idElemento = 0;
      this.elemento = undefined;
    }
   
    this.utils.tratarAutoCompleteEntidade(this.form.controls["elementoOrganizacional"],this.form.controls["idElementoOrganizacional"],this.carregaElementosFiltrados.bind(this),0);
   
    this.atualizarRegistro();
  }
 
  ngOnInit(): void {
   
    if(this.user.logado && this.user.idElementoOrganizacional){
      this.idElemento = this.user.idElementoOrganizacional;
      this.elemento = this.user.elementoOrganizacional;
      this.form.controls['idElementoOrganizacional'].setValue(this.idElemento);
      this.form.controls['elementoOrganizacional'].setValue(this.elemento);
    }else{
      this.idElemento = 0;
      this.elemento = undefined;
    }
   
   
  }
 
  logoff(){
    this.user.logoff();
  }
 
 
  // get isDesenv():boolean{
  //   return !environment.production && !environment.homolog;
  // }
 
  getElementos(){
    if(this.user.administrador != undefined){
      this.service.obterTodosElementos().subscribe(result => {
        this.elementos = result;
      });
    }
    return this.elementos;
  }
 
  selecionarElementoAuto(pElemento: any){
    this.elementos = this.elementosFiltradosTodos;
    this.selecionarElementoCombo(pElemento["id"], pElemento);
  }
 
  selecionarElementoCombo(pIdElemento: any, pElemento: any){
    if(pIdElemento != '' && pIdElemento != undefined ){
      this.user.idElementoOrganizacional = pIdElemento;
      this.user.elementoOrganizacional = pElemento;
      const lElemento = this.elementos.find((f: { id: any; }) => f.id == pIdElemento);
      if(lElemento.poder != undefined){
        this.user.poderUM = lElemento.poder;
        this.mostraMenu = true;
      }else{
        // sessionStorage.removeItem(KEY_PODERUNIDADEMUINCIPAL);
        // sessionStorage.removeItem(KEY_IDAUX);
        this.mostraMenu = false;
        // this.user.poderUM = undefined;
      }
      this.utils.irParaHome();
    }else{
      // sessionStorage.removeItem(KEY_IDELEMENTOORGANIZACIONAL);
      // sessionStorage.removeItem(KEY_ELEMENTOORGANIZACIONAL);
      // sessionStorage.removeItem(KEY_PODERUNIDADEMUINCIPAL);
      this.utils.irParaHome();
      this.mostraMenu = false;
    }
  }
 
 
  selecionarElemento(pIdElemento: any){
    if(pIdElemento != '' && pIdElemento != undefined ){
      this.user.idElementoOrganizacional = pIdElemento;
      const lElemento = this.elementos.find((f: { id: any; }) => f.id == pIdElemento);
      if(lElemento.poder != undefined){
        this.user.poderUM = lElemento.poder;
        this.mostraMenu = true;
      }else{
        // sessionStorage.removeItem(KEY_PODERUNIDADEMUINCIPAL);
        // sessionStorage.removeItem(KEY_IDAUX);
        this.mostraMenu = false;
        // this.user.poderUM = undefined;
      }
      this.utils.irParaHome();
    }else{
      // sessionStorage.removeItem(KEY_IDELEMENTOORGANIZACIONAL);
      // sessionStorage.removeItem(KEY_PODERUNIDADEMUINCIPAL);
      //sessionStorage.removeItem(KEY_IDAUX);
      this.utils.irParaHome();
      this.mostraMenu = false;
    }
  }
 
  criarForm(){
    return this.formBuilder.group({
      elementoOrganizacional:[null,[]],
      idElementoOrganizacional:[null,[]]
    },{updateOn: 'change'});
  }
 
  obterNomeElemento(pEntidade: any){
    if(pEntidade){
      return pEntidade['nomeElemento']
    }else{
      return undefined;
    }
  }
 
  carregaElementosFiltrados(pTermo: string) {
    if(pTermo.trim()!=''){
      const lNomes:any[]= this.elementosFiltradosTodos;
 
  //  filtra a lista já carregada
      this.elementosFiltrados = lNomes.filter(nm=>
        this.utils.removerAcentuacao(nm.nomeElemento.toLowerCase())
        .includes(
          this.utils.removerAcentuacao(pTermo.toLowerCase())));
     
  }else{
      this.elementosFiltrados = this.elementosFiltradosTodos;
    }
 
  }
 
  atualizarRegistro(){
    this._registro = {};
    this.preencherForm(this._registro);
 
  }
 
  public preencherForm(pRegistro: any): void{
    this.form.patchValue(pRegistro);
   
  }
 
  public carregaElementoPorFiltro(pTermo: string){
    this.service.obterElementoOrganizacionalPorFiltro(pTermo).subscribe(result => {
      this.elementosFiltradosTodos = result;
      this.elementosFiltrados =  this.elementosFiltradosTodos;
      this.atualizarRegistro();
    });
 
  }
}
 