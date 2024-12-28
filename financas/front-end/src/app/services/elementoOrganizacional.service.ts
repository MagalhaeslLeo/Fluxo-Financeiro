import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ServiceBase } from "../core/serviceBase";
//import { Cacheable } from "ts-cacheable";
//import { FarolHierarquiaService } from "../core/farolHierarquia.service";

@Injectable({
  providedIn: "root",
})
export class ElementoOrganizacionalService {
  constructor(private service: ServiceBase) {}

//   @Cacheable()
  obterTodosElementos(): Observable<any> {
    return this.service.get("elementoOrganizacional/obterTodos");
  }

  ObterTodos(): Observable<any> {
    return this.service.get("Usuario/ObterTodos");
  }

  obterPessoaPorElemento(pId: any): Observable<any> {
    return this.service.get("elementoOrganizacional/obterPessoaPorIdElemento", { idElemento: pId });
  }

  obterElementoOrganizacionalPorFiltro(pTermo: string): Observable<any> {
    return this.service.get("elementoOrganizacional/obterTodosFiltrados", { termo: pTermo });
  }

  obterElementoOrganizacionalPorFiltros(pFiltro: any): Observable<any> {
    return this.service.get("elementoOrganizacional/obterPorFiltro", { filtro: pFiltro });
  }

  obterPorId(pId: any): Observable<any> {
    return this.service.get('elementoOrganizacional/obterPorId',{ idElemento: pId });
  }


  
}