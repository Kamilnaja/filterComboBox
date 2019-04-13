import { Component, OnInit, OnChanges, OnDestroy, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { FormControl, AbstractControl, FormGroup } from '@angular/forms';
import model from './model.json';
import { DictionaryValue } from './DictionaryValue.js';

enum Direction {
  up,
  down,
}

@Component({
  selector: 'app-combo',
  templateUrl: './combo.component.html',
  styleUrls: ['./combo.component.css']
})

export class ComboComponent implements OnInit, OnChanges {
  selectedSport = new FormControl('')

  public sportsList: DictionaryValue[];
  public sportsListsCopy: DictionaryValue[];
  private selectedItem: DictionaryValue;
  private sub;
  public isOptionVisible: boolean = false;
  public focusedIndex: number = 0;
  public myForm: FormGroup;

  @ViewChild('tips') tips: ElementRef;
  @ViewChild('input') input: ElementRef;

  constructor(private renderer: Renderer2) {
    this.sportsList = model;
  }

  ngOnInit() {
    this.sportsListsCopy = this.sportsList;
  }

  ngOnChanges(): void {
  }

  public get getSelectedSport(): AbstractControl {
    return this.selectedSport;
  }

  public handleSubmit() {
    console.log(this.mapDescriptionToObject(this.getSelectedSport.value).value);
  }

  public mapDescriptionToObject(description: string): DictionaryValue { // todo - move into service
    return this.sportsList.find(item => item.description === description);
  }

  public selectItem(item: any) {
    this.selectedItem = item;
    this.isOptionVisible = false;
    this.selectedSport.setValue(this.selectedItem)
  }

  public toggleVisible(val: boolean) {
    val ? this.isOptionVisible = true : this.isOptionVisible = false;
  }
  // todo - akcja, gdy klikniemy gdziekolwiek poza
  // todo - gdy zjedziemy w dół z formularza, zaznacz pierwszy item
  public expandSelect(e) {
    if (e.code === 'ArrowDown') {
      this.selectNext(Direction.down);
    } else if (e.code === 'ArrowUp')  {
      this.selectNext(Direction.up)
    }

    else {
      this.filterModel()
    }
    //  todo - deal with enter
  }

  private selectNext(direction: Direction) {
    if (direction === Direction.down) {
      this.goDown();
    } else if (direction === Direction.up) {
      this.goUp();
    }
    console.log(`focused : ${this.focusedIndex}`);
  }

  private goUp() {
    this.focusedIndex > 0 ? this.focusedIndex-- : this.focusedIndex = 2;
  }

  private goDown() {
    this.focusedIndex < this.sportsListsCopy.length - 1 ? this.focusedIndex++ : this.focusedIndex = 0;
  }

// todo - select on enter
  public filterModel(): DictionaryValue[] {
    let val = this.getSelectedSport.value
    return this.sportsListsCopy
      .filter((item: DictionaryValue) => item.description.toLowerCase().startsWith(val.toLowerCase()));
  }
}
