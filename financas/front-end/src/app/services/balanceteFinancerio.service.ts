import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ServiceBase } from "../core/serviceBase";

@Injectable({
  providedIn: "root",
})
export class BalanceteFinanceiroService {
  constructor(private service: ServiceBase) {}


  ObterTodos(): Observable<any> {
    return this.service.get("BalanceteContabil/ObterTodos");
  }

  ObterPorId(pId: any): Observable<any> {
    return this.service.get("BalanceteContabil/ObterPorId", { pIdBalancete: pId });
  }

  PersistirBalancete(pBalanceteVO:any): Observable<any>{
    return this.service.post("BalanceteContabil/PersistirBalancete", pBalanceteVO);
  }

  ExcluirBalancete(pId: any): Observable<any>{
    return this.service.delete("BalanceteContabil/ExcluirBalancete", {pIdBalancete: pId});
  } 

  ObterBalanceteContabilPorPeriodo(pPeriodicidade:string):Observable<any>{
    return this.service.get("BalanceteContabil/ObterBalanceteContabilPorPeriodo", {pPeriodicidade: pPeriodicidade});
  }
  
}