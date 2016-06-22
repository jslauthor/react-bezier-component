import {
  INITIALIZE, SELECT_CURVE
} from '../constants/ActionTypes'

const initialState = {
  curves: {},
  selectedCurve: {}
};

export default function bezier(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
