import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MathQuestion } from './interfaces/question';
import { DOCUMENT } from '@angular/common';
import { DomController } from '@ionic/angular';
import { Vibration } from '@ionic-native/vibration/ngx';
// import { Keyboard } from '@ionic-native/keyboard/ngx';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{


  public questions: MathQuestion[] = [];
  public activeQuestion: MathQuestion;


   // constructor() {}

  constructor(private domCtrl: DomController, @Inject(DOCUMENT) private document, private http: HttpClient ){

    // Vibrate the device for a second
    // Duration is ignored on iOS.
    //this.vibration.vibrate(1000)
    // this.keyboard.show();

    // this.keyboard.hide();

    this.activeQuestion = {
      "question": "",
      "background": "magenta"

    };




  }

  ngOnInit(){

    this.http.get('assets/questions.json').subscribe((res: any) => {
    
      this.questions = res.questions;
      this.setQuestion();
    });

 

  }

  setQuestion() {

    console.log(this.questions);

    if(this.questions.length > 0){

      console.log(this.questions);

      let selectedQuestion = Math.floor(Math.random() * this.questions.length)
      this.activeQuestion = this.questions[selectedQuestion];

      this.domCtrl.write(() => {

      document.documentElement.style.setProperty('--ion-background-color', this.activeQuestion.background);
    })

    }

    

  }

 
}
