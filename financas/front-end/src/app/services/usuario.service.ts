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

  ObterUsuarioPorId(pId: any): Observable<any> {
    return this.service.get("Usuario/ObterUsuarioPorId", { pIdUsuario: pId });
  }
  PersistirUsuario(pUsuarioVo:any): Observable<any>{
    return this.service.post("Usuario/PersistirUsuario", pUsuarioVo);
  }
  ExcluirUsuario(pId: any): Observable<any>{
    return this.service.delete("Usuario/ExcluirUsuario", {pIdUsuario: pId});
  } 
  
}