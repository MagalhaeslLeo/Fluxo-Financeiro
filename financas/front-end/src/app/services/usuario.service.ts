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

  ObterTodos(): Observable<any> {
    return this.service.get("Usuario/ObterTodos");
  }

  ObterUsuarioPorId(pId: any): Observable<any> {
    return this.service.get("Usuario/ObterUsuarioPorId", { idUsuario: pId });
  }
  Persistir(pCadVo:any): Observable<any>{
    return this.service.post("Usuario/Persistir", pCadVo);
  }
  Excluir(pId: any): Observable<any>{
    return this.service.delete("Usuario/Excluir", {idUsuario: pId});
  } 
  
}