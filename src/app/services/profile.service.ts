import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

    constructor(
        private _HttpClient: HttpClient,
      ) { }
      private baseURL: string = `${environment.api}/api/users`

      public updateImage(_image): Observable<any> {
        console.log(_image)
        return this._HttpClient
          .patch(
            `${this.baseURL}/image`, _image,{
                headers: new HttpHeaders()
                  .set('Access-Control-Allow-Origin','*')
                 , observe: 'response'
            }
          )
      }
      public updateInfo(_user):Observable<any>{
          return this._HttpClient
          .patch(
              `${this.baseURL}/edit`,_user
          )
      }
      public getUserInfo():Observable<any>{
          return this._HttpClient
          .get(
            `${this.baseURL}`,{
                headers: new HttpHeaders()
                  .set('user-token',localStorage.getItem('Token'))
                 , observe: 'response'
              }
          )
      }

}