import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Topic } from '../../../models/topic';
import { UserService } from '../../../services/user.service';
import { TopicService } from '../../../services/topic.service';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  providers: [UserService, TopicService]
})
export class AddComponent implements OnInit {

  public page_title: string;
  public topic: Topic;
  public identity;
  public token;
  public status;

  constructor(
    private _route:ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _topicService: TopicService
  ) {
    this.page_title = 'Crear nuevo tema';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.topic = new Topic(null, '', '', '', '', '', this.identity._id, null);
  }
  
  ngOnInit() {
    
  }

  onSubmit(form){
    this._topicService.addTopic(this.token, this.topic).subscribe(
      response=>{
        if(response.topic){
          this.status = 'success';
          this.topic = response.topic;
          this._router.navigate(['/dashboard']);
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
