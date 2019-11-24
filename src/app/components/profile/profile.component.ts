import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Topic } from '../../models/topic';
import { TopicService } from '../../services/topic.service';
import { global } from '../../services/global';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [UserService, TopicService]
})
export class ProfileComponent implements OnInit {
  public user: User;
  public status: string;
  public topics: Topic[];
  public url: string;

  constructor(
    private _userService: UserService,
    private _topicService: TopicService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.url = global.url;
  }

  ngOnInit() {
    this._route.params.subscribe((params)=>{
      var userId = params['id'];
      this.getUser(userId);
      this.getTopics(userId);
    });
  }

  getUser(userId){
    this._userService.getUser(userId).subscribe(
      response => {
              if (response.user) {
                this.user = response.user;
      
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

  getTopics(userId) {

    this._topicService.getTopicsByUser(userId).subscribe(
      response => {
        if (response.topics) {
          this.status = 'success';
          this.topics = response.topics;
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


}
