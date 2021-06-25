import {Component, OnInit, ViewChild } from '@angular/core';
import data from '../../assets/mock.json';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  private mock = data;
  private tableStyle = 'bootstrap';
  private filterTerm: string;
  filteredData = [];
  columns = [{ prop: 'date' }, { name: 'impressions' }, { name: 'clicks' }, { name: 'installs' }, { name: 'dau' }, { name: 'revenue' }, { name: 'platform' }, { name: 'app' }];
  private table: any;
  constructor() {
    console.log(this.mock);
  }

  ngOnInit(){
    this.filteredData = this.mock;
  }
  filterDatatable(event){
    // get the value of the key pressed and make it lowercase
    let val = event.target.value.toLowerCase();
    // get the amount of columns in the table
    let colsAmt = this.columns.length;
    // get the key names of each column in the dataset
    let keys = Object.keys(this.mock[0]);
    // assign filtered matches to the active datatable
    this.mock = this.filteredData.filter(function(item){
      // iterate through each row's column data
      for (let i=0; i<colsAmt; i++){
        // check for a match
        if (item[keys[i]].toString().toLowerCase().indexOf(val) !== -1 || !val){
          // found match, return true to add to result set
          return true;
        }
      }
    });
    // whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }
  
}
