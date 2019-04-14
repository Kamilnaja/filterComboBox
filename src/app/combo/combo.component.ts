import { Component, OnInit, OnChanges, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormControl, AbstractControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import model from './model.json';
import { DictionaryValue } from './DictionaryValue';
import { Direction } from './Direction';

@Component({
  selector: 'app-combo',
  templateUrl: './combo.component.html',
  styleUrls: ['./combo.component.css']
})

export class ComboComponent implements OnInit {

  public sportsList: DictionaryValue[];
  public sportsListsCopy: DictionaryValue[];
  public isOptionVisible: boolean = false;
  public focusedIndex: number = 0;
  public selectedSport: FormControl;
  public longestDescription: number;

  constructor() {
    this.sportsList = model;
  }

  ngOnInit() {
    this.sportsListsCopy = this.sportsList;
    this.selectedSport = new FormControl('', [
      Validators.required,
      this.isDictionaryValueValidator()
    ]);
    this.longestDescription = Math.max(...this.sportsList.map(item => item.description.length));
  }

  public get getSelectedSport(): AbstractControl {
    return this.selectedSport;
  }

  public handleSubmit() {
    console.log(this.mapDescriptionToObject(this.getSelectedSport.value).value);
  }

  private mapDescriptionToObject(description: string): DictionaryValue { // todo - move into service
    return this.sportsList.find(item => item.description === description);
  }

  public selectItem(item: any) {
    this.isOptionVisible = false;
    this.selectedSport.setValue(item)
  }

  public handleBlur() {
    if (this.selectedSport.valid){
      this.isOptionVisible = false;
    }
  }

  public toggleVisible(val: boolean) {
    val
    ? this.isOptionVisible = true
    : this.isOptionVisible = false;
  }

  public handleSelectActions(e) {
    if (e.code === 'ArrowDown') {
      this.selectNext(Direction.down);
    } else if (e.code === 'ArrowUp') {
      this.selectNext(Direction.up)
    } else if (e.code === 'Enter') {
      this.selectViaEnter();
    } else if (e.code === 'Backspace' || 'Delete') {
      this.toggleVisible(true);
    }
  }

  private selectViaEnter() {
    this.selectItem(this.filterModel[this.focusedIndex].description);
    this.focusedIndex = 0;
  }

  private selectNext(direction: Direction) {
    if (direction === Direction.down) {
      this.goDown();
    } else if (direction === Direction.up) {
      this.goUp();
    }
  }

  private goUp() {
    this.focusedIndex > 0 ? this.focusedIndex-- : (this.focusedIndex = this.filterModel.length - 1);
  }

  private goDown() {
    this.focusedIndex < this.filterModel.length - 1 ? this.focusedIndex++ : this.focusedIndex = 0;
  }

  public get filterModel(): DictionaryValue[] {
    let val = this.getSelectedSport.value
    return this.sportsListsCopy
      .filter((item: DictionaryValue) => item.description.toLowerCase().startsWith(val.toLowerCase()));
  }

  public isDictionaryValueValidator(): ValidatorFn {
    return ((control: FormControl) => {
      const isInDictionary = this.sportsList.find(item => item.description === control.value)
      return isInDictionary ? null : { 'isInDictionary': { value: control.value } };
    })
  }
}
