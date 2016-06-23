import * as types from '../constants/ActionTypes'

export function updateEquation(equation) {
  return { type: types.UPDATE_EQUATION, equation }
}

