import { Component, OnInit } from '@angular/core';
import { TopicService } from 'src/app/services/topic.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Topic } from '../../models/topic';

@Component({
  selector: 'app-search',
  templateUrl: '../topics/topics.component.html',
  styleUrls: ['./search.component.css'],
  providers: [TopicService]
})
export class SearchComponent implements OnInit {

  public page_title: string;
  public topics: Topic[];
  public status: string;
  public no_paginate;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _topicService: TopicService
  ) {
    this.page_title = 'Búsqueda de: ';
    this.no_paginate = true;
  }

  ngOnInit() {
    this._route.params.subscribe((params) => {
      var searchString = params['search'];
      this.page_title = 'Búsqueda de: ';
      this.page_title = this.page_title + searchString;

      this.getTopics(searchString);
    });

  }
  getTopics(search) {
    this._topicService.search(search).subscribe(response => {
            if (response.topics) {
              this.topics = response.topics;
    
            } else {
              this.status = 'error';
            }
          },
          error => {
            this.status = 'error';
            console.log(<any>error);
          })
  }

}
