import { Component, OnInit } from '@angular/core';
import { TableService } from './table.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  constructor(private service: TableService) { }

  ngOnInit() {
    this.service.getData().subscribe((item: any) => console.log(item)
    );
  }

}
