import { Component, OnInit } from '@angular/core';


import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
  public page_title: string;
  public user: User;
  public status: string;

  constructor(
    private _userService: UserService,
  ) { 
    this.page_title = 'Registro';

    this.user = new User(null, '', '', '', '', '', 'ROLE_USER');
  }

  ngOnInit() {
  }

  onSubmit(form){
    this._userService.register(this.user).subscribe(
      response=>{
        if(response.user && response.user._id){
          this.status = 'success';
          form.reset();
        } else {
          this.status = 'error';
        }
      },
      error=>{
        this.status = 'error';
        console.log(<any>error);
      }
    );
  }

  

}