import { Injectable } from '@angular/core'
import { map, catchError } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http'
import { environment } from 'environments/environment'


@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(public http:HttpClient, ) { 

  }

  public results:any = {}
 //TODO:  add error handling
 //       add JWT to header

  public getTest(id:string) {
    return this.http.get(`${environment.baseUrl}/questions?id=${id}`)
      .pipe(
        map((body:any) => {
          return body
        })
      )
  }

  public submit(responses:any, id:string) {
    return this.http.post(`${environment.baseUrl}/grade?id=${id}`, responses)
      .pipe(
        map((body:any) => {
          if(body) {
            this.results = body
            return true
          }
          return false
        })
      )
  }

  public reset() {
    this.results = {}
  }
}
