import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {QuizService} from "@app/core/services/quiz.service";
import {MatStepper} from "@angular/material/stepper";
import {FormControl, FormGroup} from "@angular/forms";
import {Subscription, timer} from "rxjs"
import * as crypto from 'crypto-js';
import {NotificationService} from "@app/core/services/notification.service";

export interface QuizModel {
  DELETED: string,
  ID: number
  NUMBERS: number
  OPTION1: string
  OPTION2: string
  OPTION3: string
  OPTION4: string
  QUESTION: string
  QUIZ_ID: number
  SELECTION: string
}

@Component({
  selector: 'quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})

export class QuizComponent implements OnInit {

  @ViewChild('stepper') private myStepper: MatStepper;
  form: FormGroup = new FormGroup({});

  timeoutDuration: number
  currentDate: Date
  questionList: QuizModel[] = []
  score: number = 0
  done: boolean = false
  userSelected: object
  timerInterval: any;
  display: any;
  step = 1

  constructor(
    private quizService: QuizService,
    private notificationService: NotificationService
  ) {
  }

  ngOnInit(): void {
    this.getQuestions();
  }

  @HostListener("window:beforeunload")
  unloadHandler(event: Event) {
    let result = confirm("تغییرات شما ذخیره نمی شود، آیا مایل رفرش هستید؟");
    if (result) {
      // Do more processing...
    }
    event.returnValue = false;
  }

  start() {
    // if (localStorage.getItem('currentTime')) {
    //   this.currentDate = new Date(localStorage.getItem('currentTime'));
    // } else {
    //   this.currentDate = new Date();
    //   localStorage.setItem('currentTime', this.currentDate.toString());
    // }
    this.step=2
    this.currentDate = new Date();
    this.timeoutDuration = 10 * 60 * 1000; // 20 min
    let time = new Date()
    let timeoutTime = time.getTime() - this.currentDate.getTime()
    if (this.timeoutDuration <= timeoutTime) {
      this.currentDate = new Date();
      localStorage.setItem('currentTime', this.currentDate.toString());
      timeoutTime = time.getTime() - this.currentDate.getTime()
    }
    this.timeoutDuration = this.timeoutDuration - timeoutTime
    this.timer(this.timeoutDuration);
  }

  timer(second) {
    second = Math.floor(second / 1000)
    let minute = second / 60;
    let seconds: number = second % 60;

    this.timerInterval = setInterval(() => {
      second--;
      minute = Math.floor(second / 60);
      seconds = second % 60;
      this.display = `${minute}:${seconds}`;
      if (seconds == 0) {
        minute--
        seconds = 59
      }

      if (minute <= 0 && second <= 0) {
        clearInterval(this.timerInterval);
        this.setData()
        this.done = true
      }
    }, 1000);
  }

  getQuestions() {
    this.quizService.getQuestion().subscribe((res) => {
      if (res.data) {
        let bytes = crypto.AES.decrypt(res.data, 'samin5114616');
        this.questionList = JSON.parse(bytes.toString(crypto.enc.Utf8));
      }
      this.createForm()
    })

  }

  createForm(): void {
    this.questionList.forEach(el => {
      this.form.addControl(el.NUMBERS.toString(), new FormControl());
    });
    this.userSelected = this.form.getRawValue();
  }

  setData() {
    this.userSelected = this.form.getRawValue();
    for (const key in this.userSelected) {
      if (this.userSelected[key]) {
        if (this.questionList[+key - 1].SELECTION == this.userSelected[key]) {
          this.score += 1
        }
      }
    }
    this.quizService.setQuiz(this.userSelected).subscribe(() => {
      this.notificationService.valid("آزمون شما ثبت شد")
    })

    this.done = true
    localStorage.removeItem('currentTime');
    clearInterval(this.timerInterval);
  }


}
