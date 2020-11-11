import { RouterState } from '@angular/router';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { CryptoState } from './crypto-store/crypto.model';
import { cryptoReducer } from './crypto-store/crypto.reducer';

export const reducers: ActionReducerMap<AppState> = {
  crypto: cryptoReducer,
};

export const selectCryptoState = createFeatureSelector<AppState, CryptoState>(
  'crypto'
);

export interface AppState {
  crypto: CryptoState;
}
