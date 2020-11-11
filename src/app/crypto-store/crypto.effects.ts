import { Injectable } from '@angular/core';
import { ofType, createEffect, Actions } from '@ngrx/effects';
import {
  tap,
  catchError,
  map,
  mergeMap,
  pluck,
  filter,
  switchMap,
} from 'rxjs/operators';
import { of } from 'rxjs';
import { CryptoService } from './crypto.service';
import { CryptoActions, getCrypto, getCryptoSuccess } from './crypto.actions';

@Injectable()
export class CryptoEffects {
  constructor(private actions$: Actions, private cs: CryptoService) {}

  loadCryptos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCrypto),
      switchMap(({ ticket, date }) => {
        return this.cs.getData(ticket, date).pipe(
          map((data) => {
            return {
              type: CryptoActions.GetCryptoSuccess,
              data,
            };
          }),
          catchError(() => of({ type: CryptoActions.GetCryptoError }))
        );
      })
    )
  );
}
