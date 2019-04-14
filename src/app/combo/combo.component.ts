import { Component, OnInit, OnChanges, OnDestroy, ViewChild, ElementRef} from '@angular/core';
import { FormControl, AbstractControl, FormGroup } from '@angular/forms';
import model from './model.json';
import { DictionaryValue } from './DictionaryValue';
import { Direction } from './Direction';

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

  constructor() {
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
    this.isOptionVisible = false;
    this.selectedSport.setValue(item)
  }

  public toggleVisible(val: boolean) {
    val ? this.isOptionVisible = true : this.isOptionVisible = false;
  }
  // todo - akcja, gdy klikniemy gdziekolwiek poza
  public expandSelect(e) {
    console.log(e.code);

    if (e.code === 'ArrowDown') {
      this.selectNext(Direction.down);
    } else if (e.code === 'ArrowUp')  {
      this.selectNext(Direction.up)
    } else if (e.code === 'Enter') {
      this.selectItem(this.filterModel[this.focusedIndex].description);
      this.focusedIndex = 0;
    } else if (e.code === 'Backspace' || 'Delete') {
      this.toggleVisible(true);
    } else {
      this.filterModel;
    }
  }

  private selectNext(direction: Direction) {
    if (direction === Direction.down) {
      this.goDown();
    } else if (direction === Direction.up) {
      this.goUp();
    }
    this.toggleVisible(true)
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
}
