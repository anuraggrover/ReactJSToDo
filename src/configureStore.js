/**
 * Created by anurag on 13/09/16.
 */

import {createStore} from 'redux';

export default function configureStore(reducer, initialState) {
  const store = createStore(reducer, initialState);
  return store;
}