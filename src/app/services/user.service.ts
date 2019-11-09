import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

import { global } from './global';


@Injectable()
export class UserService {
    public url: string;
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
}