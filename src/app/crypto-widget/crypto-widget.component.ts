import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectCoinData } from '../crypto-store/crypto.selectors';
import { format } from 'date-fns';
import { getCrypto, getCryptoSuccess } from '../crypto-store/crypto.actions';
import { map, startWith, withLatestFrom } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { CryptoService } from '../crypto-store/crypto.service';

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
      return v && d.market_data.current_price[v];
    })
  );

  offlineMode = false;

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    console.log(this.data);

    // mock
    if (this.data) {
      const { data, form } = JSON.parse(decodeURIComponent(this.data));
      this.store.dispatch(getCryptoSuccess({ data }));
      this.offlineMode = true;

      setTimeout(() => {
        this.form.setValue(form);
        this.form.get('coin').disable();
        this.form.get('date').disable();
      });
    }
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
      .pipe(withLatestFrom(this.coinData$))
      .subscribe(([fileSrc, data]) => {
        fileSrc = fileSrc.replace(
          '<my-export></my-export>',
          `<my-export data="${encodeURIComponent(
            JSON.stringify({
              data,
              form: this.form.value,
            })
          )}"></my-export>`
        );

        const file = new File([fileSrc], `export.html`, {
          type: 'text/html;charset=utf-8',
        });

        saveAs(file);
      });
  }
}
