import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crypto-widget',
  templateUrl: './crypto-widget.component.html',
  styleUrls: ['./crypto-widget.component.scss']
})
export class CryptoWidgetComponent implements OnInit {

  coins = [
    {value: 'bitcoin', viewValue: 'Bitcoin'},
    {value: 'ethereum', viewValue: 'Ethereum'},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
