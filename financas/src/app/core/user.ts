import { Injectable } from '@angular/core';
//import { KeycloakService } from 'keycloak-angular';




//Chave utilizada para guardar o userprofile em sessao
//O Profile é o objeto devolvido pelo keycloak após a realização do login
const KEY_USERPROFILE = 'userprofile';
const KEY_ADMINISTRADOR = 'administrador';
const KEY_IDELEMENTOORGANIZACIONAL = 'idElementoOrganizacional';
const KEY_ELEMENTOORGANIZACIONAL = 'elementoOrganizacional';
const KEY_PODERUNIDADEMUINCIPAL = 'poderUM';
const KEY_IDAUX = 'idAux';
const KEY_OBJAUX = 'objAux';
const KEY_RESPONSAVELAUX = 'responsavelAux';


@Injectable()
export class User { 

  adm: boolean = true;
  idElemento: any = undefined;
 
  constructor(/*protected keycloak:KeycloakService*/) {
 
  }

  //Realize o logoff do usuario corrente, chamando o keycloak
  logoff() {
    
    //Devolve para a tela inicial
    let lUrlInicio:string=window.location.href;
    lUrlInicio=lUrlInicio.slice(0,lUrlInicio.indexOf('/#')+1);
   

    // this.keycloak.logout(lUrlInicio).then(()=>{
    //   this.profile=null;
      
    // })
  }

  
  get username():string{
    return this.profile.username;
  }

  get firstName():string{
    return this.profile.firstName;
  }

  get lastName():string{
    return this.profile.lastName;
  }

  get email():string{
    return this.profile.email;
  }

  get logado(): boolean {
    return this.profile!=null;

  }

  get administrador(): boolean{
    return this.adm
  }
  

  get profile(): any {

    const lStr = sessionStorage.getItem(KEY_USERPROFILE);
    if (lStr != '' && lStr != null && lStr != undefined) {
      return JSON.parse(lStr);

    } else {

      return null;
    }


  }

  set profile(pUserProfile: any) {

    if (pUserProfile != null) {
      
      sessionStorage.setItem(KEY_USERPROFILE, JSON.stringify(pUserProfile));
      sessionStorage.setItem(KEY_ADMINISTRADOR, JSON.stringify(this.administrador));
      
    } else {
      
      sessionStorage.removeItem(KEY_USERPROFILE);
      sessionStorage.removeItem(KEY_ADMINISTRADOR);
      sessionStorage.removeItem(KEY_IDELEMENTOORGANIZACIONAL);
      sessionStorage.removeItem(KEY_ELEMENTOORGANIZACIONAL);
      sessionStorage.removeItem(KEY_IDAUX);
      sessionStorage.removeItem(KEY_OBJAUX);
      sessionStorage.removeItem(KEY_RESPONSAVELAUX);
      

    }
    
    
  }
  
  set idElementoOrganizacional(pIdElemento: any){
    sessionStorage.setItem(KEY_IDELEMENTOORGANIZACIONAL, JSON.stringify(pIdElemento));

  }

  
  
  get idElementoOrganizacional(){
    
    const lStr = sessionStorage.getItem(KEY_IDELEMENTOORGANIZACIONAL);
    if (lStr != '' && lStr != null && lStr != undefined && lStr != 'undefined') {
      return JSON.parse(lStr);
      
    } else {
      
      return null;
    }
    
  }

  set elementoOrganizacional(pElemento: any){
    sessionStorage.setItem(KEY_ELEMENTOORGANIZACIONAL, JSON.stringify(pElemento));

  }

  
  
  get elementoOrganizacional(){
    
    const lStr = sessionStorage.getItem(KEY_ELEMENTOORGANIZACIONAL);
    if (lStr != '' && lStr != null && lStr != undefined && lStr != 'undefined') {
      return JSON.parse(lStr);
      
    } else {
      
      return null;
    }
    
  }
 
  set idAux(pIdAux: any){
    sessionStorage.setItem(KEY_IDAUX, JSON.stringify(pIdAux));

  }
 
  get idAux(){
    const lStr = sessionStorage.getItem(KEY_IDAUX);
    if (lStr != '' && lStr != null && lStr != undefined) {
      return JSON.parse(lStr);

    } else {

      return null;
    }

  }
  set objAux(pObjAux: any){
    sessionStorage.setItem(KEY_OBJAUX, JSON.stringify(pObjAux));

  }
 
  get objAux(){
    const lStr = sessionStorage.getItem(KEY_OBJAUX);
    if (lStr != '' && lStr != null && lStr != undefined) {
      return JSON.parse(lStr);

    } else {

      return null;
    }

  }

  set responsavelAux(pPesponsavelAux: any){
    sessionStorage.setItem(KEY_OBJAUX, JSON.stringify(pPesponsavelAux));

  }
 
  get responsavelAux(){
    const lStr = sessionStorage.getItem(KEY_OBJAUX);
    if (lStr != '' && lStr != null && lStr != undefined) {
      return JSON.parse(lStr);

    } else {

      return null;
    }

  }

  set poderUM(pCodigo: any){
    sessionStorage.setItem(KEY_PODERUNIDADEMUINCIPAL,JSON.stringify(pCodigo));
  }

  get poderUM(){
    const lStr = sessionStorage.getItem(KEY_PODERUNIDADEMUINCIPAL);
    if(lStr != '' && lStr != null && lStr != undefined){
      return JSON.parse(lStr);
    } else {
      return null;
    }
  }


}
