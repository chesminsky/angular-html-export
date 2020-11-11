import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectCoinData } from '../crypto-store/crypto.selectors';
import { format } from 'date-fns';
import { getCrypto } from '../crypto-store/crypto.actions';
import { map, withLatestFrom } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-crypto-widget',
  templateUrl: './crypto-widget.component.html',
  styleUrls: ['./crypto-widget.component.scss'],
})
export class CryptoWidgetComponent implements OnInit {
  @Input() data;
  coins = [
    { value: 'bitcoin', viewValue: 'Bitcoin' },
    { value: 'ethereum', viewValue: 'Ethereum' },
  ];

  coinData$ = this.store.select(selectCoinData);

  form = this.fb.group({
    coin: 'bitcoin',
    date: this.fb.control('', Validators.required),
    currency: '',
  });

  currencies$ = this.coinData$.pipe(
    map((d) => d && Object.keys(d.market_data.current_price))
  );

  value$ = this.form.get('currency').valueChanges.pipe(
    withLatestFrom(this.coinData$),
    map(([v, d]) => {
      return d.market_data.current_price[v];
    })
  );

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    console.log(this.data);
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    this.form.get('currency').setValue('');
    const fv = { ...this.form.value };
    fv.date = format(fv.date, 'dd-MM-yyyy');
    this.store.dispatch(getCrypto({ ticket: fv.coin, date: fv.date }));
  }

  export() {
    this.http
      .get('export.html', { responseType: 'text' })
      .subscribe((fileSrc) => {
        const file = new File([fileSrc], `export.html`, {
          type: 'text/html;charset=utf-8',
        });

        saveAs(file);
      });
  }
}
