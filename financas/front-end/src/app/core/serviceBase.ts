import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom, Observable } from "rxjs";
 
@Injectable()
export class ServiceBase {
  private header = new HttpHeaders({
    'Content-type': 'application/json'
  });
 
  private url: string = '';
 
  async loadEnvironment(): Promise<void> {
    const env = await lastValueFrom(this.http.get('/assets/env.json'));
    this.url = (env as any).apiUrl;
  }
 
  constructor(private http: HttpClient) {}
 
  /**
   * GET Method
   */
  get<T>(endpoint: string, paramsObject?: { [key: string]: any }): Observable<T> {
    const params = this.createHttpParams(paramsObject);
    return this.http.get<T>(`${this.url}/${endpoint}`, { params, headers: this.header });
  }
 
  /**
   * POST Method
   */
  post<T>(endpoint: string, body: any, paramsObject?: { [key: string]: any }): Observable<T> {
    const params = this.createHttpParams(paramsObject);
    return this.http.post<T>(`${this.url}/${endpoint}`, body, { params, headers: this.header });
  }
 
  /**
   * PUT Method
   */
  put<T>(endpoint: string, body: any, paramsObject?: { [key: string]: any }): Observable<T> {
    const params = this.createHttpParams(paramsObject);
    return this.http.put<T>(`${this.url}/${endpoint}`, body, { params, headers: this.header });
  }
 
  /**
   * DELETE Method
   */
  delete<T>(endpoint: string, paramsObject?: { [key: string]: any }): Observable<T> {
    const params = this.createHttpParams(paramsObject);
    return this.http.delete<T>(`${this.url}/${endpoint}`, { params, headers: this.header });
  }
 
  /**
   * Utility Method to Create HttpParams
   */
  private createHttpParams(paramsObject?: { [key: string]: any }): HttpParams {
    let params = new HttpParams();
    if (paramsObject) {
      Object.keys(paramsObject).forEach((key) => {
        if (paramsObject[key] !== undefined && paramsObject[key] !== null) {
          params = params.append(key, paramsObject[key]);
        }
      });
    }
    return params;
  }
}
 