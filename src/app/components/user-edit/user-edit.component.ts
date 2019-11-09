import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { global } from '../../services/global';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService]
})
export class UserEditComponent implements OnInit {

  public page_title: string;
  public status: string;
  public user: User;
  public identity;
  public token;
  public url: string;
  public afuConfig;


  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute

  ) {
    this.page_title = 'Ajustes';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.user = this.identity;
    this.url = global.url;

    this.afuConfig = {
      uploadAPI: {
        url: this.url + '/upload-avatar',
        headers: {
          "Authorization": this.token
        }
      },
      multiple: false,
      formatsAllowed: ".jpg,.png,.jpeg,.gif",
      maxSize: '50',
      theme: "attachPin",
      hideProgressBar: false,
      hideResetBtn: true,
      hideSelectBtn: false,
      replaceTexts: {
        selectFileBtn: 'Seleccionar archivo...',
        resetBtn: 'Reset',
        uploadBtn: 'Subir',
        dragNDropBox: 'Drag N Drop',
        attachPinBtn: 'Seleccionar archivo...',
        afterUploadMsg_success: '¡Subida satisfactoria!',
        afterUploadMsg_error: '¡Subida fallida!'
      }
    };
  }

  ngOnInit() {
  }

  onSubmit(form) {
    this._userService.update(this.user).subscribe(
      response => {
        if(response && response.user._id){
          this.status = 'success';
          localStorage.setItem('identity', JSON.stringify(this.user));
          
        } else {
          this.status = 'error';
        }
      },
      error => {
        this.status = 'error';
        console.log(<any>error);
      }
    );
  }

  avatarUpload(data) {
    let data_obj = JSON.parse(data.response);
    this.user.image = data_obj.user.image;
  }

}
