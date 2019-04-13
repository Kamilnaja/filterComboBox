import { Component, OnInit, OnChanges, OnDestroy, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { FormControl, AbstractControl, FormGroup } from '@angular/forms';
import model from './model.json';
import { DictionaryValue } from './DictionaryValue.js';

@Component({
  selector: 'app-combo',
  templateUrl: './combo.component.html',
  styleUrls: ['./combo.component.css']
})

export class ComboComponent implements OnInit, OnChanges, OnDestroy {
  selectedSport = new FormControl('')

  public sportsList: DictionaryValue[];
  public sportsListsCopy: DictionaryValue[];
  private selectedItem: DictionaryValue;
  private sub;
  public isOptionVisible: boolean = false;
  public focusedItem: number = 0;
  public myForm: FormGroup;

  @ViewChild('tips') tips: ElementRef;
  @ViewChild('input') input: ElementRef;

  constructor(private renderer: Renderer2) {
    this.sportsList = model;
  }

  ngOnInit() {
    this.sportsListsCopy = this.sportsList;
    this.sub = this.selectedSport.valueChanges.subscribe(item => {
      console.log(item);
    });
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

  public mapValueIntoObject(value: string): DictionaryValue { // todo - move into service
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
  // todo - akcja, gdy klikniemy gdziekolwiek poza
  // todo - gdy zjedziemy w dół z formularza, zaznacz pierwszy item
  public expandSelect(e) {
    if (e.code === 'ArrowDown') {
      console.log(e);
      let tipsList = this.tips.nativeElement;
      this.renderer.addClass(tipsList.children[0], 'selected');
      console.log(`${tipsList.children[0].innerHTML} is selected`);
    }

    // this.input.nativeElement.blur();
    // tipsList.children[0].focus();
    // todo -remove class from other elements
  }

  // todo - deal with model
  public filterModel() {

  }

  public selectDown(i: number) {
    console.log(`selecting down item of ${i}`);
  }
}
