import { createAction, props } from '@ngrx/store';
import { CoinHistory } from './crypto.model';

export enum CryptoActions {
  GetCrypto = '[Crypto] GetCrypto',
  GetCryptoSuccess = '[Crypto] GetCryptoSuccess',
  GetCryptoError = '[Crypto] GetCryptoError',
}

export const getCrypto = createAction(
  CryptoActions.GetCrypto,
  props<{ ticket: string; date: string }>()
);
export const getCryptoSuccess = createAction(
  CryptoActions.GetCryptoSuccess,
  props<{ data: CoinHistory }>()
);
