import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  getSearchDetails(searchTxt)
  {
    console.log("Search functionality goes here!!");
  }
}
