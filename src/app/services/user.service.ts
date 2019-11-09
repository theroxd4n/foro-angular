import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

import { global } from './global';


@Injectable()
export class UserService {
    public url: string;
    public identity;
    public token;
    constructor(
        private _http: HttpClient
    ) {
        this.url = global.url;
    }


    register(user): Observable<any> {
        // CONVERTIR OBJETO DEL USUARIO A UN JSON STRING

        let params = JSON.stringify(user);
        // DEFINIR HEADERS

        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        // HACER PETICION AJAX

        return this._http.post(this.url + 'register', params, { headers: headers });
    }

    signup(user, getToken = null): Observable<any> {
        // COMPROBAR SI LLEGA EL GETTOKEN

        if (getToken != null) {
            user.getToken = getToken;
        }
        // CONVERTIR USUARIO A UN JSON STRING
        let params = JSON.stringify(user);

        // DEFINIR CABECERAS
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        // HACER PETICION AJAX
        return this._http.post(this.url + 'login', params, { headers: headers });
    }

    getIdentity(){
        let identity = JSON.parse(localStorage.getItem('identity'));
        
        if(identity && identity != null && identity != undefined && identity != 'undefined'){
            this.identity = identity;
        } else {
            this.identity = null
        }

        return this.identity;
    }
    getToken(){
        let token = localStorage.getItem('token');
        
        if(token && token != null && token != undefined && token != 'undefined'){
            this.token = token;
        } else {
            this.token = null
        }

        return this.token;
    }

    update(user):Observable<any>{
        // CONVERTIR USER A UN JSON STRING
        let params = JSON.stringify(user);

        // DEFINIR HEADERS

        let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.getToken());

        // HACER PETICION AJAX

        return this._http.put(this.url+'user/update', params, {headers: headers});
    }
}