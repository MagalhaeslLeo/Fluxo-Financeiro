import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom, Observable } from "rxjs";
import { ServiceUtil } from "./serviceUtil";
 
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
 
  constructor(
    //private serviceUtil: ServiceUtil,
    private http: HttpClient
  ) {}
 
 
//   post(pEndpoint: string, pUrlParams?: { [key: string]: any }, pDataJson?: any, pFeedback: boolean = true) {
//     const lUrlParams = this.formatarUrlParams(pUrlParams, pFeedback)
 
//     return this.serviceUtil.post(this.url, pEndpoint + (lUrlParams ? "?" + lUrlParams : ""), this.serviceUtil.formatarBodyParams(pDataJson));
 
// }
 
// get(pEndpoint: string, pUrlParams?: { [key: string]: any }, pFeedback: boolean = true) {
//     const lUrlParams = this.formatarUrlParams(pUrlParams, pFeedback)
 
//     return this.serviceUtil.get(this.url, pEndpoint + (lUrlParams ? "?" + lUrlParams : ""));
 
// }
 
// postBlob(pEndpoint: string, pUrlParamsJson?: { [key: string]: any }, pDataJson?: any) {
//     const lUrlParams = pUrlParamsJson ? this.serviceUtil.formatarParamsJson(pUrlParamsJson) : null;
//     return this.serviceUtil.postBlob(this.url, pEndpoint + (lUrlParams ? "?" + lUrlParams : ""), this.serviceUtil.formatarBodyParams(pDataJson));
// }
 
// getBlob(pEndpoint: string, pUrlParams: { [key: string]: any }) {
//     const lUrlParams = this.serviceUtil.formatarParamsJson(pUrlParams);
//     return this.serviceUtil.getBlob(this.url, pEndpoint + (lUrlParams ? "?" + lUrlParams : ""));
// }
 
// formatarUrlParams(pUrlParams?: { [key: string]: any }, pFeedback: boolean = true) {
//     let lUrlParams = null;
 
//     //Trata o parâmetro especia "_feedbak" para o controle do AguardeDialog
//     if (pUrlParams) {
//         if (!pFeedback) {
//             pUrlParams['_feedback'] = false;
//         }
//         lUrlParams = this.serviceUtil.formatarParamsJson(pUrlParams);
//     } else {
//         if (!pFeedback) {
//             lUrlParams = this.serviceUtil.formatarParamsJson({ _feedback: false });
//         }
//     }
//     return lUrlParams;
// }
//   /**
   /* GET Method
   */
  get<T>(endpoint: string, paramsObject?: { [key: string]: any }): Observable<T> {
    const params = this.createHttpParams(paramsObject);
    return this.http.get<T>(`${this.url}/${endpoint}`, { params, headers: this.header });
  }
 
//   /**
//    * POST Method
//    */
  post<T>(endpoint: string, body: any, paramsObject?: { [key: string]: any }): Observable<T> {
    const params = this.createHttpParams(paramsObject);
    return this.http.post<T>(`${this.url}/${endpoint}`, body, { params, headers: this.header });
  }
 
//   /**
//    * PUT Method
//    */
  put<T>(endpoint: string, body: any, paramsObject?: { [key: string]: any }): Observable<T> {
    const params = this.createHttpParams(paramsObject);
    return this.http.put<T>(`${this.url}/${endpoint}`, body, { params, headers: this.header });
  }
 
//   /**
//    * DELETE Method
//    */
  delete<T>(endpoint: string, paramsObject?: { [key: string]: any }): Observable<T> {
    const params = this.createHttpParams(paramsObject);
    return this.http.delete<T>(`${this.url}/${endpoint}`, { params, headers: this.header });
  }
 
//   // delete<T>(endpoint: string, body?: any, paramsObject?: { [key: string]: any }): Observable<T> {
//   //   const params = this.createHttpParams(paramsObject);
//   //   return this.http.delete<T>(`${this.url}/${endpoint}`, { params, headers: this.header });
//   // }
 
 
//   /**
//  * DELETE Method with Body Support
//  */
// // delete<T>(endpoint: string, body?: any, paramsObject?: { [key: string]: any }): Observable<T> {
// //   const params = this.createHttpParams(paramsObject);
// //   return this.http.request<T>('DELETE', `${this.url}/${endpoint}`, {
// //     body,
// //     params,
// //     headers: this.header,
// //   });
// // }
 
 
 
 
//   /**
//    * Utility Method to Create HttpParams
//    */
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
 
 