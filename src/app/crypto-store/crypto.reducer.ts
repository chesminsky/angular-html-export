import { createReducer, on, Action } from '@ngrx/store';
import { getCryptoSuccess } from './crypto.actions';

import { CryptoState } from './crypto.model';

export const initialState: CryptoState = {
  crypto: null,
};

const reducer = createReducer(
  initialState,
  on(getCryptoSuccess, (state, action) => {
    return {
      ...state,
      crypto: action.data,
    };
  })
);

export function cryptoReducer(
  state: CryptoState | undefined,
  action: Action
): CryptoState {
  return reducer(state, action);
}
