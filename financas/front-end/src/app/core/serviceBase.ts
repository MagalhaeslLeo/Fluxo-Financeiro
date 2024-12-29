import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom, Observable } from "rxjs";

@Injectable()

export class ServiceBase{

    private header =  new HttpHeaders({
        'Content-type' : 'application/json'
    });
    
    private url: string = '';

    async loadEnvironment():Promise<void>{
        const env = await lastValueFrom(this.http.get('/assets/env.json'));
        this.url = (env as any).apiUrl;
    }

    constructor(private http: HttpClient){}
    //Área de metódos
    get<T>(endpoint : string, pParametro?: {[chave: string]:any}): Observable<T>{
        return this.http.get<T>(`${this.url}/${endpoint}`, pParametro);
    } 
    post<T>(endpoint : string, body : any) : Observable<T> {
        return this.http.post<T>(`${this.url}/${endpoint}`, body, {headers: this.header})
    }
    put<T>(endpoint : string, body : any) : Observable<T> {
        return this.http.put<T>(`${this.url}/${endpoint}`, body, {headers: this.header})
    }
    delete<T>(endpoint : string, pParametro: {[chave: string]: any}): Observable<T>{
        return this.http.delete<T>(`${this.url}/${endpoint}`);
    } 
}