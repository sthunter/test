import { Component, OnInit } from '@angular/core'
import { TestService } from 'app/services/test.service'
import { Router, ActivatedRoute } from '@angular/router'

interface Test {
  title: string 
  questions:any[]
}

interface Answer {
  text: string
  letter: string
}

@Component({
  selector: 'app-student-test',
  templateUrl: './student-test.component.html',
  styleUrls: ['./student-test.component.scss']
})
export class StudentTestComponent implements OnInit {

  constructor(public testService:TestService, private route:ActivatedRoute, private router:Router) { }

  private id:string = ''
  public title:string = ''
  public questions:any[] = []
  public responses:any = {}
  // {
  //   "1": {
  //      question: "What is the capitol of Idaho?", 
  //      answer: "A", 
  //      answerText: "Boise"
  //    },
  //    "2": {...}
  // }

  ngOnInit(): void {
    this.testService.reset()
    this.route.params.subscribe((params:any) => {
      this.id = params.id
    })

    this.testService.getTest(this.id).subscribe((test:Test) => {
      this.title = test.title
      this.questions = test.questions
      // create a response object for easier setting and submitting
      this.responses = this.questions.reduce((acc:any, question:any) => {
        acc[question.number] = null
        return acc
      }, {})
    })
  }

  setAnswer({text, letter}:Answer, question:string, number:string): void {
    this.responses[number] = {
      question,
      answerText: text,
      answer: letter
    }
  }

  submitTest(): void {
    this.testService.submit(this.responses, this.id).subscribe((response:any) => {
      if(response) {
        this.router.navigate(['/student-results'])
      }
    })
  }

}
