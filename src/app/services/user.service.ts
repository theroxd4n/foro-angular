import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { User } from '../models/user';

import { global } from './global';


@Injectable()
export class UserService{
    public url: string;
    constructor(
        private _http: HttpClient
    ){
        this.url = global.url;
    }


    register(user): Observable<any>{
        // CONVERTIR OBJETO DEL USUARIO A UN JSON STRING
    
        let params = JSON.stringify(user);
        // DEFINIR HEADERS
    
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
    
        // HACER PETICION AJAX
    
        return this._http.post(this.url+'register', params, {headers: headers});
      }
}