import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ServiceBase } from "../core/serviceBase";
//import { Cacheable } from "ts-cacheable";
 
@Injectable({
  providedIn: "root",
})
export class PerfilService {
  constructor(private service: ServiceBase) {}
 
//   @Cacheable()
 
ObterTodosPerfis(): Observable<any> {
    return this.service.get("Perfil/ObterTodosPerfis");
  }
 
  ObterPorId(pId: any): Observable<any> {
    return this.service.get("Perfil/ObterPorId", { pIdPerfil: pId });
  }
 
  PersistirPerfil(pPerfilVO:any): Observable<any>{
    return this.service.post("Perfil/PersistirPerfil", pPerfilVO);
  }
 
  ExcluirPerfil(pId: any): Observable<any>{
    return this.service.delete("Perfil/ExcluirPerfil", {pIdPerfil: pId});
  }
 
}
 