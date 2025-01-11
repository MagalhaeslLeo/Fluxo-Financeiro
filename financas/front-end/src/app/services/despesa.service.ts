import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ServiceBase } from "../core/serviceBase";
//import { Cacheable } from "ts-cacheable";

@Injectable({
  providedIn: "root",
})
export class DespesaService {
  constructor(private service: ServiceBase) {}

//   @Cacheable()

ObterTodasDespesas(): Observable<any> {
    return this.service.get("Despesa/ObterTodasDespesas");
  }

  ObterPorId(pId: any): Observable<any> {
    return this.service.get("Despesa/ObterPorId", { pIdDespesa: pId });
  }

  PersistirDespesa(pDespesaVO:any): Observable<any>{
    return this.service.post("Despesa/PersistirDespesa", pDespesaVO);
  }

  ExcluirDespesa(pId: any): Observable<any>{
    return this.service.delete("Despesa/ExcluirDespesa", {pIdDespesa: pId});
  } 
  
}