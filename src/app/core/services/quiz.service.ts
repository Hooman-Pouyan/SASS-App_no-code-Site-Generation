import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, map} from "rxjs/operators";
import {throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  getQuestion() {
    return this.httpClient.get('/api/features/quizQusetion').pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  setQuiz(data) {
    return this.httpClient.post('/api/features/quiz', data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }


}
