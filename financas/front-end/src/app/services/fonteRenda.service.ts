import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ServiceBase } from "../core/serviceBase";

@Injectable({
    providedIn: "root"
})

export class FonteRendaService{
    constructor(private service: ServiceBase) {}

    ObterTodasFonteRendas():Observable<any> {
        return this.service.get("FonteRenda/ObterTodasFonteRendas")
    }
    ObterPorId(pId:any):Observable<any>{
        return this.service.get("FonteRenda/ObterPorId",{pIdFonteRenda: pId})
    }
    PersistirFonteRenda(pFonteRendaVO:any):Observable<any>{
        return this.service.post("FonteRenda/PersistirFonteRenda",pFonteRendaVO)
    }
    ExcluirFonteRenda(pId:any):Observable<any>{
        return this.service.get("FonteRenda/ExcluirFonteRenda", {pIdFonteRenda: pId})
    }

}