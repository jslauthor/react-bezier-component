import {
  INITIALIZE, UPDATE_EQUATION
} from '../constants/ActionTypes'

const initialState = {
  curves: [
    { type: 'linear', equation: [0.250, 0.250, 0.750, 0.750] },
    { type: 'ease', equation: [0.250, 0.100, 0.250, 1.000] },
    { type: 'ease-in', equation: [0.420, 0.000, 1.000, 1.000] },
    { type: 'ease-out', equation: [0.000, 0.000, 0.580, 1.000] },
    { type: 'ease-in-out', equation: [0.420, 0.000, 0.580, 1.000] },
    { type: 'easeInQuad', equation: [0.550, 0.085, 0.680, 0.530] },
    { type: 'easeInCubic', equation: [0.550, 0.055, 0.675, 0.190] },
    { type: 'easeInQuart', equation: [0.755, 0.050, 0.855, 0.060] },
    { type: 'easeInSine', equation: [0.470, 0.000, 0.745, 0.715] },
    { type: 'easeInExpo', equation: [0.950, 0.050, 0.795, 0.035] },
    { type: 'easeInCirc', equation: [0.600, 0.040, 0.980, 0.335] },
    { type: 'easeInBack', equation: [0.600, -0.280, 0.735, 0.045] },
    { type: 'easeOutQuad', equation: [0.250, 0.460, 0.450, 0.940] },
    { type: 'easeOutCubic', equation: [0.215, 0.610, 0.355, 1.000] },
    { type: 'easeOutQuart', equation: [0.165, 0.840, 0.440, 1.000] },
    { type: 'easeOutQuint', equation: [0.230, 1.000, 0.320, 1.000] },
    { type: 'easeOutSine', equation: [0.390, 0.575, 0.565, 1.000] },
    { type: 'easeOutExpo', equation: [0.190, 1.000, 0.220, 1.000] },
    { type: 'easeOutCirc', equation: [0.075, 0.820, 0.165, 1.000] },
    { type: 'easeOutBack', equation: [0.175, 0.885, 0.320, 1.275] },
    { type: 'easeInOutQuad', equation: [0.455, 0.030, 0.515, 0.955] },
    { type: 'easeInOutCubic', equation: [0.645, 0.045, 0.355, 1.000] },
    { type: 'easeInOutQuart', equation: [0.770, 0.000, 0.175, 1.000] },
    { type: 'easeInOutQuint', equation: [0.860, 0.000, 0.070, 1.000] },
    { type: 'easeInOutSine', equation: [0.445, 0.050, 0.550, 0.950] },
    { type: 'easeInOutExpo', equation: [1.000, 0.000, 0.000, 1.000] },
    { type: 'easeInOutCirc', equation: [0.785, 0.135, 0.150, 0.860] },
    { type: 'easeInOutBack', equation: [0.680, -0.550, 0.265, 1.550] }
  ],
  equation: [0.420, 0.000, 0.580, 1.000] // default to ease-in-out
};

export default function bezier(state = initialState, action) {
  switch (action.type) {
    case UPDATE_EQUATION:
      return {...state, equation: action.equation }
    default:
      return state;
  }
}
