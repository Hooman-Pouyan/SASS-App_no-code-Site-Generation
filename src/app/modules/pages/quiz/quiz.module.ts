import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizComponent } from './quiz.component';
import {SharedModule} from "@app/shared/shared.module";
import {QuizRoutingModule} from "@app/modules/pages/quiz/quiz-routing.module";
import {HeaderModule} from "@app/modules/pages/header/header.module";
import {FooterModule} from "@app/modules/pages/footer/footer.module";

@NgModule({
  declarations: [
    QuizComponent
  ],
  exports: [
    QuizComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    QuizRoutingModule,
    HeaderModule,
    FooterModule,
  ]
})
export class QuizModule { }
