import { Component, OnInit } from '@angular/core';
import { TestService } from '../services/test.service';

@Component({
  selector: 'app-student-results',
  templateUrl: './student-results.component.html',
  styleUrls: ['./student-results.component.scss']
})
export class StudentResultsComponent implements OnInit {

  constructor(
    public testService: TestService
  ) { }

  public answers = []

  ngOnInit(): void {

  }

}
