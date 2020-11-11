import { createSelector } from '@ngrx/store';
import { selectCryptoState } from '../core.state';
import { CryptoState } from './crypto.model';

export const selectCoinData = createSelector(selectCryptoState, (state: CryptoState) => state.crypto);


