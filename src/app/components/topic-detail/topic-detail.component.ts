import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Topic } from '../../models/topic';
import { TopicService } from '../../services/topic.service';
import { Comment } from '../../models/comment';
import { UserService } from '../../services/user.service';
import { CommentService } from 'src/app/services/comment.service';
import { global } from '../../services/global';


@Component({
  selector: 'app-topic-detail',
  templateUrl: './topic-detail.component.html',
  styleUrls: ['./topic-detail.component.css'],
  providers: [TopicService, UserService, CommentService]
})
export class TopicDetailComponent implements OnInit {

  public status: string;
  public topic: Topic;
  public comment: Comment;
  public identity;
  public token;
  public url: string;


  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _topicService: TopicService,
    private _userService: UserService,
    private _commentService: CommentService
  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.comment = new Comment('', '', '', this.identity._id);
    this.url = global.url;
  }

  ngOnInit() {
    this._route.params.subscribe((params) => {
      var id = params['id'];
      this.getTopic(id);
    });
  }

  getTopic(id) {
    this._topicService.getTopic(id).subscribe(
      response => {
        if (response.topic) {
          this.topic = response.topic;
          if (this.topic.lang) {
            this.topic.lang = this.topic.lang.toLowerCase();
          }
          if (this.topic.lang == 'js') {
            this.topic.lang = 'javascript';
          } else if (this.topic.lang == 'c++') {
            this.topic.lang = 'cpp';
          }
        } else {
          this._router.navigate(['/home']);
        }
      },
      error => {
        console.log(<any>error);
        this._router.navigate(['/home']);
      }
    );

  }

  test() {
    this._commentService.add(this.token, this.comment, this.topic._id).subscribe(
      reponse => {

      },
      error => {
        console.log(<any>error);
      });
  }

  onSubmit(form) {
    this._commentService.add(this.token, this.comment, this.topic._id).subscribe(response => {
            if (response.topic) {
              this.topic = response.topic;
              form.reset();
    
            } else {
              this.status = 'error';
            }
          },
          error => {
            this.status = 'error';
            console.log(<any>error);
          });
  }

  deleteComment(commentId) {
    this._commentService.delete(this.token, this.topic._id, commentId).subscribe(
      response => {
        if (response.topic) {
          this.topic = response.topic;
        }
      },
      error => {
        console.log(<any>error);
      });
  }

}
