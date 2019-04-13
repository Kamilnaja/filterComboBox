import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { FormControl, AbstractControl } from '@angular/forms';
import model from './model.json';
import { DictionaryValue } from './DictionaryValue.js';

@Component({
  selector: 'app-combo',
  templateUrl: './combo.component.html',
  styleUrls: ['./combo.component.css']
})

export class ComboComponent implements OnInit, OnChanges, OnDestroy {

  constructor() {
    this.sportsList = model;
  }

  public sportsList: DictionaryValue[];
  public selectedSport = new FormControl('');
  private selectedItem: DictionaryValue;
  private sub;
  public isOptionVisible: boolean = false;

  ngOnInit() {
    this.sub = this.selectedSport.valueChanges.subscribe(item => console.log(item));
  }

  ngOnChanges(): void {
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public get sportControl(): AbstractControl {
    return this.selectedSport;
  }

  public handleSubmit() {
    console.log(this.selectedSport.value);
  }

  public mapValueIntoObject(value: string): DictionaryValue {
    return this.sportsList.find(item => item.value === value);
  }

  public selectItem(item: any) {
    this.selectedItem = item;
    this.isOptionVisible = false;
    console.log(this.selectedItem);
    // todo zapylić tym dane w formularzu
  }

  public toggleVisible() {
    this.isOptionVisible = !this.isOptionVisible;
  }
}
