import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ServiceBase } from "../core/serviceBase";
//import { Cacheable } from "ts-cacheable";

@Injectable({
  providedIn: "root",
})
export class UsuarioService {
  constructor(private service: ServiceBase) {}

//   @Cacheable()

  ObterTodosUsuarios(): Observable<any> {
    return this.service.get("Usuario/ObterTodosUsuarios");
  }

  ObterUsuariosComPerfil(): Observable<any> {
    return this.service.get("Usuario/ObterUsuariosComPerfil");
  }

  ObterPorId(pId: any): Observable<any> {
    return this.service.get("Usuario/ObterPorId", { pIdUsuario: pId });
  }

  ObterUsuarioPorID(pId: any): Observable<any> {
    return this.service.get("Usuario/ObterUsuarioPorID", { id: pId });
  }

  PersistirUsuario(pUsuarioVo:any): Observable<any>{
    return this.service.post("Usuario/PersistirUsuario", pUsuarioVo);
  }

  ExcluirUsuario(pId: any): Observable<any>{
    return this.service.delete("Usuario/ExcluirUsuario", {pIdUsuario: pId});
  } 
  
}