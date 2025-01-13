import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ServiceBase } from "../core/serviceBase";
//import { Cacheable } from "ts-cacheable";

@Injectable({
  providedIn: "root",
})
export class ReceitaService {
  constructor(private service: ServiceBase) {}

//   @Cacheable()

ObterTodasReceitas(): Observable<any> {
    return this.service.get("Receita/ObterTodasReceitas");
  }

  ObterPorId(pId: any): Observable<any> {
    return this.service.get("Receita/ObterPorId", { pIdReceita: pId });
  }

  PersistirReceita(pReceitaVO:any): Observable<any>{
    return this.service.post("Receita/PersistirReceita", pReceitaVO);
  }

  ExcluirReceita(pId: any): Observable<any>{
    return this.service.delete("Receita/ExcluirReceita", {pIdReceita: pId});
  } 
  
}