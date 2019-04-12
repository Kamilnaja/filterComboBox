import { Component, OnInit } from '@angular/core';
import { FormControl, AbstractControl } from '@angular/forms';
import model from './model.json';
import { DictionaryValue } from './DictionaryValue.js';

@Component({
  selector: 'app-combo',
  templateUrl: './combo.component.html',
  styleUrls: ['./combo.component.css']
})

export class ComboComponent implements OnInit {
  public sport: FormControl;
  public sportsList: DictionaryValue[];

  constructor() {
    this.sportsList = model;
   }

  ngOnInit() {
    this.sport = new FormControl('');
    this.sport.statusChanges.subscribe(item => console.log(item)
    ) ;
  }

  public get sportControl (): AbstractControl {
    return this.sport;
  }
}
