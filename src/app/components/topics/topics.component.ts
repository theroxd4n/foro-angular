import { Component, OnInit } from '@angular/core';
import { TopicService } from 'src/app/services/topic.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Topic } from '../../models/topic';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css'],
  providers: [TopicService]
})
export class TopicsComponent implements OnInit {

  public page_title: string;
  public topics: Topic[];
  public totalPages;
  public page;
  public nextPage;
  public prevPage;
  public number_pages;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _topicService: TopicService
  ) {
    this.page_title = 'Temas';
  }

  ngOnInit() {
    this._route.params.subscribe((params) => {
      var page = +params['page'];

      if (!page) {
        page = 1;
        this.prevPage = 1;
        this.nextPage = 2;
      }
      this.getTopics(page);
    });
  }

  getTopics(page = 1) {
    this._topicService.getTopics(page).subscribe(
      response => {
        if (response.topics) {
          this.topics = response.topics;

          this.totalPages = response.totalPages;

          var number_pages = [];
          for (var i = 1; i <= this.totalPages; i++) {
            number_pages.push(i);
          }

          this.number_pages = number_pages;

          if (page >= 2) {
            this.prevPage = page - 1;
          } else {
            this.prevPage = 1;
          }

          if (page < this.totalPages) {
            this.nextPage = page + 1;
          } else {
            this.nextPage = this.totalPages;
          }


        } else {
          this._router.navigate(['/home']);
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

}
